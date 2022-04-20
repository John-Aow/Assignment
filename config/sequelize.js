'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};
const { mysql } = require('./vars');
const dbConfig = mysql;

let sequelize;

sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
require('../api/product/models')(sequelize, Sequelize, db);
require('../api/order/models')(sequelize, Sequelize, db);
 


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
