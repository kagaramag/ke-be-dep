import 'dotenv/config';
import { Kid } from '../queries';
import status from '../config/status';

/**
 * A class to handle parent's kids
 */
export default class KidsController {
  /**
   * @param  {object} req contains kids info
   * @param  {object} res contains server response
   * @return {object} return an object containing the kids info
   */
  static async create(req, res) {
    if (req.user.role !== 'parent') {
      return res.status(status.UNAUTHORIZED).json({
        errors: { parent: 'Sorry, you have to be a parent to perform this action' }
      });
    }
    const kid = await Kid.create({
      ...req.body,
      userId: req.user.id
    });
    if (kid.errors) {
      return res.status(status.SERVER_ERROR).json({
        errors: kid.errors.name === 'SequelizeDatabaseError' ? { error: 'Something went wrong while connecting to the database, try again later' } : { error: 'Error occurred, try again later' }
      });
    }
    return res.status(status.CREATED).json({
      kid
    });
  }

  /**
   * @param  {object} req contains server request info
   * @param  {object} res contains server response
   * @return {object} return an object containing the kids info
   */
  static async getKids(req, res) {
    const kids = await Kid.findAll({ userId: req.user.id });
    return !kids.error
      ? res.status(status.OK).json({
        kids
      })
      : res.status(status.SERVER_ERROR).json({
        errors: kids.error
      });
  }
}
