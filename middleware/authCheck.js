const { USERS, secret } = require("../database/data.js");
const jwt = require("jsonwebtoken");

function authcheck(req, res, next) {
  const token = req.headers.token;
  if (!token) return res.status(403).send("User Not signedIn !!");

  const decoded = jwt.verify(token, secret);
  if (!decoded) return res.status(401).send("unauthorized Access !!");

  const userExist = USERS.find(
    (el) => el.username === decoded.username && el.userId === decoded.userId,
  );
  if (!userExist) return res.status(401).send("unauthorized Access !!");

  req.body.username = decoded.username;
  req.body.userId = decoded.userId;
  next();
}

module.exports = {
  authCheck: authcheck,
};
