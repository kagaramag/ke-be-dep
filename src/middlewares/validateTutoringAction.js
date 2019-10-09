import status from '../config/status';
import { Tutoring } from '../queries';
/**
 * @param {object} req Request sent to the route
 * @param {object} res Response from server
 * @param {object} next Allow app to continue
 * @returns {object} Object representing the response returned
 */
export default async (req, res, next) => {
  // if already performed the same action
  try {
    const findTutor = req.user.role === 'parent'
      ? { tuteeId: req.body.tuteeId, tutorId: req.body.tutorId }
      : { tutorId: req.user.id, tuteeId: req.body.tuteeId };
    const response = await Tutoring.findOne(findTutor);
    if (
      (req.url.substring(1) === 'terminate' && response.dataValues.status === 'terminated')
      || (req.url.substring(1) === 'accept' && response.dataValues.status === 'accepted')
      || (req.url.substring(1) === 'reject' && response.dataValues.status === 'rejected')
    ) {
      return res.status(status.EXIST).json({
        errors: { action: 'You are trying to perform the action that already exists' }
      });
    }
  } catch (err) {
    return err;
  }
  // if allowed to perform action, are you the right person
  if (req.user.role === 'tutor' && (req.url.search(/\/accept/g) === 0 || req.url.search(/\/reject/g) === 0)) {
    next();
  } else if (req.user.role === 'parent' && (req.url.search(/\/terminate/g) === 0 || req.url.search(/\/cancel/g) === 0)) {
    next();
  } else {
    return res.status(status.EXIST).json({
      errors: { action: 'You are not allowed to perform this action' }
    });
  }
};
