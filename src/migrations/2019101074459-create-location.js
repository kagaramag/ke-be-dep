export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Locations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      unique: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    province: {
      type: Sequelize.STRING,
      allowNull: false
    },
    district: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sector: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cell: {
      type: Sequelize.STRING,
      allowNull: false
    },
    village: {
      type: Sequelize.STRING,
      allowNull: true
    },
    houseNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Locations')
};
