const bcrypt = require("bcrypt");
const express = require("express");
const{UserModel,TodoModel} = require("./db"); 
const {auth,JWT_SECRET}=require("./auth")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {z} = require("zod");

mongoose.connect("mongodb+srv://admin:DBf9SMSaZDdLzjta@cluster0.paqfq.mongodb.net/Todo-2-hashing");

const app = express();
app.use(express.json());

app.post("/signUp",async (req,res)=>{
    //input validation
    const requireBody = z.object({//define the schema in zod
        email:z.string().min(3).max(100).email(),
        password:z.string().min(3).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
        }), 
        name:z.string().min(3).max(100) 
    })

    //const parsedData = requireBody.parse(req.body);
    const parsedDatawithSuccess = requireBody.safeParse(req.body);

    if(!parsedDatawithSuccess.success){
        res.json({
            message:"incorrect format",
            error : parsedDatawithSuccess.error
        })
        return
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;


    const hashpassword = await bcrypt.hash(password,5);
    console.log(hashpassword)

    await UserModel.create({
        email : email,
        password : hashpassword,
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
        email: email
    });
    if(!response){
        res.status(403).json({
            message:"invalid user"
        })
    }
    const passwordMatch = await bcrypt.compare(password,response.password);

    if (passwordMatch){
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