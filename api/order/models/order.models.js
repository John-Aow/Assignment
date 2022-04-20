
const moment = require("moment-timezone");
const { appUrl } = require('../../../config/vars');
module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "order",
    {
      total_price: { type: Sequelize.DOUBLE },
      paid_date: { type: Sequelize.DATE ,allowNull: true,},
      status: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "order",
    }
  );


  return Order;
};
