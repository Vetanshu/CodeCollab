import { useState, useEffect } from 'react';

interface Session {
  id: string;
  name: string;
  lastAccessed: Date;
  language?: string;
}

export const useSessionHistory = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        
        // This would normally be an API call to fetch user's session history
        // For now, we'll use mock data
        const mockSessions: Session[] = [
          {
            id: '1',
            name: 'JavaScript Project',
            lastAccessed: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            language: 'javascript'
          },
          {
            id: '2',
            name: 'React App',
            lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            language: 'typescript'
          },
          {
            id: '3',
            name: 'Python Algorithm',
            lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            language: 'python'
          }
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setSessions(mockSessions);
          setIsLoading(false);
        }, 500);
        
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch sessions'));
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return { sessions, isLoading, error };
};