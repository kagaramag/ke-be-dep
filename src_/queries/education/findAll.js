import db from '../../models';
import { getUserByUsername } from '../users';

/**
 * @param {object} username username of tutor
 * @returns {object} Object representing the response returned
 */
export default async ({ username }) => {
  try {
    const user = await getUserByUsername(username);
    const response = await db.Education.findAll({
      where: { userId: user.id },
      logging: false
    });
    return response;
  } catch (error) {
    return {
      error
    };
  }
};
