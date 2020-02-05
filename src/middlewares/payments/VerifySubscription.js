import dateformat from 'dateformat';
import uniqid from 'uniqid';
import status from '../../config/status';
import { query } from '../../queries';

// eslint-disable-next-line valid-jsdoc
/**
 * middleware function used in create comment controller to make check if the article exists
 * @param { object } req the request from the user
 * @param { object } res The response from the server
 * @param { function } next  return object
 */
export default async (req, res, next) => {
  const range = {
    startingDate: req.body.startingDate,
    endingDate: req.body.endingDate
  };

  try {
    // const subscriptionExist = await query.findOne('Subscription', range);
    // IF, NO SUBSCRIPTION: CREATE
    // if (!subscriptionExist) {
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
    // }
    // IF, THERE IS A VALID SUBSCRIPTION WITHIN A GIVEN RANGE
    // if (subscriptionExist && !subscriptionExist.errors) {
    //   res.status(status.BAD_REQUEST).json({
    //     errors: `A subscription that starts from ${dateformat(
    //       range.startingDate,
    //       'dddd, mmmm dS, yyyy'
    //     )} to ${dateformat(
    //       range.endingDate,
    //       'dddd, mmmm dS, yyyy'
    //     )} is conflicting with another subscription. Please select other dates or if you think it is happening by mistake, please contact us`
    //   });
    // }
    // IF, CONFUSED: THROW ERROR
    // if (subscriptionExist && subscriptionExist.errors) {
    //   console.log('IF, CONFUSED: THROW ERROR', subscriptionExist.errors);
    // }
  } catch (error) {
    console.log('IF, CONFUSED: THROW ERROR', error);
    res.status(status.BAD_REQUEST).json({
      errors: error
    });
  }
};
