const express = require('express');
const router = express.Router();
const axios = require('axios');

// In-memory database for challenges (replace with MongoDB in production)
const challenges = require('../data/challenges');
const userProgress = {};

// Get all challenges
router.get('/api/challenges', (req, res) => {
  // Return challenges without solutions
  const sanitizedChallenges = challenges.map(challenge => {
    const { solution, ...rest } = challenge;
    return rest;
  });
  
  res.json(sanitizedChallenges);
});

// Get a specific challenge
router.get('/api/challenges/:id', (req, res) => {
  const challenge = challenges.find(c => c.id === parseInt(req.params.id));
  
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }
  
  // Don't send the solution to the client
  const { solution, ...sanitizedChallenge } = challenge;
  res.json(sanitizedChallenge);
});

// Execute code (using Piston API or similar)
router.post('/api/execute', async (req, res) => {
  const { code, language, testCase } = req.body;
  
  try {
    // This is a simplified example. In production, you'd use a secure code execution service
    // like Piston (https://github.com/engineer-man/piston)
    
    // For now, we'll use a simple approach with Function constructor (NOT SECURE FOR PRODUCTION)
    const result = eval(`
      ${code}
      ${testCase}
    `);
    
    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Submit a solution
router.post('/api/challenges/:id/submit', (req, res) => {
  const { code, language } = req.body;
  const challengeId = parseInt(req.params.id);
  const userId = req.user?.id || 'anonymous'; // In production, get from auth middleware
  
  const challenge = challenges.find(c => c.id === challengeId);
  
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }
  
  try {
    // Run all test cases
    const results = challenge.testCases.map(testCase => {
      try {
        // Again, this is NOT secure for production
        const testFunction = new Function(`
          ${code}
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