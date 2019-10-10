import db from "../../models";

/**
 * @param {int} user id
 * @returns {object} Object representing the response returned
 */
export default async userId => {
  try {
    const response = await db.Location.findOne({
      where: {
        userId
      },
      logging: false
    });
    return response;
  } catch (error) {
    return {
      errors: error
    };
  }
};
