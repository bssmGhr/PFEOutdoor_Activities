import React from 'react'
import HeroSection from "../components/HeroSection"
import WhyChooseUs from '../components/WhyChooseUs'
import Services from '../components/Services'
import SpecialOffersPage from '../components/SpecialOffersPage'
import Testimonials from '../components/Testimonials'
function Home() {
    return (
        <div>
            <HeroSection></HeroSection>
            <Services />
            <WhyChooseUs />
            <SpecialOffersPage />
            <Testimonials />
        </div>
    )
}

export default Home