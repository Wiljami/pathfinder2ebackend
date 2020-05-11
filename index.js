const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// Add a character
app.post('/api/character', function (req, res) {
  console.log('addCharacter')

  const { charName, charClass } = req.body;

  pool.query('INSERT INTO characters (charName, charClass) VALUES ($1, $2)', [charName, charClass], error => {
    if (error) {
      console.log(error)
    }
    res.status(201).json({ status: 'success', message: 'Character added.' })
  })
});

// Get all characters
app.get('/api/character', function (req, res) {
  console.log('getCharacters');
  pool.query('SELECT * FROM characters', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  })
});

// Get character by id
app
  .get('/api/character/:id', function (req, res) {
    console.log('getCharacter, id: ');
    res.send(req.params);
  })

// Hello server test
app
  .get('/hello', function (req, res) {
    console.log('/hello accessed');
    res.send('Hello world');
  })

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`);
})
