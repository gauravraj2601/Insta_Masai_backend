const mongoose= require("mongoose");

const postSchema=mongoose.Schema({
    title : String,
body : String,
device :String,
no_of_comments : Number
})

const Post_Model=mongoose.model("posts",postSchema)
module.exports={Post_Model}