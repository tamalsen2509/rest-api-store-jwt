

let User = require('../model/userModel');
let Product = require('../model/productModel');
let express = require('express');
let route = express.Router();
let jwt = require('jsonwebtoken');
require('dotenv').config();
let auth = require('../auth/jwtHelper')

//**routes are jwt proted and admin authentication protected */
// route to create new product
route.post('/create/:uuid', auth.isAuth ,async (req,res)=>{
    // uuid = user.userId
    let UUID = req.params.uuid;
    let name = req.body.name;
    let price = req.body.price;

    try {
        // uuid to check and find one user , so that the isadmin == true
        let user = await User.findOne({
            userId : UUID
        })
        let role = user.role;
        if (!user) {
            // if no user or invalid user id this conditional will execute
            return res.status(401).json({status : false, "Message": "User Record not found"})
        }
        else if (role ==='admin' || role === "ADMIN" ){
            // if status admin is true this portion of conditional will execute
            let product = await Product.create({
                name ,  price
            })
            await product.save()
            return res.status(201).json({status : true, Product: product})
        } else {
            return res.status(404).json({status : false, "Message": "User is not Authorised to create a product"})
        }
        
    } catch (error) {
        return res.status(400).json({status : false, error})
    }
})


// route to edit a product
route.put('/edit/:uuid/:produuid',auth.isAuth, async (req,res)=>{
   // uuid = user.userId
   // produuid = product.productId
    let name = req.body.name;
    let price = req.body.price;
    try {
        // uuid to check and find one user , so that the isadmin == true
        let user = await User.findOne({
            userId : req.params.uuid
        })
        let role = user.role;
        if (!user) {
            // if no user or invalid user id this conditional will execute
            return res.status(401).json({status : false, "Message": "User Record not found"})
        }
        else if (role ==='admin' || role === "ADMIN" ){
            // if status admin is true this portion of conditional will execute
            let product = await Product.findOneAndUpdate({ productId :req.params.produuid } , {name , price} , {new : true}).exec();
            return res.status(201).json({status : true, "message" : "Success" })
        } else {
            return res.status(404).json({status : false, "Message": "User is not Authorised to edit a product"})
        }
        
    } catch (error) {
        return res.status(400).json({status : false, error})
    }    
        
})


// route to delete a product
route.delete('/erase/:uuid/:produuid', auth.isAuth,async (req,res)=>{
   // uuid = user.userId
   // produuid = product.productId
    try {
        // uuid to check and find one user , so that the isadmin == true
        let user = await User.findOne({
            userId : req.params.uuid
        })
        let role = user.role;
        if (!user) {
            // if no user or invalid user id this conditional will execute
            return res.status(401).json({status : false, "Message": "User Record not found"})
        }
        else if (role ==='admin' || role === "ADMIN" ){
            // if status admin is true this portion of conditional will execute
            await Product.findOneAndDelete({ productId :req.params.produuid }).exec();
            return res.status(201).json({status : true, "message" : "Success" })
        } else {
            return res.status(404).json({status : false, "Message": "User is not Authorised to delete a product"})
        }        
    } catch (error) {
        return res.status(400).json({status : false, error})
    }    
        
})

/*below routes has access to all users including admin jwt protected*/



// route to get all products 
// all user has an access to this route with valid jwt
route.get('/all/:uuid' ,auth.isAuth , async(req,res)=>{
    // uuid = user.userId
    let UUID = req.params.uuid;
    try {
        let user = await User.findOne({userId : UUID});
        if (!user) {
            // if uuid , is invalid then this condition will execute
            return res.status(404).json({status : false, "Message": "User is not found"});
        } else {
            // if uuid found , then this condition will execute
            let products = await Product.find({}).exec();
            let total = products.length;
            return res.status(200).json({status : true,Total: total, "Products": products});
        }

    } catch (error) {
        return res.status(400).json({status : false, "Message": error});
    }
})

// route to get a  product by product id 
// all user has an access to this route with valid jwt
route.get('/one/:uuid/:productid' ,auth.isAuth , async(req,res)=>{
    // uuid = user.userId
   // produuid = product.productId
    let UUID = req.params.uuid;
    let PUUID = req.params.productid;
    try {
        let user = await User.findOne({userId : UUID});
        if (!user) {
            // if uuid , is invalid then this condition will execute
            return res.status(404).json({status : false, "Message": "User is not found"});
        } else {
            // if uuid found , then this condition will execute
            let product = await Product.findOne({productId : PUUID });
            return res.status(200).json({status : true, "Product": product});
        }

    } catch (error) {
        return res.status(400).json({status : false, "Message": error});
    }
})







module.exports=route;