const express = require("express");
const app = express();

const users = [{
    name: "john",
    kidneys: [{
        healthy: false
    }]
}];

app.use(express.json());

app.get("/",function(req,res){
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i = 0 ;i<johnKidneys.length;i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnHealthyKidneys =numberOfKidneys-numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnHealthyKidneys
    })
    
})

app.post("/",function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg : "Done"
    })
})

app.put("/",function (req,res) {
    if (oneUnhealthykidney()) {
        for(let i = 0 ;i<users[0].kidneys.length;i++){
            users[0].kidneys[i].healthy = true;
    
        }
        res.json({
    
        });
        
    }else{
        res.status(411).json({

        });
    }
})
app.delete("/",function (req,res) {
    if (oneUnhealthykidney()) {
        const newKidneys =[];
        for(let i = 0 ;i<users[0].kidneys.length;i++){
            if (users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy : true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg : "Done"
        });    
    }else{
        res.status(411).json({
            msg : "You have no bad kidney"
        })
    }
    
})
function oneUnhealthykidney(){
    let atleastoneUnhealthykidney = false;
    for(let i =0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atleastoneUnhealthykidney = true;
        }
    } 
    return atleastoneUnhealthykidney;
}

app.listen(3000);