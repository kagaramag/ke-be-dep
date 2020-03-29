module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Promocodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      percent: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      endingDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.DATE('NOW')
      }
    }),
  down: queryInterface => queryInterface.dropTable('Promocodes')
};
