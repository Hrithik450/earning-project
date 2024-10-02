require("dotenv").config();

const express = require("express");
const { connectDB } = require("./connection");
const CookieParser = require("cookie-parser");
const cors = require("cors");
const ErrorMiddleware = require("./middlewares/error");
const { v4: uuidv4 } = require("uuid");

const app = express();

connectDB("mongodb://127.0.0.1:27017/TicTacToe");

const options = {
  origin: "http://localhost:5173",
  credentials: true,
};

// Routes
const UserRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(CookieParser());
app.use(cors(options));

app.use("/api/user", UserRouter);
app.use("/payment", paymentRouter);
app.use(ErrorMiddleware);

app.listen(process.env.HOSTPORT, () =>
  console.log(`Server Started! at ${process.env.HOSTPORT}`)
);
