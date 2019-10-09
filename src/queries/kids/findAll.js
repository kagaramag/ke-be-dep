import db from '../../models';

/**
 * @param {object} userId id of parent
 * @returns {object} Object representing the response returned
 */
export default async (userId) => {
  try {
    const response = await db.Kid.findAll({
      where: userId,
    });
    return response;
  } catch (error) {
    return {
      error
    };
  }
};
