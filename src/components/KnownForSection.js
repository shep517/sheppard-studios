import React, { useState } from 'react';
import { Rocket, Code2, LineChart, Music2 } from 'lucide-react';

export default function KnownForSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const items = [
    {
      icon: <Rocket className="w-8 h-8 text-blue-500" />,
      title: "Leading Dev Teams",
      description: "Building high-output, collaborative software squads",
      expandedContent: (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-600">Leadership Highlights</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Certified Scrum Master with 5+ years experience</li>
              <li>Led teams of 4-12 developers across multiple projects</li>
              <li>Implemented agile methodologies and CI/CD pipelines</li>
              <li>Mentored junior developers and facilitated team growth</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Leadership Philosophy</h4>
            <p className="text-gray-700">
            As a coach at heart, I strive to create an environment where growth is encouraged, support is constant, and wins are celebrated. 
            I've seen that the best way to grow a business is to first grow the people behind it. When you put the team first, success follows — 
            both in the code and the culture.
            </p>
          </div>
        </div>
      )
    },
    {
      icon: <Code2 className="w-8 h-8 text-purple-500" />,
      title: "Full-Stack Wizardry",
      description: "From Postgres to React and everything in between",
      expandedContent: (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-600">Technical Stack</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Frontend: React, Vue, TypeScript, Tailwind</li>
              <li>Backend: Python, Node.js, PHP, Java</li>
              <li>Database: PostgreSQL, MongoDB, Redis</li>
              <li>Cloud: AWS, Docker, Kubernetes</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Technical Philosophy</h4>
            <p className="text-gray-700">
            I believe every project deserves a tech stack tailored to its specific needs — nothing more, nothing less. The best solutions meet all requirements while remaining maintainable, scalable, and easy to onboard. I focus on choosing tools that solve problems efficiently without overengineering. Clean, purposeful architecture always outlasts flashy complexity.
            </p>
          </div>
        </div>
      )
    },
    {
      icon: <LineChart className="w-8 h-8 text-green-500" />,
      title: "Data-Driven Decisions",
      description: "Metrics, KPIs, and product growth",
      expandedContent: (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-600">Key Areas</h4>
            <div className="space-y-6">
              <div>
                <h5 className="font-medium mb-2">Development Analytics</h5>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Sprint velocity and team capacity planning</li>
                  <li>Code quality metrics and technical debt tracking</li>
                  <li>CI/CD pipeline efficiency and deployment success</li>
                  <li>System performance and error rate monitoring</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Business Intelligence</h5>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Custom analytics implementations for stakeholders</li>
                  <li>Data pipeline architecture and maintenance</li>
                  <li>Real-time dashboards and reporting systems</li>
                  <li>Cross-functional data strategy alignment</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Data Philosophy</h4>
            
            <p className="text-gray-700">
              Numbers tell stories that gut feelings can't. I believe in making decisions backed by 
              concrete data, whether it's user behavior, or system performance, or business analytics. 
              By measuring what matters and acting on those insights, we can optimize team efficiency, 
              improve product quality, and define company strategy. <b>Know which metrics 
              drive meaningful outcomes. Turn that data into actionable improvements.</b>
            </p>
          </div>
        </div>
      )
    },
  ];

  const handleCardClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What I'm Known For</h2>
        
        {/* Cards in a single row */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {items.map((item, index) => (
            <div 
              key={index}
              onClick={() => handleCardClick(index)}
              className={`
                w-64 p-6 rounded-xl bg-gray-50 
                hover:bg-gray-100 transition-all duration-300 cursor-pointer 
                transform hover:-translate-y-1
                ${expandedIndex === index ? 'ring-2 ring-blue-500' : ''}
              `}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Single expandable content section */}
        <div 
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${expandedIndex !== null ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="bg-white shadow-inner p-8 rounded-xl">
            {expandedIndex !== null && items[expandedIndex].expandedContent}
          </div>
        </div>
      </div>
    </section>
  );
};