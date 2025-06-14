import React, { useState } from 'react';

const DEMO_USER = { username: 'admin', password: 'admin123' };

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    onLogin(username, password);
  };

  const handleSkip = () => {
    onLogin(DEMO_USER.username, DEMO_USER.password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-900 dark:text-gray-100"
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition mb-2">Login</button>
        <button type="button" onClick={handleSkip} className="w-full bg-gray-300 text-gray-800 py-2 rounded font-semibold hover:bg-gray-400 transition">Skip Login (Demo)</button>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Demo Credentials: admin / admin123
        </div>
      </form>
    </div>
  );
};

export default Login; 