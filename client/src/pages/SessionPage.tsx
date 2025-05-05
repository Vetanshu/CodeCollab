import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCode, FaArrowLeft, FaTrash } from 'react-icons/fa';
import sessionService, { Session } from '@/services/sessionService';
import authService from '@/services/authService';
import Toast from '@/components/toast/Toast';
import { toast } from 'react-hot-toast';
import ProfileDropdown from '@/components/navbar/ProfileDropdown';

function SessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string>("");
  const [previousSessions, setPreviousSessions] = useState<Session[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      if (!isAuth) {
        // Redirect to login if not authenticated
        navigate('/');
        return;
      }

      setIsAuthenticated(isAuth);
      
      // Get username
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUsername(user.username || "User");
        }
        
        // Load previous sessions
        const sessions = sessionService.getUserSessions();
        setPreviousSessions(sessions);
        
        // Load current session
        if (sessionId) {
          const sessionData = sessionService.getSessionById(sessionId);
          if (sessionData) {
            setSession(sessionData);
          } else {
            toast.error('Session not found');
            navigate('/');
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error('Error loading session data');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [sessionId, navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    toast.success('Successfully logged out');
  };

  const handleDeleteSession = () => {
    if (!sessionId) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this session?');
    if (confirmed) {
      const success = sessionService.deleteSession(sessionId);
      if (success) {
        toast.success('Session deleted successfully');
        navigate('/');
      } else {
        toast.error('Failed to delete session');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-500">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-500">
      {/* Navbar */}
      <nav className="w-full bg-slate-700 py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <FaCode className="text-blue-400 text-2xl mr-2" />
            <span className="text-white text-xl font-bold">CodeCollab</span>
          </div>
          <div className="flex space-x-6 items-center">
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
              <ProfileDropdown 
                username={username}
                onLogout={handleLogout}
                previousSessions={previousSessions}
              />
            )}
          </div>
        </div>
      </nav>

      {/* Session Content */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link 
              to="/"
              className="mr-4 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <FaArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-white">
              {session?.name || 'Session Details'}
            </h1>
          </div>
          <button
            onClick={handleDeleteSession}
            className="flex items-center px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors"
          >
            <FaTrash className="mr-2" />
            Delete Session
          </button>
        </div>

        <div className="bg-slate-700 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-600">
            <h2 className="text-xl font-semibold text-white">Session Information</h2>
            <span className="text-slate-300 text-sm">
              Created: {session ? formatDate(session.date) : 'Unknown'}
            </span>
          </div>

          {session && session.content ? (
            <div className="bg-slate-800 rounded-md p-4 overflow-auto">
              {/* Render session content based on its structure */}
              <pre className="text-white whitespace-pre-wrap">
                {JSON.stringify(session.content, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              No content available for this session
            </div>
          )}
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Toast notifications */}
      <Toast />
    </div>
  );
}

export default SessionPage;
