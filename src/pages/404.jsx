// src/pages/404.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  h1 { font-size: 2rem; color: #ef1c1f; margin-bottom: 1rem; }
  p { font-size: 1.2rem; color: #666; }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 2 seconds so the user knows what happened
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <h1>404 - Page Not Found</h1>
      <p>Redirecting you to the homepage...</p>
    </Container>
  );
};

export default NotFoundPage;