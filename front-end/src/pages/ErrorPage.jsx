import React from 'react';
import { GhostIcon, HomeIcon, SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-2xl">
        {/* Ghost Animation */}
        <div className="relative animate-bounce">
          <GhostIcon className="w-24 h-24 mx-auto text-purple-500" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-purple-300 rounded-full opacity-50 animate-pulse" />
        </div>

        {/* Error Message */}
        <h1 className="text-8xl font-bold text-purple-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800">Page Not Found</h2>
        
        {/* Description */}
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          Oops! Looks like our friendly ghost has misplaced the page you're looking for.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <input 
            type="text"
            placeholder="Try searching for something else..."
            className="w-full px-4 py-3 rounded-full border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 pl-12"
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <button onClick={()=>navigate('/')} className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
            <HomeIcon className="w-5 h-5" />
            Go Home
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-colors">
            Contact Support
          </button>
        </div>

        {/* Additional Links */}
        <div className="text-gray-500 space-x-4">
          <a href="#" className="hover:text-purple-600 transition-colors">Help Center</a>
          <span>•</span>
          <a href="#" className="hover:text-purple-600 transition-colors">Sitemap</a>
          <span>•</span>
          <a href="#" className="hover:text-purple-600 transition-colors">Report Issue</a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;