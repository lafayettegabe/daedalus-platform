'use client';
import { useRouter } from 'next/navigation';
import FirebaseAuth from './FirebaseAuth';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { Profile } from './Profile';


const Header: React.FC = () => {
  const [scroll, setScroll] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`text-white py-4 px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out border-b-1 border-blue-200 shadow-lg
      ${
        scroll ? 'scrolled' : ''
      }`}
      style={{ backgroundColor: "#06283D", opacity: scroll ? 0.8 : 1}}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* If on top 'Daedalus Institute' if scrolled down, just the D */}
        
            <h1 className="text-2xl font-bold tracking-tight flex items-center cursor-pointer" onClick={() => {router.push('/')}}>
                <span className="text-blue-600 text-3xl transition-all duration-300 ease-in-out" style={{ transform: !scroll ? 'scale(1)' : 'scale(1.7)' }}>D</span>
                <span className="hidden md:block transition-all duration-500 ease-in-out" style={{ transform: !scroll ? 'translateX(0)' : 'translateX(50%)', opacity: !scroll ? 1 : 0 }}>aedalus Institute</span>
            </h1>
        
            <nav className="hidden md:block">
                <ul className="flex items-center">
                    <li className="mx-4 cursor-pointer transition-all duration-300 ease-in-out hover:text-blue-600">
                        <a onClick={() => {router.push('/')}}>
                          Home
                        </a>
                    </li>
                    <li className="mx-4 cursor-pointer transition-all duration-300 ease-in-out hover:text-blue-600">
                        <a onClick={() => {router.push('/about')}}>
                          About
                        </a>
                    </li>
                    <li className="mx-4 cursor-pointer transition-all duration-300 ease-in-out hover:text-blue-600">
                        <a onClick={() => {router.push('/dev')}}>
                          Dev
                        </a>
                    </li>
                </ul>
            </nav>
        
        {user ? (
          <Profile User={user} />
        ) : (
          <FirebaseAuth />
        )}

      </div>

    </header>
  );
};

export default Header;