const express = require('express');
const cors = require('cors');
const path = require('path');
const IdeasRouter = require('./routes/ideas');
const connectDB = require('./config/db.js');
require('dotenv').config();

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname,'public')))

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({
    origin: ['http://localhost:5000','http://localhost:3000'],
    credentials: true
}))

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the RandomIdeas API'});
});

app.use('/api/ideas', IdeasRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
