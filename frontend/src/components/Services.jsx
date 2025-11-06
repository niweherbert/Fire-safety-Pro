import React from 'react';
import { services } from '../mock';
import { Wrench, ClipboardCheck, Settings, GraduationCap, Phone, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const iconMap = {
  Wrench: Wrench,
  ClipboardCheck: ClipboardCheck,
  Settings: Settings,
  GraduationCap: GraduationCap,
  Phone: Phone,
  FileText: FileText
};

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive fire safety solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-2 hover:border-red-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                    <IconComponent className="h-6 w-6 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
