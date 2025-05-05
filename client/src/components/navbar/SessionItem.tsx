import { FaCode, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';

interface Session {
  id: string;
  name: string;
  lastAccessed: Date;
  language?: string;
}

interface SessionItemProps {
  session: Session;
}

const SessionItem = ({ session }: SessionItemProps) => {
  // Convert string date to Date object if needed
  const sessionDate = session.lastAccessed instanceof Date 
    ? session.lastAccessed 
    : new Date(session.lastAccessed);
  
  // Format relative time (e.g., "2 hours ago")
  const timeAgo = formatDistanceToNow(sessionDate, { addSuffix: true });
  
  // Format absolute date based on when it occurred
  let formattedDate = '';
  if (isToday(sessionDate)) {
    formattedDate = `Today at ${format(sessionDate, 'h:mm a')}`;
  } else if (isYesterday(sessionDate)) {
    formattedDate = `Yesterday at ${format(sessionDate, 'h:mm a')}`;
  } else {
    formattedDate = format(sessionDate, 'MMM d, yyyy');
  }
  
  // Determine language display
  const displayLanguage = session.language || 'Unknown';
  
  return (
    <Link
      to={`/session/${session.id}`}
      className="block px-4 py-3 hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-b-0"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <FaCode className="text-blue-400" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-white truncate">{session.name}</p>
          <div className="flex items-center mt-1">
            <FaClock className="text-slate-400 text-xs mr-1" />
            <p className="text-xs text-slate-400">{timeAgo}</p>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="flex items-center">
              <FaCalendarAlt className="text-slate-400 text-xs mr-1" />
              <p className="text-xs text-slate-400">{formattedDate}</p>
            </div>
            <span className="text-xs px-2 py-1 bg-slate-600 rounded-full text-blue-300">
              {displayLanguage}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SessionItem;
