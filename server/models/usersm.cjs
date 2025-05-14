// Extrait de ce à quoi pourrait ressembler server/models/usersm.cjs
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); // si vous hachez le mdp ici

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Le prénom est requis"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Le nom de famille est requis"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "L'email est requis"],
        unique: true, // L'email doit être unique
        lowercase: true,
        trim: true
    },
    username: { // <<<< CHAMP USERNAME AJOUTÉ/MODIFIÉ
        type: String,
        required: [true, "Le nom d'utilisateur est requis"],
        unique: true, // Le nom d'utilisateur doit être unique
        trim: true,
        minlength: [3, "Le nom d'utilisateur doit contenir au moins 3 caractères"]
        // Vous pouvez ajouter d'autres validateurs, comme un regex pour les caractères autorisés
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est requis"],
        minlength: 8 // La validation de la complexité est mieux gérée côté client ou dans un hook pre-save
    },
    age: {
        type: Number,
        required: [true, "L'âge est requis"],
        min: 1
    },
    niveau: {
        type: String,
        required: [true, "Le niveau est requis"],
        enum: ['etudiant', 'bac', 'bac+2', 'bac+3', 'bac+5', 'cadre', 'autre']
    }
    // ... autres champs comme createdAt, updatedAt, etc.
}, { timestamps: true }); // Ajoute createdAt et updatedAt automatiquement

// Hook pre-save pour hacher le mot de passe si vous le faites ici
// userSchema.pre('save', async function(next) { ... });

// Méthode pour comparer le mot de passe
// userSchema.methods.comparePassword = async function(candidatePassword) { ... };

const User = mongoose.model('User', userSchema);
module.exports = User; // ou { usersCollection: User } selon votre structure d'export
