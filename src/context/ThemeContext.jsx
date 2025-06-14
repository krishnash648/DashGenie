import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const ThemeContext = createContext();

const palettes = [
  {
    name: 'Blue Modern',
    primary: '#2563eb',
    accent: '#10b981',
    background: '#f9fafb',
    text: '#111827',
  },
  {
    name: 'Slate',
    primary: '#334155',
    accent: '#38bdf8',
    background: '#f1f5f9',
    text: '#0f172a',
  },
  {
    name: 'Emerald',
    primary: '#059669',
    accent: '#f59e42',
    background: '#f0fdf4',
    text: '#064e3b',
  },
  {
    name: 'Dark',
    primary: '#1e293b',
    accent: '#fbbf24',
    background: '#0f172a',
    text: '#f1f5f9',
  },
];

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : false;
  });
  const [palette, setPalette] = useState(() => {
    const saved = localStorage.getItem("palette");
    return saved ? JSON.parse(saved) : palettes[0];
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', palette.primary);
    document.documentElement.style.setProperty('--accent-color', palette.accent);
    document.documentElement.style.setProperty('--background-color', palette.background);
    document.documentElement.style.setProperty('--text-color', palette.text);
    localStorage.setItem("palette", JSON.stringify(palette));
  }, [palette]);

  const toggleTheme = () => {
  setDark(prev => {
    const next = !prev;
    toast(next ? 'Switched to Dark Mode' : 'Switched to Light Mode', {
      icon: next ? '🌙' : '☀️',
    });
    return next;
  });
};


  return (
    <ThemeContext.Provider value={{ dark, toggleTheme, palette, setPalette, palettes }}>
      {children}
    </ThemeContext.Provider>
  );
};