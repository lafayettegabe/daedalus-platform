'use client';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase';
import { useAuth } from './useAuth';

const FirebaseAuth: React.FC = () => {
  const [user] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();
  useAuth();

  const login = async () => {
    
    await signInWithPopup(auth, googleAuth);
  };

  return (
    <div>
        <button className="rounded-full bg-blue-500 text-white px-4 py-2" onClick={login}>
          LOGIN
        </button>
    </div>
  );
};

export default FirebaseAuth;