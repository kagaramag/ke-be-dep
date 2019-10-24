import status from '../config/status';
import { User, Chat } from '../queries';

/**
 * A class to handle chat activities
 */
export default class ChatController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} an object containing chat details
   */
  static async save(req, res) {
    if (typeof req.body.message !== 'string' || !req.body.message) {
      return res
        .status(status.BAD_REQUEST)
        .json({ errors: { message: req.polyglot.t('messageError') } });
    }

    const savedChat = await Chat.save(req.user.id, req.body.message);
    if (savedChat.errors) {
      if (savedChat.errors.name === 'SequelizeForeignKeyConstraintError') {
        return res
          .status(status.UNAUTHORIZED)
          .json({ errors: { account: req.polyglot.t('invalidAccount') } });
      }
      return res
        .status(status.SERVER_ERROR)
        .json({ errors: req.polyglot.t('serverError') });
    }

    const findUser = await User.findOne({ id: req.user.id });
    delete findUser.password;

    req.io.emit('message', { ...savedChat, user: findUser });
    return res.status(status.OK).json({
      message: req.polyglot.t('messageSent'),
      chat: { ...savedChat, user: findUser }
    });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async getAll(req, res) {
    let chats = [];
    const { offset, limit } = req.query;
    const savedChats = limit
      ? await Chat.getAll(offset, limit)
      : await Chat.getAll(offset);

    if (!savedChats.errors) {
      savedChats.forEach(chat => {
        const user = chat.get().User.get();
        delete chat.dataValues.User;
        chats = [...chats, { ...chat.get(), user }];
      });
    }

    return savedChats.errors
      ? res
          .status(status.SERVER_ERROR)
          .json({ errors: req.polyglot.t('serverError') })
      : res.status(status.OK).json({ chats });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async delete(req, res) {
    const removedChat =
      req.user.role === 'normal'
        ? await Chat.remove(req.params.chatId, req.user.id)
        : await Chat.remove(req.params.chatId);

    if (removedChat.errors) {
      return removedChat.errors.name === 'SequelizeDatabaseError'
        ? res.status(status.BAD_REQUEST).json({
            errors: {
              chat: req.polyglot.t('idNotFound')
            }
          })
        : res.status(status.SERVER_ERROR).json({
            errors: req.polyglot.t('serverError')
          });
    }

    return removedChat
      ? res.status(status.OK).json({ message: req.polyglot.t('deleteChat') })
      : res
          .status(status.NOT_FOUND)
          .json({ errors: { chat: req.polyglot.t('notdeleteChat') } });
  }
}
