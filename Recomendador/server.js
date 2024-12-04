const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const amqp = require('amqplib');

const app = express();
const port = 3003;

const queue = "historial-recomendador";

app.use(cors());
app.use(bodyParser.json());

app.listen(port, async () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.get('/recomendaciones', async (req, res) => {
    try {
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });
        const msg = await channel.get(queue, { noAck: false });

        let movieGenre;
        if (msg) {
            movieGenre = msg.content.toString();
            channel.ack(msg);
        }

        await channel.close();
        await connection.close();
        if (movieGenre) {
            const response = await axios.get(`http://movies-service:3004/recomendaciones?genre=`+movieGenre);
            const recomendaciones = response.data;
            res.status(200).json(recomendaciones);
        } else {
            res.status(204);
        }
    } catch (error) {
        console.error('Error al obtener las películas a recomendar:', error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
});