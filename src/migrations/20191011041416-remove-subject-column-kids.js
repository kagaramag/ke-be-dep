export default {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('Kids', 'subject', {
    type: Sequelize.STRING,
    allowNull: false,
  }),
  down: (queryInterface, Sequelize) => queryInterface.addColumn('Kids', 'subject', {
    type: Sequelize.STRING,
    allowNull: false
  })
};
