const pool = require("../database");

// get all ratings
const getRatings = async () => {
  try {
    const [ratings] = await pool.query("SELECT * FROM ratings");
    return ratings;
  } catch (error) {
    console.error("Error fetching ratings:", error);
    throw error;
  }
};

// get a single rating by id
const getRating = async (id) => {
  try {
    const [rating] = await pool.query("SELECT * FROM ratings WHERE id = ?", [
      id,
    ]);
    return rating[0];
  } catch (error) {
    console.error("Error fetching a single rating:", error);
    throw error;
  }
};

// create a new rating and update dining hall rating stats
const createRating = async (title, stars, review, diningHall) => {
  try {
    const [result] = await pool.query(
      `
    INSERT INTO ratings (title, stars, review, diningLocation)
    VALUES (?, ?, ?, ?)`,
      [title, stars, review, diningHall]
    );
    const id = result.insertId;
    const newRating = await getRating(id);

    await pool.query(
      `
      UPDATE diningLocations
      SET stars = (stars * numberOfReviews + ?) / (numberOfReviews + 1),
      numberOfReviews = numberOfReviews + 1
      WHERE locationName = ?
      `,
      [stars, diningHall]
    );

    return newRating;
  } catch (error) {
    console.error(
      "Error creating a new rating or updating dining hall stats:",
      error
    );
    throw error;
  }
};

// delete a single rating by id
const deleteRating = async (id) => {
  // see if it is in the database

  const [check] = await pool.query(
    `
      SELECT * FROM ratings
      WHERE id = ?
      `,
    [id]
  );
  if (!check) throw error("No such rating");

  // delete it from the database
  await pool.query(
    `
    DELETE FROM ratings
    WHERE id = ?
    `,
    [id]
  );

  // updating dining hall rating stats
  await pool.query(
    `
    UPDATE diningLocations
    SET stars = (stars * numberOfReviews - ?) / (numberOfReviews - 1),
    numberOfReviews = numberOfReviews - 1
    WHERE locationName = ?
    `,
    [check[0].stars, check[0].diningLocation]
  );

  // verify it was deleted
  try {
    await getRating(id);
    return false;
  } catch (error) {
    // this should error if successful
    return true;
  }
};

module.exports = {
  getRating,
  getRatings,
  createRating,
  deleteRating,
};
