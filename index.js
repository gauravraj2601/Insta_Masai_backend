const express= require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { postRouter } = require("./routes/post.routes")
const { auth } = require("./middleware/auth.middleware")


const app= express()
app.use(express.json())
app.use("/users",userRouter)
app.use("/posts",auth,postRouter)
app.get("/",(req,res)=>{
    res.send("Welcome to the InstaMasai")
})
app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log("Server is running on Port 8080")
    } catch (error) {
        console.log(error)
    }
})