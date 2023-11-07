const express = require("express");
const {
  getRating,
  getRatings,
  createRating,
  deleteRating,
} = require("../controllers/ratingController");

const router = express.Router();

// get all ratings
router.get("/", async (req, res) => {
  const ratings = await getRatings();
  res.status(200).send(ratings);
});

// get rating by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const rating = await getRating(id);
  if (!rating) {
    return res.status(404).json({ error: "No such rating" });
  }
  res.status(200).send(rating);
});

router.post("/", async (req, res) => {
  const { title, stars, review, diningHall } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!stars) {
    emptyFields.push("stars");
  }
  if (!review) {
    emptyFields.push("review");
  }
  if (!diningHall) {
    emptyFields.push("diningHall");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const newRating = await createRating(title, stars, review, diningHall);
  res.status(200).send(newRating);
});

// delete by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteRating(id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(404).json({ error: "Error deleting rating" });
  }
});

// router.patch('/:id', updateRating)

module.exports = router;
