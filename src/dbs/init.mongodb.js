"use strict";

const { mongoose } = require("mongoose");
const { trackConnections } = require("../helpers/trackConnections");

const connectionString = `mongodb://localhost:27017/shopDEV`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectionString)
      .then((_) =>
        console.log("Connect MongoDB successfully", trackConnections())
      )
      .catch((err) => console.log("Failed to connect MongoDB"));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const mongodbInstance = Database.getInstance();

module.exports = mongodbInstance;
