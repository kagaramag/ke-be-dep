import db from '../../models';

export default async (username) => {
  try {
    const user = await db.User.findOne({
      where: { username },
      include: [
        {
          model: db.UserRole,
          include: [
            {
              model: db.Role,
              as: 'role',
            }
          ]
        }
      ],
      logging: false
    });
    return user ? user.dataValues : {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
