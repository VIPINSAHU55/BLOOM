import React from "react";
import Header from "../components/Layouts/Header";
import Footer from '../components/Layouts/Footer';
import Goals from '../components/images/marketing.png'
import Target from '../components/images/target.png'
import Features from '../components/images/application.png'

const About = () => {
  return (
    <>
    <Header/>
    <section className="bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-500 mb-6">About Bloom</h2>

        <p className="text-gray-700 mb-4">
        Managing personal finances can be overwhelming, but it doesn’t have to be. That’s why we created Bloom – a platform designed to simplify the way you budget, save, and plan for your future.
        At Bloom, we believe in empowering individuals to take charge of their financial future. Whether you're tracking expenses, setting budgets, or planning for long-term goals, Bloom is your companion in achieving financial clarity and success.
        </p>
        <p className="text-gray-900 font-semibold mb-10">
        Our mission is to make financial management accessible, stress-free, and actionable for everyone. Bloom is designed to grow with you, helping you thrive financially.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Research Card */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-xl p-6">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <img className="w-8 h-8" src={Goals} alt="Our Goals"/>
            </div>
            <h3 className="text-xl font-semibold text-blue-500 mb-2">Our Goal</h3>
            <p className="text-gray-600">
            Our goal is to take the stress out of money management by giving you all the tools you need in one intuitive, user-friendly place. Bloom brings together advanced analytics, budgeting tools, and goal-setting features to help you stay organized and motivated.
            </p>
          </div>

          {/* Strategy Card */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-xl p-6">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
            <img className="w-8 h-8" src={Target} alt='Target Audience'/>
            </div>
            <h3 className="text-xl font-semibold text-blue-500 mb-2">Target Audience</h3>
            <p className="text-gray-600">
            We understand that every financial journey is unique. Whether you’re navigating student life, balancing a career, or preparing for retirement, Bloom adapts to your needs and guides you toward financial success. With Bloom, you’re never managing your finances alone – we’re here to help, every step of the way.
            </p>
          </div>

          {/* Design Card */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-xl p-6">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
            <img className="w-8 h-8" src={Features} alt="Features"/>
            </div>
            <h3 className="text-xl font-semibold text-blue-500 mb-2">Features</h3>
            <p className="text-gray-600">
            From tracking your daily expenses to achieving long-term goals, Bloom grows with you every step of the way. Whether you’re paying off debt, saving for your dreams, or just trying to stay on top of your budget, Bloom provides the tools and insights you need to thrive financially.
            </p>
          </div>
        </div>
        <p className="text-green-500 font-semibold mt-10 mb-10">Join <strong className="text-red-400">BLOOM</strong> today and take the first step towards financial freedom. Together, we’ll help you achieve your dreams, one step at a time.</p>
      </div>
      
    </section>
    <Footer/>
    </>
  );
};

export default About;
