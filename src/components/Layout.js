import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">Your Name</div>
            <div className="space-x-4">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/projects" className="hover:text-gray-300">Projects</Link>
              <Link to="/about" className="hover:text-gray-300">About</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 