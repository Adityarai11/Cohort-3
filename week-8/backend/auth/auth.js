const jwt  =require("jsonwebtoken");
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
function auth(req,res,next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_USER_PASSWORD);
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
    JWT_USER_PASSWORD 
}