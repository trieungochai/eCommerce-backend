const app = require("./app");

const PORT = 3055 || process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Received SIGINT. Press Control-C to exit."));
});
