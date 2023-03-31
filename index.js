const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./utils/dbConnect");
const userRoute = require("./routes/userRoute");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

dbConnection();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRoute);

app.all("*", (req, res) => {
  res.send(" Route in not found");
});
app.listen(port, () => {
  console.log("HEY connected database", port);
});
