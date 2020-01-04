import db from '../../models';
// import * as queries from '../../queries';

/**
 * @param {object} id user of tutor/parent
 * @param {object} role data of the user
 * @returns {object} Object representing the response returned
 */
export default async (id, role) => {
  try {
    if (role === 'tutor') {
      const response = await db.Tutoring.findAll(
        {
          where: { tutorId: id },
          order: [['id', 'DESC']],
          include: [
            {
              model: db.Kid,
              as: 'kid',
              include: [
                {
                  model: db.User,
                  as: 'parent',
                  attributes: {
                    exclude: ['password']
                  }
                }
              ]
            }
          ],
          logging: false
        }
      );
      return response;
    }
    if (role === 'parent') {
      const response = await db.Kid.findAll(
        {
          where: { userId: id, status: 'active' },
          order: [['id', 'DESC']],
          include: [
            {
              model: db.Tutoring,
              as: 'tutoring',
              include: [
                {
                  model: db.User,
                  as: 'tutor',
                  attributes: {
                    exclude: ['password']
                  }
                }
              ]
            }
          ],
          logging: false
        }
      );
      return response;
    }
  } catch (error) {
    return {
      error
    };
  }
};
