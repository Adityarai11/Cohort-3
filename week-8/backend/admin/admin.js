const bcrypt = require("bcrypt");
const {Router} = require("express");
const adminRouter = Router();
const {adminModel, courseModel} = require("../db/db");
const {z} = require("zod");
const jwt = require("jsonwebtoken");
const {auth,JWT_ADMIN_PASSWORD} = require("../auth/authAdmin");

adminRouter.post("/signup",async(req,res)=>{

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
   
   await adminModel.create({
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

adminRouter.post("/signin",async(req,res)=>{
    const {email,password} = req.body;

    const admin = await adminModel.findOne({
        email: email
    });
    if(!admin){
        res.status(403).json({
            message:"invalid user"
        })
    }
    const passwordMatch = await bcrypt.compare(password,admin.password);

    if (passwordMatch){
        const token = jwt.sign({
            id : admin._id.toString()
        },JWT_ADMIN_PASSWORD );
        res.json({
            token 
        })
    }else{
        res.status(403).json({
            message : "Invalid credentials"
        })
    }
});

adminRouter.post("/course",auth,async(req,res)=>{
    const adminId =req.userId; 
    const{ title,description,price,imageUrl} = req.body;

    await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId : adminId
    })
    res.json({
        message:"Course created",
        courseId:course._id
    })
});
adminRouter.put("/course",(req,res)=>{
});
adminRouter.get("/course/bulk",(req,res)=>{
});

module.exports ={
    adminRouter : adminRouter
}