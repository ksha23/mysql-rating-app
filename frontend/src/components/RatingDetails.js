import { useRatingsContext } from "../hooks/useRatingsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const RatingDetails = ({ rating }) => {
  const { dispatch } = useRatingsContext();

  const handleClick = async () => {
    const response = await fetch("/api/ratings/" + rating.id, {
      method: "DELETE",
    });
    const json = await response.json();
    console.log(json);

    if (response.ok) {
      dispatch({ type: "DELETE_RATING", payload: json });
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 md:items-center bg-white p-4 rounded-md shadow-md my-4">
      <div className="w-full md:w-1/2">
        <h4 className="text-xl font-semibold mb-2">{rating.title}</h4>
        <p className="text-lg">
          <strong>Stars: </strong>
          {"★".repeat(rating.stars)}
        </p>
        <p className="text-base mt-2">
          <strong>Rating: </strong>
          {rating.review}
        </p>
        {/* <p className="text-sm text-gray-600 mt-2">
          {formatDistanceToNow(new Date(rating.created), { addSuffix: true })}
        </p> */}
      </div>
      <div className="w-full md:w-1/2 flex justify-end items-center mt-4 md:mt-0">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          onClick={handleClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RatingDetails;
