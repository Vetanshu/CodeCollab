import React from 'react';
import { Link } from 'react-router-dom';
import image from "@/assets/pngwing.com.png";

const AboutPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-500">
      {/* Navbar */}
      <nav className="w-full bg-slate-700 py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={image} 
              alt="CodeCollab Logo" 
              className="h-10 w-10 mr-3"
            />
            <span className="text-white text-xl font-bold">CodeCollab</span>
          </div>
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="text-white hover:text-blue-300 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/challenges" 
              className="text-white hover:text-blue-300 transition-colors font-medium"
            >
              Challenges
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-blue-300 transition-colors font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto bg-slate-700 rounded-lg shadow-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">About CodeCollab</h1>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What is CodeCollab?</h2>
            <p className="text-slate-300 mb-4">
              CodeCollab is a collaborative, real-time code editor where users can seamlessly code together. 
              It provides a platform for multiple users to enter a room, share a unique room ID, and collaborate 
              on code simultaneously.
            </p>
            <p className="text-slate-300">
              With our integrated LeetCode-style challenges, you can also practice coding problems and improve 
              your skills, either solo or collaboratively with friends.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc pl-6 text-slate-300 space-y-2">
              <li>Real-time collaboration on code editing across multiple files</li>
              <li>Create, open, edit, save, delete, and organize files and folders</li>
              <li>Option to download the entire codebase as a zip file</li>
              <li>Unique room generation with room ID for collaboration</li>
              <li>Comprehensive language support for versatile programming</li>
              <li>Syntax highlighting for various file types with auto-language detection</li>
              <li>Code Execution: Execute code directly within the collaboration environment</li>
              <li>LeetCode-style coding challenges with automated testing</li>
              <li>Real-time group chatting functionality</li>
              <li>Collaborative Drawing: Draw and sketch collaboratively in real-time</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-600 px-3 py-1 rounded">React</span>
              <span className="bg-blue-500 px-3 py-1 rounded">TypeScript</span>
              <span className="bg-red-600 px-3 py-1 rounded">React Router</span>
              <span className="bg-teal-500 px-3 py-1 rounded">Tailwind CSS</span>
              <span className="bg-green-600 px-3 py-1 rounded">Node.js</span>
              <span className="bg-gray-700 px-3 py-1 rounded">Express.js</span>
              <span className="bg-white text-black px-3 py-1 rounded">Socket.io</span>
              <span className="bg-purple-600 px-3 py-1 rounded">CodeMirror</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;