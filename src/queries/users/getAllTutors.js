import db from '../../models';

export default async (where = {}, offset, limit) => {
  // find all roles
  try {
    let findTutors = [];
    findTutors = await db.TutorDetails.findAndCountAll({
      where,
      offset,
      limit,
      include: [
        {
          model: db.User,
          where: {
            isActive: true
          },
          as: 'user',
          attributes: {
            exclude: ['password', 'accountProvider', 'accountProviderUserId']
          }
        }
      ],
      order: [['id', 'DESC']],
      logging: false
    });
    return findTutors || {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
