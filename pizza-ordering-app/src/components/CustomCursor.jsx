import React, { useEffect } from 'react';
import './CustomCursor.css'; // Import the CSS for the cursor

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY + window.scrollY}px`; // Adjust position with scroll
    };

    const updateCursorOnScroll = () => {
      const { pageX, pageY } = window;
      cursor.style.transform = `translate3d(${pageX}px, ${pageY + window.scrollY}px, 0)`;
    };

    document.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', updateCursorOnScroll);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', updateCursorOnScroll);
    };
  }, []);

  return <div className="custom-cursor"></div>;
};

export default CustomCursor;
