"use strict";

const _ = require("lodash");

const retrieveData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

module.exports = { retrieveData };
