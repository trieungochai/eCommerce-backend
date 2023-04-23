const app = require("./app");

const PORT = process.env.DEV_APP_PORT || 3055;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Received SIGINT. Press Control-C to exit."));
});
