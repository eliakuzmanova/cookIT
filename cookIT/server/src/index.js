const express = require('express');
const bodyParser = require('body-parser');
const router = require("./routes.js");
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use("/uploads", express.static("uploads"))

app.use(router)

mongoose.set({"strictQuery": false})
mongoose.connect("mongodb://127.0.0.1:27017/cookIT")

app.listen(5750, console.log("Server is listening on port 5750..."))
