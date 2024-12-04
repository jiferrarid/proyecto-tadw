const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const amqp = require('amqplib');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const queue = "historial-recomendador";

let historial = [];

app.post('/historial', async (req, res) => {
    const movie=req.body.movie
    try{
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();
        await channel.assertQueue(queue,{durable:false});
        channel.sendToQueue(queue, Buffer.from(movie.genre));
        historial.push(movie.genre);
        await channel.close();
        await connection.close();
    }catch(error){
        console.error('No se pudo enviar a la cola.', error);
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:3004:${port}`);
});