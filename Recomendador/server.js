const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

app.use(cors());
app.use(bodyParser.json());

app.get('/recomendaciones', (req, res) => {
    const recomendaciones = ['PeliR1','PeliR2','PeliR3','PeliR4'];
    res.json(recomendaciones);
  });
  

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});