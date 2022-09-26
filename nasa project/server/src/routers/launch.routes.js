const express = require("express");
const {
  httpPostLaunch,
  httpGetLaunch,
  abortLaunch,
} = require("../controllers/launches.controller");
const launchRoute = express.Router();

launchRoute.post("/", httpPostLaunch);
launchRoute.get("/", httpGetLaunch);
launchRoute.delete("/:id", abortLaunch);

module.exports = launchRoute;
