require('dotenv').config();

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authMiddleware = require('./middlewares/authMiddleware');
const routes = require('./routes/index');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static('public'));
app.use(authMiddleware.validAuth);

app.get('/', (req, res) => {
  res.render('index');
});

app.use(routes);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${process.env.PORT}`);
});