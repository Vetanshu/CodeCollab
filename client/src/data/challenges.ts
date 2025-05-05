import { CodingChallenge } from "@/types/challenge";

export const challenges: CodingChallenge[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    testCases: [
      { input: "[2,7,11,15], 9", output: "[0,1]" },
      { input: "[3,2,4], 6", output: "[1,2]" },
      { input: "[3,3], 6", output: "[0,1]" },
      { input: "[1,2,3,4,5], 9", output: "[3,4]" }
    ],
    starterCode: "function twoSum(nums, target) {\n    // Your code here\n}",
    solution: "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}",
    tags: ["Array", "Hash Table"]
  },
  {
    id: 2,
    title: "Palindrome Number",
    difficulty: "Easy",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
    examples: [
      { input: "x = 121", output: "true" },
      { input: "x = -121", output: "false" },
      { input: "x = 10", output: "false" }
    ],
    testCases: [
      { input: "121", output: "true" },
      { input: "-121", output: "false" },
      { input: "10", output: "false" },
      { input: "12321", output: "true" }
    ],
    starterCode: "function isPalindrome(x) {\n    // Your code here\n}",
    solution: "function isPalindrome(x) {\n    const str = x.toString();\n    return str === str.split('').reverse().join('');\n}",
    tags: ["Math", "Two Pointers"]
  },
  {
    id: 3,
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: "s = '()'", output: "true" },
      { input: "s = '()[]{}'", output: "true" },
      { input: "s = '(]'", output: "false" }
    ],
    testCases: [
      { input: "'()'", output: "true" },
      { input: "'()[]{}'", output: "true" },
      { input: "'(]'", output: "false" },
      { input: "'([)]'", output: "false" },
      { input: "'{[]}'", output: "true" }
    ],
    starterCode: "function isValid(s) {\n    // Your code here\n}",
    solution: "function isValid(s) {\n    const stack = [];\n    const map = {')': '(', ']': '[', '}': '{'};\n    for (let char of s) {\n        if (['(', '[', '{'].includes(char)) {\n            stack.push(char);\n        } else {\n            if (stack.pop() !== map[char]) {\n                return false;\n            }\n        }\n    }\n    return stack.length === 0;\n}",
    tags: ["Stack", "String"]
  },
  {
    id: 4,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      { input: "s = 'abcabcbb'", output: "3", explanation: "The answer is 'abc', with length 3." },
      { input: "s = 'bbbbb'", output: "1", explanation: "The answer is 'b', with length 1." }
    ],
    testCases: [
      { input: "'abcabcbb'", output: "3" },
      { input: "'bbbbb'", output: "1" },
      { input: "'pwwkew'", output: "3" },
      { input: "'abcdef'", output: "6" }
    ],
    starterCode: "function lengthOfLongestSubstring(s) {\n    // Your code here\n}",
    solution: "function lengthOfLongestSubstring(s) {\n    let set = new Set();\n    let left = 0, maxLength = 0;\n    for (let right = 0; right < s.length; right++) {\n        while (set.has(s[right])) {\n            set.delete(s[left]);\n            left++;\n        }\n        set.add(s[right]);\n        maxLength = Math.max(maxLength, right - left + 1);\n    }\n    return maxLength;\n}",
    tags: ["Hash Table", "Sliding Window", "String"]
  },
  {
    id: 5,
    title: "Factorial",
    difficulty: "Easy",
    description: "Given a non-negative integer n, write a function to return the factorial of n using recursion.",
    examples: [
      { input: "n = 5", output: "120", explanation: "5! = 5 * 4 * 3 * 2 * 1 = 120" },
      { input: "n = 0", output: "1", explanation: "0! is defined as 1" }
    ],
    testCases: [
      { input: "5", output: "120" },
      { input: "0", output: "1" },
      { input: "1", output: "1" },
      { input: "3", output: "6" }
    ],
    starterCode: "function factorial(n) {\n    // Your code here\n}",
    solution: "function factorial(n) {\n    if (n === 0 || n === 1) return 1;\n    return n * factorial(n - 1);\n}",
    tags: ["Recursion", "Math"]
  },
  {
    id: 6,
    title: "Binary Search",
    difficulty: "Easy",
    description: "Given a sorted array of integers and a target value, return the index if the target is found. If not, return -1.",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" }
    ],
    testCases: [
      { input: "[-1,0,3,5,9,12], 9", output: "4" },
      { input: "[-1,0,3,5,9,12], 2", output: "-1" },
      { input: "[1,2,3,4,5], 5", output: "4" },
      { input: "[1,2,3,4,5], 0", output: "-1" }
    ],
    starterCode: "function binarySearch(nums, target) {\n    // Your code here\n}",
    solution: "function binarySearch(nums, target) {\n    let left = 0, right = nums.length - 1;\n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        if (nums[mid] === target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}",
    tags: ["Binary Search", "Array"]
  }
  
];
