const { JWT_SECRET, database1 } = require("../config/db.cjs");
const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Assurez-vous que le chemin vers votre modèle User est correct
const User = require("../models/usersm.cjs"); // Modifié pour importer directement User

const userspost = async (req, res) => {
    try {
        const user = new User(req.body);
        // Le hachage du mot de passe devrait se faire ici ou dans un hook pre-save du modèle
        // Si ce n'est pas dans le modèle, décommentez et ajustez :
        // if (user.isModified('password')) {
        //     user.password = await bcrypt.hash(user.password, 10);
        // }
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(' ') });
        }
        if (error.code === 11000) { // Erreur de duplicata MongoDB
            return res.status(400).json({ message: "L'email ou le nom d'utilisateur est déjà utilisé." });
        }
        res.status(400).send(error);
    }
}
const usersget = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

const usersputid = async (req, res) => {
    try {
        // Si le mot de passe est mis à jour, il faut le hacher
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).send({ message: "Utilisateur non trouvé." });
        }
        res.status(200).send(user);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(' ') });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: "L'email ou le nom d'utilisateur est déjà utilisé." });
        }
        res.status(400).send(error);
    }
}

const usersdeleteid = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); // Corrigé findByldAndDelete en findByIdAndDelete
        if (!user) { // Corrigé luser en user
            return res.status(404).send({ message: "Utilisateur non trouvé." });
        }
        res.status(200).send({ message: "Utilisateur supprimé avec succès.", user });
    } catch (error) {
        res.status(500).send(error);
    }
}

const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Veuillez fournir l'email et le mot de passe." });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe invalide." }); // Message générique pour la sécurité
        }

        // Assurez-vous que votre modèle User a une méthode comparePassword
        // ou comparez les mots de passe hachés directement ici.
        // Si la méthode comparePassword n'est pas définie dans le modèle, vous devez le faire ici :
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe invalide." }); // Message générique
        }
        
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { // Ajout de l'email au payload pour plus d'infos si besoin
            expiresIn: "2h", // Durée de validité du token
        });
        res.status(200).json({ message: "Connexion réussie.", token, userId: user._id, username: user.username });
    } catch (error) {
        console.error("Erreur de connexion:", error);
        res.status(500).json({ message: "Erreur lors de la connexion.", error: error.message });
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Format "Bearer TOKEN"
    
    if (!token) {
        return res.status(401).json({ message: "Accès non autorisé. Token manquant." });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => { // 'decoded' contient le payload du token (ex: { userId: '...' })
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: "Token expiré." });
            }
            return res.status(403).json({ message: "Token invalide." });
        }
        req.user = decoded; // Stocke les informations de l'utilisateur décodées dans req.user
        next();
    });
}

const signupuser = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, age, niveau } = req.body;

        // Validation basique des champs requis (Mongoose s'en chargera aussi, mais c'est une bonne première vérification)
        if (!firstName || !lastName || !email || !username || !password || !age || !niveau) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
        }

        // Vérifier si l'email ou le nom d'utilisateur existe déjà
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(409).json({ message: "Un utilisateur avec cet email existe déjà." }); // 409 Conflict
            }
            if (existingUser.username === username) {
                return res.status(409).json({ message: "Ce nom d'utilisateur est déjà pris." }); // 409 Conflict
            }
        }

        // Hachage du mot de passe avant de sauvegarder
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            age,
            niveau
        });
        
        const savedUser = await newUser.save();

        // Créer un token JWT pour l'utilisateur nouvellement inscrit (connexion automatique optionnelle)
        const token = jwt.sign({ userId: savedUser._id, email: savedUser.email }, JWT_SECRET, {
            expiresIn: "2h",
        });

        res.status(201).json({
            message: "Utilisateur créé avec succès.",
            userId: savedUser._id,
            username: savedUser.username,
            token: token // Optionnel: renvoyer un token pour connecter l'utilisateur directement
        });

    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        if (error.name === 'ValidationError') {
            // Extrait les messages d'erreur de Mongoose pour une réponse plus claire
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(' ') });
        }
        // Gère les erreurs de duplicata de MongoDB (si la vérification précédente a échoué pour une raison quelconque)
        if (error.code === 11000) {
            // Déterminer quel champ a causé l'erreur de duplicata
            let field = Object.keys(error.keyValue)[0];
            field = field === 'email' ? 'L\'email' : 'Le nom d\'utilisateur';
            return res.status(409).json({ message: `${field} est déjà utilisé.` }); // 409 Conflict
        }
        res.status(500).json({ message: "Erreur serveur lors de la création de l'utilisateur.", error: error.message });
    }
}

const profileuser = async (req, res) => {
    // req.user.userId devrait être disponible grâce au middleware authenticateToken
    const userId = req.user.userId; 
    const { firstName, lastName, email, username, oldPassword, newPassword, age, niveau } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Mise à jour des champs s'ils sont fournis
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (age) user.age = age;
        if (niveau) user.niveau = niveau;

        // Gestion de la mise à jour de l'email (vérifier l'unicité si modifié)
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email: email });
            if (existingEmail && existingEmail._id.toString() !== userId) {
                return res.status(409).json({ message: "Cet email est déjà utilisé par un autre compte." });
            }
            user.email = email;
        }

        // Gestion de la mise à jour du nom d'utilisateur (vérifier l'unicité si modifié)
        if (username && username !== user.username) {
            const existingUsername = await User.findOne({ username: username });
            if (existingUsername && existingUsername._id.toString() !== userId) {
                return res.status(409).json({ message: "Ce nom d'utilisateur est déjà pris." });
            }
            user.username = username;
        }
        
        // Gestion de la mise à jour du mot de passe
        if (newPassword) {
            if (!oldPassword) {
                return res.status(400).json({ message: "L'ancien mot de passe est requis pour changer le mot de passe." });
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Ancien mot de passe incorrect." });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        const updatedUser = await user.save();

        res.status(200).json({
            message: "Profil utilisateur mis à jour avec succès.",
            user: { // Renvoyer uniquement les informations non sensibles
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                username: updatedUser.username,
                age: updatedUser.age,
                niveau: updatedUser.niveau
            }
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(' ') });
        }
        if (error.code === 11000) {
            let field = Object.keys(error.keyValue)[0];
            field = field === 'email' ? 'L\'email' : 'Le nom d\'utilisateur';
            return res.status(409).json({ message: `${field} est déjà utilisé.` });
        }
        res.status(500).json({ message: "Erreur serveur lors de la mise à jour du profil.", error: error.message });
    }
}

const resetuserpassword = async (req, res) => {
    const { email, password: newPassword } = req.body; 
    
    if (!email || !newPassword) {
        return res.status(400).json({ message: "Veuillez fournir l'email et le nouveau mot de passe." });
    }
    
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            // Pour des raisons de sécurité, ne pas révéler si l'email existe ou non
            // Vous pouvez choisir de renvoyer un message générique même si l'utilisateur n'est pas trouvé
            // ou un message spécifique si vous préférez informer l'utilisateur.
            // Ici, on informe que l'utilisateur n'est pas trouvé.
            return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet email." });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        
        await user.save();
        
        res.status(200).json({
            message: "Mot de passe réinitialisé avec succès."
        });

    } catch (error) {
        console.error("Erreur lors de la réinitialisation du mot de passe:", error);
        if (error.name === 'ValidationError') { // Au cas où il y aurait des validateurs sur le mot de passe
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(' ') });
        }
        res.status(500).json({ message: "Erreur serveur lors de la réinitialisation du mot de passe.", error: error.message });
    }
}

module.exports = {
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
