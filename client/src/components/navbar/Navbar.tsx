import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode } from "react-icons/fa6";
import ProfileDropdown from "@/components/navbar/ProfileDropdown";
import { Session } from "@/services/sessionService";

interface NavbarProps {
  isAuthenticated: boolean;
  username: string;
  previousSessions: Session[];
  onLogout: () => void;
  activePage?: 'home' | 'challenges' | 'about';
}

const Navbar: React.FC<NavbarProps> = ({ 
  isAuthenticated, 
  username, 
  previousSessions, 
  onLogout,
  activePage = 'home'
}) => {
  return (
    <nav className="w-full bg-slate-700/90 backdrop-blur-sm py-4 px-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <FaCode className="text-blue-400 text-2xl mr-2" />
          <span className="text-white text-xl font-bold">CodeCollab</span>
        </div>
        <div className="flex space-x-6 items-center">
          <Link 
            to="/" 
            className={`text-white hover:text-blue-300 transition-colors font-medium ${
              activePage === 'home' ? 'border-b-2 border-blue-400 pb-1' : ''
            }`}
          >
            Home
          </Link>
          <Link 
            to="/challenges" 
            className={`text-white hover:text-blue-300 transition-colors font-medium ${
              activePage === 'challenges' ? 'border-b-2 border-blue-400 pb-1' : ''
            }`}
          >
            Challenges
          </Link>
          <Link 
            to="/about" 
            className={`text-white hover:text-blue-300 transition-colors font-medium ${
              activePage === 'about' ? 'border-b-2 border-blue-400 pb-1' : ''
            }`}
          >
            About
          </Link>
          {isAuthenticated && (
            <ProfileDropdown 
              username={username}
              onLogout={onLogout}
              previousSessions={previousSessions}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;