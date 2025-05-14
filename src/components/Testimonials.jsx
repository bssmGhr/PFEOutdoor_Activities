import React from 'react'

function Testimonials() {
    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-5" id="stories">Témoignages de Membres</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="p-4 bg-white rounded shadow-sm h-100">
                            <blockquote className="blockquote">
                                <p>
                                    "Les entraîneurs ici sont incroyables ! Je ne me suis jamais senti aussi
                                    soutenu dans mon parcours de remise en forme."
                                </p>
                                <footer className="blockquote-footer">John D.</footer>
                            </blockquote>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 bg-white rounded shadow-sm h-100"> {/* Added missing closing div */}
                            <blockquote className="blockquote">
                                <p>
                                    "Rejoindre les cours collectifs a changé la donne pour
                                    moi — j'ai perdu du poids et gagné en confiance !"
                                </p>
                                <footer className="blockquote-footer">Emily R.</footer>
                            </blockquote>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 bg-white rounded shadow-sm h-100">
                            <blockquote className="blockquote">
                                <p>
                                    "Thanks to the personal training at [GO TO GYM], I've achieved
                                    des résultats que je ne pensais pas possibles."
                                </p>
                                <footer className="blockquote-footer">Michael</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials