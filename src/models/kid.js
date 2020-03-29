export default (sequelize, DataTypes) => {
  const Kid = sequelize.define(
    'Kid',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      names: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
      },
      class: {
        type: DataTypes.STRING,
        allowNull: true
      },
      school: {
        type: DataTypes.STRING,
        allowNull: true
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
    }
  );
  Kid.associate = (models) => {
    Kid.belongsTo(models.User, { foreignKey: 'userId', as: 'parent' });
    Kid.hasOne(models.Tutoring, {
      foreignKey: 'tuteeId',
      as: 'tutoring'
    });
    Kid.hasOne(models.Tutoring, {
      foreignKey: 'tuteeId',
      as: 'kid'
    });
  };
  return Kid;
};
