import 'dotenv/config';
import { Education } from '../queries';
import status from '../config/status';

/**
 * A class to handle Education History
 */
export default class EducationController {
  /**
   * @param  {object} req contains education info
   * @param  {object} res contains server response
   * @return {object} return an object containing the education info
   */
  static async create(req, res) {
    const education = await Education.create({
      ...req.body,
      userId: req.user.id
    });
    if (education.errors) {
      res.status(status.SERVER_ERROR).json({
        errors: education.errors.errors[0].message
      });
    }
    return res.status(status.CREATED).json({
      education
    });
  }

  /**
   * @param  {object} req contains server request info
   * @param  {object} res contains server response
   * @return {object} return an object containing the education info
   */
  static async getMyEducation(req, res) {
    const education = await Education.findAll({ username: req.params.username });
    return !education.error
      ? res.status(status.OK).json({
        education
      })
      : res.status(status.SERVER_ERROR).json({
        errors: education.error
      });
  }
}
