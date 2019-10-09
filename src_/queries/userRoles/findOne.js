import db from '../../models';

/**
 * @param {object} condition
 * @returns {object} an object containing the information of the user or null
 */
export default async (condition = {}) => {
  try {
    const userRole = Object.keys(condition).length
      ? await db.UserRole.findOne({
        where: condition,
        logging: false,
        include: [
          {
            model: db.Role,
            as: 'role',
            attributes: ['role', 'actions']
          }
        ]
      })
      : null;
    return userRole ? userRole.dataValues.role.dataValues : {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
