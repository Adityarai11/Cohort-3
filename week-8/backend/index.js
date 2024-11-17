require('dotenv').config();
const express = require("express");
const app = express();
const {z} = require("zod");
const mongoose =require("mongoose");

const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./admin/admin")
const {db} = require("./db/db"); 

app.use(express.json());
//routing
app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/courese",courseRouter);


async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    
}

main();