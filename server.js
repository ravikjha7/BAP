const express = require('express');
const app = express();
const connectDB = require("./db");
require("dotenv").config();
const port = process.env.PORT || 3000;

connectDB();

app.get('/', (req, res) => {
    res.send("Welcome to Skill-A-Thon 1.0 !!!");
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})