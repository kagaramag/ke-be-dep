import dateformat from 'dateformat';
import uniqid from 'uniqid';
import { Op } from 'sequelize';
import status from '../../config/status';
import { query } from '../../queries';
import db from '../../models';

// eslint-disable-next-line valid-jsdoc
/**
 * middleware function used in create comment controller to make check if the article exists
 * @param { object } req the request from the user
 * @param { object } res The response from the server
 * @param { function } next  return object
 */
export default async (req, res, next) => {
  const dates = {
    starting: req.body.startingDate,
    ending: req.body.endingDate
  };
  console.log('dates', dates);

  try {
    const subscriptionExist = await db.Subscription.findAll({
      where: {
        startingDate: {
          [Op.gte]: dates.starting
        },
        endingDate: {
          [Op.lte]: dates.ending
        }
      },
      logging: false,
      returning: true,
      raw: true
    });
    console.log('subscriptionExist starting', subscriptionExist);
    // IF, NO SUBSCRIPTION: CREATE
    if (subscriptionExist && !subscriptionExist.length) {
      const data = {
        uuid: uniqid(),
        userId: req.user.id,
        learnerId: req.body.learnerId,
        serviceId: req.body.serviceId,
        startingDate: req.body.startingDate,
        endingDate: req.body.endingDate
      };
      const subscription = await query.create('Subscription', data);
      req.subscription = subscription;
      next();
    }
    // IF, THERE IS A VALID SUBSCRIPTION WITHIN A GIVEN RANGE
    if (
      subscriptionExist
      && subscriptionExist.length
      && !subscriptionExist.errors
    ) {
      console.log('subs found', subscriptionExist);
      // res.status(status.BAD_REQUEST).json({
      //   errors: `A subscription that starts from ${dateformat(
      //     range.startingDate,
      //     'dddd, mmmm dS, yyyy'
      //   )} to ${dateformat(
      //     range.endingDate,
      //     'dddd, mmmm dS, yyyy'
      //   )} is conflicting with another subscription. Please select other dates or if you think it is happening by mistake, please contact us`
      // });
    }
    // IF, CONFUSED: THROW ERROR
    // if (subscriptionExist && subscriptionExist.errors) {
    //   console.log('IF, CONFUSED: THROW ERROR', subscriptionExist.errors);
    // }
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      errors: error
    });
  }
};
