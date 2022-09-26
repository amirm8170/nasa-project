const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const arrayOfPlanetsName = [];
//situation of habitable planets
const habitablePlanets = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

//create Planet schema
const Schema = mongoose.Schema;
const planetsSchema = new Schema({
  kepler_name: { type: String, unique: true, required: true },
});
const Planet = mongoose.model("planets", planetsSchema);

//read kepler_data.csv file and save habitable planets on db
const getPromisePlanet = () => {
  new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        try {
          if (habitablePlanets(data)) {
            const planets = new Planet({
              kepler_name: data.kepler_name,
            });
            await planets.save();
          }
        } catch (error) {}
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const dbPlanets = await Planet.find({}, { __v: 0, _id: 0 });
        for (let i = 0; i < dbPlanets.length; i++) {
          const planet = dbPlanets[i];
          arrayOfPlanetsName.push(planet);
        }
        console.log(`there are ${arrayOfPlanetsName.length} planets.`);
        resolve();
      });
  });
};

module.exports = { getPromisePlanet, Planet, arrayOfPlanetsName };
