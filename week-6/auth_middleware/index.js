const express = require('express');
const app = express();
const cors= require('cors')
const jwt =  require('jsonwebtoken');
const JWT_SECRET = "aaditya"
app.use(express.json())
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
const users = [];
app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(users.find(user=>user.username === username && user.password === password)){
        res.send({
            message : "User alredy exist"
        })
    }else{
        users.push({
            username : username,
            password : password
        })
        res.json({
            message : "You are sign up"
        })
    }

})
app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(user=>user.username === username && user.password === password)
    if(user){
        const token = jwt.sign({
            username :username
        },JWT_SECRET);
        res.json({
            token
        }) 
    }else{
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
})
function auth(req,res,next) {//middleware
    const token = req.headers.token;
    const decodedInformation = jwt.verify(token,JWT_SECRET);//jwt
    if(decodedInformation.username){
        req.username = decodedInformation.username;
        next();
    }else{
        res.json({
            message: "your are not logged in "
        })
    }
}

app.get("/me",auth, (req, res)=>{
    const user = users.find(user =>user.username === req.username);
    if(user){
        res.send({
            username:user.username,
            password: user.password
        })
    }else{
        res.status(401).send({
            message: "Unauthorized"
        })

    }
})


app.listen(3000);