import db from '../../models';

/**
 * @param {object} where ids of parent and tutor
 * @returns {object} Object representing the response returned
 */
export default async (where) => {
  try {
    return await db.Tutoring.findOne({
      where,
      include: [
        {
          model: db.User,
          as: 'tutor',
          attributes: {
            exclude: ['password', 'isActive', 'accountProvider', 'accountProviderUserId']
          }
        },
        {
          model: db.Kid,
          as: 'kid',
          include: [
            {
              model: db.User,
              as: 'parent',
              attributes: {
                exclude: ['password']
              }
            }
          ]
        }
      ],
      logging: false
    });
  } catch (error) {
    return {
      error
    };
  }
};
