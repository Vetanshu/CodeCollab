import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import ChallengePage from '@/pages/ChallengePage'
import AboutPage from '@/pages/AboutPage'
import EditorPage from '@/pages/EditorPage'
import Login from '@/components/auth/Login'
import Signup from '@/components/auth/Signup'
import { ChallengeProvider } from '@/context/ChallengeContext'
import Toast from '@/components/toast/Toast'
import SessionPage from './pages/SessionPage';


function App() {
    return (
      <Router>
        <ChallengeProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/session/:sessionId" element={<SessionPage />} />
            <Route path="/challenges" element={<ChallengePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/editor/:roomId" element={<EditorPage />} />
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
            <Toast/>
        </ChallengeProvider>
      </Router>
    )
}

export default App
