export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Education', {
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
    graduated: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    yearOfGraduation: {
      type: Sequelize.DATE,
      allowNull: false
    },
    college: {
      type: Sequelize.ENUM('College/University', 'High School'),
      allowNull: false
    },
    institution: {
      type: Sequelize.STRING,
      allowNull: false
    },
    course: {
      type: Sequelize.STRING,
      allowNull: false
    },
    certificate: {
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
