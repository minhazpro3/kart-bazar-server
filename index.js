const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./utils/dbConnect");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

dbConnection();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all("*", (req, res) => {
  res.send(" Route in not found");
});
app.listen(port, () => {
  console.log("HEY connected database", port);
});
