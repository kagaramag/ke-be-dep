import 'dotenv/config';
import { Tutoring } from '../queries';
import status from '../config/status';

/**
 * A class to handle tutoring
 */
export default class TutoringController {
  /**
   * @param  {object} req contains tutoring info
   * @param  {object} res contains server response
   * @return {object} return an object containing the tutoring info
   */
  static async create(req, res) {
    const tutoring = await Tutoring.create({
      tuteeId: req.body.tuteeId,
      tutorId: req.body.tutorId,
    });
    if (tutoring.errors) {
      res.status(status.SERVER_ERROR).json({
        errors: tutoring.errors.errors[0].message
      });
    }
    return res.status(status.CREATED).json({
      message: 'You have successfully requested to hire this tutor. Please wait for his/her confirmation.',
      tutoring,

    });
  }

  /**
   * @param  {object} req contains server request info
   * @param  {object} res contains server response
   * @return {object} return an object containing the tutoring info
   */
  static async getTutoring(req, res) {
    const tutoring = await Tutoring.findAll(req.user.id || null, req.user.role || null);
    return !tutoring.error
      ? res.status(status.OK).json({
        tutoring,
      })
      : res.status(status.SERVER_ERROR).json({
        errors: tutoring.error
      });
  }

  /**
   * @param  {object} req contains server request info
   * @param  {object} res contains server response
   * @return {object} return an object containing the tutoring info
   */
  static async getOneTutoring(req, res) {
    const tutoring = await Tutoring.findOne({ id: req.params.id });
    return !tutoring.error
      ? res.status(status.OK).json({
        tutoring: tutoring.dataValues,
      })
      : res.status(status.SERVER_ERROR).json({
        errors: tutoring.error
      });
  }

  /**
   * @param  {object} req contains tutoring info
   * @param  {object} res contains server response
   * @return {object} return an object containing the tutoring info
   */
  static async tutoringAction(req, res) {
    let action;
    action = req.url.substring(1);
    if (action === 'cancel') {
      action = 'cancelled';
    } else if (action === 'terminate') {
      action = 'terminated';
    } else {
      action = `${action}ed`;
    }
    const tutoring = await Tutoring.action(
      req.user.role === 'tutor' ? {
        tutorId: req.user.id,
        tuteeId: req.body.tuteeId,
        action
      } : {
        tuteeId: req.body.tuteeId,
        tutorId: req.body.tutorId,
        action
      }
    );

    if (tutoring.errors) {
      res.status(status.SERVER_ERROR).json({
        errors: tutoring.errors.errors[0].message
      });
    }
    return res.status(status.OK).json({
      message: `You have successfully ${action} this action`,
    });
  }
}
