const { JWT_SECRET, database1 } = require("../config/db.cjs");
const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { usersCollection } = require("../models/usersm.cjs");

const User = usersCollection;

const userspost=async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}
const usersget=async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

const usersputid=async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

const usersdeleteid=async (req, res) => {
    try {
        const user = await User.findByldAndDelete(req.params.id);
        if (luser) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const userlogin= async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find the user
        const user = await usersCollection.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // Compare passwords
      const match = await user.comparePassword(password); 
      console.log(match)
        if (!match) { 
            return res.status(400).json({ message: "Invalid email or password." });
        }
        

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "2h",
        });
        res.status(200).json({ message: "Login successful.", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in.", error });
    }
}
// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const token =
        req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
    console.log(token);
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

const signupuser=async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword=password;

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Create a new user instance
         const newUser = new User({ username: name, email, password: hashedPassword, });
          // Save the new user to the database 
          const result = await newUser.save();

        res
            .status(201)
            .json({ message: "User created.", userId: result.insertedId });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating user.", error });
    }
}
const profileuser=async (req, res) => {
    const { name, email, oldPassword, newPassword, userId } = req.body; // Assuming the request may include one or more of these fields

    try {
        const user = await usersCollection.findOne({
            _id: ObjectId.createFromHexString(userId),
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If newPassword is provided, verify old password before updating
        if (newPassword) {
            if (oldPassword !== user.password) {
                return res.status(401).json({ message: "Invalid old password" });
            }
        }

        // Construct the update query based on the fields provided in the request
        let updateQuery = {};
        if (name) {
            updateQuery.name = name;
        }
        if (email) {
            updateQuery.email = email;
        }
        if (newPassword) {
            updateQuery.password = newPassword;
        }

        // Update the user's profile based on the provided fields
        const result = await usersCollection.findOneAndUpdate(
            { _id: ObjectId.createFromHexString(userId) },
            { $set: updateQuery },
            { returnOriginal: false }
        );

        if (result) {
            res.status(200).json({
                message: "User profile updated successfully",
                user: result,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error updating user profile", error: error.message });
    }
}

const resetuserpassword=async (req, res) => {
    const { email, password } = req.body; // Assuming the request may include one or more of these fields
    const newPassword=password;
    console.log('ok')
    
    
    try {
        
        const user = await usersCollection.findOne({
            email:email
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        

        // Construct the update query based on the fields provided in the request
        let updateQuery = {};
        
        
        if (newPassword) {
            updateQuery.password = newPassword;
        }

        // Update the user's profile based on the provided fields
        console.log(user);
        Object.assign(user, updateQuery);
        const result = await user.save();
        if (result) {
            res.status(200).json({
                message: "User profile updated successfully",
                user: result,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res
            .status(200)
            .json({ message: "Error updating user password", error: error.message });
    }
}
module.exports={
    userspost,
    usersget,
    usersputid,
    usersdeleteid,
    userlogin,
    authenticateToken,
    signupuser,
    profileuser,
    resetuserpassword
}