const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {z} = require("zod");
const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")

app.use("/api/v1/user",userRouter);
app.use("/api/v1/courese",courseRouter);


app.listen(3000);