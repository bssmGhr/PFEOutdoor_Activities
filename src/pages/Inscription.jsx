import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {Link} from "react-router-dom"
 function Inscription() {
    const [response,setResponse]=useState('')
    const api_url = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();
    async function validateSignup(e) {
        e.preventDefault()
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Custom validation
        if (!name || !email || !password) {
            alert("Veuillez remplir tous les champs.");
            return false;
        }
        try { 
            const response = await axios.post(`${api_url}/api/endpoint/users/signup`, 
                { name, email, password }); console.log('Réponse du serveur:', response.data);
                navigate('/connexion');
            } catch (error) { console.error('Erreur lors de l\'envoi des données:', error);

                setResponse("Utilisateur déjà enregistré, veuillez vous connecter.")
             }
          
    }
    function toggleForm() {

        console.log('ok')
      navigate('/connexion');
    }
    return (
        <div className="container" id="signup-container">
            <h2 className="text-center mb-4">Inscription</h2>
            <form id="signup-form" >
                <div className="mb-3">
                    <label htmlFor="signup-name" className="form-label">Nom&nbsp;:</label>
                    <input type="text" className="form-control" id="signup-name" name="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="signup-email" className="form-label">E-mail&nbsp;:</label>
                    <input type="email" className="form-control" id="signup-email" name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="signup-password" className="form-label">Mot de passe&nbsp;:</label>
                    <input type="password" className="form-control" id="signup-password" name="password" required minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}" />
                    <div className="invalid-feedback">
                        Le mot de passe doit comporter au moins 8 caractères, contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.
                    </div>


                </div>
                <button type="button" className="btn btn-success w-100"
                onClick={(e) => validateSignup(e)}
                
                >S'inscrire</button>
            </form>
         {response}
            <Link to="/connexion" className="d-block text-center mt-3">Vous avez déjà un compte ? Se connecter</Link>
            <Link to="/resetpassword" className="d-block text-center mt-3">Réinitialiser le mot de passe</Link>
                   
        </div>
    )
}

export default Inscription