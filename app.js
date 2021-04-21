let express = require('express');
let app = express();
let db = require('./db/connection')
let cors = require('cors');

// middleware for receiving input from user
app.use(express.json());
app.use(express.urlencoded({extended : false}))

// db connection function 
db.connect();

// enabling cors
app.use(cors({
    optionsSuccessStatus : 200,
    origin : "*",
    methods : ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
}))


// routes folder 
// folder contains separate files for user and product 

app.use('/api/v1/user', require('./routes/userRouts'));
app.use('/api/v1/product', require('./routes/productRoutes'));







module.exports=app;