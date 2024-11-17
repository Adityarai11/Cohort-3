const bcrypt = require("bcrypt");
const {Router} = require("express");
const userRouter = Router();
const {usersModel} = require("../db/db");
const {z} = require("zod");
const jwt = require("jsonwebtoken");
const {auth,JWT_USER_PASSWORD } = require("../auth/auth");


userRouter.post("/signup",async(req,res)=>{
    const requiredBody =z.object({
         email:z.string().min(3).max(50).email(),
        password :z.string().min(8).max(30).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/), 
        firstName:z.string().min(3).max(100), 
        lastName:z.string().min(3).max(100) 
    })

    const validation = requiredBody.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            message: "Invalid input data",
            errors: validation.error.errors,
        });
    }
    
    const {email,password,firstName,lastName} = req.body;

    try{
        const hashpassword = await bcrypt.hash(password,5);
    
    await usersModel.create({
        email,
        password : hashpassword,
        firstName,
        lastName
    })
    res.json({message : " you are signUp"})
    }catch(e){
        return res.json({
            message : " invalid login"
        });
    }
   
        
});

   
userRouter.post("/signin",async(req,res)=>{
    const {email,password,firstName,lastName} = req.body;

    const response = await usersModel.findOne({
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
        },JWT_USER_PASSWORD );
        res.json({
            token 
        })
    }else{
        res.status(403).json({
            message : "Invalid credentials"
        })
    }
});


userRouter.get("/purchases",(req,res)=>{    
    const {email,password,firstName,lastName} =req.body;
});
    


module.exports ={
    userRouter :userRouter
}