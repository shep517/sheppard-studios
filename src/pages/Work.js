import React from 'react';

const Work = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Video Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-8">My Work</h1>
        <div className="relative w-full aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
          <iframe 
            title="Loom Video" 
            src="https://www.loom.com/embed/b93f88f21be24011a78755dd958eec6f?sid=7dbdb6fb-ec29-4613-9fe4-471cf1c06242" 
            frameBorder="0" 
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        <p className="mt-4 text-gray-600 text-center">
          Watch me walk through some of my recent projects and technical achievements
        </p>
      </section>

      {/* Major Projects Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold mb-8">Major Projects</h2>
        
        {/* Glances Browser Extension */}
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold mb-4">Glances Browser Extension</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium mb-3">Key Responsibilities</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">■</span>
                  Define road map through research and manage feature releases
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">■</span>
                  Product updates on all major Browser stores
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">■</span>
                  Prioritize new features, bug fixes, and compatibility updates
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">■</span>
                  Utilizes browser storage to save settings for the user
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Browser Extension</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Product Management</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Cross-browser</span>
            </div>
          </div>
        </div>

        {/* Glances Client App */}
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold mb-4">Glances Client App</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium mb-3">Key Features</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">■</span>
                  View all relevant data for a customer across all apps
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">■</span>
                  Accessible from Glances, browser extension, or embedded app
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Client App</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Cross-platform</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Data Integration</span>
            </div>
          </div>
        </div>

        {/* SugarCRM Projects */}
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold mb-4">SugarCRM Custom Modules</h3>
          
          {/* SmartList Module */}
          <div className="mb-8">
            <h4 className="text-xl font-medium mb-3">SmartList Module</h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">■</span>
                    Individual Contributor: MySQL, PHP, Javascript, CSS
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">■</span>
                    Conforms to all SugarCRM developer best practices
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">■</span>
                    Uses cron jobs to add specific CRM records to Lists
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">■</span>
                    Dynamic interface for filtering records via dropdown
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">■</span>
                    Allows Users to write their own SQL to filter records
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">MySQL</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">PHP</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Javascript</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">CSS</span>
              </div>
            </div>
          </div>

          {/* Mailchimp Integration */}
          <div>
            <h4 className="text-xl font-medium mb-3">Mailchimp Integration</h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">■</span>
                    #1 selling custom module on the SugarCRM store for 7 years
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">■</span>
                    Sync Contacts and Email marketing activities
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">■</span>
                    Setup wizard design for easy onboarding
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">MySQL</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">PHP</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Bootstrap</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Handlebars</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work; 