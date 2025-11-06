import React from 'react';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { heroData } from '../mock';

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-24 pb-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="h-4 w-4" />
              <span>Certified Fire Safety Solutions</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {heroData.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {heroData.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">ISO 9001:2015 Certified Products</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">24/7 Emergency Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Professional Installation & Training</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                {heroData.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8 py-6 border-2 border-gray-300 hover:border-red-600 hover:text-red-600 transition-colors"
              >
                View Products
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroData.image} 
                alt="Professional Fire Extinguisher"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="text-4xl font-bold text-red-600">25+</div>
              <div className="text-sm text-gray-600 mt-1">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
