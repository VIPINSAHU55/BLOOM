import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for the mobile menu
import { Link } from 'react-router-dom';
import Profile from './Profile';
import Bloom from '../images/BLOOMSS.png'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <header className="bg-white py-4 px-8 shadow">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo - Desktop */}
        <img
          className="w-[10%] sm:w-[15%] md:w-[8%] lg:w-[3%] h-auto bg-white rounded shadow-md mx-auto md:mx-0"
          src={Bloom}
          alt="BLOOM"
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6">
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
              Dashboard
            </Link>
            <Link to="/transactionpage" className="text-gray-600 hover:text-gray-800">
              Transaction
            </Link>
            <Link to='/analytics' className="text-gray-600 hover:text-gray-800">
              Analytics
            </Link>
            <Link to='/budgeting' className="text-gray-600 hover:text-gray-800">Budgeting</Link>
            <Link to='/goalpage' className="text-gray-600 hover:text-gray-800">My Goals</Link>
            <Link to='/debtpage' className="text-gray-600 hover:text-gray-800">Debt Tracker</Link>
            <Link to='/subscriptionPage' className="text-gray-600 hover:text-gray-800">Subscription</Link>

          </nav>
        </div>

        {/* Profile Icon (visible on both desktop and mobile) */}
        <Profile />
      </div>

      {/* Mobile Menu Button (visible only on mobile) */}
      <div className="md:hidden absolute left-5 top-8 ">
        <button
          className="text-gray-600"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu (visible only on mobile screens) */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white shadow-lg mt-2 absolute left-0 h-[43%] z-10'>
          <nav className="flex flex-col space-y-4 px-4 py-2">
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
              Dashboard
            </Link>
            <Link to="/transactionpage" className="text-gray-600 hover:text-gray-800">
              Transaction
            </Link>
            <Link to='/analytics' className="text-gray-600 hover:text-gray-800">
              Analytics
            </Link>
            <Link to='/budgeting' className="text-gray-600 hover:text-gray-800">Budgeting</Link>
            <Link to='/goalpage' className="text-gray-600 hover:text-gray-800">My Goals</Link>
            <Link to='/debtpage' className="text-gray-600 hover:text-gray-800">Debt Tracker</Link>
            <Link to='/subscriptionPage' className="text-gray-600 hover:text-gray-800">Subscription</Link>
          </nav>
        </div>
      )}
    </header>

  );
};

export default Header;
