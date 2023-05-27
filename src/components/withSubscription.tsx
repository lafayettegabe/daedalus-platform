import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

export function withSubscription<P>(WrappedComponent: any) {
  return function SubscriptionWrapper(props: P) {
    const router = useRouter();
    const { user, loading } = useAuth(); // Custom hook to get the authenticated user
    
    // Check if the user is authenticated and has an active subscription
    if (loading) {
      return null; // Show a loading screen
    }

    if (!user || !user.subscriptionStatus) {
      router.push('/login'); // Redirect to login page or access denied page
      !user && console.log('no user');
      !user?.subscriptionStatus && console.log('no subscription');
      return null;
    }

    console.log('user and subscription');
    return <WrappedComponent {...props} />;
  };
}
