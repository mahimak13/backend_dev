
import connectDB from "./db/index.js";
import {app} from "./app.js";
import dotenv from "dotenv";
dotenv.config({
    path:'./env'
})

connectDB() 
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("mongo db connection failed !!!",err);
})
























/*import express from "express"
const app=express()



(async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("error:",error);
        throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log(`app is listening on port ${process.env.PORT}`)
       })
    } catch (error) {
        console.error("ERROR :",error)
        throw err
    }
})()*/