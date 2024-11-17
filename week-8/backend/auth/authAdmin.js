const jwt  =require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
function auth(req,res,next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_ADMIN_PASSWORD);
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
    JWT_ADMIN_PASSWORD
}