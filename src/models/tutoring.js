export default (sequelize, DataTypes) => {
  const Tutoring = sequelize.define(
    'Tutoring',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
      tutorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: DataTypes.ENUM('requested', 'accepted', 'rejected', 'terminated'),
        allowNull: false,
        defaultValue: 'requested'
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
  Tutoring.associate = (models) => {
    Tutoring.belongsTo(models.User, { foreignKey: 'tutorId', as: 'tutor' });
    Tutoring.belongsTo(models.Kid, { foreignKey: 'tuteeId', as: 'kid' });
  };
  return Tutoring;
};
