'use strict';
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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ranking: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      language: {
        type: DataTypes.ENUM(
          'Kinyarwanda',
          'French',
          'English',
          'Kinyarwanda, French',
          'Kinyarwanda, English',
          'Kinyarwanda, French, English',
          'French, English'
        ),
        allowNull: false
      },
      experience: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  TutorDetails.associate = models => {
    TutorDetails.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return TutorDetails;
};
