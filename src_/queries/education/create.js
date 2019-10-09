import db from '../../models';

/**
 * @param {object} data inputs data to be saved in db
 * @returns {object} Object representing the response returned
 */
export default async (data) => {
  try {
    const response = await db.Education.create(data, { logging: false });
    return response;
  } catch (error) {
    return {
      errors: error
    };
  }
};
