import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function HashHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle all routes, not just root
    if (!location.hash) {
      const path = location.pathname === '/' ? '/' : location.pathname.slice(1);
      navigate(path, { replace: true });
    }
  }, []); // Empty dependency array - runs only once

  return null;
} 