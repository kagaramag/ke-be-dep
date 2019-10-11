export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Kids', 'status', {
    type: Sequelize.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active'
  }),
  down: queryInterface => queryInterface.removeColumn('Kids', 'status')
};
