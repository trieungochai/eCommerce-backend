const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

// Init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

module.exports = app;
