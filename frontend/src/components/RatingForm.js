import { useState, useEffect } from "react";
import { useRatingsContext } from "../hooks/useRatingsContext";

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
    <form
      className="p-4 rounded-md bg-gray-300 shadow-md"
      onSubmit={handleSubmit}
    >
      <h3 className="text-xl font-bold mb-4">Add a New Rating</h3>
      <div className="mb-4">
        <label className="block mb-1">Dining Hall:</label>
        <select
          value={diningHall}
          onChange={(e) => {
            setSelectedDiningHall(e.target.value);
          }}
          className="w-full p-2 rounded-md border"
        >
          <option value="">Select a dining hall</option>
          {diningHalls.map((hall) => (
            <option key={hall.id} value={hall.locationName}>
              {hall.locationName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Rating Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={`w-full p-2 rounded-md border ${
            emptyFields.includes("title") ? "border-red-500" : ""
          }`}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Stars:</label>
        <input
          type="number"
          onChange={(e) => {
            setStars(e.target.value);
          }}
          value={stars}
          min="0" // Set the minimum value to 0
          max="5" // Set the maximum value to 5
          className={`w-full p-2 rounded-md border ${
            emptyFields.includes("stars") ? "border-red-500" : ""
          }`}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Review:</label>
        <textarea
          type="text"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          rows={10}
          className={`w-full p-2 rounded-md border ${
            emptyFields.includes("review") ? "border-red-500" : ""
          }`}
        />
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Add Rating
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default RatingForm;
