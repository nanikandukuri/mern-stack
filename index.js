require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const logger = require("morgan");
const connection = require("./database");
const cors = require("cors");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// logging
app.use(logger("dev"));
// use connection in app
app.use((req, res, next) => {
  req.connection = connection;
  next();
});

// cors
app.use(cors({ origin: "http://localhost:5500", credentials: true }));

app.use(cookieParser());

// routing
const routes = require("./routes");
app.use("/api", routes.user);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
