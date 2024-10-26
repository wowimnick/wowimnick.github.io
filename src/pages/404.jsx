import React, { useEffect } from 'react';

const NotFoundPage = () => {

    useEffect(() => {
        window.location.href = '/';
    }, []);
  return (
    <div>

    </div>
  );
};

export default NotFoundPage;