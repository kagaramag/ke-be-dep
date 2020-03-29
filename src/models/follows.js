export default (sequelize, DataTypes) => {
  const Follows = sequelize.define(
    'Follows',
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        followed: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'Users',
            key: 'id'
          }
        }
      }
    },
    {}
  );
  Follows.associate = (models) => {
    Follows.belongsTo(models.User, { foreignKey: 'userId', as: 'follower' });
    Follows.belongsTo(models.User, { foreignKey: 'followed', as: 'followedUser' });
  };
  return Follows;
};
