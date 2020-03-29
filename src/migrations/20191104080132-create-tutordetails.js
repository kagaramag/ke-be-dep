import availability from '../helpers/factory/availability';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('TutorDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      ranks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      evaluation: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      language: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      interests: {
        type: Sequelize.ENUM('primary', 'secondary', 'special'),
        allowNull: true
      },
      availability: {
        type: Sequelize.STRING(800),
        allowNull: false,
        defaultValue: availability
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
  down: queryInterface => queryInterface.dropTable('TutorDetails')
};
