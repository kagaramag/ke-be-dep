export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Legals', {
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
    status: {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      allowNull: true,
      defaultValue: 'pending'
    },
    seniorFive: {
      type: Sequelize.STRING,
      allowNull: false
    },
    seniorSix: {
      type: Sequelize.STRING,
      allowNull: false
    },
    passport: {
      type: Sequelize.STRING,
      allowNull: false
    },
    diploma: {
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
  down: queryInterface => queryInterface.dropTable('Legals')
};
