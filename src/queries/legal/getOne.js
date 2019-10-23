import db from "../../models";

/**
 * Get specific legal document
 * @param {object} userId User to identify the documents
 * @returns {object} Object representing the response returned
 */
export default async userId => {
  try {
    const response = await db.Legal.findOne({
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
