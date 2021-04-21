

let mongoose = require('mongoose');
let idGen = require('node-uuid-generator');


let userSchema = new mongoose.Schema({
    userId : {
        type: String ,
        default:idGen.generate()
    },
    name : {
        type : String,
        required : [true ,  "Please add a valid name"]
    },
    email : {
        type : String,
        required : [true ,  "Please add a valid email"],
        unique : [true ,  "User already registered"],
    },
    password : {
        type : String ,
        required : [true ,  "Please add a valid password"],
        min : [8, 'Password length should be min 8']
    },
    role : {
        type : String,
        default: 'user'
    }
},
{
    timeStamp : true,
    toJSON : {
        transform :(doc,ret)=> {
            delete ret._id,
            delete ret.password,
            delete ret.__v
        }
    }
}


)


module.exports = mongoose.model('User',userSchema);