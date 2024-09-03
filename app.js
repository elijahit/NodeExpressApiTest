const express = require('express');
const app = express();

const personeRoutes = require('./routes/persone');

app.use('/api/persone', personeRoutes);

app.listen(3000);