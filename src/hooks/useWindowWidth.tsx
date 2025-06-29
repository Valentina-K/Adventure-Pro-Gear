'use client';

import { useEffect, useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useWindowWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};
