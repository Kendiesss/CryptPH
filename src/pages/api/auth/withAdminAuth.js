import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from '@/pages/errorPage';
import { useSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session } = useSession(); // Get session data
    const [role, setRole] = useState(null);
    const router = useRouter();

    useEffect(() => {
      // Check if the session is still loading
      if (session === undefined) return;

      // If no session, redirect to login page
      if (!session) {
        router.push('/Login');
        return;
      }

      // Check roles from session or token
      const roleFromSession = session?.user?.role;
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const decodedToken = token ? jwt.decode(token) : null;
      const roleFromToken = decodedToken ? decodedToken.role : null;

      // Determine the user's role
      if (roleFromSession === 'admin' || roleFromToken === 'admin') {
        setRole('admin');
      } else if (roleFromSession === 'user' || roleFromToken === 'user') {
        setRole('user');
      } else {
        setRole(null); // If no valid role, treat as signed out
      }
    }, [session, router]); // Re-run on session change

    // Display nothing while the role check is in progress
    if (role === null) return null;

    // If the role is 'admin', allow access to virtual trading, manage contents, manage users
    if (role === 'admin') {
      return <WrappedComponent {...props} />;
    }

    // If the role is 'user', only allow virtual trading
    if (role === 'user') {
      // Check if the user is trying to access manageContents or manageUsers
      if (router.pathname === '/manageContents' || router.pathname === '/manageUsers') {
        return <ErrorPage />; // Redirect to error page if the user tries to access restricted pages
      }
      return <WrappedComponent {...props} />;
    }

    // If no valid role or the user is signed out, redirect to login
    router.push('/Login');
    return null;
  };
};

export default withAdminAuth;
