const express = require('express');
const connectDB = require('./config/connection');
const router = require('./routes/index');
const { User, Thought } = require('./models');

const PORT = 3001;
const app = express();

connectDB();

app.use(express.json());
app.use('/api/users', router);
app.use('/api/thoughts', router);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});

