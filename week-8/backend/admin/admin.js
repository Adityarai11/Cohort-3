const {Router} = require("express");

const adminRouter = Router();

const {adminModel} = require("../db/db");
adminRouter.post("/signup",async(req,res)=>{
    const requredBody =z.object({
        email:z.string().min(3).max(20).email(),
        password :z.string().min(8).max(30).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
        }), 
        name:z.string().min(3).max(100) 
    })

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


adminRouter.post("/signin",(req,res)=>{
});

adminRouter.post("/course",(req,res)=>{
});
adminRouter.put("/course",(req,res)=>{
});
adminRouter.get("/course/bulk",(req,res)=>{
});

module.exports ={
    adminRouter : adminRouter
}