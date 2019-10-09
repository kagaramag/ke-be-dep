import db from '../../models';

/**
 * @param {object} kid inputs data to be saved in db
 * @returns {object} Object representing the response returned
 */
export default async (kid) => {
  try {
    const response = await db.Kid.create(kid, { logging: false });
    return response;
  } catch (error) {
    return {
      errors: error
    };
  }
};
