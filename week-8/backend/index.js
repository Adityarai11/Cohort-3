const express = require("express");
const app = express();
const {z} = require("zod");
const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./admin/admin")
const {db} = require("./db/db"); 

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",userRouter);
app.use("/api/v1/courese",courseRouter);


async function main(){
    await mongoose.connect("mongodb+srv://admin:DBf9SMSaZDdLzjta@cluster0.paqfq.mongodb.net/skillShare");
    app.listen(3000);
}

main();