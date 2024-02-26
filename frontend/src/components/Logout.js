import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userPrefix');
    navigate('/');
  }, [navigate]);
  return null;
}

export default LogoutPage;
