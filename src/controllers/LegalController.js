import status from "../config/status";
import * as helpers from "../helpers";
import { Legal, User } from "../queries";
import dotenv from "dotenv";

dotenv.config();
const { IMAGE_BASE_URL } = process.env;

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
}
