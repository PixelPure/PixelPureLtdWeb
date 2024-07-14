import React, { useEffect, useRef } from 'react';
import image1 from '../assets/mandesigning1.png'; // Replace with your actual image paths
import image2 from '../assets/mandesigning2.png';
import image3 from '../assets/mandesigning3.png';
import './Showcase.css'; // Import the CSS file
import Section from './Section';

const Showcase = () => {
  const containerRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallaxElements = containerRef.current.querySelectorAll('.parallax');
      parallaxElements.forEach((element, index) => {
        const speed = index * 0.2;
        element.style.transform = `translateX(${scrollPosition * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Section crosses ref={containerRef} className="showcase-container">
      <div className="parallax-wrapper">
        <img src={image1} alt="Showcase 1" className="parallax" />
        <img src={image2} alt="Showcase 2" className="parallax" />
        <img src={image3} alt="Showcase 3" className="parallax" />
      </div>
    </Section>
  );
};

export default Showcase;
