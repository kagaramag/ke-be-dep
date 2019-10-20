const userRoles = [{
  role: 'normal',
  actions: '{blog:[create, edit, delete.self], comment: [create, delete.self]}',
  description: 'Normal users have access to create blog posts and comments',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  role: 'admin',
  actions: '{blog:[create, edit, delete.all], comment: [create, delete.self, delete.all], tutoring:[terminate, cancel], tutorship:[delete.all], kid: [create, edit.all, delete.all]}',
  description: 'Admin users control everything',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  role: 'tutor',
  actions: '{blog:[create, edit, delete.self], comment: [create, delete.self], tutoring:[accept, reject, request_cancel, cancel], tutorship:[create, edit.self, delete.self]}',
  description: 'Tutor users have access to create blog, give comments and all tutorship-related',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  role: 'parent',
  actions: '{blog:[create, edit, delete.self], comment: [create, delete.self], tutoring:[request_cancel, cancel], tutorship:[create, edit.self, delete.self], kid: [create, edit.self, delete.self]}',
  description: 'Parent or Guardian',
  createdAt: new Date(),
  updatedAt: new Date()
}];

export default {
  up: queryInterface => queryInterface.bulkInsert('Roles', userRoles, {}),

  down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};
