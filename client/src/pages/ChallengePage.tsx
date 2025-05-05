import React from 'react';
import { useChallenge } from '@/context/ChallengeContext';
import ChallengeList from '@/components/challenges/ChallengeList';
import ChallengeDetail from '@/components/challenges/ChallengeDetail';
import { Link } from 'react-router-dom';
import image from "@/assets/pngwing.com.png";

const ChallengePage: React.FC = () => {
  const { selectedChallenge } = useChallenge();

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
      <div className="flex-grow w-full">
        {selectedChallenge ? <ChallengeDetail /> : <ChallengeList />}
      </div>
    </div>
  );
};

export default ChallengePage;
