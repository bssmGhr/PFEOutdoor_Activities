import React from 'react'

function Plans() {
    return (
        <section className="membership bg-light text-dark text-center py-5"> {/* Changé bg-primary text-white en bg-light text-dark pour un meilleur contraste si les plans sont dans des cartes */}
            <div className="container"> {/* Ajout d'un conteneur pour un meilleur alignement */}
                <h2 className="mb-5">Nos Formules d'Abonnement</h2>
                <div className="row justify-content-center g-4"> {/* Utilisation de row et col pour une meilleure disposition */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm"> {/* Utilisation de cartes Bootstrap */}
                            <div className="card-body">
                                <h3 className="card-title">Formule Découverte</h3>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>Accès à l'équipement pendant les heures creuses</li>
                                    <li>Utilisation illimitée des zones cardio et musculation</li>
                                </ul>
                                <h4 className="card-price">29,99€/mois</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title">Formule Aventure</h3>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>Accès complet à l'équipement à toute heure</li>
                                    <li>Cours collectifs illimités</li>
                                    <li>Accès aux vestiaires, douches et saunas</li>
                                </ul>
                                <h4 className="card-price">79,99€/trimestre</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title">Formule Premium</h3>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>Tous les avantages de la Formule Aventure</li>
                                    <li>Trois séances d'entraînement personnel par mois</li>
                                    <li>Réservation prioritaire pour les cours</li>
                                    <li>Pass invités gratuits</li>
                                </ul>
                                <h4 className="card-price">299,99€/an</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Plans