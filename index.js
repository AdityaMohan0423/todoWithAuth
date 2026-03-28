const express = require("express");
const { todoRoutes } = require("./routes/todos.routes.js");
const { signRoutes } = require("./routes/sign.routes.js");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/", todoRoutes);
app.use("/", signRoutes);

app.listen(PORT, () => {
  console.log("Server is listening at PORT:", PORT);
});
