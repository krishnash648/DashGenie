/**
 * Celebal Dashboard
 * Developed by Krishna
 * © 2025 All rights reserved.
 */
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaTasks,
  FaCalendarAlt,
  FaTimes,
  FaCog,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const links = [
  { to: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/orders", label: "Orders", icon: <FaClipboardList /> },
  { to: "/kanban", label: "Kanban", icon: <FaTasks /> },
  { to: "/calendar", label: "Calendar", icon: <FaCalendarAlt /> },
  { to: "/settings", label: "Settings", icon: <FaCog /> },
];

const Sidebar = ({ isOpen, onClose, compact = false, position = 'left' }) => {
  const location = useLocation();
  const { dark, toggleTheme } = useTheme();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`h-screen ${compact ? 'w-20' : 'w-40'} bg-white dark:bg-gray-900 fixed top-0 ${position === 'right' ? 'right-0 left-auto' : 'left-0'} z-40 flex flex-col justify-between transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : (position === 'right' ? 'translate-x-full' : '-translate-x-full')} md:translate-x-0 md:static md:flex`}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-600 dark:text-gray-300"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <FaTimes size={20} />
        </button>

        <div>
          <div className={`py-1 px-2 font-bold text-xl text-blue-600 dark:text-blue-300 leading-tight text-center w-full mb-8 ${compact ? 'text-lg' : ''}`}>
            {compact ? 'DG' : 'DashGenie'}
          </div>
          <nav className="w-full flex flex-col space-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center ${compact ? 'justify-center gap-0' : 'gap-3'} py-2.5 ${compact ? 'px-2' : 'px-4'} rounded transition duration-200 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-gray-800 dark:hover:text-blue-300 w-full ${
                  location.pathname === link.to
                    ? "bg-blue-100 text-blue-700 font-semibold dark:bg-gray-800 dark:text-blue-300"
                    : "text-gray-800 dark:text-gray-200"
                }`}
                onClick={onClose}
                title={link.label}
              >
                {link.icon}
                {!compact && link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Theme toggle button */}
        <div className="w-full flex justify-center mb-4">
          <button
            onClick={toggleTheme}
            className="px-2 py-2 rounded-b bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 w-11/12 text-center"
          >
            {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
