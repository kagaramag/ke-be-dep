import status from '../config/status';
import { Legal, User, TutorDetails } from '../queries';

/**
 * A class to handle legal document of a tutor
 */
export default class LegalController {
  /**
   * @param  {object} req contains legal info
   * @param  {object} res contains server response
   * @return {object} return an object containing the kids info
   */
  static async upload(req, res) {
    try {
      const { id } = req.user;
      const seniorFive = req.files && req.files[0];
      const seniorSix = req.files && req.files[1];
      const diploma = req.files && req.files[2];
      const passport = req.files && req.files[3];
      const cv = req.files && req.files[4];
      await TutorDetails.create({
        userId: id,
        experience: req.body.experience,
        language: req.body.language
      });
      const legalForm = await Legal.create({
        userId: id,
        status: 'pending',
        seniorFive: `${seniorFive.version}/${seniorFive.public_id}.${seniorFive.format}`,
        seniorSix: `${seniorSix.version}/${seniorSix.public_id}.${seniorSix.format}`,
        diploma: `${diploma.version}/${diploma.public_id}.${diploma.format}`,
        passport: `${passport.version}/${passport.public_id}.${passport.format}`,
        cv: `${cv.version}/${cv.public_id}.${cv.format}`
      });

      return res.status(status.CREATED).send({
        legalForm
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @param  {object} req contains legal info
   * @param  {object} res contains server response
   * @return {object} return an object containing the kids info
   */
  static async findBySelf(req, res) {
    const legalDoc = await Legal.findOne(req.user.id);
    if (legalDoc.userId !== req.user.id) {
      return res.status(status.UNAUTHORIZED).json({
        message: req.polyglot.t('noAccess')
      });
    }
    return res
      .status(status.OK)
      .json({ message: req.polyglot.t('legal'), legalDoc });
  }

  /**
   * @param  {object} req contains legal info
   * @param  {object} res contains server response
   * @return {object} return an object containing the kids info
   */
  static async findByAdmin(req, res) {
    const { username } = req.params;
    const user = await User.findOne({
      username
    });
    if (!user.errors && !Object.keys(user).length) {
      return res.status(status.NOT_FOUND).json({
        message: req.polyglot.t('usernameNotExists')
      });
    }
    const legalDoc = await Legal.findOne(user.id);
    return res
      .status(status.OK)
      .json({ message: req.polyglot.t('legal'), legalDoc });
  }
}
