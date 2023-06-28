const jwt = require("jsonwebtoken");


module.exports = (req,res,next) => {
    const token = req.get('Authorization').split(" ")[1];
    console.log(token,"header");
    
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        res.status(500).send({message:"Some problem in authentication"});
        return;
    }
  
    if(!decodedToken){
        res.status(400).send({message:"Invalid Token"});
        return ;
    }
    
    console.log(decodedToken);
    next();
  };