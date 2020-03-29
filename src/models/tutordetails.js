import availability from '../helpers/factory/availability';

module.exports = (sequelize, DataTypes) => {
  const TutorDetails = sequelize.define(
    'TutorDetails',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      ranks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      evaluation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      language: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      interests: {
        type: DataTypes.ENUM('primary', 'secondary', 'special'),
        allowNull: true
      },
      availability: {
        type: DataTypes.STRING(800),
        allowNull: false,
        defaultValue: availability
      }
    },
    {}
  );
  TutorDetails.associate = (models) => {
    TutorDetails.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return TutorDetails;
};
