module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Subscriptions', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
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
      learnerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Kids',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      startingDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endingDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'inactive'
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Services',
          key: 'id'
        }
      },
      promoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Promocodes',
          key: 'id'
        }
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
  down: queryInterface => queryInterface.dropTable('Subscriptions')
};
