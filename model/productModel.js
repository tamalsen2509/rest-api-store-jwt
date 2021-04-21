

let mongoose = require('mongoose');
let genId = require('node-uuid-generator')

let productSchema = new  mongoose.Schema({

    productId :{
        type : String,
        default : genId.generate()
    },
    name : {
        type : String,
        required : [true, 'Product name is required']
    },
     price : {
        type : Number,
        required : [true, 'Product Price is required']
    }

},
{
    timeStamp : true,
    toJSON : {
        transform :(doc,ret)=> {
            delete ret._id,
            delete ret.__v
        }
    }
})

module.exports = mongoose.model('Product', productSchema);