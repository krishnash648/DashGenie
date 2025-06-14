import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Kanban from "./pages/Kanban";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Customers from "./pages/Customers";
import Charts from "./pages/Charts";
import Login from "./pages/Login";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from 'react-hot-toast';
import ChatbotWidget from './components/ChatbotWidget';
import { NotificationProvider } from "./context/NotificationContext";

const SETTINGS_KEY = 'dashboard_settings';
const AUTH_KEY = 'dashgenie_loggedin';
const PROFILE_KEY = 'dashgenie_profile';
const DEMO_USER = { username: 'admin', password: 'admin123' };

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : { sidebarPosition: 'left', compactMode: false, fontSize: 'base' };
  });
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem(AUTH_KEY) === 'true');
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? JSON.parse(saved) : { username: 'Krishna', profilePic: 'https://randomuser.me/api/portraits/women/44.jpg' };
  });

  useEffect(() => {
    const handler = (e) => setSettings(e.detail);
    window.addEventListener('settingsChanged', handler);
    return () => window.removeEventListener('settingsChanged', handler);
  }, []);

  const handleLogin = (username, password) => {
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
      setLoggedIn(true);
      localStorage.setItem(AUTH_KEY, 'true');

      const newProfile = { username: 'Krishna Sharma', profilePic: 'https://randomuser.me/api/portraits/men/75.jpg' };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
      setProfile(newProfile);

      const existingNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
      const loginNotification = { id: new Date().getTime(), text: 'Successfully logged in!' };
      localStorage.setItem('notifications', JSON.stringify([loginNotification, ...existingNotifications]));
    } else {
      alert('Invalid username or password. Try admin/admin123');
    }
  };

  const handleLogout = () => {
    const existingNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const logoutNotification = { id: new Date().getTime(), text: 'You have logged out.' };
    localStorage.setItem('notifications', JSON.stringify([logoutNotification, ...existingNotifications]));

    setLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(PROFILE_KEY);
  };

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <NotificationProvider>
      <Router>
        <div className={`flex h-screen w-full overflow-hidden ${settings.sidebarPosition === 'right' ? 'flex-row-reverse' : ''}`}>
          <Toaster position="top-right" />
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} compact={settings.compactMode} position={settings.sidebarPosition} />
          <div className="flex-1 flex flex-col">
            <Navbar onLogout={handleLogout} profile={profile} />
            <AnimatePresence mode="wait">
              <motion.main
                className="flex-1 pt-0 pb-4 md:pb-8 w-full h-full overflow-y-auto text-gray-100 p-6 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                key={window.location.pathname}
              >
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/kanban" element={<Kanban />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/charts" element={<Charts />} />
                </Routes>
                <footer className="text-center py-4 text-gray-400 text-xs">
                  © {new Date().getFullYear()} DashGenie by Krishna. All rights reserved.
                </footer>
              </motion.main>
            </AnimatePresence>
          </div>
        </div>

        <ChatbotWidget />
      </Router>
    </NotificationProvider>
  );
}

export default App;
