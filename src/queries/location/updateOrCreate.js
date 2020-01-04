import db from '../../models';
// eslint-disable-next-line import/no-cycle
import findOne from '.';

/**
 * @param {object} data inputs data to be saved in db
 * @returns {object} Object representing the response returned
 */
export default async (data) => {
  // find user location
  try {
    const currentLocation = await db.Location.findOne({
      where: {
        userId: data.userId
      },
      logging: false
    });
    let response;
    if (currentLocation && currentLocation.dataValues) {
      response = await db.Location.update(data, {
        where: { userId: data.userId },
        logging: false,
        individualHooks: true
      });
    } else {
      response = await db.Location.create(data, { logging: false });
    }
    return response;
  } catch (error) {
    return {
      errors: error
    };
  }
};
