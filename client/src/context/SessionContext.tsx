import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

// Define types for our sessions
export interface CodeSession {
  id: string;
  title: string;
  language: string;
  code: string;
  lastModified: string;
}

interface SessionContextType {
  sessions: CodeSession[];
  activeSession: CodeSession | null;
  loadSessions: () => void;
  saveSession: (session: CodeSession) => void;
  deleteSession: (sessionId: string) => void;
  createSession: (title: string, language: string, code: string) => CodeSession;
  setActiveSession: (sessionId: string) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [sessions, setSessions] = useState<CodeSession[]>([]);
  const [activeSession, setActiveSession] = useState<CodeSession | null>(null);

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const username = localStorage.getItem('username');
    if (!username) return;
    
    const sessionsKey = `codecollab_sessions_${username}`;
    const savedSessions = localStorage.getItem(sessionsKey);
    
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions);
        setSessions(parsedSessions);
      } catch (error) {
        console.error('Error parsing saved sessions:', error);
        setSessions([]);
      }
    }
  };

  const saveSession = (session: CodeSession) => {
    const username = localStorage.getItem('username');
    if (!username) {
      toast.error('User not found');
      return;
    }
    
    const updatedSessions = sessions.map(s => 
      s.id === session.id ? { ...session, lastModified: new Date().toISOString() } : s
    );
    
    setSessions(updatedSessions);
    
    const sessionsKey = `codecollab_sessions_${username}`;
    localStorage.setItem(sessionsKey, JSON.stringify(updatedSessions));
    
    if (activeSession?.id === session.id) {
      setActiveSession({ ...session, lastModified: new Date().toISOString() });
    }
    
    toast.success('Session saved successfully');
  };

  const deleteSession = (sessionId: string) => {
    const username = localStorage.getItem('username');
    if (!username) {
      toast.error('User not found');
      return;
    }
    
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    setSessions(updatedSessions);
    
    const sessionsKey = `codecollab_sessions_${username}`;
    localStorage.setItem(sessionsKey, JSON.stringify(updatedSessions));
    
    if (activeSession?.id === sessionId) {
      setActiveSession(null);
    }
    
    toast.success('Session deleted');
  };

  const createSession = (title: string, language: string, code: string): CodeSession => {
    const username = localStorage.getItem('username');
    if (!username) {
      toast.error('User not found');
      throw new Error('User not found');
    }
    
    const newSession: CodeSession = {
      id: crypto.randomUUID(),
      title,
      language,
      code,
      lastModified: new Date().toISOString()
    };
    
    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    
    const sessionsKey = `codecollab_sessions_${username}`;
    localStorage.setItem(sessionsKey, JSON.stringify(updatedSessions));
    
    toast.success('New session created');
    return newSession;
  };

  const setActiveSessionById = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId) || null;
    setActiveSession(session);
  };

  const value = {
    sessions,
    activeSession,
    loadSessions,
    saveSession,
    deleteSession,
    createSession,
    setActiveSession: setActiveSessionById
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};