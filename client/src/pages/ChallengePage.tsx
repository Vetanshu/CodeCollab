import React, { useState, useEffect } from 'react';
import { useChallenge } from '@/context/ChallengeContext';
import ChallengeList from '@/components/challenges/ChallengeList';
import ChallengeDetail from '@/components/challenges/ChallengeDetail';
import { Link } from 'react-router-dom';
import { FaCode } from "react-icons/fa6";
import authService from "@/services/authService";
import sessionService, { Session } from "@/services/sessionService";
import ProfileDropdown from "@/components/navbar/ProfileDropdown";

// Add CSS for animations
const animationStyles = `
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

const ChallengePage: React.FC = () => {
  const { selectedChallenge } = useChallenge();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [previousSessions, setPreviousSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
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
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUsername("");
    setPreviousSessions([]);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-slate-800 to-slate-900">
      {/* Add animation styles */}
      <style>{animationStyles}</style>
      
      {/* Navbar */}
      <nav className="w-full bg-slate-700/90 backdrop-blur-sm py-4 px-6 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <FaCode className="text-blue-400 text-2xl mr-2" />
            <span className="text-white text-xl font-bold">CodeCollab</span>
          </div>
          <div className="flex space-x-6 items-center">
            <Link 
              to="/" 
              className="text-white hover:text-blue-300 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/challenges" 
              className="text-white hover:text-blue-300 transition-colors font-medium border-b-2 border-blue-400 pb-1"
            >
              Challenges
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-blue-300 transition-colors font-medium"
            >
              About
            </Link>
            {isAuthenticated && (
              <ProfileDropdown 
                username={username}
                onLogout={handleLogout}
                previousSessions={previousSessions}
              />
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow w-full container mx-auto px-4 py-8 animate-fade-in">
        <div className="bg-slate-700/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          {selectedChallenge ? (
            <ChallengeDetail />
          ) : (
            <div className="p-6">
              <h1 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-blue-500/20 p-2 rounded-full mr-3">
                  <FaCode className="text-blue-400" />
                </span>
                Coding Challenges
              </h1>
              <p className="text-slate-300 mb-6">
                Improve your coding skills with our collection of challenges. 
                Select a challenge to start coding and test your solution.
              </p>
              <ChallengeList />
            </div>
          )}
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

export default ChallengePage;
