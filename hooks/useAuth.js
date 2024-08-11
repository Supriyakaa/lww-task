import { useState, useEffect } from 'react';
import api from '../utils/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me');
        console.log({response})
        setUser(response.data.user);
        setIsSeller(response.data.user.role === 'seller');
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return { user, isSeller };
}
