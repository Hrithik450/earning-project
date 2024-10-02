require("dotenv").config();

const express = require("express");
const { connectDB } = require("./connection");
const CookieParser = require("cookie-parser");
const cors = require("cors");
const ErrorMiddleware = require("./middlewares/error");
const { v4: uuidv4 } = require("uuid");

const app = express();

connectDB(process.env.MONGOURL);

const options = {
  origin: "https://earning-project-backend.onrender.com",
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
