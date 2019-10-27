import 'dotenv/config';
import { Tutorship } from '../queries';
import status from '../config/status';

/**
 * A class to handle tutorship
 */
export default class TutorshipController {
  /**
   * @param  {object} req contains tutorship info
   * @param  {object} res contains server response
   * @return {object} return an object containing the tutorship info
   */
  static async create(req, res) {
    const tutorship = await Tutorship.create({
      tuteeId: req.body.tuteeId,
      receiverId: req.body.receiverId,
      senderId: req.user.id,
      messageType: req.user.role === 'parent' ? 'forTutor' : 'forParent'
    });
    if (tutorship.errors) {
      res.status(status.SERVER_ERROR).json({
        errors: tutorship.errors.errors[0].message
      });
    }
    return res.status(status.CREATED).json({
      message: req.polyglot.t('tutorRequest'),
      tutorship
    });
  }

  /**
   * @param  {object} req contains server request info
   * @param  {object} res contains server response
   * @return {object} return an object containing the tutorship info
   */
  static async getTutorship(req, res) {
    const tutorship = await Tutorship.findAll({
      tutoringId: req.params.id || null
    });
    return !tutorship.error
      ? res.status(status.OK).json({
          tutorship
        })
      : res.status(status.SERVER_ERROR).json({
          errors: {
            tutorship:
              tutorship.error.name === 'SequelizeDatabaseError'
                ? `${req.polyglot.t('serverError')} ${
                    tutorship.error.parent.hint
                  }`
                : tutorship.error
          }
        });
  }

  /**
   * @param  {object} req contains tutorship info
   * @param  {object} res contains server response
   * @return {object} return an object containing the tutorship info
   */
  static async tutorshipAction(req, res) {
    let action;
    action = req.url.substring(1);
    if (action === 'cancel') {
      action = 'cancelled';
    } else if (action === 'terminate') {
      action = 'terminated';
    } else {
      action = `${action}ed`;
    }
    const tutorship = await Tutorship.action(
      req.user.role === 'tutor'
        ? {
            tutorId: req.user.id,
            tuteeId: req.body.tuteeId,
            action
          }
        : {
            tuteeId: req.body.tuteeId,
            tutorId: req.body.tutorId,
            action
          }
    );

    if (tutorship.errors) {
      res.status(status.SERVER_ERROR).json({
        errors: tutorship.errors.errors[0].message
      });
    }
    return res.status(status.OK).json({
      message: req.polyglot.t('tutorSuccess')
    });
  }
}
