// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:/mernone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a MongoDB schema and model for your data
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Data = mongoose.model('Data', dataSchema);

// Define a route to add data to MongoDB
app.post('/addData', (req, res) => {
  const { name, email } = req.body;
  const newData = new Data({ name, email });

  newData.save()
    .then(() => res.json('Data added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
