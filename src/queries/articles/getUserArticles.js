import db from '../../models';

/**
 * Get specific article
 * @param {object} limit limit for query
 * @param {object} offset offset for query
 * @param {object} condition contains author, tag and keyword to filter query
 * @returns {object} Object representing the response returned
 */
export default async (limit, offset, condition = {}) => {
  const { userId } = condition;
  let response = [];
  response = await db.Article.findAll({
    limit,
    offset,
    where: { userId, status: { [db.Op.notIn]: ['deleted'] } },
    order: [['id', 'DESC']],
    logging: false
  });
  return response;
};
