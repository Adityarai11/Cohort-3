const jwt  =require("jsonwebtoken");
const JWT_SECRET = "asdfghjklkm";
function auth(req,res,next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_SECRET);
    if(decodedData){
        req.userId =decodedData.Id;
        next();
    }else{
        res.status(403).json({
            message:"Invalid caridentials"
        })
    }   
};

module.exports = {
    auth,
    JWT_SECRET
}