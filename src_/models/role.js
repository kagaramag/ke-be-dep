export default (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      actions: {
        type: DataTypes.STRING,
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
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  Role.associate = (models) => {
    Role.hasOne(models.UserRole, {
      foreignKey: 'roleId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Role;
};
