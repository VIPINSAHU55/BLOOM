import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";

const Tc = () => {

  return (
    <>
    <Header/>
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-500 mb-6">Terms and Conditions</h1>
        <h3 className="text-4xl font-bold text-blue-700 mb-6">Welcome to Bloom! </h3>
        <p className="text-gray-700 mb-4">Your use of our services is governed by the terms outlined below. By accessing or using Bloom, you agree to these Terms and Conditions.</p>
      </header>
      
      <main className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-6"> 
        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">1. Use of Services</h2>
          <p className="text-gray-700 mb-4">Bloom is designed to help you manage your personal finances efficiently. The information provided is for general informational purposes and should not be considered financial advice.</p>
        </article>

        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">2. Privacy Policy</h2>
          <p className="text-gray-700 mb-4">We are committed to protecting your data. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.</p>
        </article>

        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">3. User Responsibilities</h2>
           <ul>
            <li>You are responsible for keeping your login credentials secure</li>
            <li>All activities under your account are your responsibility.</li>
            <li>Do not use Bloom for unlawful or unauthorized purposes.</li>
          </ul>
        </article>

        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">5. Termination</h2>
          <p className="text-gray-700 mb-4">We reserve the right to suspend or terminate accounts that violate these terms or engage in activities harmful to our service or other users.</p>
        </article>
        
        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">6. Updates to Terms</h2>
          <p className="text-gray-700 mb-4">Bloom reserves the right to update these terms as needed. We will notify users of significant changes.</p>
        </article>
        <h2 className="text-4xl font-bold text-blue-500">Contact Us</h2>
        <p className="text-green-500 font-semibold mt-5 mb-10">If you have any questions, feel free to reach out to us at  <strong className="text-red-400">bloom@email.com</strong></p>
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default Tc;
