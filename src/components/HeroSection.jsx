import React from 'react'
import p from "../assets/18-01-Blog-Fitness-Information-personal-trainer.jpg"
function HeroSection() {
    return (
        <section className="bg-primary text-white text-center py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <h1 className="display-4 fw-bold">
                            Nous sommes là pour vous aider
                        </h1>
                        <p className="lead">
                            Vous avez des questions ou besoin d'assistance ? Contactez-nous, et notre équipe se fera un plaisir de
                            vous aider. Que vous soyez curieux à propos des abonnements, des cours, ou de toute autre chose, nous sommes là pour vous.
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <img src={p} alt="Coach personnel en séance"
                            className="img-fluid rounded shadow-lg" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection