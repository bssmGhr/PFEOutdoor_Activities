import React from 'react'

function Sections() {
    return (
        <section id="activities" className="py-5">
            <div className="container">
                <h2 className="text-center mb-5">Explorez Nos Activités de Plein Air</h2>
                <div className="row g-4">
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="p-4 bg-light rounded shadow-sm h-100 text-center">
                            <h3>Randonnées Guidées</h3>
                            <p>
                                Partez à la découverte de paysages magnifiques avec nos guides expérimentés. Sentiers adaptés à tous les niveaux.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="p-4 bg-light rounded shadow-sm h-100 text-center">
                            <h3>Kayak & Canoë</h3>
                            <p>
                                Naviguez sur des lacs sereins ou des rivières aventureuses. Location de matériel et cours disponibles.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="p-4 bg-light rounded shadow-sm h-100 text-center">
                            <h3>Circuits VTT</h3>
                            <p>
                                Empruntez nos pistes de VTT variées, des balades familiales aux descentes techniques pour les plus audacieux.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="p-4 bg-light rounded shadow-sm h-100 text-center">
                            <h3>Escalade en Nature</h3>
                            <p>
                                Initiez-vous ou perfectionnez-vous à l'escalade sur des sites naturels exceptionnels, en toute sécurité.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Sections;