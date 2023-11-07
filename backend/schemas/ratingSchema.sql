CREATE DATABASE madEats;
USE madEats;
CREATE TABLE ratings (
  id integer PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  stars integer NOT NULL,
  review VARCHAR(255),
  diningLocation VARCHAR(255),
  created TIMESTAMP NOT NULL DEFAULT NOW()
);
INSERT INTO ratings (title, stars, review)
VALUES ('My First Review', 4, 'A review about something'),
  (
    'My Second Review',
    3,
    'A review about something else'
  );