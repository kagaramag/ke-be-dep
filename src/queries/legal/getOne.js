/**
 * Get specific legal document
 * @param {object} limit limit for query
 * @param {object} offset offset for query
 * @param {object} userId User to identify the documents
 * @returns {object} Object representing the response returned
 */
export default async username => {
  let response = [];
  const user = await db.User.findOne({
    where: { username }
  });
  response = await db.Legal.find({
    where: {
      userId: user.id
    },
    logging: false
  });
  return response;
};
