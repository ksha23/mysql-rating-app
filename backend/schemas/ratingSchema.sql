CREATE DATABASE madEats;
USE madEats;
CREATE TABLE ratings (
  id integer PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  stars integer NOT NULL,
  review VARCHAR(500),
  diningLocation VARCHAR(255),
  created TIMESTAMP NOT NULL DEFAULT NOW()
);