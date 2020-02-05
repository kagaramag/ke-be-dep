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
  // Verifying code coming soon
  next();
  // const condition = {
  //   code: req.body.code
  // };

  // try {
  //   const promocodeExists = await helpers.findOne('Promocode', condition);
  //   req.promocode = promocodeExists;
  //   next();
  // } catch (error) {
  //   res.status(status.BAD_REQUEST).json({
  //     errors: error
  //   });
  // }
};
