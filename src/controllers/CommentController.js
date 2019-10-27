/* eslint-disable import/named */
import status from '../config/status';
import * as comment from '../queries/comments';
import * as editcomment from '../queries/comments/edits';

/**
 * comment controller class
 */
export default class CommentController {
  /**
   * Create a comment
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async create(req, res) {
    const userId = req.user.id;
    const { articleSlug } = req.params;
    const { body } = req.body;
    const response = await comment.create({ articleSlug, userId, body });
    const createdComment = await comment.getSingle(response.id);
    return res.status(status.CREATED).json({
      message: req.polyglot.t('commentSuccess'),
      comment: createdComment
    });
  }

  /**
   * Get all comments.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async getAll(req, res) {
    const { articleSlug } = req.params;
    const allComments = await comment.getAll({ articleSlug });
    return res
      .status(status.OK)
      .json({ message: req.polyglot.t('commentFetch'), comments: allComments });
  }

  /**
   * Delete one comment.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async delete(req, res) {
    const { commentId } = req.params;
    await comment.remove({ id: commentId });
    return res
      .status(status.OK)
      .json({ message: req.polyglot.t('commentDelete') });
  }

  /**
   * Edit one comment
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async editComment(req, res) {
    const userId = req.user.id;
    const { articleSlug, commentId } = req.params;
    const findComment = await comment.getSingle({
      articleSlug,
      id: commentId,
      userId
    });
    await editcomment.create({
      articleSlug: findComment.articleSlug,
      userId: findComment.userId,
      body: findComment.body,
      commentId: findComment.id
    });
    const { body } = req.body;
    await comment.update({ body }, { id: commentId });
    return res
      .status(status.OK)
      .json({ message: req.polyglot.t('commentEdit') });
  }

  /**
   * Get all edits
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async getAllEdit(req, res) {
    const userId = req.user.id;
    const { articleSlug, commentId } = req.params;
    const newComment = { articleSlug, commentId, userId };
    const findAllEdit = await editcomment.getAll(newComment);
    return res
      .status(status.OK)
      .json({ message: req.polyglot.t('allComments'), history: findAllEdit });
  }

  /**
   * Delete one edit from comment history.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async remove(req, res) {
    const { id } = req.params;
    let message = req.polyglot.t('removeComment');
    const findEdit = await editcomment.getSingle({ id });
    if (!findEdit) {
      message = req.polyglot.t('commentNotFound');
      return res.status(status.NOT_FOUND).json({ error: { message } });
    }
    await editcomment.remove({ id });
    return res.status(status.OK).json({
      message
    });
  }
}
