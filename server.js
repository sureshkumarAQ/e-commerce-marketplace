const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectDB = require("./server/database/connection.js");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

// Log request
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// Parse request  to body parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

// Load routers
app.use("/api", require("./server/routes/router.js"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
