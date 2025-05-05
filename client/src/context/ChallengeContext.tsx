import React, { createContext, useContext, useState } from 'react';
import { challenges } from '@/data/challenges';
import { CodingChallenge } from '@/types/challenge';

interface ChallengeContextType {
  challenges: CodingChallenge[];
  selectedChallenge: CodingChallenge | null;
  userCode: string;
  testResults: any[];
  selectChallenge: (id: number) => void;
  updateUserCode: (code: string) => void;
  runTests: () => void;
  resetChallenge: () => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<CodingChallenge | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [testResults, setTestResults] = useState<any[]>([]);

  const selectChallenge = (id: number) => {
    const challenge = challenges.find(c => c.id === id) || null;
    setSelectedChallenge(challenge);
    if (challenge) {
      setUserCode(challenge.starterCode);
      setTestResults([]);
    }
  };

  const updateUserCode = (code: string) => {
    setUserCode(code);
  };

  const runTests = async () => {
    if (!selectedChallenge) return;
    
    try {
      // This would typically call your code execution API
      // For now, we'll use a simple eval-based approach (not secure for production)
      const results = selectedChallenge.testCases.map(testCase => {
        try {
          // Create a safe evaluation environment
          const testFunction = new Function(`
            ${userCode}
            const input = ${testCase.input};
            if (Array.isArray(input)) {
              return twoSum(...input);
            } else {
              return twoSum(input);
            }
          `);
          
          const result = testFunction();
          const expectedOutput = JSON.parse(testCase.output);
          const passed = JSON.stringify(result) === JSON.stringify(expectedOutput);
          
          return {
            input: testCase.input,
            expectedOutput: testCase.output,
            actualOutput: JSON.stringify(result),
            passed
          };
        } catch (error) {
          return {
            input: testCase.input,
            expectedOutput: testCase.output,
            actualOutput: error.message,
            passed: false,
            error: true
          };
        }
      });
      
      setTestResults(results);
    } catch (error) {
      console.error("Error running tests:", error);
    }
  };

  const resetChallenge = () => {
    if (selectedChallenge) {
      setUserCode(selectedChallenge.starterCode);
      setTestResults([]);
    }
  };

  return (
    <ChallengeContext.Provider value={{
      challenges,
      selectedChallenge,
      userCode,
      testResults,
      selectChallenge,
      updateUserCode,
      runTests,
      resetChallenge
    }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
};