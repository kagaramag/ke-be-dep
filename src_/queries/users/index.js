import create from './createUser';
import findOne from './findOneUser';
import update from './updateUser';
import findOrCreate from './findOrCreateUser';
import getAllTutors from './getAllTutors';
import * as permissions from '../permissions';
import getAllUser from './getAllUser';
import getUserByUsername from './getUserByUsername';
import * as follow from '../follows';

export {
  create,
  findOne,
  update,
  findOrCreate,
  getAllUser,
  permissions,
  follow,
  getUserByUsername,
  getAllTutors
};
