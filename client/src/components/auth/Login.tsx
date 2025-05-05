import { useState } from "react";
import { FaCode, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import authService from "@/services/authService";

interface LoginProps {
  onLoginSuccess?: () => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    <div className="flex flex-col min-h-screen bg-slate-800">
      {/* Navbar */}
      <nav className="w-full bg-slate-700 py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <FaCode className="text-blue-400 text-2xl mr-2" />
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

      {/* Login Form */}
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-600">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-500 p-4 rounded-full shadow-lg">
              <FaCode className="text-white text-4xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Welcome Back
          </h2>
          <p className="text-slate-300 text-center mb-8">
            Log in to continue your coding journey with CodeCollab
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-slate-400" />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full pl-10 pr-3 py-3 bg-slate-600/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-500 transition-all"
                required
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 bg-slate-600/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 rounded-lg transition-all duration-300 font-medium text-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Don't have an account? <span className="underline">Create one now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
