export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Legals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        allowNull: true,
        defaultValue: "pending"
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false
      },
      experience: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bulletin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passport: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cv: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable("Legals")
};
