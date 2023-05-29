'use client';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase';

interface User {
  uid: string;
  nome: string;
  email: string;
  subscriptionStatus: boolean;
  imageUrl: string;
}

const FirebaseAuth: React.FC = () => {
  const [user] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();

  const login = async () => {
    console.log('Logging in...')
    await signInWithPopup(auth, googleAuth);
    console.log('Logged in as: ', auth.currentUser);
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