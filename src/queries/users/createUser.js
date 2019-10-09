import db from "../../models";

/**
 * @param {object} user
 * @returns {object} an object containing the information of the user or null
 */
export default async (user = {}) => {
  try {
    let newUser = {};
    user = {
      ...user,
      username: `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}`
    };
    newUser = await db.User.create(user, { logging: false });
    // find all roles
    const roleId = await db.Role.findOne(
      {
        where: {
          id: user.role
        }
      },
      { logging: false }
    );
    if (!roleId.dataValues.id && !newUser) {
      const error = "Something went wrong";
      return error;
    }
    const newUserRole = {
      roleId: roleId.dataValues.id,
      userId: newUser.dataValues.id
    };
    // Assign a role to a given user
    await db.UserRole.create(
      { roleId: newUserRole.roleId, userId: newUserRole.userId },
      { logging: false }
    );
    return newUser.dataValues;
  } catch (error) {
    return {
      errors: error
    };
  }
};
