const { mongoose } = require("mongoose");

const trackConnections = () => {
  const noOfConnections = mongoose.connections.length;
  console.log(`Number of connections: ${noOfConnections}`);
};

module.exports = {
  trackConnections,
};
