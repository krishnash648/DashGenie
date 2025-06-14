import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (msg) => {
    const newNotif = { id: Date.now(), message: msg };
    setNotifications((prev) => [...prev, newNotif]);

    // Remove after 3s
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotif.id));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-5 right-5 z-50 space-y-2">
        {notifications.map((n) => (
          <div key={n.id} className="bg-black/80 text-white px-4 py-2 rounded shadow-lg text-sm animate-fade-in-up">
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
