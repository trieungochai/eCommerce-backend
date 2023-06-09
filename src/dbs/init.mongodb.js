"use strict";

const { mongoose } = require("mongoose");
const {
  db: { host, port, name, username, password },
} = require("../configs/config.mongo");
const { trackConnections } = require("../helpers/checkConnections");

// const connectionString = `mongodb://${host}:${port}/${name}`;
const connectionString = `mongodb+srv://${username}:${password}@e-commerce.v7kyz.mongodb.net/`;
// console.log(`connectionString:: `, connectionString);

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
      .connect(connectionString, { maxPoolSize: 50 })
      .then((_) =>
        console.log("Connect MongoDB successfully", trackConnections())
      )
      .catch((err) => console.log("Failed to connect MongoDB::", err));
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
