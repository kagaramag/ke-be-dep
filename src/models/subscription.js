export default (sequelize, DataTypes) => {
  const Subscription = sequelize.define(
    'Subscription',
    {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      learnerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Kids',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      startingDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endingDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'inactive'
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Services',
          key: 'id'
        }
      },
      promoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Promocodes',
          key: 'id'
        }
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
  Subscription.associate = (models) => {
    Subscription.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'customer'
    });
    Subscription.belongsTo(models.Kid, {
      foreignKey: 'learnerId',
      as: 'kid'
    });
    Subscription.belongsTo(models.Service, {
      foreignKey: 'serviceId',
      as: 'service'
    });
    Subscription.belongsTo(models.Promocode, {
      foreignKey: 'promoId',
      as: 'code'
    });
  };
  return Subscription;
};
