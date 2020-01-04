import db from '../../models';

/**
 * @param {object} model database table model
 * @param {object} data inputs data to be saved in db
 * @param {object} where conditions
 * @returns {object} Object representing the response returned
 */
export default async (model, data, where) => {
  const response = await db[model].update(data, {
    where,
    logging: false,
    returning: true,
    raw: true
  });
  return [response[0] || false, response[1]];
};
