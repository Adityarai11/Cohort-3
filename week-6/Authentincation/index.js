const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const JWT_SECRET = "adityaloves"
app.use(express.json());

const users = [];

app.post("/signUp",function(req,res){
    const username= req.body.username;
    const password = req.body.password;

    if(users.find(user=>user.username ===username && user.password === password)){
        res.json({
            message : "you are already sign up "
        })
    }else{
        users.push({
            username : username,
            password : password
        })
        res.json({
            message : "you are signed up"
        })
      
    }
    
    console.log(users);
});

app.post ("/signin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({//jwt
            username : username
        },JWT_SECRET);
        res.send({
            token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }

});

app.get("/me",(req,res) => {
    const token = req.headers.authorization;
    const decodedInformation = jwt.verify(token,JWT_SECRET);
    const username = decodedInformation.username;
    const user = users.find(user =>user.username == username);
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