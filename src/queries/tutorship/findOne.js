import db from '../../models';

/**
 * @param {object} where ids of parent and tutor
 * @returns {object} Object representing the response returned
 */
export default async (where) => {
  try {
    return await db.Tutoring.findOne({
      where,
      logging: false
    });
  } catch (error) {
    return {
      error
    };
  }
};
