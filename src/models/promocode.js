export default (sequelize, DataTypes) => {
  const Promocode = sequelize.define(
    'Promocode',
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
        onUpdate: 'CASCADE'
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      percent: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      endingDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.DATE('NOW')
      }
    },
    {}
  );
  Promocode.associate = (models) => {
    Promocode.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return Promocode;
};
