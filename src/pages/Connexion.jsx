import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
function Connexion({ onLogin }) {
    const api_url = import.meta.env.VITE_BACKEND_URL
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response,setResponse]=useState('');
    const navigate=useNavigate()

    async function validateLogin(e) {
        e.preventDefault();

        // Custom validation
        if (!email || !password) {
            alert("Veuillez remplir tous les champs.");
            return false;
        }
        console.log(email, password);
        try {
            const response = await axios.post(`${api_url}/api/endpoint/users/login`, { email, password });
            console.log('Réponse du serveur:', response.data);
            onLogin(response.data.user);
            navigate('/')
        } catch (error) {
            console.log(error)
            //console.error('Erreur lors de l\'envoi des données:', error);
            //setResponse('Nom d\'utilisateur ou mot de passe incorrect ou compte non existant')
        }
    }

    return (
        <div className="container" id="login-container">
            <h2 className="text-center mb-4">Connexion</h2>
            <form id="login-form" onSubmit={validateLogin}>
                <div className="mb-3">
                    <label htmlFor="login-email" className="form-label">E-mail&nbsp;:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="login-email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="login-password" className="form-label">Mot de passe&nbsp;:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="login-password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                    />
                    <div className="invalid-feedback">
                        Le mot de passe doit comporter au moins 8 caractères, contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Se connecter</button>
            </form>
            <div>{response}</div>
            <Link to="/inscription" className="d-block text-center mt-3">Vous n'avez pas de compte ? S'inscrire</Link>
            <Link to="/resetpassword" className="d-block text-center mt-3">Réinitialiser le mot de passe</Link>
        </div>
    );
}

export default Connexion;
