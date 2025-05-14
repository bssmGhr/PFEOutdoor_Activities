import React from 'react'

function SpecialOffersPage() {
    return (
        <section className="py-5 text-center">
            <div className="container">
                <h2 className="mb-5" id="special">Offres Spéciales - Bougez Plus, Dépensez Moins</h2>
                <div className="row justify-content-center g-4">
                    <div className="col-md-4">
                        <div className="p-4 bg-primary text-white rounded shadow-sm h-100">
                            <h4>Aucuns Frais d'Inscription</h4>
                            <p>Inscrivez-vous aujourd'hui sans aucuns frais de dossier !</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 bg-primary text-white rounded shadow-sm h-100">
                            <h4>Premier Mois Gratuit</h4>
                            <p>
                                Obtenez votre premier mois gratuit en vous engageant pour un
                                abonnement de 6 mois.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 bg-primary text-white rounded shadow-sm h-100">
                            <h4>Séance d'Entraînement Personnel Offerte</h4>
                            <p>
                                Tous les nouveaux membres reçoivent une séance d'entraînement personnel gratuite pour bien
                                démarrer leur parcours de remise en forme.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 bg-primary text-white rounded shadow-sm h-100">
                            <h4>Programme de Parrainage</h4>
                            <p>
                                Parrainez un ami et bénéficiez tous les deux de 10% de réduction sur votre prochaine
                                cotisation mensuelle.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SpecialOffersPage