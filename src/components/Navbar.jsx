import toast from 'react-hot-toast';
import React, { useState, useCallback } from "react";
import {
  FaShoppingCart,
  FaComments,
  FaBell,
  FaUserEdit,
  FaQuestionCircle,
} from "react-icons/fa";

const Navbar = ({ onLogout }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications")) || []
  );

  const addNotification = useCallback((text) => {
    toast.success(text);
    setNotifications((prevNotifications) => {
      const newNotification = { id: new Date().getTime(), text };
      const updatedNotifications = [newNotification, ...prevNotifications];
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
      return updatedNotifications;
    });
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  React.useEffect(() => {
    addNotification("Welcome back!");
  }, [addNotification]);

  return (
    <nav
      className="flex items-center justify-between px-8 py-0 shadow relative"
      style={{ background: "var(--primary-color)", color: "var(--text-color)" }}
    >
      <div>
        <h1 className="text-lg font-bold" style={{ color: "var(--text-color)" }}>
          DashGenie
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded focus:outline-none focus:w-64 transition-all duration-200 w-32"
          style={{ background: "var(--background-color)", color: "var(--text-color)" }}
        />

        <button className="relative" aria-label="Cart">
          <FaShoppingCart className="text-xl text-gray-600 dark:text-gray-300" />
        </button>

        <button className="relative" aria-label="Chat">
          <FaComments className="text-xl text-gray-600 dark:text-gray-300" />
        </button>

        <div className="relative">
          <button onClick={() => setShowNotif(!showNotif)} className="relative" aria-label="Notifications">
            <FaBell className="text-xl text-gray-600 dark:text-gray-300" />
            {notifications.length > 0 && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>}
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
              <div className="p-2 font-semibold border-b dark:border-gray-700 flex justify-between items-center">
                Notifications
                <button className="text-xs text-red-600 hover:underline" onClick={clearNotifications}>Clear All</button>
              </div>
              {notifications.length > 0 ? notifications.map((n) => (
                <div key={n.id} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">{n.text}</div>
              )) : (
                <div className="p-2 text-gray-500 text-sm">No notifications</div>
              )}
              <div className="p-2 text-xs text-center text-blue-600 cursor-pointer hover:underline">View all</div>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setShowProfile(!showProfile)} aria-label="User Profile">
            <img src={profilePic || "https://randomuser.me/api/portraits/women/44.jpg"} alt="User Avatar" className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-700" />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg z-10 p-2">
              <div className="p-2 border-b dark:border-gray-700 text-sm">Signed in as <b>Krishna</b></div>
              <label className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm flex items-center gap-2">
                <FaUserEdit /> Upload New Pic
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm">Profile</div>
              <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm">Settings</div>
              <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-600 text-sm" onClick={() => {
                clearNotifications();
                onLogout();
              }}>Logout</div>
            </div>
          )}
        </div>

        <button className="relative" aria-label="Help/About" onClick={() => setShowHelp(true)} title="Help / About">
          <FaQuestionCircle className="text-xl text-gray-600 dark:text-gray-300" />
        </button>

        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" onClick={() => setShowHelp(false)} aria-label="Close Help">×</button>
              <h2 className="text-xl font-bold mb-4">About DashGenie</h2>
              <p className="mb-2">This dashboard was developed by Krishna as a modern React Admin Dashboard project.</p>
              <ul className="list-disc pl-5 mb-2 text-sm">
                <li>Customizable themes (light/dark mode)</li>
                <li>Interactive charts, tables, Kanban board, and calendar</li>
                <li>Settings, tooltips, and more for a great UX</li>
              </ul>
              <p className="text-xs text-gray-400">© {new Date().getFullYear()} Krishna</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
