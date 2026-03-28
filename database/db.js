const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoDB connected !!"))
  .catch((er) => console.log(er));
