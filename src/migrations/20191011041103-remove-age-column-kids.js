export default {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('Kids', 'age', {
    type: Sequelize.INTEGER,
    allowNull: false,
  }),
  down: () => ({})
};
