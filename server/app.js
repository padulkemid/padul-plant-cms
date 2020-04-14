const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routers/index');

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

// Essentials
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, function () {
  //
});
