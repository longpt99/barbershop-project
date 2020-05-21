require('dotenv').config();

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const routes = require('./routes/index');

app.use(routes)

app.use('/', (req, res) => {
  res.render('index')
})

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${process.env.PORT}`);
});