import db from '../../models';

/**
 * @param {object} userId id of parent
 * @returns {object} Object representing the response returned
 */
export default async (userId) => {
  const where = { ...userId, status: 'inactive' };
  try {
    const response = await db.Kid.findAll({
      where,
      order: [['id', 'DESC']],
    });
    return response;
  } catch (error) {
    return {
      error
    };
  }
};
