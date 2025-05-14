const { JWT_SECRET, database1 } = require("../config/db.cjs");
const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { usersCollection } = require("../models/usersm.cjs");

const User = usersCollection;
const userController = require('../controllers/usersc.cjs');

//Creer

router.post("/users", userController.userspost);
//Lire

router.get("/users", userController.usersget);

//Mise a jour

router.put("/users/:id", userController.usersputid);

//Supprimer

router.delete("/users/:id", userController.usersdeleteid);

// Login route
router.post("/login",userController.userlogin);


// Sign up route
router.post("/signup",userController.signupuser );

const { ObjectId } = require("mongodb");
// Update user profile route
router.put("/profile", userController.authenticateToken, userController.profileuser);

router.put("/resetpassword", userController.resetuserpassword);




module.exports = router;
