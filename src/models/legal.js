export default (sequelize, DataTypes) => {
  const Legal = sequelize.define(
    "Legal",
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
          model: "Users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        allowNull: true,
        defaultValue: "pending"
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false
      },
      experience: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bulletin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      passport: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cv: {
        type: DataTypes.STRING,
        allowNull: false
      },
      diploma: {
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
  Legal.associate = models => {
    Legal.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Legal;
};
