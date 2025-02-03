import React from 'react'
import transaction from '../images/transaction.png'
import turnover from '../images/turnover.png'
import income from '../images/income.png'
import expense from '../images/expense.png'
import Header from './Header'
import Footer from './Footer'

const Featur = () => {
  return (
    <>
    <Header/>
    <section id="features" className="py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-500 mb-6">Intelligent Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <img className="border-gray-400 rounded-2xl mx-auto" src={transaction}  alt="Total transaction" />
            <h3 className="text-xl mt-4 font-semibold mb-4">Total Transaction</h3>
            <p>Track your visualize income and expenses in Total transaction Dashboard.</p>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-lg">
          <img className="border-gray-400 rounded-2xl mx-auto" src={turnover}  alt="Total transaction" />
            <h3 className="text-xl mt-4 font-semibold mb-4">Total Turnover</h3>
            <p>Track your visualize income and expenses in Total turnover Dashboard.</p>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <img className="border-gray-400 rounded-2xl mx-auto" src={income}  alt="Total transaction" />
            <h3 className="text-xl mt-4 font-semibold mb-4">Categorywise Income</h3>
            <p>Track your income in which category you earned money.</p>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-lg">
          <img className="border-gray-400 rounded-2xl mx-auto" src={expense}  alt="Total transaction" />
            <h3 className="text-xl mt-4 font-semibold mb-4">Categorywise Expense</h3>
            <p>Track your expense in which category you pay your money.</p>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default Featur
