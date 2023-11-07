import { useState, useEffect } from "react";
import { useRatingsContext } from "../hooks/useRatingsContext";
import "./RatingForm.css";

const RatingForm = () => {
  const [diningHalls, setDiningHalls] = useState([]);
  const [diningHall, setSelectedDiningHall] = useState("");

  const { dispatch } = useRatingsContext();
  const [title, setTitle] = useState("");
  const [stars, setStars] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    // Fetch the dining halls from the API
    const fetchDiningHalls = async () => {
      try {
        const response = await fetch("/api/diningHalls");
        if (response.ok) {
          const data = await response.json();
          setDiningHalls(data);
        } else {
          console.error("Error fetching dining halls");
        }
      } catch (error) {
        console.error("Error fetching dining halls", error);
      }
    };
    fetchDiningHalls();
  }, []);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const rating = { title, stars, review, diningHall };

    const responseRating = await fetch("/api/ratings", {
      method: "POST",
      body: JSON.stringify(rating),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRating = await responseRating.json();

    if (!responseRating.ok) {
      setError(jsonRating.error);
      setEmptyFields(jsonRating.emptyFields);
    }

    if (responseRating.ok) {
      setTitle("");
      setStars("");
      setReview("");
      setSelectedDiningHall("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_RATING", payload: jsonRating });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a New Rating</h3>
      <label>Dining Hall:</label>
      <select
        value={diningHall}
        onChange={(e) => {
          setSelectedDiningHall(e.target.value);
        }}
      >
        <option value="">Select a dining hall</option>
        {diningHalls.map((hall) => (
          <option key={hall.id} value={hall.locationName}>
            {hall.locationName}
          </option>
        ))}
      </select>

      <label>Rating Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      ></input>

      <label>Stars:</label>
      <input
        type="number"
        onChange={(e) => {
          setStars(e.target.value);
        }}
        value={stars}
        min="0" // Set the minimum value to 0
        max="5" // Set the maximum value to 5
        className={emptyFields.includes("stars") ? "error" : ""}
      />
      {/* <input 
            type = "number"
            onChange = {(e)=> setStars(e.target.value)}
            value = {stars}
            className={emptyFields.includes('stars')?'error':''}
            >
        </input> */}

      <label>Review: </label>
      <textarea
        type="text"
        onChange={(e) => setReview(e.target.value)}
        value={review}
        className={emptyFields.includes("review") ? "error" : ""}
      ></textarea>
      <button>Add Rating</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RatingForm;
