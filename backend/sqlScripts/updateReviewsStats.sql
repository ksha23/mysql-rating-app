UPDATE diningLocations
SET stars = COALESCE(
        (
            SELECT AVG(stars)
            FROM ratings
            WHERE diningLocation = locationName
        ),
        0
    ),
    numberOfReviews = COALESCE(
        (
            SELECT COUNT(*)
            FROM ratings
            WHERE diningLocation = locationName
        ),
        0
    );