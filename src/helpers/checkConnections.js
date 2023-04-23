const { mongoose } = require("mongoose");
const os = require("os");
const process = require("process");

const _intervalTimes = 5000;
const _connectionsSimultaneously = 5;

const trackConnections = () => {
  const noOfConnections = mongoose.connections.length;
  console.log(`Number of connections: ${noOfConnections}`);
};

const isOverLoaded = () => {
  setInterval(() => {
    const noOfConnections = mongoose.connections.length;
    const noOfCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    console.log(`Activate Connections: ${noOfConnections}`);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

    // Assumption: Each core is capable of handling up to 5 connections simultaneously.
    const maxConnections = noOfCores * _connectionsSimultaneously;

    if (noOfConnections > maxConnections) {
      console.log("Connection overloaded detected");
    }
  }, _intervalTimes);
};

module.exports = {
  trackConnections,
  isOverLoaded,
};
