import db from '../../models';

export default async ({ username }) => {
  const where = { username, isActive: true };
  try {
    const user = await db.User.findOne({
      where,
      attributes: {
        exclude: ['password', 'accountProvider', 'accountProviderUserId']
      },
      include: [
        {
          model: db.UserRole,
          include: [
            {
              model: db.Role,
              as: 'role'
            }
          ]
        }
      ],
      logging: false
    });
    return user ? user.dataValues : null;
  } catch (error) {
    return {
      errors: error
    };
  }
};
