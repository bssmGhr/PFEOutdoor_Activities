import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {Link} from "react-router-dom"

 function Inscription() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        niveau: '' // e.g., 'bac', 'cadre', 'etudiant', etc.
    });
    const [serverResponseMessage, setServerResponseMessage] = useState('');
    const [formError, setFormError] = useState('');
    const api_url = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Clear errors when user starts typing
        setFormError('');
        setServerResponseMessage('');
    };

    async function validateSignup(e) {
        e.preventDefault()
        setFormError('');
        setServerResponseMessage('');

        const { firstName, lastName, email, password, confirmPassword, age, niveau } = formData;

        // Custom validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !age || !niveau) {
            setFormError("Veuillez remplir tous les champs.");
            return;
        }

        if (password !== confirmPassword) {
            setFormError("Les mots de passe ne correspondent pas.");
            return;
        }

        if (isNaN(parseInt(age)) || parseInt(age) <= 0) {
            setFormError("Veuillez entrer un âge valide.");
            return;
        }

        try { 
            // Note: The backend should expect firstName and lastName
            const response = await axios.post(`${api_url}/api/endpoint/users/signup`, { 
                firstName, 
                lastName, 
                email, 
                password,
                age: parseInt(age), // Ensure age is sent as a number
                niveau
            });
            console.log('Réponse du serveur:', response.data);
            // Optionally, you can set a success message before navigating
            // setServerResponseMessage("Inscription réussie ! Redirection...");
                navigate('/connexion');
            } catch (error) { 
                console.error('Erreur lors de l\'envoi des données:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    setServerResponseMessage(error.response.data.message);
                } else {
                    setServerResponseMessage("Utilisateur déjà enregistré ou une erreur s'est produite. Veuillez réessayer.");
                }
             }
    }
    
    return (
        <div className="container" id="signup-container">
            <h2 className="text-center mb-4">Inscription</h2>
            <form id="signup-form" onSubmit={validateSignup}>
                <div className="mb-3">
                    <label htmlFor="signup-firstName" className="form-label">Prénom&nbsp;:</label>
                    <input type="text" className="form-control" id="signup-firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="signup-lastName" className="form-label">Nom de famille&nbsp;:</label>
                    <input type="text" className="form-control" id="signup-lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="signup-email" className="form-label">E-mail&nbsp;:</label>
                    <input type="email" className="form-control" id="signup-email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="signup-password" className="form-label">Mot de passe&nbsp;:</label>
                    <input type="password" className="form-control" id="signup-password" name="password" value={formData.password} onChange={handleChange} required minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}" />
                    <div className="invalid-feedback">
                        Le mot de passe doit comporter au moins 8 caractères, contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.
                    </div>


                </div>
                <div className="mb-3">
                    <label htmlFor="signup-confirmPassword" className="form-label">Confirmer le mot de passe&nbsp;:</label>
                    <input type="password" className="form-control" id="signup-confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required minLength="8" />
                </div>
                <div className="mb-3">
                    <label htmlFor="signup-age" className="form-label">Âge&nbsp;:</label>
                    <input type="number" className="form-control" id="signup-age" name="age" value={formData.age} onChange={handleChange} required min="1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="signup-niveau" className="form-label">Niveau&nbsp;:</label>
                    <select className="form-select" id="signup-niveau" name="niveau" value={formData.niveau} onChange={handleChange} required>
                        <option value="">Sélectionner...</option>
                        <option value="etudiant">Étudiant</option>
                        <option value="bac">Niveau Bac</option>
                        <option value="bac+2">Bac+2</option>
                        <option value="bac+3">Bac+3 (Licence)</option>
                        <option value="bac+5">Bac+5 (Master)</option>
                        <option value="cadre">Cadre</option>
                        <option value="autre">Autre</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success w-100">S'inscrire</button>
            </form>
            {formError && <div className="alert alert-danger mt-3">{formError}</div>}
            {serverResponseMessage && (
                <div className={`alert ${serverResponseMessage.includes("réussie") ? "alert-success" : "alert-danger"} mt-3`}>
                    {serverResponseMessage}
                </div>
            )}
            <Link to="/connexion" className="d-block text-center mt-3">Vous avez déjà un compte ? Se connecter</Link>
            <Link to="/resetpassword" className="d-block text-center mt-3">Réinitialiser le mot de passe</Link>
                   
        </div>
    )
}

export default Inscription