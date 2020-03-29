export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Education', {
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      certificate: {
        type: Sequelize.ENUM('Bachelor', 'Advanced diploma', 'Diploma'),
        allowNull: false
      },
      graduated: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      yearOfGraduation: {
        type: Sequelize.DATE,
        allowNull: false
      },
      college: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      institution: {
        type: Sequelize.STRING,
        allowNull: false
      },
      course: {
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
  down: queryInterface => queryInterface.dropTable('Education')
};
