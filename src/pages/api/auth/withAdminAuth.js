import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from '@/pages/errorPage';
import { useSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

const restrictedPages = ['/manageContents', '/manageUsers', '/admin-dashboard']; // Restricted pages for users

const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session } = useSession(); // Get session data
    const [isAuthorized, setIsAuthorized] = useState(null); // Track admin or user role
    const router = useRouter();

    useEffect(() => {
      // Check for role in session or localStorage token
      const roleFromSession = session?.user?.role;
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const decodedToken = token ? jwt.decode(token) : null;
      const roleFromToken = decodedToken ? decodedToken.role : null;

      console.log("Role from session:", roleFromSession);
      console.log("Role from token:", roleFromToken);

      // Get the current page path
      const currentPage = router.pathname;

      // If user is trying to access restricted pages and is not an admin, redirect or show ErrorPage
      if (restrictedPages.includes(currentPage)) {
        if (roleFromSession !== 'admin' && roleFromToken !== 'admin') {
          setIsAuthorized(false); // User cannot access restricted pages
        } else {
          setIsAuthorized(true); // Admin can access restricted pages
        }
      } else {
        // If the page is not restricted, check if the user or admin can access
        if (roleFromSession === 'admin' || roleFromToken === 'admin' || roleFromSession === 'user' || roleFromToken === 'user') {
          setIsAuthorized(true); // Authorized user or admin
        } else {
          setIsAuthorized(false); // Unauthorized
        }
      }
    }, [session, router]); // Re-run on session or router change

    // Display nothing while the authorization check is in progress
    if (isAuthorized === null) return null;

    // Render the component if authorized (admin or user), otherwise render ErrorPage
    return isAuthorized ? <WrappedComponent {...props} /> : <ErrorPage />;
  };
};

export default withAdminAuth;
