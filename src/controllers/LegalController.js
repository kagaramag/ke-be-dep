import status from "../config/status";
import { Legal, User } from "../queries";

export default class LegalController {
  static async upload(req, res) {
    const { id } = req.user;
    const bulletin = req.files && req.files[0];
    const diploma = req.files && req.files[1];
    const passport = req.files && req.files[2];
    const cv = req.files && req.files[3];
    const legalForm = await Legal.create({
      userId: id,
      experience: req.body.experience,
      language: req.body.language,
      status: "pending",
      bulletin: `${bulletin.version}/${bulletin.public_id}.${bulletin.format}`,
      diploma: `${diploma.version}/${diploma.public_id}.${diploma.format}`,
      passport: `${passport.version}/${passport.public_id}.${passport.format}`,
      cv: `${cv.version}/${cv.public_id}.${cv.format}`
    });

    return res.status(status.CREATED).send({
      legalForm
    });
  }

  static async finduser(req, res) {
    const { username } = req.params;
    console.log(req.params);
    const user = await User.findOne({
      username
    });
    if (!user.errors && !Object.keys(user).length) {
      return res.status(status.NOT_FOUND).json({
        message: `This user with the username ${username} does not exist`
      });
    }
    const legalDoc = await Legal.findOne(user.id);
    return res
      .status(status.OK)
      .json({ message: `${username}'s legal documents `, legalDoc });
  }

  static async changeStatus(req, res) {}
}
