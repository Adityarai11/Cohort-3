const express =  require("express");
const app = express();
function LoggerMiddleware(req,res,next) {
    console.log(`Method is ${req.method}`);
    console.log(`Host is ${req.hostname}`);
    console.log(`url is ${req.url}`);
    console.log(new Date());    
    next();
}

app.use(LoggerMiddleware);
app.get("/sum", function(req, res) {
    console.log(req.name);
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});

app.listen(3000);