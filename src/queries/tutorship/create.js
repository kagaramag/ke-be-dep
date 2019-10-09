import db from '../../models';

/**
 * @param {object} data inputs data to be saved in db
 * @returns {object} Object representing the response returned
 */
export default async (data) => {
  try {
    const response = await db.Tutorship.create(data,
      {
        include: [{
          model: db.Kid,
          as: 'kid'
        }
        ],
        logging: false
      });
    return response;
  } catch (error) {
    return {
      errors: error
    };
  }
};
