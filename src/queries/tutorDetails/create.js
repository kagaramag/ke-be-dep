import db from '../../models';

/**
 * @param {object} data inputs data to be saved in db
 * @returns {object} Object representing the response returned
 */
export default async (data) => {
  // user should have one entry in database
  //before create, clear out their details
  await db.TutorDetails.destroy({
    where: {
      userId: data.userId
    }
  });
  const response = await db.TutorDetails.create(data, { logging: false });
  return response;
};
