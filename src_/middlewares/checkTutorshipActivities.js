
import status from '../config/status';
import { Tutoring } from '../queries';
/**
 * @param {object} req Request sent to the route
 * @param {object} res Response from server
 * @param {object} next Allow app to continue
 * @returns {object} Object representing the response returned
 */
export default async (req, res, next) => {
  try {
    const findTutor = req.user.role === 'parent'
      ? { tuteeId: req.body.tuteeId, tutorId: req.body.tutorId }
      : { tutorId: req.user.id, tuteeId: req.body.tuteeId };
    const response = await Tutoring.findOne(findTutor);
    if (!response.dataValues) {
      return res.status(status.NOT_FOUND).json({
        errors: { tutoring: 'Sorry, tutoring don\'t exist or may be deleted' }
      });
    }
    if
    (response.dataValues.status === 'terminated' || response.dataValues.status === 'cancelled') {
      return res.status(status.BAD_REQUEST).json({
        errors: { tutoring: `Sorry, You can not send a message to a ${response.dataValues.status} tutoring` }
      });
    }
    // if allowed to perform action, are you the right person
    if (req.user.role === 'tutor' || req.user.role === 'parent') {
      next();
    } else {
      return res.status(status.UNIZED).json({
        errors: { action: 'You are not allowed to perform this action' }
      });
    }
  } catch (err) {
    return err;
  }
};
