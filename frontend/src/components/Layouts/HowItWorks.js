import React from 'react';
import Addt from '../images/addt.png' 
import Add from '../images/add.png' 
import TAC from '../images/t&c.png' 

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Step 1: Add Your Details</h3>
            <p>Sign up and enter your transaction details.</p>
            <img className="border-gray-400 rounded-md mt-4 mx-auto" src={Addt} alt='Add your transaction'/>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Step 2: Generate Your Transaction Table</h3>
            <p>Automatically track your incomes and expenses details.</p>
            <img className="border-gray-400 rounded-lg mt-4 mx-auto" src={Add} alt='Add your transaction'/>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Step 3: visualize Your Transaction</h3>
            <p>You can see your transaction details in a visualize format.</p>
            <img className="border-gray-400 rounded-lg mt-4 mx-auto" src={TAC} alt='Add your transaction'/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;