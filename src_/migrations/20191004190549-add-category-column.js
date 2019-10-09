export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Articles', 'category', {
    type: Sequelize.ENUM('blog', 'faq', 'help'),
    allowNull: true,
    defaultValue: 'blog'
  }),
  down: queryInterface => queryInterface.removeColumn('Articles', 'category')
};
