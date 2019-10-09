export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Kids', 'gender', {
    type: Sequelize.ENUM('boy', 'girl'),
    allowNull: false,
  }),
  down: queryInterface => queryInterface.removeColumn('Kids', 'gender')
};
