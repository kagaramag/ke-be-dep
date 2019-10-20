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
    let findTutor;
    if (req.user.role === 'parent') {
      findTutor = { tuteeId: req.body.tuteeId, tutorId: req.body.tutorId };
    }
    if (req.user.role === 'tutor') {
      findTutor = { tutorId: req.user.id, tuteeId: req.body.tuteeId };
    }
    if (!findTutor) {
      return res.status(status.EXIST).json({
        errors: { action: 'Whoouch!, we are confused of  account information. to try again, logout and sign in' }
      });
    }
    const response = await Tutoring.findOne(findTutor);
    if (
      (req.url.substring(1) === 'terminate' && response.dataValues.status === 'terminated')
      || (req.url.substring(1) === 'request_cancel' && response.dataValues.status === 'request_cancel')
      || (req.url.substring(1) === 'accept' && response.dataValues.status === 'accepted')
      || (req.url.substring(1) === 'reject' && response.dataValues.status === 'rejected')
    ) {
      return res.status(status.EXIST).json({
        errors: { action: 'You are trying to perform an existing action' }
      });
    }
  } catch (err) {
    return err;
  }
  // if allowed to perform action, are you the right person
  if (req.user.role === 'tutor' && (req.url.search(/\/accept/g) === 0 || req.url.search(/\/reject/g) === 0)) {
    next();
  } else
  if (req.user.role === 'parent' && (req.url.search(/\/request_cancel/g) === 0 || req.url.search(/\/cancel/g) === 0)) {
    next();
  } else if (req.user.role === 'admin' && (req.url.search(/\/terminate/g) === 0)) {
    next();
  } else {
    return res.status(status.EXIST).json({
      errors: { action: 'You are not allowed to perform this action' }
    });
  }
};
