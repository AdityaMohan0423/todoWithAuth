const jwt = require("jsonwebtoken");
const { USER } = require("../models/modes.js");

async function authcheck(req, res, next) {
  const token = req.headers.token;
  if (!token) return res.status(403).send("User Not signedIn !!");

  const decoded = jwt.verify(token, process.env.SECRET);
  if (!decoded) return res.status(401).send("unauthorized Access !!");

  const userExist = await USER.findOne({
    username: decoded.username,
    _id: decoded.userId,
  });
  if (!userExist) return res.status(401).send("unauthorized Access !!");

  req.body.username = decoded.username;
  req.body.userId = decoded.userId;
  next();
}

module.exports = {
  authCheck: authcheck,
};
