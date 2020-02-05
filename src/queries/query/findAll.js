import db from '../../models';
// import { getUserByUsername } from '../users';

/**
 * @param {object} model model
 * @param {object} where condition for all
 * @returns {object} Object representing the response returned
 */
export default async (model, where) => {
  try {
    const response = await db[model].findAll({
      where,
      logging: false,
      raw: true
    });
    return response || null;
  } catch (error) {
    return {
      error
    };
  }
};
