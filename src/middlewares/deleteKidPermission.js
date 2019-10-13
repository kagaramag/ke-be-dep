import status from '../config/status';
import { Kid } from '../queries';
/**
 * @param {object} req Request sent to the route
 * @param {object} res Response from server
 * @param {object} next Allow app to continue
 * @returns {object} Object representing the response returned
 */
export default async (req, res, next) => {
  const response = await Kid.findOne({ id: req.body.id });
  if (response && response.dataValues.userId !== req.user.id) {
    return res.status(status.UNAUTHORIZED).send({
      error: 'You are not allowed to delete this innocent kid!'
    });
  }
  if (!response) {
    return res.status(status.NOT_FOUND).send({
      error: 'A kid you are trying to delete is not longer exist'
    });
  }
  next();
};
