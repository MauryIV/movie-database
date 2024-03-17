DROP DATABASE IF EXISTS movie_db;
CREATE DATABASE movie_db;

\c movie_db;

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  movie_name VARCHAR(500)
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  movie_review TEXT NOT NULL,
  movie_id INTEGER UNIQUE,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE SET NULL
);