const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('¡Hola desde el servidor Express!');
});

app.post('/historial', (req, res) => {
    const { id } = req.body;
        if (!id) {
        return res.status(400).json({ error: 'Falta el campo id en el cuerpo de la solicitud' });
    }
    console.log(`ID recibido: ${id}`);
    res.json({ message: `ID recibido: ${id}` });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});