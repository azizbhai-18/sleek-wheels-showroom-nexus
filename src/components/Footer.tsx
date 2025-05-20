
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">AutoHaven</h3>
            <p className="text-gray-400 text-sm">
              The premier destination for luxury and quality vehicles. Explore our vast inventory or order your dream car today.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm">Home</Link></li>
              <li><Link to="/stock" className="text-gray-400 hover:text-white text-sm">Stock</Link></li>
              <li><Link to="/order" className="text-gray-400 hover:text-white text-sm">Order Car</Link></li>
              <li><Link to="/sell" className="text-gray-400 hover:text-white text-sm">Sell Car</Link></li>
              <li><Link to="/service" className="text-gray-400 hover:text-white text-sm">Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>123 Auto Lane</li>
              <li>Car City, CC 90210</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@autohaven.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Monday - Friday: 9am - 7pm</li>
              <li>Saturday: 10am - 6pm</li>
              <li>Sunday: 11am - 4pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} AutoHaven. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
