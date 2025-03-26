import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Jon Sheppard. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 