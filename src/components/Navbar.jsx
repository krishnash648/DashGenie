import React, { useState, useRef, useEffect } from "react";
import {
  FaShoppingCart,
  FaComments,
  FaBell,
  FaUserEdit,
  FaQuestionCircle,
  FaPlay,
  FaPause,
  FaVolumeUp,
} from "react-icons/fa";

const Navbar = ({ onLogout }) => {
  const [isPlaying, setIsPlaying] = useState(true); // Auto-play from start
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const audioRef = useRef(null);

  const tracks = [
    { title: "Lo-Fi Chill Vibes", src: "/audio/lofi-1.mp3" },
    { title: "Cozy Work Beats", src: "/audio/lofi-2.mp3" },
    { title: "Midnight Coding", src: "/audio/lofi-3.mp3" },
  ];

  const currentTrack = tracks[currentTrackIndex];

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => console.log("Playback error: ", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const playPrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const notifications = [
    { id: 1, text: "Dashboard updated!" },
    { id: 2, text: "New user registered." },
    { id: 3, text: "Reminder: team meeting at 4PM." },
  ];

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((error) => console.log("Playback error: ", error));
    }
  }, [currentTrackIndex, isPlaying]);

  return (
    <nav className="flex items-center justify-between px-8 py-0 shadow relative" style={{ background: "var(--primary-color)", color: "var(--text-color)" }}>
      
      <div className="flex items-center gap-4"></div>

      <div className={`flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg shadow ${isPlaying ? 'pulse' : ''}`}>
        <button onClick={playPrevious} aria-label="Previous Track">⏮️</button>

        <button onClick={togglePlay} aria-label="Music Player">
          {isPlaying ? <FaPause className="text-xl text-gray-600 dark:text-gray-300" /> : <FaPlay className="text-xl text-gray-600 dark:text-gray-300" />}
        </button>

        <button onClick={playNext} aria-label="Next Track">⏭️</button>

        <div className="flex flex-col">
          <span className="text-xs text-gray-700 dark:text-gray-300">{currentTrack.title}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-32"
          />
        </div>

        <div className="flex items-center gap-1">
          <FaVolumeUp className="text-gray-600 dark:text-gray-300" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-16"
          />
        </div>

        <audio
          ref={audioRef}
          onLoadedMetadata={() => setDuration(audioRef.current.duration)}
          onEnded={playNext}
          onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          loop={false}
        >
          <source src={currentTrack.src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
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
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
              <div className="p-2 font-semibold border-b dark:border-gray-700">Notifications</div>
              {notifications.map((n) => (
                <div key={n.id} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">{n.text}</div>
              ))}
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
              <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-600 text-sm" onClick={onLogout}>Logout</div>
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
              <h2 className="text-xl font-bold mb-4">About Celebal Dashboard</h2>
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
