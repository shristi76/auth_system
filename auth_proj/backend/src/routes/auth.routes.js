const express=require('express');

const authRouter=express.Router();

const authcontroller=require("../controllers/auth.controller");
const authmiddleware = require('../middleware/auth.middleware');

//start writting api
/**
 * @rotes POST /api/auth/register
 * @description Register a mew user
 * @access Public
 */

authRouter.post("/register",authcontroller.registerusercontroller)

/**
 * @route POST/api/auth/login
 * @description login user with email and password
 * @access Public
 */

authRouter.post("/login",authcontroller.loginusercontroller)


/**
 * @route Get/api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.get("/logout",authcontroller.logoutusercontroller)

/**
 * @route Get/api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get('/get-me',authmiddleware.authUser, authcontroller.getmecontroller)
module.exports=authRouter;
