import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [, setToken] = useLocalStorage('token', null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      setToken(response.data.token);
      router.push('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-8">Log In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Log In
        </button>
      </form>
    </div>
  );
}