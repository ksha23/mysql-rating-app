import { Link } from "react-router-dom";

const DiningDetails = ({ diningHall }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-4xl mx-auto sm:max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-8xl p-4 bg-white rounded-lg shadow-lg w-full">
        <div className="aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden">
          <img
            className="object-cover"
            src={diningHall.picture}
            alt={diningHall.locationName}
          />
        </div>
        <div className="p-4">
          <Link
            to={`/dininghall/${diningHall.locationName}`}
            className="text-xl font-bold block mb-2 text-center"
          >
            {diningHall.locationName}
          </Link>
          <p className="mb-2 text-center">
            <strong>Rating: </strong>
            {"★".repeat(diningHall.stars)} ({diningHall.numberOfReviews})
          </p>
          <p className="mb-2 text-center">
            <strong>Location: </strong>
            {diningHall.physicalLocation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiningDetails;
