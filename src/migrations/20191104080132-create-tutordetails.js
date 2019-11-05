'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TutorDetails', {
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
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ranking: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      language: {
        type: Sequelize.ENUM(
          'Kinyarwanda',
          'French',
          'English',
          'Kinyarwanda, French',
          'Kinyarwanda, English',
          'Kinyarwanda, French, English',
          'French, English'
        ),
        allowNull: false
      },
      experience: {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TutorDetails');
  }
};
