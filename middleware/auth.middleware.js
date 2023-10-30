const { BlackListModel } = require("../model/blacklist.model");
const jwt = require("jsonwebtoken")

const auth=async(req,res,next)=>{
    try {
        let token= req?.header?.authorization.split(" ")[1];
        if(!token){
            res.send({"msg":"Not authorized to access"})
        }
        const blacklistToken= await BlackListModel.findOne({token});
        if(blacklistToken){
            res.send({"msg":"Please Login Again"})
        }
        const verToken=await jwt.verify(token,"masai");
        if(!verToken){
            res.send({"msg":"Invalid token"})
        }
        req.body.userId= verToken.userId
        next()

    } catch (error) {
        console.log("Error auth",error.message)
    }
}

module.exports={auth}