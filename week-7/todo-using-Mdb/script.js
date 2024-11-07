const express = require("express");
const{UserModel,TodoModel} = require("./db"); 
const {auth,JWT_SECRET}=require("./auth")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:DBf9SMSaZDdLzjta@cluster0.paqfq.mongodb.net/Todo-1");

const app = express();
app.use(express.json());

app.post("/signUp",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    await UserModel.create({
        email : email,
        password : password,
        name : name
    });
    res.json({
        message : "You are logged in"
    });

});
app.post("/signin",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
        password: password
    });
    console.log(response);
    if (response){
        const token = jwt.sign({
            id : response._id.toString()
        },JWT_SECRET);
        res.json({
            token 
        })
    }else{
        res.status(403).json({
            message : "Invalid credentials"
        })
    }
});
app.post("/Todo",auth,async (req,res)=>{
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        title,
        done
    });

    res.json({
        userId : userId
    })
});
app.get("/Todos",auth,async (req,res)=>{
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    })
    res.json({
        todos
    })

});

app.listen(3000);