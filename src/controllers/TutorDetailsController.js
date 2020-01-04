import 'dotenv/config';
import { TutorDetails, helpers } from '../queries';
import status from '../config/status';
import { sendMail } from '../helpers';

/**
 * A class to handle user local authentication
 */
export default class UserController {
  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the updated profile
   */
  static async request(req, res) {
    const userId = req.userId || req.user.id;
    const updatedDetails = await helpers.updateOne(
      'TutorDetails',
      { evaluation: true },
      { userId }
    );
    if (updatedDetails[0]) {
      const user = await helpers.findOne('User', { id: req.user.id });
      if (user.email) {
        await sendMail(user.email, 'requestEvaluation', {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          domain: req.headers.origin
        });
      }
      return res.status(status.OK).json({
        details: updatedDetails[1][0],
        message:
          'Tutor details has been updated successfully, we will contact your very soon.'
      });
    }
    return res.status(status.BAD_REQUEST).json({
      details: null,
      errors: { details: 'Something went wrong, try again later' }
    });
  }
}
