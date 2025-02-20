import React from 'react';
import Page from '../images/page2.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-blue-600 to-white text-center py-20">
      <h1 className="text-white text-5xl font-bold mb-6">Protect Your Future Money With Bloom</h1>
      <p className="text-white text-xl mb-8">Manage your personal finances with ease and clarity.</p>
      <div className="flex justify-center space-x-4 mb-8">
      <Link to='/register'><button className="bg-white text-blue-600 py-2 px-6 rounded-lg shadow">Get Started</button></Link>
      <Link to='/about'><button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow">Learn More</button></Link>
      </div>
      <img className="border-gray-400 rounded-xl mx-auto" src={Page} alt="Dashboard preview" />
    </section>
  );
};

export default Hero;