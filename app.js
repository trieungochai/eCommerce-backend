const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init DB
require("./src/dbs/init.mongodb");
const { isOverLoaded } = require("./src/helpers/checkConnections");
isOverLoaded();

module.exports = app;
