import React, { useState } from 'react';
import { contactInfo } from '../mock';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission - store in localStorage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to enhance your fire safety? Contact us for a free consultation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">{contactInfo.phone}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">{contactInfo.email}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Address</div>
                    <div className="text-gray-600">{contactInfo.address}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Business Hours</div>
                    <div className="text-gray-600">{contactInfo.hours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-red-600 text-white p-6 rounded-xl">
              <h4 className="text-xl font-bold mb-2">24/7 Emergency Service</h4>
              <p className="text-red-100 mb-4">
                For urgent fire safety needs or emergencies, call us anytime.
              </p>
              <div className="text-2xl font-bold">{contactInfo.phone}</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 123-4567"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input 
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your fire safety needs..."
                  rows={4}
                  className="mt-2"
                />
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
