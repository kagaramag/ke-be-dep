import db from '../../models';

/**
 * Get specific Tutor details
 * @param {object} userId User to identify their details
 * @returns {object} Object representing the response returned
 */
export default async userId => {
  try {
    const response = await db.TutorDetails.findOne({
      where: {
        userId
      },
      logging: false
    });
    return response;
  } catch (error) {
    return {
      errors: error
    };
  }
};
