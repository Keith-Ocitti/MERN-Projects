require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connect DB
const connectDB = require("./db/connectDB");

//import middleware
const errorMiddleware = require("./middleware/errorHandler");
const notFound = require("./middleware/NotFound");
const authenticationMiddleware = require("./middleware/authentication");

// import the routes
const productRoute = require("./routes/products");
const authRoute = require("./routes/auth");

// execute middleware
app.use(express.json());
app.use("/api/v1/updateProfile", authenticationMiddleware);
app.use("/api/v1/", authRoute);
app.use("/api/v1/", authenticationMiddleware, productRoute);
app.use(errorMiddleware);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log(`server is listening on port 5000.......`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
