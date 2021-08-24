require("dotenv").config();
const jwt = require("jsonwebtoken");
const { fetchBlackListAccount } = require("../models/blacklist.model");

const authenticate = (req, res, next) => {
  let token = req.headers.authorization;
  if (typeof token !== "undefined") {
    let finalToken = token.split(" ")[1];
    jwt.verify(finalToken, process.env.SECRET_KEY, (error, user) => {
      if (!error) {
        // fetchBlackListAccount(req.connection, user.email, finalToken, (err, result) => {
        //   if (result != null && result.length > 0) {
        req.user = user;
        next();
        // } else {
        // res.send({ success: false, message: " " });
        //   }
        // });
      } else {
        res.send({ success: false, message: " " });
      }
    });
  } else {
    res.send({ success: false, message: "Unauthorized" });
  }
};

module.exports = authenticate;
