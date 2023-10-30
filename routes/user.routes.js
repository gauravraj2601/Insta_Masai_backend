const express= require("express")
const jwt= require("jsonwebtoken")
const bcrypt= require("bcrypt");
const { UserModel } = require("../model/user.model");
const { auth } = require("../middleware/auth.middleware");
const { BlackListModel } = require("../model/blacklist.model");



const userRouter= express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,pass,age,city,is_married}=req.body;
    const user= await UserModel.findOne({email:email})
    try {
        if(user){
          return  res.status(400).send({"msg":"Already User Please Login"})
        }
        else{
            bcrypt.hash(pass, 5, async(err, hash)=> {
                // Store hash in your password DB.
                const newUser= new UserModel({name,email,gender,pass:hash,age,city,is_married});
                await newUser.save()
                res.status(200).send({"msg":"New User is register"})
            });
        }
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email, pass}= req.body;
    try {
        const user= await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass, user.pass,(err,result)=> {
                // result == true
                if(result){
                    let token= jwt.sign({email:user.email, userId:user._id},"masai")
                    res.status(200).send({"msg":"Login Successful","token":token})
                }
            });
        }
        else{
            res.status(200).send({"msg":"Wrong Credential"})
        }
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})

userRouter.get("/logout",auth,async(req,res)=>{
    try {
        const token= req?.header?.authorization.split(" ")[1]
        const blacklistT=new BlackListModel({token})
        await blacklistT.save();
        return res.status(200).send({"msg":"Logout"})
    } catch (error) {
        return res.status(400).send({"error":error.message})
    }
})

module.exports={userRouter}