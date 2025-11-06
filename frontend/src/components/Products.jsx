import React from 'react';
import { products } from '../mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export const Products = () => {
  const handleInquiry = (productName) => {
    // Mock functionality - scroll to contact
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Premium fire extinguishers for every need, certified and tested to the highest standards
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg h-48">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  {product.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-100">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button 
                  onClick={() => handleInquiry(product.name)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Request Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
