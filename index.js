const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const productRouter = require('./routes/products');
const categoryRouter = require('./routes/category');
// const cors = require('cors');
// app.use(cors);
// app.options('*', cors);
const port = 5000;
app.use(morgan("tiny"));
// Using .env variables
require("dotenv/config");
// Using middleware
const api = process.env.API_URL;
app.use(bodyParser.json());
app.use(`${api}/products`, productRouter);
app.use(`${api}/category`, categoryRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Connection is ready to use");
  })
  .catch((err) => {
    console.log("Connection failed:" + err);
  });

app.listen(port, () => {
  console.log(api);
  console.log(`Example app listening at http://localhost:${port}`);
});
