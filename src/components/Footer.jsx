import React from 'react'
import { Link } from "react-router-dom"
function Footer() {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p>&copy; 2024 [Outdoor Activities]. Tous droits réservés.</p>
                    </div>
                    <div className="col-md-6">
                        <Link to="/privacypolicy">Politique de confidentialité</Link>
                    </div>
                    <div className="col-md-6">
                        <Link to="/termsofservice">Conditions d'utilisation</Link>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="https://facebook.com" className="text-white">Facebook</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://instagram.com" className="text-white">Instagram</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://twitter.com" className="text-white">Twitter</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer