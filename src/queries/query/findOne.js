import db from '../../models';

/**
 * @param {object} model database table model
 * @param {object} where conditions
 * @returns {object} Object representing the response returned
 */
export default async (model, where) => {
  const response = await db[model].findOne({
    where,
    logging: false,
    returning: true,
    raw: true
  });
  return response || null;
};
