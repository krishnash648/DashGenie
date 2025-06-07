/**
 * Celebal Dashboard
 * Developed by Krishna
 * © 2025 All rights reserved.
 */
import { useState } from "react";
import { FaBell, FaShoppingCart, FaComments, FaQuestionCircle } from "react-icons/fa";

const Navbar = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Simple notification data
  const notifications = [
    { id: 1, text: "New order received" },
    { id: 2, text: "Server backup completed" },
    { id: 3, text: "New user registered" },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-0 bg-white dark:bg-gray-900 shadow relative">
      <div></div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:w-64 transition-all duration-200 w-32"
        />
        {/* Cart Icon */}
        <button className="relative" aria-label="Cart">
          <FaShoppingCart className="text-xl text-gray-600 dark:text-gray-300" />
        </button>
        {/* Chat Icon */}
        <button className="relative" aria-label="Chat">
          <FaComments className="text-xl text-gray-600 dark:text-gray-300" />
        </button>
        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setShowNotif((v) => !v)} className="relative" aria-label="Notifications">
            <FaBell className="text-xl text-gray-600 dark:text-gray-300" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
              <div className="p-2 font-semibold border-b dark:border-gray-700">Notifications</div>
              {notifications.map((n) => (
                <div key={n.id} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {n.text}
                </div>
              ))}
              <div className="p-2 text-xs text-center text-blue-600 cursor-pointer hover:underline">View all</div>
            </div>
          )}
        </div>
        {/* User Profile */}
        <div className="relative">
          <button onClick={() => setShowProfile((v) => !v)} aria-label="User Profile">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-700"
            />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
              <div className="p-2 border-b dark:border-gray-700">Signed in as <b>Krishna</b></div>
              <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Profile</div>
              <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Settings</div>
              <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-600">Logout</div>
            </div>
          )}
        </div>
        {/* Help Icon */}
        <button
          className="relative"
          aria-label="Help/About"
          onClick={() => setShowHelp(true)}
          title="Help / About"
        >
          <FaQuestionCircle className="text-xl text-gray-600 dark:text-gray-300" />
        </button>
        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={() => setShowHelp(false)}
                aria-label="Close Help"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">About Celebal Dashboard</h2>
              <p className="mb-2">This dashboard was developed by Krishna as a modern React Admin Dashboard project.</p>
              <ul className="list-disc pl-5 mb-2 text-sm">
                <li>Customizable themes (light/dark mode)</li>
                <li>Interactive charts, tables, Kanban board, and calendar</li>
                <li>Animated transitions and responsive design</li>
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