const { MongoClient } = require('mongodb')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectionUrl = 'mongodb://mongodb:27017'
const dbName = 'admin'

let db
const app = express();
const port = 3004;

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    console.log('Conectado a la base de datos');

    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:3004:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

app.use(cors());
app.use(bodyParser.json());

app.get('/peliculas', async (req, res) => {
    try {
        const cantidad = parseInt(req.query.cantidad) || 15; 

        const coll = db.collection('Movies');

        const pipeline = [
            {
                $match: {
                    'poster': { $exists: true, $ne: null, $ne: '' },
                    'plot': { $exists: true, $ne: null, $ne: '' },
                    'genres': { $exists: true, $ne: [] },
                    'genres.0': { $ne: null } 
                }
            },
            { $sample: { size: cantidad } },
            {
                $project: {
                    'title': 1,
                    'poster': 1,
                    'plot': 1,
                    'genre': { $arrayElemAt: ['$genres', 0] },
                    '_id': 0
                }
            }
        ];

        const movies = await coll.aggregate(pipeline).toArray();

        res.status(200).json(movies);
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
});

app.get('/recomendaciones', async (req, res) => {
    try {
      const genre = req.query.genre;
  
      const coll = db.collection('Movies');
  
      const pipeline = [
        {
            $match: {
                'poster': { $exists: true, $ne: null, $ne: '' },
                'genres': genre
            }
        },
        { $sample: { size: 4 } },
        {
          $project: {
            title: 1,
            poster: 1,
            plot: 1,
            _id: 1,
            genre: { $arrayElemAt: ['$genres', 0] },
          },
        },
      ];
  
      const movies = await coll.aggregate(pipeline).toArray();
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error al obtener las películas:', error);
      res.status(500).json({ error: 'Error al obtener las películas' });
    }
  });