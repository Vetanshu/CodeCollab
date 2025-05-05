import image from "@/assets/pngwing.com.png"
import FormComponent from "@/components/forms/FormComponent"
import { Link, useNavigate } from "react-router-dom"
import { FaCode } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Toast from "@/components/toast/Toast";
import { toast } from "react-hot-toast";
import authService from "@/services/authService";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";

function HomePage() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
    const navigate = useNavigate();

    // Check if user is already authenticated on component mount
    useEffect(() => {
        const checkAuth = () => {
            const isAuth = authService.isAuthenticated();
            setIsAuthenticated(isAuth);
            setIsLoading(false);
        };
        
        checkAuth();
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleSignupSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
        toast.success('Successfully logged out');
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-500">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center bg-slate-500">
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
                        {isAuthenticated && (
                            <button 
                                onClick={handleLogout}
                                className="text-white hover:text-red-400 transition-colors font-medium"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            {isAuthenticated ? (
                // Authenticated content
                <div className="flex-grow flex flex-col items-center justify-center gap-16 w-full">
                    <div className="my-12 flex h-full min-w-full flex-col items-center justify-evenly sm:flex-row sm:pt-0">
                        <div className="flex w-full animate-up-down justify-center sm:w-1/2 sm:pl-4">
                            <img
                                src={image}
                                alt="CodeCollab Illustration"
                                className="mx-auto h-300px w-[300px] sm:w-[400px]"
                            />
                        </div>
                        <div className="flex w-full flex-col items-center justify-center sm:w-1/2">
                            <FormComponent />
                            <div className="mt-8 text-center">
                                <h2 className="text-2xl font-bold text-white mb-4">Practice Coding Challenges</h2>
                                <p className="text-white mb-4">Improve your skills with our LeetCode-style challenges</p>
                                <Link 
                                    to="/challenges" 
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md transition-colors inline-block"
                                >
                                    Try Challenges
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Authentication form - now using separate components
                <div className="flex-grow flex items-center justify-center w-full">
                    {showLoginForm ? (
                        <Login onLoginSuccess={handleLoginSuccess} />
                    ) : (
                        <Signup onSignupSuccess={handleSignupSuccess} />
                    )}
                    
                    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
                        <button
                            onClick={() => setShowLoginForm(!showLoginForm)}
                            className="text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md transition-colors"
                        >
                            {showLoginForm ? "Need an account? Sign up" : "Already have an account? Login"}
                        </button>
                    </div>
                </div>
            )}
            
            {/* Toast notifications */}
            <Toast />
        </div>
    )
}

export default HomePage
