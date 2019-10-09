import db from '../../models';

export default async (role, offset, limit) => {
  // find all roles
  try {
    const roleId = await db.Role.findOne({
      where: role,
    }, { logging: false });
    const findUsers = await db.UserRole.findAll({
      where: { roleId: roleId.dataValues.id },
      offset,
      limit,
      attributes: [],
      include: [
        {
          model: db.User,
          as: 'user'
        }
      ],
      logging: false
    });
    return findUsers || {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
