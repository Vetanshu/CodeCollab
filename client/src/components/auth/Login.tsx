import { useState } from "react";
import { FaCode } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import authService from "@/services/authService";

interface LoginProps {
  onLoginSuccess?: () => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.login(formData.username, formData.password);
      toast.success('Successfully logged in!');
      
      // Check if onLoginSuccess exists before calling it
      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess();
      } else {
        // Default behavior if no callback provided
        navigate('/');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      // More specific error messages based on error type
      if (error.response?.status === 401) {
        toast.error('Invalid username or password');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="bg-slate-700 p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-center mb-6">
        <FaCode className="text-blue-400 text-4xl" />
      </div>
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Login to CodeCollab
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-slate-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-slate-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition-colors disabled:bg-blue-800 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : 'Login'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <Link
          to="/signup"
          className="text-blue-300 hover:text-blue-200 text-sm"
        >
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Login;