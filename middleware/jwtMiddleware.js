const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  console.log("inside the jwt middleware");
  console.log(req.headers);
  
  console.log(req.headers.authorization.slice(7));

  const token = req.headers.authorization.slice(7);
  if (token) {
    console.log("token");
  } else {
    console.log("no-token");
  }
  console.log(token);

  try {
    const jwtVerification = jwt.verify(token, process.env.jwtkey);
    console.log(jwtVerification.userMail);  
   // Extract needed info
  const userdata = {
    userMail: jwtVerification.userMail,
    role: jwtVerification.role
  };

  console.log('JWT payload:', userdata);

  // Attach to request for later use
  req.payload = userdata;
  
  } catch (err) {
    res.status(401).json("authorization Error", err);
  }

  next();
};

module.exports = jwtMiddleware;
