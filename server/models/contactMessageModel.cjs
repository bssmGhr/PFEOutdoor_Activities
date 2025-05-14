// server/models/contactMessageModel.cjs
const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom est requis."],
        trim: true
    },
    email: {
        type: String,
        required: [true, "L'e-mail est requis."],
        trim: true,
        lowercase: true,
        // Vous pouvez ajouter une validation de format d'email plus stricte ici si besoin
    },
    phone: {
        type: String,
        trim: true // Le téléphone est optionnel
    },
    message: {
        type: String,
        required: [true, "Le message est requis."],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

module.exports = ContactMessage;
