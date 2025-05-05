import React from 'react';
import { useChallenge } from '@/context/ChallengeContext';
import CodeEditor from '@/components/editor/CodeEditor';

const ChallengeDetail: React.FC = () => {
  const { 
    selectedChallenge, 
    userCode, 
    testResults, 
    updateUserCode, 
    runTests, 
    resetChallenge,
    selectChallenge
  } = useChallenge();

  if (!selectedChallenge) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-slate-700 rounded-lg shadow-lg p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">{selectedChallenge.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedChallenge.difficulty === "Easy" ? "bg-green-500" : 
            selectedChallenge.difficulty === "Medium" ? "bg-yellow-500" : "bg-red-500"
          }`}>
            {selectedChallenge.difficulty}
          </span>
        </div>
        
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-2">Problem:</h4>
          <p className="text-slate-300">{selectedChallenge.description}</p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-2">Examples:</h4>
          {selectedChallenge.examples.map((example, index) => (
            <div key={index} className="mb-4 bg-slate-800 p-4 rounded-md">
              <p><span className="font-medium">Input:</span> {example.input}</p>
              <p><span className="font-medium">Output:</span> {example.output}</p>
              {example.explanation && (
                <p><span className="font-medium">Explanation:</span> {example.explanation}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-2">Your Solution:</h4>
          <div className="h-80 bg-slate-800 rounded-md overflow-hidden">
            <CodeEditor 
              value={userCode} 
              onChange={updateUserCode} 
              language="javascript" 
            />
          </div>
        </div>
        
        {testResults.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Test Results:</h4>
            <div className="bg-slate-800 p-4 rounded-md">
              {testResults.map((result, index) => (
                <div key={index} className={`mb-2 p-2 rounded ${result.passed ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                  <p><span className="font-medium">Test {index + 1}:</span> {result.passed ? 'Passed ✓' : 'Failed ✗'}</p>
                  <p><span className="font-medium">Input:</span> {result.input}</p>
                  <p><span className="font-medium">Expected:</span> {result.expectedOutput}</p>
                  <p><span className="font-medium">Actual:</span> {result.actualOutput}</p>
                </div>
              ))}
              <div className="mt-4">
                <p className="font-medium">
                  Summary: {testResults.filter(r => r.passed).length} of {testResults.length} tests passed
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between">
          <button 
            onClick={() => selectChallenge(0)}
            className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-md transition-colors"
          >
            Back to Challenges
          </button>
          <div className="flex gap-2">
            <button 
              onClick={resetChallenge}
              className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-md transition-colors"
            >
              Reset Code
            </button>
            <button 
              onClick={runTests}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition-colors"
            >
              Run Tests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;