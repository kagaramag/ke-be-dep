import "dotenv/config";
import { Location } from "../queries";
import status from "../config/status";

/**
 * A class to handle User Location
 */
export default class LocationController {
  /**
   * @param  {object} req contains user location details
   * @param  {object} res contains server response
   * @return {object} return an object containing user location details
   */
  static async create(req, res) {
    const location = await Location.create({
      ...req.body,
      userId: req.user.id
    });

    return location.errors
      ? res.status(status.SERVER_ERROR).json({
          errors: location.errors.errors[0].message
        })
      : res.status(status.CREATED).json({
          location
        });
  }

  /**
   * @param  {object} req contains server request info
   * @param  {object} res contains server response
   * @return {object} return an object containing user location details
   */
  static async getLocation(req, res) {
    const location = await Location.findOne(req.user.id);

    return !location.error
      ? res.status(status.OK).json({
          location
        })
      : res.status(status.SERVER_ERROR).json({
          errors: location.error
        });
  }
}
