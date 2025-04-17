import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function HashHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.hash && location.pathname === '/') {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  return null;
} 