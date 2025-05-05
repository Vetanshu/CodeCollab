import React, { useState } from 'react';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-themes-all';
import axios from 'axios';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
  testCases?: string[];
  expectedOutputs?: string[];
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  value, 
  onChange, 
  language = 'javascript',
  onLanguageChange,
  testCases = [],
  expectedOutputs = [],
  readOnly = false
}) => {
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{passed: boolean, output: string}[]>([]);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState<boolean>(false);

  // Available languages
  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'cpp', name: 'C++' }
  ];

  const getLanguageExtension = () => {
    switch (language.toLowerCase()) {
      case 'javascript':
      case 'js':
        return javascript();
      case 'python':
      case 'py':
        return python();
      case 'java':
        return java();
      case 'cpp':
      case 'c++':
        return cpp();
      default:
        return javascript();
    }
  };

  // Map our language names to Judge0 language IDs
  const getLanguageId = () => {
    switch (language.toLowerCase()) {
      case 'javascript':
      case 'js':
        return 63; // Node.js
      case 'python':
      case 'py':
        return 71; // Python 3
      case 'java':
        return 62; // Java
      case 'cpp':
      case 'c++':
        return 54; // C++
      default:
        return 63; // Default to Node.js
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
    setShowLanguageDropdown(false);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    try {
      // Using Judge0 API (you'll need to set up your own instance or use a public one)
      const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
        source_code: value,
        language_id: getLanguageId(),
        stdin: testCases[0] || ''
      }, {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY || 'YOUR_RAPIDAPI_KEY',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      });
      
      const token = response.data.token;
      
      // Poll for results
      setTimeout(async () => {
        const resultResponse = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY || 'YOUR_RAPIDAPI_KEY',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        });
        
        const result = resultResponse.data;
        
        if (result.status.id <= 2) {
          // Still processing, poll again
          setTimeout(() => runCode(), 1000);
          return;
        }
        
        if (result.status.id === 3) {
          // Successful run
          setOutput(result.stdout || 'Code executed successfully with no output');
        } else {
          // Error occurred
          setOutput(`Error: ${result.stderr || result.status.description}`);
        }
        
        setIsRunning(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput('Error executing code. Please try again.');
      setIsRunning(false);
    }
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    const results = [];
    
    for (let i = 0; i < testCases.length; i++) {
      try {
        const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
          source_code: value,
          language_id: getLanguageId(),
          stdin: testCases[i]
        }, {
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY || 'YOUR_RAPIDAPI_KEY',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        });
        
        const token = response.data.token;
        
        // Wait for result
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const resultResponse = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY || 'YOUR_RAPIDAPI_KEY',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        });
        
        const result = resultResponse.data;
        
        if (result.status.id === 3) {
          // Successful run
          const output = result.stdout?.trim() || '';
          const expected = expectedOutputs[i]?.trim() || '';
          results.push({
            passed: output === expected,
            output: output
          });
        } else {
          // Error occurred
          results.push({
            passed: false,
            output: `Error: ${result.stderr || result.status.description}`
          });
        }
        
      } catch (error) {
        console.error('Error executing test case:', error);
        results.push({
          passed: false,
          output: 'Error executing code'
        });
      }
    }
    
    setTestResults(results);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col h-full border border-slate-700 rounded-lg overflow-hidden shadow-lg">
      {/* Editor Header with language selector */}
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
        <div className="text-slate-200 font-medium flex items-center relative">
          <button 
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center mr-2 hover:bg-slate-700 px-2 py-1 rounded transition-colors"
            disabled={readOnly}
          >
            <span className="mr-2">
              {languages.find(lang => lang.id === language.toLowerCase())?.name || language}
            </span>
            {!readOnly && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            )}
          </button>
          <div className={`w-2 h-2 rounded-full bg-green-500`}></div>
          
          {/* Language dropdown */}
          {showLanguageDropdown && !readOnly && (
            <div className="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-10">
              {languages.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang.id)}
                  className={`block w-full text-left px-4 py-2 hover:bg-slate-700 transition-colors ${
                    language.toLowerCase() === lang.id ? 'bg-slate-700' : ''
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={runCode}
            disabled={isRunning}
            className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 text-sm rounded transition-colors disabled:bg-gray-600 disabled:opacity-70 flex items-center"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Running...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Run Code
              </>
            )}
          </button>
          
          {testCases.length > 0 && (
            <button 
              onClick={runTests}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 text-sm rounded transition-colors disabled:bg-gray-600 disabled:opacity-70 flex items-center"
            >
              {isRunning ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Running Tests...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                  Run Tests
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Code Editor */}
      <div className="flex-grow">
        <CodeMirror
          value={value}
          height="100%"
          theme={dracula}
          extensions={[getLanguageExtension(), EditorView.lineWrapping]}
          onChange={onChange}
          readOnly={readOnly}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </div>
      
      {/* Output Section */}
      <div className="border-t border-slate-700">
        <div className="bg-slate-900 px-4 py-2 text-slate-300 font-medium flex items-center justify-between">
          <span>Output</span>
          {isRunning && (
            <span className="text-xs text-slate-400 flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          )}
        </div>
        
        <div className="max-h-60 overflow-auto bg-slate-800">
          {output ? (
            <pre className="text-slate-300 whitespace-pre-wrap p-4 text-sm font-mono">{output}</pre>
          ) : (
            <div className="p-4 text-slate-500 italic text-sm">Run your code to see output here</div>
          )}
          
          {testResults.length > 0 && (
  <div className="border-t border-slate-700 p-4">
    <h3 className="text-white font-semibold mb-3 text-sm">Test Results:</h3>
    <div className="space-y-2">
      {testResults.map((result, index) => (
        <div
          key={index}
          className={`p-3 rounded-md ${
            result.passed
              ? 'bg-green-900/30 border border-green-700/30'
              : 'bg-red-900/30 border border-red-700/30'
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <p className="text-white text-sm font-medium">Test {index + 1}</p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                result.passed
                  ? 'bg-green-700 text-green-100'
                  : 'bg-red-700 text-red-100'
              }`}
            >
              {result.passed ? 'Passed ✓' : 'Failed ✗'}
            </span>
          </div>
          <p className="text-slate-300">
            <span className="font-medium">Output:</span> {result.output}
          </p>
          {!result.passed && expectedOutputs[index] && (
            <p className="text-slate-300">
              <span className="font-medium">Expected:</span> {expectedOutputs[index]}
            </p>
          )}
        </div>
      ))}
    </div>
    <div className="mt-4 text-white font-medium">
      Summary: {testResults.filter((r) => r.passed).length} of {testResults.length} tests passed
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
} 

export default CodeEditor;
