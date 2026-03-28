let global_userId = 1;
let gloabal_todoId = 1;
const secret = "secrest123";

let USERS = [
  {
    username: "adi",
    userId: 1,
    password: 123,
  },
];
let TODOS = [];

module.exports = {
  USERS: USERS,
  TODOS: TODOS,
  gloabal_todoId: gloabal_todoId,
  global_userId: global_userId,
  secret: secret,
};
