import "./DiningDetails.css"; // Import the CSS file
import { Link } from "react-router-dom";

const DiningDetails = ({ diningHall }) => {
  return (
    <div className="dining-details">
      <img src={diningHall.picture} alt={diningHall.locationName} />
      <Link to={`/dininghall/${diningHall.locationName}`}>
        {diningHall.locationName}
      </Link>
      <p>
        <strong>Rating: </strong>
        {"★".repeat(diningHall.stars)}
      </p>
      <p>Number of Reviews: {diningHall.numberOfReviews}</p>
      <p>
        <strong>Location: </strong>
        {diningHall.physicalLocation}
      </p>
      <br></br>
    </div>
  );
};

export default DiningDetails;
