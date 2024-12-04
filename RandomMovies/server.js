const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

app.get('/movies', async (req, res) => {
    try {
        const cantidad = parseInt(req.query.cantidad) || 5; 
        
        const response = await axios.get(`http://movies-service:3004/peliculas?cantidad=${cantidad}`);

        const peliculas = response.data;

        res.status(200).json(peliculas);
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
});
  

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});