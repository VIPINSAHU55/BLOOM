import React from 'react';
import { useEffect } from 'react';
import Bloom from '../images/BLOOM.png'
import facebook from '../images/facebook.png'
import instagram from '../images/instagram.png'
import linkedin from '../images/linkedin.png'
import twitter from '../images/twitter.png'
import { Link } from 'react-router-dom';

const Footer = () => {
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, []);
  return (
    <footer className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo and Social Icons Section */}
          <div className="mb-8 md:mb-0">
            <div className='sm:w-[40%] md:w-[35%] h-auto'>
              <img
                className=" bg-white rounded shadow-md"
                src={Bloom}
                alt="BLOOM"
              />
            </div>
            <div className="flex space-x-6 mt-4">
              <a href="http://www.facebook.com" aria-label="Facebook" className="hover:text-blue-500">
                <img src={facebook} alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="http://www.instagram.com" aria-label="Instagram" className="hover:text-blue-500">
                <img src={instagram} alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="http://www.linkedin.com" aria-label="LinkedIn" className="hover:text-blue-500">
                <img src={linkedin} alt="LinkedIn" className="w-6 h-6" />
              </a>
              <a href="http://www.x.com" aria-label="Twitter" className="hover:text-blue-500">
                <img src={twitter} alt="Twitter" className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full md:w-auto">
            <div>
              <h2 className="font-semibold text-gray-700">Company</h2>
              <ul className="mt-4 space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-blue-500"> About</Link></li>
                <li><Link to="/blogpage" className="text-gray-600 hover:text-blue-500">Blog</Link></li>
                <li><Link to='/featur' className="text-gray-600 hover:text-blue-500">Features</Link></li>
                <li><Link to='/how' className="text-gray-600 hover:text-blue-500">Working</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-gray-700">Legal</h2>
              <ul className="mt-4 space-y-2">
                <li><Link to='/tc'>Terms & Condition</Link></li>
                <li><Link to='/policy'>Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-gray-700">Contact</h2>
              <ul className="mt-4 space-y-2">
                <li><a href="mailto:bloom@email.com" className="text-gray-600 hover:text-blue-500">bloom@email.com</a></li>
                <li><a href="tel:+15502932941" className="text-gray-600 hover:text-blue-500">(550) 293 2941</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
