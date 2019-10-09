import db from '../../models';

/**
 * @param {object} data inputs data to be saved in db
 * @returns {object} Object representing the response returned
 */
export default async (data) => {
  try {
    const response = await db.Tutoring.create(data,
      {
        include: [{
          model: db.Kid,
          as: 'kid'
        },
        {
          model: db.User,
          as: 'tutor'
        }],
        logging: false
      });
    return response;
  } catch (error) {
    return {
      errors: error
    };
  }
};
