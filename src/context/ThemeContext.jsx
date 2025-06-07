import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : false;
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

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      return next;
    });
    toast(!dark ? 'Switched to Dark Mode' : 'Switched to Light Mode', {
      icon: !dark ? '🌙' : '☀️',
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};