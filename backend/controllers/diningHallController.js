const pool = require("../database");

// get all dining halls
const getDiningHalls = async () => {
  try {
    const [diningHalls] = await pool.query("SELECT * FROM diningLocations");
    return diningHalls;
  } catch (error) {
    console.error("Error fetching dining halls:", error);
    throw error;
  }
};

// get a single dining hall by name
const getDiningHall = async (locationName) => {
  try {
    const [diningHall] = await pool.query(
      "SELECT * FROM diningLocations WHERE locationName = ?",
      [locationName]
    );
    return diningHall[0];
  } catch (error) {
    console.error("Error fetching a single dining hall:", error);
    throw error;
  }
};

// get all ratings for a single dining hall
const getRatingsByDiningHallId = async (locationName) => {
  try {
    const [ratings] = await pool.query(
      "SELECT * FROM ratings WHERE diningLocation = ? ORDER BY created DESC",
      [locationName]
    );
    return ratings;
  } catch (error) {
    console.error("Error fetching ratings for a single dining hall:", error);
    throw error;
  }
};

module.exports = {
  getDiningHalls,
  getDiningHall,
  getRatingsByDiningHallId,
};
