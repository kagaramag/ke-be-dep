export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'gender', {
    type: Sequelize.ENUM('male', 'female'),
    allowNull: true,
  }),
  down: queryInterface => queryInterface.removeColumn('Users', 'gender')
};
