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
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: {
            exclude: ['password', 'accountProvider', 'accountProviderUserId']
          },
        }
      ],
      order: [
        ['id', 'DESC']
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
