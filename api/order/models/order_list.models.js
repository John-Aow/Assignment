
const moment = require("moment-timezone");
const { appUrl } = require('../../../config/vars');
module.exports = (sequelize, Sequelize) => {
  const OrderList = sequelize.define(
    "order_list",
    {
      product_size_id: { type: Sequelize.INTEGER },
      order_id: { type: Sequelize.INTEGER },
      qty: { type: Sequelize.INTEGER },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "order_list",
    }
  );


  return OrderList;
};
