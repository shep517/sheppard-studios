import { Briefcase, Code, Cloud, Music } from "lucide-react";

export default function BioSection() {
  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Bio Text */}
        <div>
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-gray-700 mb-6">
            I’m a full-stack software leader with over a decade of experience building scalable systems and coaching high-performing teams. Whether it’s architecting cloud solutions for the utility industry or releasing browser extensions used by thousands, I bring technical depth, creative thinking, and a team-first mindset.
          </p>

          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <Briefcase className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-800">10+ years leading dev teams</span>
            </li>
            <li className="flex items-center space-x-3">
              <Code className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-800">Full-stack: Python, React, PHP, Vue</span>
            </li>
            <li className="flex items-center space-x-3">
              <Cloud className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-800">AWS Architect – Lambda, EC2, S3</span>
            </li>
            <li className="flex items-center space-x-3">
              <Music className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-800">Writes music and sound FX for fun</span>
            </li>
          </ul>
        </div>

        {/* Right Side - Visual */}
        <div className="flex justify-center">
          <img
            src="/images/jon-avatar.svg"
            alt="Jon Sheppard illustration"
            className="w-72 h-auto rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
