import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { FaLaptopCode, FaUsers, FaDownload, FaComments, FaPencilRuler } from "react-icons/fa";
import { SiSocketdotio, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress } from "react-icons/si";
import authService from "@/services/authService";
import sessionService, { Session } from "@/services/sessionService";
import Navbar from "@/components/navbar/Navbar";

const AboutPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [previousSessions, setPreviousSessions] = useState<Session[]>([]);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      if (isAuth) {
        // Get username from localStorage
        try {
          const userData = localStorage.getItem('user');
          if (userData) {
            const user = JSON.parse(userData);
            setUsername(user.username || "User");
          }
          
          // Load previous sessions
          const sessions = sessionService.getUserSessions();
          setPreviousSessions(sessions);
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    };
    
    checkAuth();
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUsername("");
    setPreviousSessions([]);
  };

  const animationStyles = `
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-slate-800 to-slate-900">
      {/* Navbar */}
      <style>{animationStyles}</style>
      
      {/* Navbar */}
      <Navbar 
        isAuthenticated={isAuthenticated}
        username={username}
        previousSessions={previousSessions}
        onLogout={handleLogout}
        activePage="about"
      />

         {/* Hero Section */}
         <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-10 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About CodeCollab</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            A collaborative platform for real-time coding, learning, and creating together
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        {/* What is CodeCollab Section */}
        <div className="max-w-4xl mx-auto bg-slate-700/80 backdrop-blur-sm rounded-lg shadow-xl p-8 text-white mb-12 transform transition-all hover:scale-[1.01]">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">What is CodeCollab?</h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                CodeCollab is a collaborative, real-time code editor where users can seamlessly code together. 
                It provides a platform for multiple users to enter a room, share a unique room ID, and collaborate 
                on code simultaneously.
              </p>
              <p className="text-slate-300 leading-relaxed">
                With our integrated LeetCode-style challenges, you can also practice coding problems and improve 
                your skills, either solo or collaboratively with friends.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <FaLaptopCode className="text-white text-8xl" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Features Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FaLaptopCode className="text-blue-400 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-white">Real-time Collaboration</h3>
              </div>
              <p className="text-slate-300">
                Collaborate on code editing across multiple files in real-time with your team members.
              </p>
            </div>
            
            <div className="bg-slate-700/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FaUsers className="text-blue-400 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-white">Room Sharing</h3>
              </div>
              <p className="text-slate-300">
                Create unique rooms with shareable IDs for seamless collaboration with your team.
              </p>
            </div>
            
            <div className="bg-slate-700/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FaDownload className="text-blue-400 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-white">Export Projects</h3>
              </div>
              <p className="text-slate-300">
                Download your entire codebase as a zip file when you're ready to move to production.
              </p>
            </div>
            
            <div className="bg-slate-700/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FaComments className="text-blue-400 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-white">Group Chat</h3>
              </div>
              <p className="text-slate-300">
                Communicate with your team in real-time through our integrated chat functionality.
              </p>
            </div>
            
            <div className="bg-slate-700/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FaCode className="text-blue-400 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-white">Code Execution</h3>
              </div>
              <p className="text-slate-300">
                Execute your code directly within the collaboration environment to test your solutions.
              </p>
            </div>
            
            <div className="bg-slate-700/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FaPencilRuler className="text-blue-400 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-white">Collaborative Drawing</h3>
              </div>
              <p className="text-slate-300">
                Draw and sketch collaboratively in real-time to visualize concepts and ideas.
              </p>
            </div>
          </div>
        </div>
        
        {/* Tech Stack Section */}
        <div className="max-w-4xl mx-auto bg-slate-700/80 backdrop-blur-sm rounded-lg shadow-xl p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <div className="bg-blue-600/20 p-4 rounded-full mb-3">
                <SiReact className="text-4xl text-blue-400" />
              </div>
              <span className="text-white font-medium">React</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-600/20 p-4 rounded-full mb-3">
                <SiTypescript className="text-4xl text-blue-400" />
              </div>
              <span className="text-white font-medium">TypeScript</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-600/20 p-4 rounded-full mb-3">
                <SiTailwindcss className="text-4xl text-blue-400" />
              </div>
              <span className="text-white font-medium">Tailwind CSS</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-600/20 p-4 rounded-full mb-3">
                <SiNodedotjs className="text-4xl text-blue-400" />
              </div>
              <span className="text-white font-medium">Node.js</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-600/20 p-4 rounded-full mb-3">
                <SiExpress className="text-4xl text-blue-400" />
              </div>
              <span className="text-white font-medium">Express.js</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-600/20 p-4 rounded-full mb-3">
                <SiSocketdotio className="text-4xl text-blue-400" />
              </div>
              <span className="text-white font-medium">Socket.io</span>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to start collaborating?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-md transition-colors inline-block font-medium"
            >
              Start Coding
            </Link>
            <Link 
              to="/challenges" 
              className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-md transition-colors inline-block font-medium"
            >
              Try Challenges
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full bg-slate-900 py-4 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <FaCode className="text-blue-400 text-xl mr-2" />
              <span className="text-white text-lg font-bold">CodeCollab</span>
            </div>
            <div className="text-slate-400 text-sm">
              <p>© {new Date().getFullYear()} CodeCollab. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;

