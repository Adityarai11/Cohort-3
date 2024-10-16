const express = require("express");
const app = express();



app.get("/sum/:a/:b",function(req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        ans: a+b
    })
})
app.use(function (req,res,next){
    req.a = parseInt(req.query.a);
    req.b = parseInt(req.query.b);
    next();
})
app.get("/multiply",function(req,res){
    res.json({
        ans: req.a*req.b
    })
})
app.get("/divide",function(req,res){
    res.json({
        ans: req.a/req.b
    })
})
app.get("/subtract",function(req,res){
    res.json({
        ans: req.a-req.b
    })
})
app.listen(3000);