
require('dotenv').config();
let mongoose = require('mongoose');


module.exports.connect= async (req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        } )
        console.log('db connected')
    } catch (e) {
        console.log(e);
    }
}