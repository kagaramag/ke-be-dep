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
        type: DataTypes.INTEGER,
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
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      class: {
        type: DataTypes.STRING,
        allowNull: true
      },
      school: {
        type: DataTypes.STRING,
        allowNull: true
      },
      subject: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
    {}
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
