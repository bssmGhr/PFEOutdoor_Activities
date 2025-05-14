import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [formError, setFormError] = useState('');
    const [serverResponseMessage, setServerResponseMessage] = useState('');
    const api_url = import.meta.env.VITE_BACKEND_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setFormError('');
        setServerResponseMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setServerResponseMessage('');

        const { name, email, message } = formData;
        if (!name || !email || !message) {
            setFormError('Veuillez remplir tous les champs obligatoires (Nom, E-mail, Message).');
            return;
        }

        try {
            // L'endpoint backend sera quelque chose comme /api/contact/submit
            const response = await axios.post(`${api_url}/api/contact/submit`, formData);
            setServerResponseMessage(response.data.message || 'Message envoyé avec succès !');
            setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setServerResponseMessage(error.response.data.message);
            } else {
                setServerResponseMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.');
            }
        }
    };

    return (
        <section className="contact py-5">
            <div className="container">
                <h2 className="text-center mb-4">Contactez-nous</h2>
                <p className="text-center">Adresse&nbsp;: Rue Ebn Jazzar Habira</p>
                <p className="text-center">Téléphone&nbsp;: +21620814347</p>
                <p className="text-center">E-mail&nbsp;: info@outdooractivities.com</p>

                {/* Google Map Embed */}
                <div className="map-container mt-4 mb-5"> {/* Ajout de marges autour de la carte */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.1234567890123!2d11.0445678!3d35.5001234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302134567890123%3A0x1234567890abcdef!2sRue%20Ebn%20Jazzar%2C%20Mahdia!5e0!3m2!1sen!2stn!4v1678886400000!5m2!1sen!2stn" // REMPLACER CETTE URL PAR L'URL D'INTEGRATION DE VOTRE ADRESSE EXACTE
                        width="100%" // La carte prendra toute la largeur du conteneur
                        height="450" // Hauteur fixe en pixels
                        style={{ border: 0 }} // Supprime la bordure par défaut de l'iframe
                        allowFullScreen="" // Permet le mode plein écran
                        loading="lazy" // Charge la carte de manière différée pour améliorer les performances
                        referrerPolicy="no-referrer-when-downgrade" // Politique de référent
                        title="Localisation de [Outdoor Activities] sur Google Maps" // Titre pour l'accessibilité
                    ></iframe>
                </div>

                <h3 className="text-center mt-5 mb-3">Envoyez-nous un message</h3>
                {formError && <div className="alert alert-danger">{formError}</div>}
                {serverResponseMessage && (
                    <div className={`alert ${serverResponseMessage.includes("succès") || serverResponseMessage.includes("successfully") ? "alert-success" : "alert-warning"} `}>
                        {serverResponseMessage}
                    </div>
                )}
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nom&nbsp;:</label>
                        <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail&nbsp;:</label>
                        <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Numéro de téléphone&nbsp;:</label>
                        <input type="tel" id="phone" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message&nbsp;:</label>
                        <textarea id="message" name="message" rows="5" className="form-control" value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Envoyer</button>
                </form>
            </div>
        </section>
    )
}

export default Contact