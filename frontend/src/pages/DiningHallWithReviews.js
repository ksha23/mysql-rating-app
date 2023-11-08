import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRatingsContext } from "../hooks/useRatingsContext";
import RatingDetails from "../components/RatingDetails";
import DiningDetails from "../components/DiningDetails";
import RatingForm from "../components/RatingForm";

const DiningHallWithReviews = () => {
  const { locationName } = useParams();
  const [diningHall, setDiningHall] = useState(null);
  const { ratings, dispatch } = useRatingsContext();

  useEffect(() => {
    const fetchDiningHall = async () => {
      try {
        // Fetch the dining hall associated with the id
        const response = await fetch(
          `/api/diningHalls/location/${locationName}`
        );
        const json = await response.json();

        setDiningHall(json);
      } catch (error) {
        console.log("Error fetching dining hall:", error);
      }
    };
    const fetchData = async () => {
      try {
        // Fetch the reviews associated with the dining hall
        const response = await fetch(`/api/diningHalls/${locationName}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          dispatch({
            type: "SET_RATINGS",
            payload: data,
          });
        } else {
          console.error("Error fetching dining hall data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
    fetchDiningHall();
  }, [dispatch, locationName]);

  return (
    <>
      <div className="pl-10 pr-10 justify-center items-center pt-10">
        <h1 className="text-4xl font-bold text-center pt-10 pb-10">
          {locationName}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {diningHall && (
            <div className="md:col-span-1 max-w-xxl px-5">
              <DiningDetails key={diningHall.id} diningHall={diningHall} />
            </div>
          )}
          <div className="md:col-span-1 max-w-xxl px-5">
            <RatingForm />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-4">
          {ratings &&
            ratings.map((rating) => (
              <RatingDetails key={rating.id} rating={rating} />
            ))}
        </div>
      </div>
    </>
  );
};

export default DiningHallWithReviews;
