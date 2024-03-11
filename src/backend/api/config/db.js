const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

function connectDB() {
  try {
    mongoose.connect(
      "mongodb://localhost:27017/yourDBName", 
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    )
    .then(() => {
      console.log("MongoDB Connection Succeeded.");
    })
    .catch((err) => {
      console.log("Error in DB connection: " + err);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

module.exports = connectDB;
