import db from '../../models';

/**
 * @param {object} model inputs data to be saved in db
 * @param {object} data inputs data to be saved in db
 * @returns {object} Object representing the response returned
 */
export default async (model, data) => {
  try {
    const response = await db[model].create(data, {
      logging: false,
      raw: true
    });
    return response.get();
  } catch (err) {
    console.log('imitwe', err);
    let error;
    if (err.parent && err.parent.detail) {
      error = err.parent.detail;
    }
    if (err && err.errors[0]) {
      error = err.errors[0].message;
    }
    return { errors: error || 'Whoops, something went wrong' };
  }
};
