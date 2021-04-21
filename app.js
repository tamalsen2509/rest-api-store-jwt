let express = require('express');
let app = express();
let db = require('./db/connection')


// middleware for receiving input from user
app.use(express.json());
app.use(express.urlencoded({extended : false}))

// db connection function 
db.connect();



// routes folder 
// folder contains separate files for user and product 

app.use('/api/v1/user', require('./routes/userRouts'));
app.use('/api/v1/product', require('./routes/productRoutes'));







module.exports=app;