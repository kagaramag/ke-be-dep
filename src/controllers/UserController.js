import 'dotenv/config';
import { User } from '../queries';
import status from '../config/status';
import {
  checkCreateUpdateUserErrors,
  sendMail,
  token as tokenHelper,
  urlHelper,
  users
} from '../helpers';

const { CI } = process.env;
const { appUrl, travis } = urlHelper.frontend;

/**
 * A class to handle user local authentication
 */
export default class UserController {
  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the updated profile
   */
  static async update(req, res) {
    const userId = req.userId || req.user.id;
    const updatedUser = await User.update(req.body, { id: userId });

    if (updatedUser.errors) {
      const errors = checkCreateUpdateUserErrors(updatedUser.errors);
      return res.status(errors.code).json({ errors: errors.errors });
    }

    delete updatedUser.password;

    if (req.changeEmail.newEmail) {
      await sendMail(req.changeEmail.newEmail, 'updateEmail', {
        userId,
        email: req.changeEmail.newEmail
      });
    }

    return res.status(status.OK).json({
      message: `${req.polyglot.t('profileSuccess')}. ${
        req.changeEmail.message
      }`,
      user: updatedUser
    });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return all users in database
   */
  static async getAllTutors(req, res) {
    const role = 'tutor';
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    const tutors = await User.getAllTutors({ role }, offset, limit);

    return tutors.length
      ? res.status(status.OK).json({
        tutors: tutors.map(tutor => delete tutor.user.password && tutor.user)
      })
      : res.status(status.NOT_FOUND).json({
        tutors: [],
        message: req.polyglot.t('noTutor')
      });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return all users in database
   */
  static async getAll(req, res) {
    const [offset, limit] = [req.query.offset || 0, req.query.limit || 20];
    const users = await User.getAllUser({}, offset, limit);

    return res.status(status.OK).json({
      users: users.map((user) => {
        const { password, ...userInfo } = user.get();
        return userInfo;
      })
    });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return all users in database
   */
  static async getAllByUsername(req, res) {
    const { username } = req.params;
    // helper: get all user information
    const response = await users.getAllUserInfo(username);
    return response && response.user
      ? res.status(status.OK).json({
        user: response.user,
        articles: response.articles || null,
        kids: response.kids || null,
        education: response.education || null,
        legal: response.legal || null,
        location: response.location || null,
      })
      : res
        .status(status.NOT_FOUND)
        .json({ errors: { user: req.polyglot.t('userNotFound') } });
  }

  /**
   *  Make a user an admin
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {*} success response
   * @throws {*} error if database error
   */
  static async updateUserRole(req, res) {
    const { role } = req.body;
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user.errors && !Object.keys(user).length) {
      return res.status(status.NOT_FOUND).json({
        message: `${username} ${req.polyglot.t('userNotFound')}`
      });
    }
    if (user.role === role) {
      return res
        .status(status.EXIST)
        .send({ message: req.polyglot.t('permissionExists') });
    }
    if (!req.body.role) {
      return res
        .status(status.BAD_REQUEST)
        .send({ message: req.polyglot.t('emptyRole') });
    }
    const updatedUser = await User.update({ role }, { username });
    delete updatedUser.password;
    return res
      .status(status.OK)
      .json({ message: req.polyglot.t('updateRole'), updatedUser });
  }

  // follow user
  /**
   * @description function to create user follows
   * @param {object} req request from user
   * @param {object} res server response
   * @returns {object} true
   */
  static async follow(req, res) {
    const { username } = req.params;
    const checkUser = await User.findOne({ username });
    if (checkUser.id === req.user.id) {
      return res
        .status(status.BAD_REQUEST)
        .json({ errors: { follow: req.polyglot.t('followself') } });
    }
    const follow = await User.follow.add({
      followed: checkUser.id,
      userId: req.user.id
    });
    if (follow.errors) {
      return follow.errors.name === 'SequelizeUniqueConstraintError'
        ? res.status(status.EXIST).send({
          errors: {
            follow: ` ${req.polyglot.t('followAlready')}  "${username}"`
          }
        })
        : res
          .status(status.SERVER_ERROR)
          .json({ errors: req.polyglot.t('serverError') });
    }
    return res.status(status.CREATED).json({
      message: `${req.polyglot.t('following')} ${checkUser.username}`,
      follow: { ...follow, followedUser: checkUser }
    });
  }

  // unFollow user
  /**
   * @description function to allow user to unfollow users
   * @param {object} req user request
   * @param {object} res response from server
   * @returns {object} true
   */
  static async unfollow(req, res) {
    const [username, user] = [req.params.username, req.user];
    const checkUser = await User.findOne({ username });

    const hasUnfollowed = Object.keys(checkUser).length
      ? await User.follow.remove({ userId: user.id, followed: checkUser.id })
      : null;
    if (hasUnfollowed && hasUnfollowed.errors) {
      return res
        .status(status.SERVER_ERROR)
        .json({ errors: req.polyglot.t('serverError') });
    }
    return hasUnfollowed
      ? res.status(status.OK).json({
        message: `${req.polyglot.t('unfollow')} ${username}`,
        followed: checkUser.id
      })
      : res.status(status.BAD_REQUEST).json({
        errors: {
          follow: `${req.polyglot.t('notfollowing')} "${username}"`
        }
      });
  }

  /**
   * @description function to fetch users'followers
   * @param {object} req
   * @param {object} res
   * @returns {object} followers
   */
  static async followers(req, res) {
    const { id } = req.user;
    const followers = await User.follow.getAll({ followed: id });
    return followers.length
      ? res.status(status.OK).json({
        message: 'Followers',
        followers: followers.map(
          follower => delete follower.get().followedUser && follower
        )
      })
      : res.status(status.NOT_FOUND).json({
        errors: { follows: req.polyglot.t('followers') }
      });
  }

  /**
   * @description function to fetch all authors who user follow
   * @param {object} req
   * @param {object} res
   * @returns {object} followers
   */
  static async following(req, res) {
    const following = await User.follow.getAll({ userId: req.user.id });
    const follows = following.map(
      followed => delete followed.get().follower && followed
    );
    if (following.length) {
      return res.status(status.OK).json({
        message: 'Following',
        following: follows
      });
    }
    return res.status(status.NOT_FOUND).json({
      errors: { follows: req.polyglot.t('dontfollow') }
    });
  }

  /**
   * @description confirm email update
   * @param {object} req
   * @param {object} res
   * @returns {object} redirection link
   */
  static async confirmEmailUpdate(req, res) {
    const redirectUrl = (CI && travis) || appUrl;
    const decodedToken = tokenHelper.decode(req.params.token);

    if (!decodedToken.errors || decodedToken.email) {
      await User.update(
        { email: decodedToken.email },
        { id: decodedToken.userId }
      );
      return res.redirect(`${redirectUrl}/profile?email=${decodedToken.email}`);
    }
    return res.redirect(`${redirectUrl}/profile?token=${status.UNAUTHORIZED}`);
  }
}
