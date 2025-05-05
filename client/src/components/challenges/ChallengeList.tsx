import React from 'react';
import { useChallenge } from '@/context/ChallengeContext';

const ChallengeList: React.FC = () => {
  const { challenges, selectChallenge } = useChallenge();

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Coding Challenges</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map(challenge => (
          <div 
            key={challenge.id} 
            className="bg-slate-700 rounded-lg shadow-lg p-6 cursor-pointer hover:bg-slate-600 transition-colors"
            onClick={() => selectChallenge(challenge.id)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                challenge.difficulty === "Easy" ? "bg-green-500" : 
                challenge.difficulty === "Medium" ? "bg-yellow-500" : "bg-red-500"
              }`}>
                {challenge.difficulty}
              </span>
            </div>
            <p className="text-slate-300 line-clamp-3">{challenge.description}</p>
            {challenge.tags && (
              <div className="mt-4 flex flex-wrap gap-2">
                {challenge.tags.map(tag => (
                  <span key={tag} className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeList;