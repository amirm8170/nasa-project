const Launch = require("../models/launches.model");
const { Planet } = require("../models/planets.model");

//post new launch in db
const httpPostLaunch = async (req, res) => {
  try {
    const launch = req.body;
    if (
      !launch.mission ||
      !launch.launchDate ||
      !launch.rocket ||
      !launch.target
    ) {
      return res
        .status(400)
        .json({ err: new Error("all fields are required !") });
    }
    //validate Date before save
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
      return res.status(400).json({ err: new Error("invalid date!") });
    }
    const savedLaunch = await saveLaunch(launch, Launch);
    return res.status(201).json(savedLaunch);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

//save new flight number in db
const flightNumber = async (Launch) => {
  const dbFlightNumber = await Launch.findOne().sort({
    flightNumber: -1,
  });
  if (!dbFlightNumber) {
    return 100;
  } else {
    return dbFlightNumber.flightNumber + 1;
  }
};
//save correct data in db
const saveLaunch = async (launch, Launch) => {
  const newFlightNumber = await flightNumber(Launch);
  const newLaunch = new Launch({
    mission: launch.mission,
    launchDate: launch.launchDate,
    rocket: launch.rocket,
    target: launch.target,
    flightNumber: newFlightNumber,
  });
  await newLaunch.save();
  return newLaunch;
};

const httpGetLaunch = async (req, res) => {
  try {
    const response = await Launch.find({}).sort({ flightNumber: -1 });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: new Error(error) });
  }
};

const abortLaunch = async (req, res) => {
  try {
    const { id } = req.params;
    const getLaunchById = await Launch.findOneAndUpdate(
      { flightNumber: id },
      { success: false, upcoming: false },
      { new: true, upsert: true }
    );
    return res.status(200).json(getLaunchById);
  } catch (error) {
    return res.status(500).json({ error: new Error(error) });
  }
};

module.exports = { httpPostLaunch, httpGetLaunch, abortLaunch };
