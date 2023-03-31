const mongoose = require("mongoose");

// database connection function
exports.dbConnection = () => {
  mongoose
    .connect(process.env.DB_Base_URL, {
      dbName: "kart-bazar",
    })
    .then((res) => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log("connection error:", error);
    });
};
