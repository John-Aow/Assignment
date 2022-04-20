
const moment = require("moment-timezone");
const { appUrl } = require('../../../config/vars');
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "product",
    {
      category: { type: Sequelize.STRING },
      gender: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "product",
    }
  );


  return Product;
};
