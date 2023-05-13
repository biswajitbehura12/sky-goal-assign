const  jwt =require("jsonwebtoken");
module.exports = function auth(req, res, next) {
//console.log(req)
  if(!req.headers["authorization"]){
    return res.status(401).json([{message: 'No token, authorization denied', type: 'error'}]);
  }
  const authHeader = req.headers["authorization"];

  const token = authHeader.split(" ")[1]
  if (token == null){
    return res.status(401).json([{message: 'No token, authorization denied', type: 'error'}]);
  }
  jwt.verify(token, "SkyGoal_api", (err, user) => {

    if (err) {
        res.status(401).json([{message: 'Token is not valid', type: 'error'}]);
    }
    req.user = user;
    next();
  });
}