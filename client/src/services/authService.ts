import axios from 'axios';

interface DecodedToken {
  userId: string;
  username: string;
  exp: number;
}

// Update this to point to your actual server URL
const API_BASE_URL = 'http://localhost:5001'; // Your server URL
const API_URL = `${API_BASE_URL}/api/auth`;

class AuthService {
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      // Simple token expiration check without jwt-decode
      // We'll verify with the server instead
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  async verifyToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;
      
      const response = await axios.get(`${API_URL}/verify`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data.valid;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  async login(username: string, password: string): Promise<any> {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('username', username);
    }
    return response.data;
  }

  async signup(username: string, email: string, password: string): Promise<any> {
    const response = await axios.post(`${API_URL}/signup`, { username, email, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('username', username);
    }
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  }
}

export default new AuthService();