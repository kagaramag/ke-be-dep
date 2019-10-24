import { User } from '../queries';
import status from '../config/status';

// import * as validate from '../helpers/validation';

/**
 * A class to handle permissions
 */
export default class PermissionController {
  /**
   * @param {object} req
   * @param {object} res
   * @return {object} user information & token
   */
  static async create(req, res) {
    const newPermissions = await User.permissions.create(
      req.body.userType,
      JSON.stringify(req.body.permissions)
    );
    let errors = newPermissions.errors || null;
    if (errors) {
      errors =
        errors.name === 'SequelizeUniqueConstraintError'
          ? {
              code: status.EXIST,
              error: { permissions: req.polyglot.t('permissionExists') }
            }
          : {
              code: status.SERVER_ERROR,
              errors: req.polyglot.t('serverError')
            };
    }
    return errors
      ? res.status(errors.code).json({ errors: errors.error })
      : res.status(status.CREATED).json({
          permissions: newPermissions
        });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing set configuration
   */
  static async findAll(req, res) {
    const { userType } = req.params;
    const permissions =
      (userType && (await User.permissions.findAll({ userType }))) ||
      (await User.permissions.findAll());

    return (
      (permissions.length &&
        res.status(status.OK).json({
          permissions
        })) ||
      res.status(status.NOT_FOUND).json({
        message: req.polyglot.t('permissionNotFound')
      })
    );
  }
}
