import React from 'react'
import imagesjfif from "../assets/images.jfif"
import { Link } from 'react-router-dom'
function Header({ isLoggedIn, username, onLogout }) {

    return (
        <header className="bg-dark text-white py-3">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/" className="d-flex align-items-center text-white text-decoration-none">
                        <img src={imagesjfif} alt="Logo Activités de Plein Air" width="40" height="40" />
                        <span className="ms-2">OutDoor Activities</span>
                    </Link>
                    <div className="d-flex">
                        <Link className="btn btn-outline-light me-2" to="plans">Plans</Link>
                        <Link className="btn btn-outline-light me-2" to="contact">Contact</Link>

                        {isLoggedIn ? (
                            <div className="dropdown">
                            <button className="btn btn-outline-light me-2 dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                 {username} </button>
                                 <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button className="dropdown-item" onClick={onLogout}>Déconnexion</button></li>
                                    </ul>
                                     </div> ) : ( <> 
                                     <Link className="btn btn-outline-light me-2" to="/connexion">Connexion</Link> 
                                     <Link className="btn btn-warning" to="/inscription">Créer compte*</Link> </> )}
                           </div>

                </div>
            </div>
        </header>
    )
}

export default Header;