const UserDetails = require("../models/UserDetails");
// const userDetails = require("../models/UserDetails");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");


exports.login = (req,res,next) =>{
    console.log(req.body);
    let email = req.body.emailAddress;
    let password = req.body.password;
    UserDetails.findOne({email:email})
    .then((user)=>{
        if(!user){
            res.status(301).send({message: "User not found"});
            return ;
        }
        if(password == user.password){
            console.log("password Matched");
            const token = jwt.sign({ email: email},process.env.ACCESS_TOKEN_SECRET);
            res
                .status(200)
                .send({message:"Login Successful",token:token , userName:user.fullName});
                return;
        }
        else{
            res.status(302).send({message:"Wrong Password"});
            return;
        }
    }).catch((err)=>{
        res.status(400).json({message:"Error occured"});
    });
};

exports.register = async (req,res,next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     res.status(422).send({ message: "Error occured at validation" });
    //     return;
    // }
    console.log(req.body);
    let fullName = req.body.fullName;
    let email = req.body.emailAddress;
    let password = req.body.password;
    console.log(fullName,email,password);
    await UserDetails.findOne({email:email}).then((user)=>{
        if(user)
        {
            res.status(300).send({message:"User already exists"});
            return ;
        } 
        const userDetails = new UserDetails({
            fullName:fullName,
            email:email,
            password:password
        });
        userDetails.save().then((user)=>{
            if(!user){
                console.log(err);
                res.status(400).send({message:"Error in signup"});
                return;
            }
            return res.status(201).send({message:"User successfully registered"});
        });
    });
};