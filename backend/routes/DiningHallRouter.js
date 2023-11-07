const express = require("express");
const {
  getDiningHalls,
  getDiningHall,
  getRatingsByDiningHallId,
} = require("../controllers/diningHallController");

const router = express.Router();

router.get("/", async (req, res) => {
  const diningHalls = await getDiningHalls();
  res.status(200).send(diningHalls);
});

router.get("/location/:locationName", async (req, res) => {
  const { locationName } = req.params;
  const diningHall = await getDiningHall(locationName);
  if (!diningHall) {
    return res.status(404).json({ error: "No such dining hall" });
  }
  res.status(200).send(diningHall);
});

router.get("/:locationName", async (req, res) => {
  const { locationName } = req.params;
  const ratings = await getRatingsByDiningHallId(locationName);
  res.status(200).send(ratings);
});

module.exports = router;
