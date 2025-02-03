import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";

const BlogPage = () => {

  return (
    <>
    <Header/>
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-500 mb-6">Personal Finance Management Blog</h1>
        <p className="text-gray-700 mb-4">Your guide to managing finances efficiently</p>
      </header>
      
      <main className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-6"> 
        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">Essential Tips to Take Control of Your Finances</h2>
          <p className="text-gray-700 mb-4">Keeping track of where your money goes is the first step toward financial clarity. Use apps like Bloom to categorize and analyze your spending patterns. Knowing how much you spend on essentials, entertainment, and savings will help you make informed decisions.</p>
          <p className="text-gray-700 mb-4">A realistic budget acts as your financial roadmap. Start by allocating a percentage of your income to necessities, savings, and leisure. Sticking to a budget is easier when you use tools that automate spending alerts and reminders.</p>
          <p className="text-gray-700 mb-4">Whether it’s saving for a vacation, paying off student loans, or investing in your future, having clear goals gives you a sense of purpose. Bloom helps you track your progress and provides insights to stay on track.</p>
        </article>

        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">The Importance of Financial Literacy in Today's World</h2>
          <p className="text-gray-700 mb-4">In a world driven by financial transactions, understanding money management is not just an advantage—it's a necessity. Financial literacy empowers individuals to make informed decisions, avoid debt traps, and achieve long-term stability.</p>
          <ul>
            <li>Why Financial Literacy Matters</li>
            <ol>
                <li>Reduces Stress: Knowing how to handle money alleviates financial stress and provides peace of mind.</li>
                <li>Helps Avoid Debt: Understanding credit scores, interest rates, and repayment plans helps you make smarter borrowing decisions.</li>
                <li>Supports Better Investment Decisions: Financially literate individuals can confidently explore investment opportunities like stocks, mutual funds, and retirement plans.</li>
            </ol>
          </ul>
        </article>

        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">How Bloom Simplifies Personal Finance for You</h2>
          <p className="text-gray-700 mb-4">Managing finances shouldn’t feel like a chore. With Bloom, we’ve reimagined the way people approach their financial lives by combining simplicity, innovation, and a human touch.</p>
          <ul>
            <li>Bloom automatically categorizes your expenses, giving you real-time insights into your spending habits. No more guessing where your money goes—Bloom does it for you.</li>
            <li>Whether you’re saving for a dream home, an emergency fund, or a new gadget, Bloom helps you set achievable goals and tracks your progress along the way.</li>
            <li>Security is at the heart of everything we do. Bloom uses cutting-edge encryption technology to ensure your data is safe and private.</li>
          </ul>
        </article>

        <article className="mb-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">Why Choose Bloom?</h2>
          <p className="text-gray-700 mb-4">Unlike traditional finance tools, Bloom is designed with a user-first approach. It’s not just about numbers; it’s about empowering you to make smarter financial choices, stress-free.</p>
          <p className="text-gray-700 mb-4">Experience the simplicity of personal finance with Bloom. Sign up today and take the first step toward a brighter financial future!</p>
        </article>
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default BlogPage;
