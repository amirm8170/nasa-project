const express = require("express");
const { httpGetAllPlanets } = require("../controllers/planets.controller");
const getPlanetsRoute = express.Router();

getPlanetsRoute.get("/", httpGetAllPlanets);

module.exports = { getPlanetsRoute };
