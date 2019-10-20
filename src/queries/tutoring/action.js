import db from '../../models';

/**
 * @param {object} data inputs data to be saved in db
 * @returns {object} Object representing the response returned
 */
export default async (data) => {
  try {
    const response = await db.Tutoring.update(
      { status: data.action },
      {
        where: {
          tuteeId: data.tuteeId,
          tutorId: data.tutorId
        },
        returning: true,
        logging: false,
        individualHooks: true
      }
    );
    return response;
  } catch (error) {
    return {
      errors: error
    };
  }
};
