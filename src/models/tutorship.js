export default (sequelize, DataTypes) => {
  const Tutorship = sequelize.define(
    'Tutorship',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tutoringId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tutoring',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      messageType: {
        type: DataTypes.ENUM('forTutor', 'forParent'),
        allowNull: false
      },
      tuteeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Kids',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: DataTypes.ENUM('post', 'link', 'image', 'doc'),
        allowNull: false,
        defaultValue: 'post'
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      freezeTableName: true
    }
  );
  Tutorship.associate = (models) => {
    Tutorship.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
    Tutorship.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
    Tutorship.belongsTo(models.Kid, { foreignKey: 'tuteeId', as: 'kid' });
    Tutorship.belongsTo(models.Tutoring, { foreignKey: 'tutoringId', as: 'tutoring' });
  };
  return Tutorship;
};
