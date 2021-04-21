
let User = require('../model/userModel');
let express = require('express');
let route = express.Router();
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
require('dotenv').config();


// route to create new user
route.post('/create', async (req,res)=>{
    
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;

    try {
        let hashPass = await bcrypt.hash(password,11)

        let user = await User.create({
            name , email , password : hashPass , role
        })
        await user.save()
        res.status(201).json({status : true, user})
        
    } catch (error) {
        res.status(400).json({status : false, error})
    }
})

// route to generate new jwt 
route.get('/jwt/:uuid', async (req,res)=>{
    let UUID = req.params.uuid;

    try {
        let user = await User.findOne({userId : UUID });
        if (!user) {
            return res.status(400).json({status:false, "message" : "No User Found, please add valid UserId" })
        } else {
            jwt.sign({id :user.userId}, process.env.JWT_SECRET,{expiresIn : '10d'},(err, token)=>{
                if (err) {
                    return res.status(400).json({status:false, "message" : "Issue while generating token" , err })
                } 
                return res.status(200).json({status:true, "token" : token })
            } )
        }
    } catch (error) {
        return res.status(400).json({status:false, "message" : error })
    }
    
})







module.exports=route;