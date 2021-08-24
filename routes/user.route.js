const express = require("express");
const {
  signupUser,
  getUser,
  editUser,
  deleteUser,
  harddeleteUser,
  verifyUser,
  signinUser,
  forgetpassword,
  resetPassword,
  changepassword,
  logout,
} = require("../controllers/user.controller");
const authenticate = require("../middlewares/authentication");
// const csrf = require("csurf");
// const csrfProtection = csrf({cookie: true});
const router = express.Router();
router.post("/signup", signupUser);
router.get("/getUser/:email", authenticate, getUser);
router.put("/editUser", authenticate, editUser);
router.put("/deleteUser", authenticate, deleteUser);
router.delete("/harddeleteUser", authenticate, harddeleteUser);
router.get("/verifyUser/:token", verifyUser);
router.post("/signin", signinUser);
router.post("/forgetpassword", forgetpassword);
router.put("/resetpassword", resetPassword);
router.put("/changepassword", authenticate, changepassword);
router.post("/logout", authenticate, logout);
router.get("/isAuthenticated", authenticate, (req, res) => {
  res.send({success: true, message: "Authenticated"});
});

module.exports = router;
