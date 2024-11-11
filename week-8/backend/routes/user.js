const {Router} = require("express");
const userRouter = Router();

userRouter.post("/user/signup",async(req,res)=>{
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

   
userRouter.post("/user/signin",(req,res)=>{

});


userRouter.get("/user/purchases",(req,res)=>{    

});
    


module.exports ={
    userRouter :userRouter
}