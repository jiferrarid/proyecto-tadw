import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

function App() {
  const [movies, setMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState(null);
  const [mostrarModal, setShowModal] = useState(false);  
  const [recomendaciones, setRecomendaciones] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3002/movies?cantidad=15')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los movies:', error);
      });

    const intervalId = setInterval(() => {
      axios.get('http://localhost:3003/recomendaciones')
        .then(response => {
          setRecomendaciones(response.data);
        })
        .catch(error => {});
    }, 5000); // 5 segundos

    return () => clearInterval(intervalId);
  }, []);

  const handleMovieClick = (movie) => {
    setMovieSelected(movie);
    setShowModal(true);
    axios.post('http://localhost:3001/historial', {movie});
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMovieSelected(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Películas</h1>
      <div className="grid grid-cols-5 gap-4">
        {movies.map((movie, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden" onClick={() => handleMovieClick(movie)}>
            {movie.poster && (
              <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover"/>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-bold text-center m-4">Recomendados</h1>
      <div className="grid grid-cols-4 gap-4 m-4">
        {recomendaciones.map((movie, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden" onClick={() => handleMovieClick(movie)}>
            {movie.poster && (
              <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover"/>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
      {mostrarModal && movieSelected && (
        <Modal movie={movieSelected} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
