export default (sequelize, DataTypes) => {
  const Education = sequelize.define(
    'Education',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      graduated: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      yearOfGraduation: {
        type: DataTypes.DATE,
        allowNull: false
      },
      college: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: false
      },
      course: {
        type: DataTypes.STRING,
        allowNull: false
      },
      certificate: {
        type: DataTypes.ENUM('Bachelor', 'Advanced diploma', 'Diploma'),
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
  Education.associate = models => {
    Education.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return Education;
};
