import status from '../config/status';
import { Tutoring } from '../queries';
/**
 * @param {object} req Request sent to the route
 * @param {object} res Response from server
 * @param {object} next Allow app to continue
 * @returns {object} Object representing the response returned
 */
export default async (req, res, next) => {
  const response = await Tutoring.findOne({ tuteeId: req.body.tuteeId, tutorId: req.body.tutorId });
  if (response && !response.error) {
    return res.status(status.EXIST).json({
      errors: { tutor: 'You have already requested to hire this tutor' }
    });
  }
  next();
};
