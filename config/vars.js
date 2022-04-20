const path = require("path");

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  
  mysql: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    waitForConnection: true,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX) || 5,
      min: parseInt(process.env.DB_POOL_MIN) || 0,
      acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
      idle: parseInt(process.env.DB_POOL_IDLE) || 10000,
    },
    dialectOptions: {
      useUTC: false, //for reading from database
      typeCast: true,
      timezone: "+07:00"
    },
    timezone: "+07:00"
  },
 
};
