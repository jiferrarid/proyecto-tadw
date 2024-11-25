import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [nombres, setNombres] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3002/nombres')
      .then(response => {
        setNombres(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los nombres:', error);
      });
  }, []);

  const handleClick = (id) => {
    axios.post('http://localhost:3001/historial', { id })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error al enviar el ID:', error);
      });
  };
  
  const [recomendaciones, setRecomendaciones] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3003/recomendaciones')
      .then(response => {
        setRecomendaciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las recomendaciones:', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Películas</h1>
      <div className="grid grid-cols-5 gap-4">
        {nombres.map((nombre, index) => (
          <div key={index} className="bg-gray-200 rounded-lg h-40 flex items-center justify-center" onClick={() => handleClick(nombre)}>
            {nombre}
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-bold text-center m-4">Recomendados</h1>
      <div className="grid grid-cols-4 gap-4 m-4">
        {recomendaciones.map((nombre, index) => (
          <div key={index} className="bg-gray-200 rounded-lg h-40 flex items-center justify-center" onClick={() => handleClick(nombre)}>
            {nombre}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
