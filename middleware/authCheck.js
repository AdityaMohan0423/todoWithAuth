const { USERS } = require("../database/data.js");

function authcheck(req, res, next) {
  const username = req.body.username;
  const user = USERS.find((el) => el.username === username);

  if (user) {
    req.body.username = user.username;
    req.body.userId = user.userId;
    return next();
  } else return res.status(400).send("No Entry!!!...");
}

module.exports = {
  authCheck: authcheck,
};
