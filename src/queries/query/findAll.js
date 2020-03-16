import db from '../../models';
// import { getUserByUsername } from '../users';

/**
 * @param {object} model model
 * @param {object} where condition for all
 * @param {object} include include tables
 * @param {object} pagination paginating records
 * @returns {object} Object representing the response returned
 */
export default async (model, where, include = [], pagination = {}) => {
  try {
    const response = await db[model].findAll({
      where,
      include,
      logging: false,
      limit: pagination.limit || 50,
      offset: pagination.offset || 0
      // raw: true
    });
    return response || null;
  } catch (error) {
    return {
      error
    };
  }
};
