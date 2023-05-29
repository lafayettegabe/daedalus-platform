'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase';

export function withSubscription<P>(WrappedComponent: any) {
  return function SubscriptionWrapper(props: P) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [subscription, setSubscription] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/database?uid=${user?.uid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await res.json();
          console.log(data);

          setSubscription(data.hasSubscription);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching subscription status:', error);
          setSubscription(false);
          setLoading(false);
        }
      };

      if (user?.uid) {
        fetchData();
      } else {
        setLoading(false);
      }
    }, [user]);

    if (loading) {
      return null; // Show a loading screen
    }

    if (!user || !subscription) {
      router.push('/login'); // Redirect to login page or access denied page
      !user && console.log('no user');
      !subscription && console.log('no subscription');
      return null;
    }

    console.log('user and subscription');
    return <WrappedComponent {...props} />;
  };
}
