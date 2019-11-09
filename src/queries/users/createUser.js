import db from '../../models';
// import { generator } from '../../helpers';
/**
 * @param {object} user
 * @returns {object} an object containing the information of the user or null
 */
export default async (user = {}) => {
  try {
    let newUser = {};
    // const username = await generator.username(user.firstName, user.lastName);
    user = {
      ...user,
      username: `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}`
    };
    newUser = await db.User.create(user, { logging: false });
    // Assign a role to a given user
    await db.UserRole.create(
      { roleId: user.role || 1, userId: newUser.dataValues.id },
      { logging: false }
    );
    return newUser.dataValues;
  } catch (error) {
    return {
      errors: error
    };
  }
};
