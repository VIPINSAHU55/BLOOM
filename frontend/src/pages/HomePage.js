import React from 'react'
import Header from '../components/Layouts/Header'
import Footer from '../components/Layouts/Footer'
import Hero from '../components/Layouts/Hero'
import Features from '../components/Layouts/Features'
import HowItWorks from '../components/Layouts/HowItWorks'

const HomePage = () => {
  return (
    <>
    <main>
    <Header/>
      <Hero/>
      <Features/>
      <HowItWorks/>
      <Footer/>
    </main>
    </>
  )
}

export default HomePage
