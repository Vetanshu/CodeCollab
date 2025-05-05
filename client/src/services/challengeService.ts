import { CodingChallenge } from '@/components/challenges/ChallengeList';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const executeCode = async (code: string, language: string, testCase: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/execute`, {
      code,
      language,
      testCase
    });
    return response.data;
  } catch (error) {
    console.error('Error executing code:', error);
    throw error;
  }
};

export const submitChallenge = async (challengeId: number, code: string, language: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/challenges/${challengeId}/submit`, {
      code,
      language
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting challenge:', error);
    throw error;
  }
};

export const getUserProgress = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${userId}/progress`);
    return response.data;
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
};