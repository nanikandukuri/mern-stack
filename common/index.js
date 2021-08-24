require("dotenv").config();
const nodemailer = require("nodemailer");
//const sendgridTrasport = require("nodemailer-sendgrid-transport");
// const transporter = nodemailer.createTransport(
//   sendgridTrasport({
//     auth: {
//       api_key: process.env.API_KEY,
//     },
//   }),
// );
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'knani.smart9@gmail.com',
    pass: 'nani@9618073566'
  }
})

const path = require("path");
const ejs = require("ejs");
const crypto = require("crypto");
const { updateUser } = require("../models/user.model");

const sendMail = (filename, req, res, subject, message) => {
  let template = path.resolve(__dirname, "../views/" + filename + ".ejs");
  crypto.randomBytes(32, (error, buffer) => {
    let token = buffer.toString("hex");
    const expiretoken = Date.now() + 3600 * 1000;
    ejs.renderFile(template, { name: req.body.name, token }, (err, data) => {
      let mailOptions = {
        from: "knani.smart9@gmail.com",
        to: req.body.email,
        subject,
        html: data,
      };
      if (err) {
        res.send("Mail not sent!");
      } else {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.send({ success: false, data: null, message: "Mail not sent!" });
          } else {
            updateUser(req.connection, { refreshtoken: token, expiretoken }, req.body.email, (err, users) => {
              if (users.affectedRows > 0) {
                res.send({ success: true, data: null, message });
              } else {
                res.send({ success: false, data: null, message: "Mail not sent!" });
              }
            });
          }
        });
      }
    });
  });
};

const commonResponse = ({ res, success = false, message = "", data = null, token, email, req }) => {
  if (success) {
    // if (req != undefined) {
    //   res.cookie("XSRF-TOKEN", req.csrfToken());
    // }
    res.send({ success, message, data, token, email });
  } else {
    res.send({ success, message, data });
  }
};

module.exports = {
  commonResponse,
  sendMail,
};
