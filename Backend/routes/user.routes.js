const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email format"),

    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  userController.registerUser
);



router.post('/login',[body("email")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")],
  userController.loginUser
);



router.get('/profile',authMiddleware.authUser ,userController.getUserProfile);
router.get("/logout",authMiddleware.authUser,userController.logoutUser)



module.exports = router;
