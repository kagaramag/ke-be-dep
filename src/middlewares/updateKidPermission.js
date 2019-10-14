import status from '../config/status';
import { Kid } from '../queries';
/**
 * @param {object} req Request sent to the route
 * @param {object} res Response from server
 * @param {object} next Allow app to continue
 * @returns {object} Object representing the response returned
 */
export default async (req, res, next) => {
  const response = await Kid.findOne({ id: req.params.id });
  if (response && (req.user.role !== 'parent' || response.dataValues.userId !== req.user.id)) {
    return res.status(status.UNAUTHORIZED).json({
      errors: { error: 'You are not allowed to perform this action' }
    });
  }
  if (!response || (req.user.role === 'parent' && response.dataValues.status === 'inactive')) {
    return res.status(status.NOT_FOUND).json({
      error: 'There is no such kid in your database'
    });
  }
  next();
};
