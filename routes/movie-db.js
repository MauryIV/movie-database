const movies = require('express').Router();
const { Pool } = require('pg');
const pool = new Pool( 
  {
    user: 'postgres',
    password: '4444',
    host: 'localhost',
    database: 'movie_db'
  },
  console.log("I see the MovieDB you're talking about")
)

pool.connect();

movies.get('/', (req, res) => {
  const getSql = 'SELECT movie_name AS "Movie", id AS "ID" FROM movies ORDER BY movies.movie_name'
  pool.query(getSql , function (err, {rows}) {
    if (err) {
      console.error(err);
    } else {
      res.json(rows);
    }
  });
});

movies.get('/movie-review', (req, res) => {
  const getSql = 'SELECT movies.movie_name AS "Movie", movies.id AS "Movie ID", reviews.movie_review AS "Review", reviews.id AS "Review ID" FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name'
  pool.query(getSql , function (err, {rows}) {
    if (err) {
      console.error(err);
    } else {
      res.json(rows);
    }
  });
});

movies.post('/add-movie', (req, res) => {
  const { movie_name } = req.body;
  if (movie_name) {
    pool.query('INSERT INTO movies (movie_name) VALUES ($1)', [movie_name], (err, {rows}) => {
      if (err) {
        console.error(err);
      } else {
        res.status(201).json({ message: 'Movie added:', movie: rows });
      }
    });
  } else {
    console.error('We require a movie title to be entered.')
  }
});

movies.post('/add-review', (req, res) => {
  const { movie_review } = req.body;
  if (movie_review) {
    pool.query('INSERT INTO reviews (movie_review) VALUES ($1)', [movie_review], (err, {rows}) => {
      if (err) {
        console.error(err);
      } else {
        res.status(201).json('Review added:', rows);
      }
    });
  } else {
    console.error('We require a review to have content.')
  }
});

movies.delete('/delete-movie/:id', (req, res) => {
  const deleteVar = req.params.id;
  pool.query('DELETE FROM movies WHERE id = $1', [deleteVar], (err, {rows}) => {
    if (err) {
      console.error('Unable to delete:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json('Success!', rows);
    }
  });
});

movies.delete('/delete-review/:id', (req, res) => {
  const deleteVar = req.params.id;
  pool.query('DELETE FROM reviews WHERE id = $1', [deleteVar], (err, {rows}) => {
    if (err) {
      console.error('Unable to delete:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json('Success!', rows);
    }
  });
});

module.exports = movies