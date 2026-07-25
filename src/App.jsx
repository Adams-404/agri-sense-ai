import { Routes, Route } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Home from './pages/Home'
import DiseaseDetection from './pages/DiseaseDetection'
import ChatAssistant from './pages/ChatAssistant'
import Marketplace from './pages/Marketplace'
import MarketPrices from './pages/MarketPrices'
import Weather from './pages/Weather'
import Dashboard from './pages/Dashboard'
import Forum from './pages/Forum'
import About from './pages/About'
import Features from './pages/Features'
import News from './pages/News'
import Profile from './pages/Profile'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Admin from './pages/Admin'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

function AppContent() {
  const { darkMode } = useApp()

  return (
    <div className={darkMode ? 'dark' : ''} style={{ minHeight: '100vh' }}>
      <Navbar />
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detect" element={<DiseaseDetection />} />
        <Route path="/chat" element={<ChatAssistant />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/prices" element={<MarketPrices />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
