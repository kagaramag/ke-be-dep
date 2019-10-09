import db from '../../models';

/**
 * @param {object} where condition built for querying
 * @returns {object} Object representing the response returned
 */
export default async (where) => {
  try {
    const response = await db.Tutorship.findAll(
      {
        where,
        include: [
          {
            model: db.Tutoring,
            as: 'tutoring'
          },
          {
            model: db.User,
            as: 'sender',
            attributes: {
              exclude: ['password', 'accountProvider', 'accountProviderUserId', 'createdAt', 'updatedAt', 'isActive']
            }
          },
          {
            model: db.User,
            as: 'receiver',
            attributes: {
              exclude: ['password', 'accountProvider', 'accountProviderUserId', 'createdAt', 'updatedAt', 'isActive']
            }
          },
          {
            model: db.Kid,
            as: 'kid'
          }
        ],
        order: [
          ['id', 'DESC']
        ],
      },
      {
        logging: false
      }
    );
    return response;
  } catch (error) {
    return {
      error
    };
  }
};
