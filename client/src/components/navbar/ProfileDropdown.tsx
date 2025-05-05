import { useState, useRef, useEffect } from 'react';
import { FaUser, FaSignOutAlt, FaHistory, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Session } from '@/services/sessionService';
import { format, isToday, isYesterday } from 'date-fns';

interface ProfileDropdownProps {
  username: string;
  onLogout: () => void;
  previousSessions: Session[];
}

const ProfileDropdown = ({ username, onLogout, previousSessions }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format date for display
  const formatSessionDate = (date: Date | string) => {
    const sessionDate = date instanceof Date ? date : new Date(date);
    
    if (isToday(sessionDate)) {
      return `Today at ${format(sessionDate, 'h:mm a')}`;
    } else if (isYesterday(sessionDate)) {
      return `Yesterday at ${format(sessionDate, 'h:mm a')}`;
    } else {
      return format(sessionDate, 'MMM d, yyyy');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center space-x-1 text-white hover:text-blue-300 transition-colors font-medium"
      >
        <FaUser className="text-blue-400" />
        <span>{username}</span>
        <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-600 rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-3 border-b border-slate-600">
            <p className="text-sm text-white font-medium">Signed in as</p>
            <p className="text-sm text-blue-400 font-bold">{username}</p>
          </div>

          {previousSessions && previousSessions.length > 0 && (
            <>
              <div className="px-4 py-2 border-b border-slate-600">
                <p className="text-sm text-slate-300 font-medium">Previous Sessions</p>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {previousSessions.map(session => (
                  <Link 
                    key={session.id}
                    to={`/session/${session.id}`}
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-slate-700 transition-colors"
                  >
                    <FaHistory className="mr-2 text-slate-400" />
                    <div>
                      <p className="font-medium">{session.name}</p>
                      <p className="text-xs text-slate-400">{formatSessionDate(session.lastAccessed)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          <button
            onClick={onLogout}
            className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-slate-700 transition-colors"
          >
            <FaSignOutAlt className="mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
