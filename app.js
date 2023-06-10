const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();
const mongodbInstance = require("./src/dbs/init.mongodb");
const router = require("./src/routes");

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init DB
// require(mongodbInstance);
// const { isOverLoaded } = require("./src/helpers/checkConnections");
// isOverLoaded();

// init routes
app.use("/", router);

module.exports = app;
