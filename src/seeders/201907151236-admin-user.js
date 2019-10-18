import { password } from '../helpers';

const userAdmin = {
  firstName: 'admin',
  lastName: 'admin',
  username: 'admin.admin',
  email: 'admin@admin.admin',
  password: password.hash('admin'),
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

export default {
  up: queryInterface => queryInterface.bulkInsert('Users', [userAdmin], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
