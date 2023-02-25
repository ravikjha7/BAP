const express = require('express');
const app = express();
const connectDB = require("./db");
require("dotenv").config();
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/users');
const scholarshipRoutes = require('./routes/scholarships');
const adminRoutes = require('./routes/admins');
const applyScholarshipRoutes = require('./routes/applyScholarships');
const savesRoutes = require('./routes/saves');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use('/user', userRoutes);
app.use('/scholarship', scholarshipRoutes);
app.use('/admin', adminRoutes);
app.use('/apply/scholarship', applyScholarshipRoutes);
app.use('/save', savesRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to Skill-A-Thon 1.0 !!!");
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})