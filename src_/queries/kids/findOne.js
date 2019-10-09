import db from '../../models';

/**
 * @param {object} where ids of parent and tutor
 * @returns {object} Object representing the response returned
 */
export default async (where) => {
  try {
    const response = await db.Kid.findOne({
      where,
      logging: false
    });
    return response;
  } catch (error) {
    return {
      error
    };
  }
};
