USE madEats;
CREATE TABLE diningLocations (
    id integer PRIMARY KEY AUTO_INCREMENT,
    locationName VARCHAR(255) NOT NULL,
    picture VARCHAR(255),
    stars integer NOT NULL,
    numberOfReviews integer NOT NULL,
    physicalLocation VARCHAR(255)
);
INSERT INTO diningLocations (
        locationName,
        picture,
        stars,
        numberOfReviews,
        physicalLocation
    )
VALUES (
        'Carson\'s Market',
        'https://d9mfr5qxp4i37.cloudfront.net/wp-content/uploads/sites/132/2017/03/2013-07-16-carsons-24-1500x1000.jpg',
        0,
        0,
        '1515 Tripp Circle'
    ),
    (
        'Four Lakes Market',
        'https://d9mfr5qxp4i37.cloudfront.net/wp-content/uploads/sites/132/2019/06/2012-08-21-four-lakes-dining-stations-hubert-3-900x600.jpg',
        0,
        0,
        '640 Elm Dr.'
    ),
    (
        'Gordon Avenue Market',
        'https://d9mfr5qxp4i37.cloudfront.net/wp-content/uploads/sites/132/2019/06/2012-09-05-gordon-interiors-10-900x600.jpg',
        0,
        0,
        '770 W. Dayton St.'
    ),
    (
        'Liz\'s Market',
        'https://d9mfr5qxp4i37.cloudfront.net/wp-content/uploads/sites/132/2019/08/2016-11-03-lizs-market-1-1499x1000.jpg',
        0,
        0,
        '1200 Observatory Dr.'
    ),
    (
        'Lowell Market',
        'https://d9mfr5qxp4i37.cloudfront.net/wp-content/uploads/sites/132/2022/12/2022-09-28-lowell-interior-market-3-3000x2000.jpg',
        0,
        0,
        '610 Langdon St.'
    ),
    (
        'Rheta\'s Market',
        'https://d9mfr5qxp4i37.cloudfront.net/wp-content/uploads/sites/132/2023/02/2014-07-02-rhetas-market-28-3000x2000.jpg',
        0,
        0,
        '420 N. Park St.'
    );