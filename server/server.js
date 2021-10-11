const express = require('express');
const path = require('path');
const cors = require('cors');
const body_parser = require('body-parser');

const app = express();

//cors define
app.use(cors());

// Init Middleware
// app.use(express.json());

app.use(body_parser.json());


// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/item', require('./routes/api/item'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
