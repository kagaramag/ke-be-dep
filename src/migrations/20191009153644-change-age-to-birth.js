export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Kids', 'birth', {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: '2005-10-10'
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Kids', 'age', {
    type: Sequelize.INTEGER,
    allowNull: false,
  })
};
