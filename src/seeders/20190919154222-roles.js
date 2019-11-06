const userRoles = [{
  role: 'normal',
  actions: '{blog:[create, edit, delete.self], comment: [create, delete.self]}',
  description: 'Normal users have access to create blog posts and comments',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  role: 'admin',
  actions: '{blog:[create, edit, delete.all], resources:[create, edit, delete.all], comment: [create, delete.self]}',
  description: 'Admin users control everything',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  role: 'tutor',
  actions: '{blog:[create, edit, delete.self],resources:[create, edit, delete.self], comment: [create, delete.self]}',
  description: 'Tutor',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  role: 'parent',
  actions: '{blog:[create, edit, delete.self], comment: [create, delete.self]}',
  description: 'Parent or Guardian',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  role: 'student',
  actions: '',
  description: 'Student are registered under a Parent or Guardian',
  createdAt: new Date(),
  updatedAt: new Date()
}];

export default {
  up: queryInterface => queryInterface.bulkInsert('Roles', userRoles, {}),

  down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};
