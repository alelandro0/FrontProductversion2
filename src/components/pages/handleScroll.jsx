import { useEffect } from 'react';

const handleScroll = (event) => {
  const delta = Math.sign(event.deltaY);
  
  if (delta === 1) {
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: 'smooth'
    });
  } else if (delta === -1) {
    window.scrollTo({
      top: window.scrollY - window.innerHeight,
      behavior: 'smooth'
    });
  }
};

const ScrollHandler = () => {
  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return null;
};

export default ScrollHandler;

