const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

app.get('/nombres', (req, res) => {
    const nombres = ['Peli1','Peli2','Peli3','Peli4','Peli5','Peli6','Peli7','Peli8','Peli9','Peli10','Peli11','Peli12','Peli13','Peli14','Peli15','Peli16','Peli17','Peli18','Peli19','Peli20',];
    res.json(nombres);
  });
  

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});