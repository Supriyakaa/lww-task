import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useLocalStorage('token', null);

  const handleLogout = () => {
    setToken(null);
    router.replace('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-200 transition-colors duration-300">E-commerce App</Link>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="hover:text-gray-200 transition-colors duration-300">Cart</Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-200 transition-colors duration-300">Login</Link>
              <Link href="/signup" className="hover:text-gray-200 transition-colors duration-300">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
