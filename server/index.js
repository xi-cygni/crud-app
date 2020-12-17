require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// CRUD OPERATIONS 

app.get('/api/get', (req, res) => {

    const sqlInsert = "SELECT * FROM movie_reviews";

    db.query(sqlInsert, (err, result) => {
        if(!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });

});

app.post('/api/insert', (req, res) => {
    const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?,?)";

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if(!err) {
            console.log('The result: ', result);
        } else {
            console.log(err);
        }
    });

    db.query(sqlSendBack, (err, result) => {
        if(!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.delete('/api/delete/:movieName', (req, res) => {
    const sqlDelete = "DELETE FROM movie_reviews WHERE movie_name = ?";

    const movieName = req.params.movieName;

    db.query(sqlDelete, movieName, (err) => {
        if(!err) {
            console.log('The movie was sucessfully deleted');
        } else {
            console.log(err);
        }
    });
})

app.put('/api/update', (req, res) => {
    const sqlDelete = "UPDATE movie_reviews SET movie_review = ? WHERE movie_name = ?";

    const movieName = req.body.movieName;
    const updatedMovieReview = req.body.updatedMovieReview;

    db.query(sqlDelete, [updatedMovieReview, movieName], (err) => {
        if(!err) {
            console.log('The movie was sucessfully deleted');
        } else {
            console.log(err);
        }
    });
})

// SERVER 

app.listen(3001, () => {
    console.log('The CRUD app server is running on port 3001');
});