import image from "@/assets/pngwing.com.png"
import FormComponent from "@/components/forms/FormComponent"
import { Link, useNavigate } from "react-router-dom"
import { FaCode, FaUser } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Toast from "@/components/toast/Toast";
import { toast } from "react-hot-toast";
import authService from "@/services/authService";
import sessionService, { Session } from "@/services/sessionService";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import ProfileDropdown from "@/components/navbar/ProfileDropdown";
import Navbar from "@/components/navbar/Navbar";

// Add CSS for animations
const animationStyles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;

function HomePage() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [previousSessions, setPreviousSessions] = useState<Session[]>([]);

    // Check if user is already authenticated on component mount
    useEffect(() => {
        const checkAuth = () => {
            const isAuth = authService.isAuthenticated();
            setIsAuthenticated(isAuth);

            if (isAuth) {
                // Get username from localStorage
                try {
                    const userData = localStorage.getItem('user');
                    if (userData) {
                        const user = JSON.parse(userData);
                        setUsername(user.username || "User");
                    }

                    // Load previous sessions
                    const sessions = sessionService.getUserSessions();
                    setPreviousSessions(sessions);
                } catch (error) {
                    console.error("Error loading user data:", error);
                }
            }

            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);

        // Get username after login
        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                setUsername(user.username || "User");
            }

            // Load previous sessions
            const sessions = sessionService.getUserSessions();
            console.log("Loaded sessions:", sessions); // Debug log
            setPreviousSessions(sessions);
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    };

    const handleSignupSuccess = () => {
        setIsAuthenticated(true);

        // Get username after signup
        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                setUsername(user.username || "User");
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    };

    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUsername("");
        setPreviousSessions([]);
        toast.success('Successfully logged out');
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-slate-800 to-slate-900">
            {/* Add animation styles */}
            <style>{animationStyles}</style>

            {/* Navbar */}
            {/* Navbar */}
            <Navbar
                isAuthenticated={isAuthenticated}
                username={username}
                previousSessions={previousSessions}
                onLogout={handleLogout}
                activePage="home"
            />

            {/* Main Content */}
            {isAuthenticated ? (
                // Authenticated content
                <div className="flex-grow flex flex-col items-center justify-center w-full">
                    <div className="container mx-auto px-4 py-12">
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            {/* Left side - Image */}
                            <div className="sm:w-1/2 flex justify-center">
                                <div className="relative">
                                    <div className="absolute -inset-1 rounded-full bg-blue-500/30 blur-lg"></div>
                                    <img
                                        src={image}
                                        alt="CodeCollab Illustration"
                                        className="relative mx-auto w-[300px] sm:w-[400px] animate-float"
                                    />
                                </div>
                            </div>

                            {/* Right side - Form and features */}
                            <div className="sm:w-1/2 flex flex-col items-center sm:items-start">
                                <div className="w-[1000vw] max-w-md  rounded-xl p-6 mb-8">
                                    <h2 className="text-2xl font-bold text-white mb-4 text-center ml-20" >Start Coding Together</h2>
                                    <FormComponent />
                                </div>

                                <div className="w-full max-w-md bg-slate-700/80 backdrop-blur-sm rounded-xl shadow-xl p-6 ml-12">
                                    <h2 className="text-2xl font-bold text-white mb-4">Practice Coding Challenges</h2>
                                    <p className="text-slate-300 mb-6">Improve your skills with our LeetCode-style challenges. Solve problems solo or collaborate with friends.</p>
                                    <Link
                                        to="/challenges"
                                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md transition-colors inline-block w-full text-center font-medium"
                                    >
                                        Try Challenges
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Authentication form - using the existing Login/Signup components
                <div className="flex-grow flex flex-col items-center justify-center w-full">
                    <div className="container mx-auto px-4 py-12">
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            {/* Left side - Image with glow effect */}
                            <div className="sm:w-1/2 flex justify-center mb-8 sm:mb-0">
                                <div className="relative">
                                    <div className="absolute -inset-1 rounded-full bg-blue-500/30 blur-lg"></div>
                                    <img
                                        src={image}
                                        alt="CodeCollab Illustration"
                                        className="relative mx-auto w-[300px] sm:w-[400px] animate-float"
                                    />
                                </div>
                            </div>

                            {/* Right side - Auth forms (using existing components) */}

                            {/* Right side - Auth forms (using existing components) */}
                            <div className="sm:w-1/2 w-full max-w-md">
                                <div className="bg-gradient-to-br from-slate-700/90 to-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-slate-600/50 transform transition-all hover:scale-[1.01]">
                                    <div className="flex justify-center mb-6">
                                        <div className="bg-blue-500/20 p-3 rounded-full">
                                            <FaCode className="text-blue-400 text-3xl" />
                                        </div>
                                    </div>

                                    <h2 className="text-3xl font-bold text-white mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                        Welcome to CodeCollab
                                    </h2>

                                    <div className="space-y-4 mb-8">
                                        <p className="text-slate-300 leading-relaxed">
                                            CodeCollab is a real-time collaborative coding platform where developers can code together,
                                            share ideas, and solve problems in a seamless environment.
                                        </p>

                                        <div className="bg-slate-600/30 rounded-lg p-4 border-l-4 border-blue-500">
                                            <p className="text-slate-200 leading-relaxed">
                                                Create rooms, invite teammates, and collaborate on code with our powerful editor.
                                                Try our LeetCode-style challenges to improve your skills.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Link
                                            to="/login"
                                            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-4 rounded-lg transition-all duration-300 inline-block w-full text-center font-medium shadow-lg hover:shadow-blue-500/20 flex items-center justify-center"
                                        >
                                            <FaUser className="mr-2" /> Log In to Your Account
                                        </Link>

                                        <div className="relative my-6">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-slate-600"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-slate-700/90 text-slate-400">or</span>
                                            </div>
                                        </div>

                                        <Link
                                            to="/signup"
                                            className="bg-slate-600/50 hover:bg-slate-600 text-white px-6 py-4 rounded-lg transition-all duration-300 inline-block w-full text-center font-medium border border-slate-500/50"
                                        >
                                            Create New Account
                                        </Link>

                                        <p className="text-center text-slate-400 mt-6">
                                            Enjoy coding with friends and improving your skills together!
                                            
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="w-full bg-slate-900 py-4 mt-auto">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <FaCode className="text-blue-400 text-xl mr-2" />
                            <span className="text-white text-lg font-bold">CodeCollab</span>
                        </div>
                        <div className="text-slate-400 text-sm">
                            <p>© {new Date().getFullYear()} CodeCollab. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Toast notifications */}
            <Toast />
        </div>
    )
}

export default HomePage
