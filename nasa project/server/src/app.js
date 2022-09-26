const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const { getPlanetsRoute } = require("./routers/planets.routes");
const launchRoute = require("./routers/launch.routes");

app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/v1/planets", getPlanetsRoute);
app.use("/v1/launches", launchRoute);

app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = { app };
