export default (sequelize, DataTypes) => {
  const Service = sequelize.define(
    'Service',
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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(1500),
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      type: {
        type: DataTypes.ENUM('tutoring', 'mentorship'),
        allowNull: false,
        defaultValue: 'tutoring'
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      period: {
        type: DataTypes.STRING,
        allowNull: false
      },
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      discountable: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
  Service.associate = models => {
    Service.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return Service;
};
