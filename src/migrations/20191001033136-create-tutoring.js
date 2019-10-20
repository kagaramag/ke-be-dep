export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tutoring', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tuteeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Kids',
        key: 'id'
      }
    },
    tutorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    status: {
      type: Sequelize.ENUM('requested', 'accepted', 'request_cancel', 'rejected', 'terminated'),
      allowNull: false,
      defaultValue: 'requested'
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
  down: queryInterface => queryInterface.dropTable('Tutoring')
};
