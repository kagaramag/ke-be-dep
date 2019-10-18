import Error from "../../helpers/errorHandler";
import * as validate from "../../helpers";

/**
 * A class to handle actions performed on legal document submission
 */
class legal {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @param {object} next If no error continue
   * @returns {object} Object representing the response returned
   */
  static create(req, res, next) {
    const result = validate.validation.createLegalForm(req.body);
    if (result.error) {
      return Error.joiErrorHandler(res, result);
    }
    next();
  }
}

export default legal;
