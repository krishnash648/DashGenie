import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaTasks, FaCalendarAlt, FaTimes, FaCog } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const links = [
  { to: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/orders", label: "Orders", icon: <FaClipboardList /> },
  { to: "/kanban", label: "Kanban", icon: <FaTasks /> },
  { to: "/calendar", label: "Calendar", icon: <FaCalendarAlt /> },
  { to: "/settings", label: "Settings", icon: <FaCog /> },
];

const Sidebar = ({ isOpen, onClose, position = 'left', compact = false }) => {
  const location = useLocation();
  const { dark, toggleTheme } = useTheme();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`h-screen ${compact ? 'w-16' : 'w-40'} fixed top-0 ${position === 'right' ? 'right-0 left-auto' : 'left-0'} z-40 flex flex-col justify-between transition-all duration-500 ease-in-out neon-glow
          ${isOpen ? "translate-x-0" : (position === 'right' ? 'translate-x-full' : '-translate-x-full')} md:translate-x-0 md:static md:flex sidebar`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-gray-600 dark:text-gray-300"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <FaTimes size={20} />
        </button>

        <div>
          <div className={`py-1 px-2 font-bold ${compact ? 'text-base' : 'text-xl'} leading-tight text-center w-full mb-8`} style={{ color: 'var(--text-color)' }}>
            {compact ? 'DG' : 'DashGenie'}
          </div>
          <nav className="w-full flex flex-col space-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center ${compact ? 'justify-center' : 'gap-3'} py-2.5 px-4 rounded transition duration-200 w-full hover:scale-105 hover:bg-opacity-80`}
                style={location.pathname === link.to
                  ? { background: 'var(--accent-color)', color: 'var(--background-color)' }
                  : { color: 'var(--text-color)' }}
                onClick={onClose}
                title={link.label}
              >
                {link.icon}
                {!compact && link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="w-full flex justify-center mb-4">
          <button
            onClick={toggleTheme}
            className={`px-2 py-2 rounded-b ${compact ? 'w-12' : 'w-11/12'} text-center`}
            style={{ background: 'var(--accent-color)', color: 'var(--background-color)' }}
          >
            {compact ? (dark ? '🌙' : '☀️') : (dark ? "Switch to Light Mode" : "Switch to Dark Mode")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
