import status from '../config/status';
import { Kid } from '../queries';
/**
 * @param {object} req Request sent to the route
 * @param {object} res Response from server
 * @param {object} next Allow app to continue
 * @returns {object} Object representing the response returned
 */
export default async (req, res, next) => {
  const response = await Kid.findOne({ userId: req.user.id, names: req.body.names, status: 'active' });
  if (response) {
    return res.status(status.EXIST).send({
      error: 'You have already registered this kid'
    });
  }
  next();
};
