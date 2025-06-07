/**
 * Celebal Dashboard
 * Developed by Krishna
 * © 2025 All rights reserved.
 */
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Kanban from "./pages/Kanban";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from 'react-hot-toast';

const SETTINGS_KEY = 'dashboard_settings';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : {
      sidebarPosition: 'left',
      compactMode: false,
      fontSize: 'base',
    };
  });

  useEffect(() => {
    const handler = (e) => setSettings(e.detail);
    window.addEventListener('settingsChanged', handler);
    return () => window.removeEventListener('settingsChanged', handler);
  }, []);

  return (
    <Router>
      <div className={`flex h-screen w-full overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500 ${settings.sidebarPosition === 'right' ? 'flex-row-reverse' : ''}`}>
        <Toaster position="top-right" />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} compact={settings.compactMode} position={settings.sidebarPosition} />
        <div className={`flex-1 flex flex-col ${settings.compactMode ? 'ml-20' : 'ml-40'} ${settings.sidebarPosition === 'right' ? (settings.compactMode ? 'mr-20 ml-0' : 'mr-40 ml-0') : ''}`}>
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <AnimatePresence mode="wait">
            <motion.main
              className="flex-1 pt-0 px-4 md:px-8 pb-4 md:pb-8 w-full h-full overflow-y-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all transition-colors duration-500"
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
              </Routes>
              {/* Footer */}
              <footer className="text-center py-4 text-gray-400 text-xs">
                © {new Date().getFullYear()} Celebal Dashboard by Krishna. All rights reserved.
              </footer>
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

export default App;