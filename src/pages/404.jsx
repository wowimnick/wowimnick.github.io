import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { tokens } from '../styles/tokens';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const interacted = useRef(false);

  useEffect(() => {
    const markInteracted = () => { interacted.current = true; };
    window.addEventListener('click', markInteracted);
    window.addEventListener('keydown', markInteracted);
    window.addEventListener('scroll', markInteracted);

    const timer = setTimeout(() => {
      if (!interacted.current) {
        navigate('/', { replace: true });
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', markInteracted);
      window.removeEventListener('keydown', markInteracted);
      window.removeEventListener('scroll', markInteracted);
    };
  }, [navigate]);

  return (
    <Container>
      <h1>404 — Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <HomeButton to="/">Go Home</HomeButton>
    </Container>
  );
};

const Container = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  font-family: ${tokens.font};

  h1 {
    font-size: ${tokens.fs.h2};
    color: ${tokens.brand};
    margin-bottom: 0.75rem;
  }

  p {
    font-size: ${tokens.fs.md};
    color: ${tokens.grey};
    margin-bottom: 1.5rem;
  }
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background: ${tokens.brand};
  color: ${tokens.surface};
  padding: 0.75rem 1.5rem;
  border-radius: ${tokens.rPill}px;
  text-decoration: none;
  font-weight: 600;
  font-size: ${tokens.fs.md};

  &:hover {
    background: ${tokens.brandDeep};
  }
`;

export default NotFoundPage;
