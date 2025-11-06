import React, { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from './ui/button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="bg-red-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FireSafety Pro</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Products
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('safety')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Safety Tips
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              About
            </button>
            <Button onClick={() => scrollToSection('contact')} className="bg-red-600 hover:bg-red-700 text-white">
              Contact Us
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-red-600 font-medium text-left">
                Products
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-red-600 font-medium text-left">
                Services
              </button>
              <button onClick={() => scrollToSection('safety')} className="text-gray-700 hover:text-red-600 font-medium text-left">
                Safety Tips
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-red-600 font-medium text-left">
                About
              </button>
              <Button onClick={() => scrollToSection('contact')} className="bg-red-600 hover:bg-red-700 text-white w-full">
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
