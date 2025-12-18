import React from 'react';
import { TreePine, Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-emerald-600 rounded-xl">
                <TreePine className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-white text-2xl font-bold">SaveTheLast </span>
                <div className="text-emerald-300 text-sm">Conservation & Discovery</div>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
              Dedicated to preserving and showcasing Nepal's incredible biodiversity. 
              Together, we protect the natural heritage of the Himalayas for future generations.
            </p>
            <div className="flex items-center space-x-2 text-slate-300 mb-4">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>for WildLife conservation</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-700 hover:bg-emerald-600 rounded-lg transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-slate-700 hover:bg-blue-500 rounded-lg transition-all duration-300 hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-slate-700 hover:bg-pink-500 rounded-lg transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/parks" className="text-slate-300 hover:text-emerald-300 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                  National Parks
                </a>
              </li>
              <li>
                <a href="/rare-species" className="text-slate-300 hover:text-emerald-300 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                  Rare Species
                </a>
              </li>
              <li>
                <a href="/about" className="text-slate-300 hover:text-emerald-300 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/conservation" className="text-slate-300 hover:text-emerald-300 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                  Conservation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-300 group">
                <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-emerald-600 transition-all duration-300">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 group">
                <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-blue-600 transition-all duration-300">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+977-********</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 group">
                <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-purple-600 transition-all duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                <span>info@SaveTheLastNepal.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-center md:text-left">
              &copy; 2025 SaveTheLast Explorer Nepal. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-slate-400 hover:text-emerald-300 transition-colors duration-200">Privacy Policy</a>
              <a href="/terms" className="text-slate-400 hover:text-emerald-300 transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;