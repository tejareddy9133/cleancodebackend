const express = require("express");
// Require and configure dotenv at the top of your main file
require("dotenv").config();

const { connection } = require("./db/db");
const { UserRoute } = require("./routes/user.routes");
const { appRouter } = require("./routes/app.routes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", UserRoute);
app.use("/app", appRouter);
const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await connection;
    console.log("db is connected");
  } catch (error) {
    console.log(error.message);
  }
});
