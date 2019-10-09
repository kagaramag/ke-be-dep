import db from '../../models';
import { dbFindSingle } from '../../helpers/queryHelper';

const getSingle = async (condition = {}) => dbFindSingle(db.Comment, condition, [
  {
    model: db.User,
    as: 'comment',
    attributes: ['firstName', 'lastName', 'username', 'email', 'image']
  }
]);

export default getSingle;
