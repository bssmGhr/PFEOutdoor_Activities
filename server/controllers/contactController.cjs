// server/controllers/contactController.cjs
const ContactMessage = require('../models/contactMessageModel.cjs'); // Ajustez le chemin si nécessaire

const submitContactForm = async (req, res) => {
    console.log('arrivé')
    try {
        const { name, email, phone, message } = req.body;

        // Validation basique (Mongoose s'occupera aussi de la validation définie dans le schéma)
        if (!name || !email || !message) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
        }

        const newContactMessage = new ContactMessage({
            name,
            email,
            phone,
            message
        });

        await newContactMessage.save();

        res.status(201).json({ message: "Message envoyé avec succès ! Nous vous répondrons bientôt." });

    } catch (error) {
        console.error("Erreur lors de l'enregistrement du message de contact:", error);
        if (error.name === 'ValidationError') {
            // Extrait les messages d'erreur de Mongoose
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: "Erreur du serveur lors de l'envoi du message. Veuillez réessayer." });
    }
};

module.exports = {
    submitContactForm
};
