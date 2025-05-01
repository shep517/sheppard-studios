import React from 'react';
import { Link } from 'react-router-dom';
import headshot from '../assets/headshot.jpg';
import resume from '../assets/Jon Sheppard Resume - 2025 (2).pdf';
import BioSection from '../components/BioSection'; // Changed from GPTBioSection to GptBioSection
import KnownForSection from '../components/KnownForSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        {/* Background Animation - can be replaced with a more complex animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute h-0.5 bg-blue-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 300 + 50}px`,
                  opacity: Math.random() * 0.5 + 0.25,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between relative z-10">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Hi, I'm Jon Sheppard – <br />
              <span className="text-blue-400">Tech Leader, Builder, Coach.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl">
              Full-stack architect, award-winning coach, and sound design nerd. 
              I build scalable software and team culture.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link 
                to="/work" 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                View My Work
              </Link>
              
              <a 
                href={resume}
                download="Jon Sheppard Resume.pdf"
                className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
              
              <Link 
                to="/music-and-hobbies" 
                className="px-8 py-3 bg-purple-700 hover:bg-purple-800 rounded-lg font-medium transition-colors duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                Listen to My Music
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="md:w-2/5 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-400 shadow-2xl">
              <img 
                src={headshot} 
                alt="Jon Sheppard" 
                className="w-full h-full object-cover"
              />
              {/* Waveform animation overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-500/30 to-transparent">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute bottom-0 bg-blue-300 w-1 rounded-t-full"
                    style={{
                      left: `${i * 5}%`,
                      height: `${Math.sin(i * 0.5) * 50 + 20}%`,
                      opacity: 0.7,
                      animation: `waveform 1.5s ease-in-out ${i * 0.1}s infinite alternate`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="py-16">
        <BioSection />
      </div>

      {/* Known For Section */}
      <KnownForSection />

      {/* Rest of your homepage content */}
      <div className="container mx-auto px-6 py-12">
        {/* Additional sections */}
      </div>
    </div>
  );
};

export default Home; 