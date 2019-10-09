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
        type: DataTypes.INTEGER,
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
        type: DataTypes.ENUM('College/University', 'High School', 'Other'),
        allowNull: false
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
  Education.associate = (models) => {
    Education.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return Education;
};
