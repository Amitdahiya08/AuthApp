import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token is present on initial render
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (['/', '/login', '/signup'].includes(location.pathname)) {
                navigate('/home', { replace: true });
            }
        }
        
        // Add storage event listener to handle logout from different tabs/windows
        const handleStorageChange = () => {
            if (!localStorage.getItem('token')) {
                setIsAuthenticated(false);
                navigate('/login', { replace: true });
            }
        };
        
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [location, navigate, setIsAuthenticated]);

    return null;
}

export default RefreshHandler;
