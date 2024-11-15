import { useEffect, useState } from 'react';
import ErrorPage from '@/pages/errorPage';
import { useSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session } = useSession(); // Get session data
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
      // Check for admin role in session or localStorage token
      const roleFromSession = session?.user?.role;
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const decodedToken = token ? jwt.decode(token) : null;
      const roleFromToken = decodedToken ? decodedToken.role : null;

      console.log("Role from session:", roleFromSession);
      console.log("Role from token:", roleFromToken);

      // If the user is an admin either via session or token, set isAdmin to true
      if (roleFromSession === 'admin' || roleFromToken === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }, [session]); // Re-run on session change

    // Display nothing while the role check is in progress
    if (isAdmin === null) return null;

    // Render the component if admin, otherwise render ErrorPage
    return isAdmin ? <WrappedComponent {...props} /> : <ErrorPage />;
  };
};

export default withAdminAuth;
