const express = require('express');
const app = express();
const connectDB = require("./db");
require("dotenv").config();
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to Skill-A-Thon 1.0 !!!");
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})