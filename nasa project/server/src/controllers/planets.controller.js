const { arrayOfPlanetsName } = require("../models/planets.model");

const httpGetAllPlanets = (_, res) => {
  try {
    console.log(arrayOfPlanetsName);
    return res.status(200).json(arrayOfPlanetsName);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

module.exports = { httpGetAllPlanets };
