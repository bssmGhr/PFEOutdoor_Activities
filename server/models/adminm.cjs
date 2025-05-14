const { JWT_SECRET, client, database1 } = require("../config/db"); // Ensure correct path to your db.js file
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
// Mise à jour du modèle Admin avec les informations d'abonnement
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },



});


const User = mongoose.model("Admin", userSchema);

module.exports = {
    adminsCollection: Admin,
    Subscription,
};