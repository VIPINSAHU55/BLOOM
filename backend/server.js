const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");

// config dot env file
dotenv.config();

// database call
connectDb();

// rest object
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Bloom Personal Finance Management API');
});

// routes
// user route
app.use("/api/v1/users", require("./routes/userRoute"));

// transactions routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

const PORT = process.env.PORT || 8080;

// listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
