import React, { useState, useEffect } from "react";
import { useRatingsContext } from "../hooks/useRatingsContext";
import RatingDetails from "../components/RatingDetails";
import RatingForm from "../components/RatingForm";

const Home = () => {
  const { ratings, dispatch } = useRatingsContext();
  const [visibleRatings, setVisibleRatings] = useState(12);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch("/api/ratings");
        if (response.ok) {
          const json = await response.json();
          dispatch({
            type: "SET_RATINGS",
            payload: json,
          });
        } else {
          // Handle error if needed
        }
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchRatings();
  }, [dispatch]);

  const loadMore = () => {
    setVisibleRatings((prevVisible) => prevVisible + 9);
  };

  return (
    <div className="pl-10 pr-10 pt-10">
      <h1 className="text-4xl font-bold text-center pt-10 pb-5">
        Mad Eats: All Ratings
      </h1>
      <div className="max-w-screen-xl mx-auto pt-10 pl-10 pr-10">
        <RatingForm />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-4">
        {ratings && ratings.length > 0 ? (
          ratings
            .slice(0, visibleRatings)
            .map((rating) => <RatingDetails key={rating.id} rating={rating} />)
        ) : (
          <p>Loading or no ratings available</p>
        )}
      </div>
      {ratings && visibleRatings < ratings.length && (
        <div className="text-center pb-10">
          <button
            onClick={loadMore}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
