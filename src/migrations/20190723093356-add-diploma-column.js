export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn("Legals", "diploma", {
      type: Sequelize.STRING,
      allowNull: false
    }),
  down: queryInterface => queryInterface.removeColumn("Legals", "diploma")
};
