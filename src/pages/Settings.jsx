import React, { useState, useEffect } from 'react';

const defaultSettings = {
  sidebarPosition: 'left', // or 'right'
  compactMode: false,
  fontSize: 'base', // 'base', 'lg', 'xl'
};

const SETTINGS_KEY = 'dashboard_settings';

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    // Apply font size to body
    document.body.classList.remove('text-base', 'text-lg', 'text-xl');
    document.body.classList.add(`text-${settings.fontSize}`);
    // Optionally, trigger a custom event for sidebar position/compact mode
    window.dispatchEvent(new CustomEvent('settingsChanged', { detail: settings }));
  }, [settings]);

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8 mt-8 transition-colors">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Sidebar Position</label>
        <select
          className="p-2 rounded border dark:bg-gray-900 dark:text-gray-100"
          value={settings.sidebarPosition}
          onChange={e => setSettings(s => ({ ...s, sidebarPosition: e.target.value }))}
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Compact Mode</label>
        <input
          type="checkbox"
          checked={settings.compactMode}
          onChange={e => setSettings(s => ({ ...s, compactMode: e.target.checked }))}
          className="mr-2"
        />
        <span>Enable compact mode</span>
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Font Size</label>
        <select
          className="p-2 rounded border dark:bg-gray-900 dark:text-gray-100"
          value={settings.fontSize}
          onChange={e => setSettings(s => ({ ...s, fontSize: e.target.value }))}
        >
          <option value="base">Normal</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>
    </div>
  );
};

export default Settings; 