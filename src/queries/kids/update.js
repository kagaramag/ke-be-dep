import db from '../../models';

/**
 * @param {object} where condition to perform this action
 * @param {object} data new data to be saved
 * @returns {object} Object representing the response returned
 */
export default async (where, data) => {
  try {
    const response = await db.Kid.update(data, {
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
