export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface CodingChallenge {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: TestCase[];
  testCases: TestCase[];
  starterCode: string;
  solution: string;
  timeLimit?: number; // in milliseconds
  memoryLimit?: number; // in MB
  tags?: string[];
}