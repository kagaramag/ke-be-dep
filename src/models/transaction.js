export default (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      payeeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      payerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      method: {
        type: DataTypes.ENUM('mobile', 'card', 'cash'),
        allowNull: false
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      card: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      currency: {
        type: DataTypes.ENUM('RWF', 'USD', 'GBP'),
        allowNull: false
      },
      provider: {
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
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: 'payeeId',
      as: 'payee'
    });
    Transaction.belongsTo(models.Service, {
      foreignKey: 'payerId',
      as: 'payer'
    });
  };
  return Transaction;
};
