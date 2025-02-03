import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Bloom from '../images/BLOOMSS.png'
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for the mobile menu

const Header = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white py-4 px-8 shadow">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <img
          className="w-[9%] sm:w-[10%] md:w-[4%] h-auto bg-white rounded shadow-md"
          src={Bloom}
          alt="BLOOM"
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to='/'>Home</Link>
          <Link to="/about"> About</Link>
          <Link to='/how'>Working</Link>
          <Link to='/featur'>Features</Link>
          <Link to="/blogpage">Blog</Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-2">
          <Link to='/login'><button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Login</button></Link>
          <Link to='/register'> <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" >Sign Up</button></Link>
        </div>

        {/* Hamburger Menu Icon (visible on mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} aria-label="Open menu">
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (visible only on mobile screens) */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 absolute bg-white right-0 z-10 shadow-lg ">
          <nav className="flex flex-col space-y-4 px-8 py-4">
          <Link to='/'>Home</Link>
          <Link to="/about"> About</Link>
          <Link to='/how'>Working</Link>
          <Link to='/featur'>Features</Link>
          <Link to="/blogpage">Blog</Link>
          </nav>
          <div className="flex flex-col space-y-2 px-8 py-4">
            <Link to='/login'><button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Login</button></Link>
            <Link to='/register'> <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" >Sign Up</button></Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
