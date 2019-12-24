import db from '../../models';
// import { getUserByUsername } from '../users';

/**
 * @param {object} where condition for all
 * @returns {object} Object representing the response returned
 */
export default async (where) => {
  try {
    // const user = await getUserByUsername(username);
    const response = await db.Education.findAll({
      where,
      logging: false
    });
    return response ? response.dataValues : null;
  } catch (error) {
    return {
      error
    };
  }
};
