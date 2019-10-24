import status from '../config/status';
import { findOrCreate, getAll, deleteHighlight } from '../queries/highlights';

/**
 * Highlight controller class
 */
export default class Highlights {
  /**
   * create a highlighted
   * @param {object} req - User's request
   * @param {object} res - Response's holder
   * @returns {Object} response
   */
  static async create(req, res) {
    const [{ articleSlug }, userId] = [req.params, req.user.id];
    const { startIndex, stopIndex } = req.body;
    const { highlightedText, comment, anchorKey } = req.body;
    const contentLength = highlightedText.split('').length;
    const indexesLength = stopIndex - startIndex;
    if (contentLength !== indexesLength) {
      return res.status(status.BAD_REQUEST).json({
        message: req.polyglot.t('highlightError')
      });
    }
    const created = await findOrCreate({
      articleSlug,
      userId,
      highlightedText,
      startIndex,
      stopIndex,
      comment,
      anchorKey
    });
    return (
      (created.errors &&
        res
          .status(status.SERVER_ERROR)
          .json({ message: req.polyglot.t('serverError') })) ||
      res
        .status(status.CREATED)
        .json({ message: req.polyglot.t('choosenHighlight'), created })
    );
  }

  /** ,
   * Get Highlights
   * @param {object} req
   * @param {object} res
   * @returns {object} highlights object
   */
  static async getHighlights(req, res) {
    const { articleSlug } = req.params;

    const highlights = await getAll({
      articleSlug
    });

    return (
      (highlights.length === 0 &&
        res.status(status.NOT_FOUND).json({
          message: req.polyglot.t('noChoice')
        })) ||
      res.status(status.OK).json({
        highlights
      })
    );
  }

  /** ,
   * Remove Highlights
   * @param {object} req
   * @param {object} res
   * @returns {object} message
   */
  static async deleteHighlights(req, res) {
    const { id, articleSlug } = req.params;

    const highlight = await deleteHighlight({ articleSlug, id });

    return (
      (!highlight &&
        res.status(status.NOT_FOUND).json({
          message: req.polyglot.t('choiceNotFound')
        })) ||
      res.status(status.OK).json({
        message: req.polyglot.t('deleteChoice'),
        highlightId: id
      })
    );
  }
}
