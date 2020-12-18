import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieReviewsList, setMovieReviewsList] = useState([]);
  const [newMovieReview, setNewMovieReview] = useState('');

  useEffect(() => {

    Axios.get('http://localhost:3001/api/get')
      .then((response) => {
        setMovieReviewsList(response.data);
      })
    }, []);

    const submitReview = () => {
    
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: movieReview,
    });
    
    setMovieReviewsList([...movieReviewsList, {
      movie_name: movieName, 
      movie_review: movieReview
    }]);
  }

  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`);

    setMovieReviewsList(movieReviewsList
      .filter(movie => movie.movie_name !== movieName)
    );
  }

  const updateReview = (movieName) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movieName, 
      updatedMovieReview: newMovieReview,
    });

    const index = movieReviewsList.findIndex(element => element.movie_name === movieName);

    let newMovieReviewsList = [...movieReviewsList];

    newMovieReviewsList[index] = {...newMovieReviewsList[index], movie_review: newMovieReview}

    setMovieReviewsList(newMovieReviewsList);
  }

  return (
    <div className='App'>
      <h1>⭐ Movie reviews ⭐</h1>
      <h4>CRUD demo application</h4>
      <div className='form'>

        <label>Movie name:</label>

        <input 
          className='formInput'
          type='text' 
          name='movieName' 
          onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />

        <label>Review:</label>

        <input 
          className='formInput'
          type='text'  
          name='movieReview' 
          onChange={(e) => {
              setMovieReview(e.target.value);
            }}
          />

        <button onClick={submitReview}>Submit</button>

        <h2> 🖊 The reviews:</h2>

        {movieReviewsList.map((movie, index) => {
            return (
              <div key={index} className='card'>
                <h3>{movie.movie_name} </h3>
                <p>{movie.movie_review}</p>
                <button onClick={() => deleteReview(movie.movie_name)}>Delete</button>
                <input 
                  type='text' 
                  className='updateInput'
                  name='newMovieReview' 
                  onChange={(e) => {
                    setNewMovieReview(e.target.value);
                  }}/>
                <button onClick={() => updateReview(movie.movie_name)}>Update</button>
              </div>
            );
        })}

      </div>  
    </div>
  );
}

export default App;
