import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";

const Policy = () => {

  return (
    <>
    <Header/>
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-500 mb-6">Privacy Policy</h1>
        <h3 className="text-4xl font-bold text-blue-700 mb-6">Welcome to Bloom! </h3>
        <ul>
            <li>Personal information (e.g., name, email address) provided during account registration.</li>
            <li>Financial data shared to enhance your experience, such as tracking expenses or setting budgets.</li>
            <li>Usage data, such as how you interact with the app, to improve functionality and user experience.
            </li>
          </ul>
      </header>
      
      <main className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-6"> 
        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">2. How We Use Your Information</h2>
          <ul>
            <li>To provide, maintain, and improve our services.</li>
            <li>To send updates, notifications, or promotional offers (you can opt-out anytime).</li>
            <li>To analyze trends and ensure a secure user experience.</li>
          </ul>
        </article>

        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">3. Sharing Your Information</h2>
          <ul>
            <li>We do not sell or share your personal data with third parties for marketing purposes.</li>
            <li>Data may be shared with trusted partners or services only to improve app functionality or comply with legal obligations.</li>
            <li>Do not use Bloom for unlawful or unauthorized purposes.</li>
          </ul>
        </article>

        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">4. Data Security</h2>
          <p className="text-gray-700 mb-4">We take data security seriously and implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>
        </article>

        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">5. Your Choices and Rights</h2>
          <ul>
            <li>Access and update your personal information in your account settings.</li>
            <li>Delete your account and associated data by contacting our support team.</li>
            <li>Opt out of non-essential communications by adjusting your preferences.</li>
          </ul>
        </article>
        
        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">6. Updates to This Policy</h2>
          <p className="text-gray-700 mb-4">We may update this Privacy Policy from time to time. Changes will be communicated to you through app notifications or emails.</p>
        </article>
        <h2 className="text-4xl font-bold text-blue-500">Contact Us</h2>
        <p className="text-green-500 font-semibold mt-5 mb-10">If you have any questions about this Privacy Policy or how your data is handled, feel free to reach out to us at <strong className="text-red-400">bloom@email.com</strong></p>
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default Policy;
