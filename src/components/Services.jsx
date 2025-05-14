import React from 'react'

function Services() {
    return (
        <section id="services" className="py-5">
            <div className="container">
                <h2 className="text-center mb-5">Nos Services – Conçus pour Vous</h2>
                <div className="row g-4">
                    <div className="col-md-4 text-center">
                        <div className="p-4 bg-light rounded shadow-sm h-100">
                            <h3>Force & Conditionnement</h3>
                            <p>
                                Améliorez votre force musculaire avec notre large gamme de poids libres et
                                de machines de résistance.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="p-4 bg-light rounded shadow-sm h-100">
                            <h3>Zone Cardio</h3>
                            <p>
                                Notre équipement cardio haut de gamme comprend des tapis de course, des vélos elliptiques,
                                et des vélos pour vous maintenir en forme.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="p-4 bg-light rounded shadow-sm h-100">
                            <h3>Cours Collectifs</h3>
                            <p>
                                Rejoignez des cours dynamiques comme le HIIT, le yoga, le Pilates et le cyclisme
                                pour rester motivé.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="p-4 bg-light rounded shadow-sm h-100">
                            <h3>Entraînement Personnel</h3>
                            <p>
                                Travaillez en tête-à-tête avec des entraîneurs experts pour des plans d'entraînement
                                personnalisés conçus spécialement pour vous.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="p-4 bg-light rounded shadow-sm h-100">
                            <h3>Récupération & Détente</h3>
                            <p>
                                Détendez-vous dans nos saunas ou profitez de nos services de récupération
                                comme la massothérapie.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services