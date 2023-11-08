import { useEffect } from "react";
import { useRatingsContext } from "../hooks/useRatingsContext";
import RatingDetails from "../components/RatingDetails";
import RatingForm from "../components/RatingForm";

const Home = () => {
  const { ratings, dispatch } = useRatingsContext();

  useEffect(() => {
    const fetchRatings = async () => {
      const response = await fetch("/api/ratings");
      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_RATINGS",
          payload: json,
        });
      }
    };

    fetchRatings();
  }, [dispatch]);

  return (
    <div className="pl-10 pr-10 pt-10">
      <h1 className="text-4xl font-bold text-center pt-10 pb-5">
        Mad Eats: All Ratings
      </h1>
      <div className="max-w-screen-xl mx-auto pt-10 pl-10 pr-10">
        <RatingForm />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-4">
        {ratings &&
          ratings.map((rating) => (
            <RatingDetails key={rating.id} rating={rating} />
          ))}
      </div>
    </div>
  );
};

export default Home;
