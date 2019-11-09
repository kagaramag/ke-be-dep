import db from '../../models';

/**
 * @param {object} data inputs data to be saved in db
 * @returns {object} Object representing the response returned
 */
export default async (data) => {
  // user should have one entry in database
  // before create, clear out their document
  await db.Legal.destroy({
    where: {
      userId: data.userId
    },
    logging: false
  });
  const response = await db.Legal.create(data, { logging: false });
  return response;
};
