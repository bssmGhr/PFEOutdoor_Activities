const { JWT_SECRET, client, database1 } = require("../config/db.cjs"); // Ensure correct path to your db.js file
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Mise à jour du modèle User avec les informations d'abonnement
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    subscriptionPlan: {
        type: mongoose.Schema.Types.ObjectId,
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },
});

// Collection des abonnements
const subscriptionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    planName: ["Basic Membership", "Standard Membership", "Premium Membership"],

    price: { type: Number, required: true },
});


// Pre-save hook to hash the password 
userSchema.pre('save', async function (next) { 
    if (this.isModified('password')) 
        { this.password = await bcrypt.hash(this.password, 10);

         } next(); });
         
// Method to compare passwords 
userSchema.methods.comparePassword = async function (candidatePassword) { 
    return await bcrypt.compare(candidatePassword, this.password); 
};
const User = mongoose.model("User", userSchema);
const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = {
    usersCollection: User,
    Subscription,
};