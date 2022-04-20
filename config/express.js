const express = require('express');
const app = express();
const { port } = require('./vars');
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require('./sequelize')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));

models.sequelize.sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Database not conecting...', err);
  })

app.use("/api/v1/", require("./route"));

module.exports = app;