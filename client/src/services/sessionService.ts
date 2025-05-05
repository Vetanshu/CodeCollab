export interface Session {
  id: string;
  name: string;
  lastAccessed: Date;
  language?: string;
}

const sessionService = {
  getUserSessions: (): Session[] => {
    try {
      const sessionsData = localStorage.getItem('userSessions');
      if (sessionsData) {
        // Parse the sessions and ensure lastAccessed is converted to Date objects
        const sessions = JSON.parse(sessionsData);
        return sessions.map((session: any) => ({
          ...session,
          lastAccessed: new Date(session.lastAccessed)
        }));
      }
      return [];
    } catch (error) {
      console.error("Error retrieving user sessions:", error);
      return [];
    }
  },
  
  saveSession(sessionData: Omit<Session, 'lastAccessed'>): Session {
    try {
      const sessions = this.getUserSessions();
      
      const newSession: Session = {
        ...sessionData,
        lastAccessed: new Date()
      };
      
      // Add new session at the beginning of the array
      const updatedSessions = [newSession, ...sessions];
      
      // Limit to last 10 sessions
      const limitedSessions = updatedSessions.slice(0, 10);
      
      localStorage.setItem('userSessions', JSON.stringify(limitedSessions));
      
      return newSession;
    } catch (error) {
      console.error('Error saving session:', error);
      throw error;
    }
  },
  
  getSessionById(sessionId: string): Session | null {
    try {
      const sessions = this.getUserSessions();
      return sessions.find(session => session.id === sessionId) || null;
    } catch (error) {
      console.error('Error retrieving session:', error);
      return null;
    }
  },
  
  deleteSession(sessionId: string): boolean {
    try {
      const sessions = this.getUserSessions();
      const updatedSessions = sessions.filter(session => session.id !== sessionId);
      
      localStorage.setItem('userSessions', JSON.stringify(updatedSessions));
      
      return true;
    } catch (error) {
      console.error('Error deleting session:', error);
      return false;
    }
  }
};

export default sessionService;
