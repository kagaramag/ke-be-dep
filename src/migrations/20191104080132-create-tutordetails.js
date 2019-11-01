

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TutorDetails', {
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
      type: Sequelize.ARRAY(Sequelize.STRING),
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
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('TutorDetails')
};
