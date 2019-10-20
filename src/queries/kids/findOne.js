import db from '../../models';

/**
 * @param {object} where ids of parent and tutor
 * @returns {object} Object representing the response returned
 */
export default async (where) => {
  where = { ...where };
  try {
    const response = await db.Kid.findOne({
      where,
      include: [
        {
          model: db.User,
          as: 'parent',
          attributes: {
            exclude: ['password', 'bio', 'accountProvider', 'accountProviderUserId']
          }
        }
      ],
      plain: true,
      logging: false
    });
    return response;
  } catch (error) {
    return {
      error
    };
  }
};
