import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function HashHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Only run once on initial mount
    if (!location.hash && location.pathname === '/') {
      navigate('/', { replace: true });
    }
  }, []); // Empty dependency array - runs only once

  return null;
} 