const { MongoClient, ObjectId } = require('mongodb')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'Movies'

let db

MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
})

const app = express();
const port = 3004;

app.use(cors());
app.use(bodyParser.json());

const getPelis = () => {
    // hardcodeado: peliculas con "Toy" en el titulo
    const filter = {
        'title':{$regex: /Toy/}
    };
    const projection = {
        'title': 1, 
        '_id': 0
    };
    const coll = db.collection('Movies');
    const cursor = coll.find(filter, { projection });
    const result = cursor.toArray();
    return result;
}

app.get('/', (req, res) => {
    res.send(getPelis());
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});