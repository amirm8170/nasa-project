const http = require("http");
const { app } = require("./app");
const mongoose = require("mongoose");
const { getPromisePlanet } = require("./models/planets.model");
const PORT = 8000 || process.env.PORT;
require("dotenv").config();

const server = http.createServer(app);

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      server.listen(PORT, async () => {
        await getPromisePlanet();
        console.log(`everything is connected on ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

connect();
