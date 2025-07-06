import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const defaultSettings = {
  sidebarPosition: 'left',
  compactMode: false,
  fontSize: 'base',
};

const SETTINGS_KEY = 'dashboard_settings';

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const { palette, setPalette, palettes } = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    document.body.classList.remove('text-base', 'text-lg', 'text-xl');
    document.body.classList.add(`text-${settings.fontSize}`);
    window.dispatchEvent(new CustomEvent('settingsChanged', { detail: settings }));
  }, [settings]);

  return (
    <div className="max-w-xl mx-auto bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow p-8 mt-8 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Theme</label>
        <div className="flex flex-wrap gap-4">
          {palettes.map((p) => (
            <button
              key={p.name}
              className={`border rounded p-2 flex flex-col items-center min-w-[90px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                palette.name === p.name ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-300'
              }`}
              style={{ background: p.background, color: p.text }}
              onClick={() => setPalette(p)}
              aria-label={`Select ${p.name} theme`}
            >
              <div className="flex gap-1 mb-1">
                <span
                  style={{
                    background: p.primary,
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    display: 'inline-block',
                    border: '1px solid #ccc',
                  }}
                ></span>
                <span
                  style={{
                    background: p.accent,
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    display: 'inline-block',
                    border: '1px solid #ccc',
                  }}
                ></span>
              </div>
              <span className="text-xs font-semibold">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Sidebar Position</label>
        <select
          className="p-2 rounded border bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
          value={settings.sidebarPosition}
          onChange={(e) => setSettings((s) => ({ ...s, sidebarPosition: e.target.value }))}
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Compact Mode</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.compactMode}
            onChange={(e) => setSettings((s) => ({ ...s, compactMode: e.target.checked }))}
            className="mr-2"
          />
          <span>Enable compact mode</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Font Size</label>
        <select
          className="p-2 rounded border bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
          value={settings.fontSize}
          onChange={(e) => setSettings((s) => ({ ...s, fontSize: e.target.value }))}
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
