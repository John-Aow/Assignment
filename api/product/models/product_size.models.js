
const moment = require("moment-timezone");
const { appUrl } = require('../../../config/vars');
module.exports = (sequelize, Sequelize) => {
  const Product_size = sequelize.define(
    "product_size",
    {
      size: { type: Sequelize.STRING },
      product_id: { type: Sequelize.STRING },
      price: { type: Sequelize.DOUBLE },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "product_size",
    }
  );


  return Product_size;
};
