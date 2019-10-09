export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tutorship', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tutoringId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Tutoring',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    senderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    receiverId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    },
    messageType: {
      type: Sequelize.ENUM('forTutor', 'forParent'),
      allowNull: false
    },
    tuteeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Kids',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    type: {
      type: Sequelize.ENUM('post', 'link', 'image', 'doc'),
      allowNull: false,
      defaultValue: 'post'
    },
    link: {
      type: Sequelize.STRING,
      allowNull: true,
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
  down: queryInterface => queryInterface.dropTable('Tutorship')
};
