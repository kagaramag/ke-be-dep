import status from '../../config/status';

/**
 * A class to handle actions performed on tutor details submission
 */
class tutorDetails {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @param {object} next If no error continue
   * @returns {object} Object representing the response returned
   */
  static create(req, res, next) {
    if (!req.file) {
      return res.status(status.BAD_REQUEST).json({
        error: 'Files can\'t be empty'
      });
    }
    next();
  }
}

export default tutorDetails;
