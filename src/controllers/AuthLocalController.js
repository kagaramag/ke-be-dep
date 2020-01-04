import 'dotenv/config';
import { User, UserRole } from '../queries';
import * as helper from '../helpers';
import * as validate from '../helpers/validation';
import status from '../config/status';

const { CI } = process.env;
const { appUrl, travis } = helper.urlHelper.frontend;

/**
 * A class to handle user local authentication
 */
export default class AuthLocalController {
  /**
   * @description user signup function
   * @param {object} req request from user
   * @param {object} res response from server
   * @return {object} user information & token
   */
  static async signup(req, res) {
    const { email, firstName, lastName } = req.body;
    req.body.password = helper.password.hash(req.body.password);
    const newUser = await User.create(req.body);
    const errors = newUser.errors
      ? helper.checkCreateUpdateUserErrors(newUser.errors)
      : null;
    return errors
      ? res.status(errors.code).json({ errors: { error: errors.errors } })
      : (await helper.sendMail(email, 'signup', {
          email,
          firstName,
          lastName
        })) &&
          res.status(status.CREATED).json({
            message: req.polyglot.t('signupSuccessful'),
            user: newUser
          });
  }

  /**
   * @description - login user function
   * @param {object} req user request
   * @param {object} res  response form server
   * @returns {object} user token
   */
  static async login(req, res) {
    const { email, password } = req.body;
    let checkUser;
    checkUser = await User.findOne({ email });
    const checkUserRole = await UserRole.findOne({ userId: checkUser.id });
    if (Object.keys(checkUser).length > 0) {
      const comparePassword = helper.password.compare(
        password,
        checkUser.password || ''
      );
      if (!comparePassword) {
        return res.status(status.UNAUTHORIZED).json({
          errors: { credentials: req.polyglot.t('incorrectCredentials') }
        });
      }
      const payload = {
        id: checkUser.id,
        role: checkUserRole.role,
        permissions: checkUserRole.actions
      };
      const token = helper.token.generate(payload);
      delete checkUser.password;
      checkUser = { ...checkUser, role: checkUserRole.role };
      return res.status(status.OK).json({
        message: req.polyglot.t('loginSuccessful'),
        user: checkUser,
        token
      });
    }
  }

  /**
   * @description function to delete user
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return true if user deleted or false when user not deleted
   */
  static async deactivateAccount(req, res) {
    const { id } = req.params;
    const deactivateAccount = await User.update({ isActive: false }, { id });
    return deactivateAccount
      ? res
          .status(status.OK)
          .json({ message: req.polyglot.t('deactivateAccount'), userId: id })
      : res
          .status(status.UNAUTHORIZED)
          .json({ errors: req.polyglot.t('noAccess') });
  }

  /**
   * @description method to find one user
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return all users
   */
  static async getOne(req, res) {
    const id = Number.parseInt(req.params.id, 10);
    const fetchUser = await User.findOne({ id: Number.isNaN(id) ? 0 : id });
    delete fetchUser.password;
    return Object.keys(fetchUser).length
      ? res.status(status.OK).json({ user: fetchUser })
      : res.status(status.NOT_FOUND).json({
          errors: {
            user: req.polyglot.t('userNotFound')
          }
        });
  }

  /**
   * @description function for admin to create user
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return true if user created or flase when was not
   */
  static async create(req, res) {
    const { email, firstName, lastName } = req.body;
    req.body.password = helper.password.hash(req.body.password);
    const newUser = await User.create(req.body);
    if (newUser.errors) {
      const errors = helper.checkCreateUpdateUserErrors(newUser.errors);
      const { code } = errors;
      delete errors.code;
      return res.status(code).json(errors);
    }
    if (newUser) {
      await helper.sendMail(email, 'signup', { email, firstName, lastName });
      return res.status(status.CREATED).json({
        message: req.polyglot.t('emailSent')
      });
    }
  }

  /**
   * @description function to activate user account
   * @param {object} req
   * @param {object} res
   * @returns {object} it return true if account activeted otherwise it return false
   */
  static async activate(req, res) {
    const { user } = req;
    await User.update({ isActive: true }, { email: user.email });
    return res.redirect(`${(CI && travis) || appUrl}/login`);
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the confirmation message
   */
  static async sendEmail(req, res) {
    const { email } = req.body;
    const result = await User.findOne({ email }); // check if the email exist
    if (Object.keys(result).length <= 0) {
      return res.status(status.NOT_FOUND).json({
        errors: req.polyglot.t('emailNotFound')
      });
    }

    const tokenizedEmail = await helper.token.generate({ email });
    await helper.sendMail(email, 'resetPassword', {
      email,
      names: `${result.firstName} ${result.lastName}`
    }); // send mail

    return res.status(status.OK).json({
      message: req.polyglot.t('emailSent'),
      redirect: tokenizedEmail
    });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the confirmation message
   */
  static async updatePassword(req, res) {
    const token = req.body.token || req.params.token;
    const { passwordOne, passwordTwo } = req.body;

    if (passwordOne !== passwordTwo) {
      return res
        .status(status.BAD_REQUEST)
        .json({ errors: req.polyglot.t('passwordNotMatching') });
    }

    if (!req.body.passwordOne || !req.body.passwordTwo) {
      return res
        .status(status.BAD_REQUEST)
        .json({ errors: req.polyglot.t('passEmpty') });
    }

    const isPasswordValid = validate.password(
      passwordOne,
      req.polyglot.t('required')
    );
    const isPasswordValidTwo = validate.password(
      passwordTwo,
      req.polyglot.t('required')
    );

    if (isPasswordValid.length || isPasswordValidTwo.length) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: isPasswordValid[0] });
    }
    const { email } = helper.token.decode(token);
    const isUpdated = await User.update(
      { password: helper.password.hash(passwordOne) },
      { email }
    );
    delete isUpdated.password;
    return isUpdated
      ? res.status(status.OK).json({
          isUpdated,
          message: req.polyglot.t('passChanged')
        })
      : res
          .status(status.NOT_MODIFIED)
          .json({ errors: req.polyglot.t('passNotChanged') });
  }
}
