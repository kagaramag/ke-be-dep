import db from '../../models';

export default (condition = {}) => {
  let where = { status: { [db.Op.notIn]: ['deleted', 'draft'] } };
  if (condition !== undefined) {
    where = {
      ...where,
      [db.Op.and]: {
        [db.Op.or]: [
          {
            '$.username$': { [db.Op.iLike]: `${condition}` }
          },
          {
            '$.firstName$': { [db.Op.iLike]: `${condition}` }
          },
          {
            '$.lastName$': { [db.Op.iLike]: `${condition}` }
          }
        ]
      }
    };
  }
  if (condition.tag !== undefined) {
    where = {
      ...where,
      [db.Op.and]: {
        tagList: {
          [db.Op.contains]: [`${condition.tag}`]
        }
      }
    };
  }
  if (condition.keyword !== undefined) {
    where = {
      ...where,
      [db.Op.and]: [
        {
          title: {
            [db.Op.iLike]: `%${condition.keyword}%`
          }
        }
      ]
    };
  }
  return where;
};
