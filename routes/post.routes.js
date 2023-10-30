const express= require("express");
const { Post_Model } = require("../model/post.model");



const postRouter= express.Router();

postRouter.post("/add",async(req,res)=>{
    try {
        const {title, body, device,no_of_comments}= req.body;
        const newpost= new Post_Model({
            title,
            body,
            device,
            no_of_comments,
            userId:req.body.userId

        })
        await newpost.save();
        res.status(200).send({"msg":"New Post added","Post":newpost})
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})

postRouter.get("/",async(req,res)=>{
    try {
        let post= await Post_Model.find()
        res.status(200).send({post})
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})

postRouter.patch("/update/:id", async(req,res)=>{
    try {
        const {title, body, device,no_of_comments,userId}= req.body;
        const {id}=req.params.id
        let updatePost= await Post_Model.findById(id)
        if(!updatePost){
            throw new Error("Post not found")
        }
        if(updatePost.userId!==userId){
            res.status(400).send({"msg":"Not Authorized"})

        }
        await Post_Model.findByIdAndUpdate(req.params.id,{title, body, device,no_of_comments})
        res.status(200).send({"msg":"Post has been Updated"})
    } catch (error) {
        res.status(400).send({"error":error.message})

    }
})

postRouter.delete("/delete/:id", async(req,res)=>{
    try {
        const {id}=req.params.id
        let deletedPost= await Post_Model.findById(id)
        if(!deletedPost){
            throw new Error("Post not found")
        }
        if(deletedPost.userId!==userId){
            res.status(400).send({"msg":"Not Authorized"})

        }
        await Post_Model.findByIdAndUpdate(req.params.id)
        res.status(200).send({"msg":"Post has been Deleted"})
    } catch (error) {
        res.status(400).send({"error":error.message})

    }
})
module.exports={postRouter}