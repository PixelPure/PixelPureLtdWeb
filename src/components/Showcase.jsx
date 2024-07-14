import React, { useEffect, useRef } from 'react';
import image1 from '../assets/mandesigning1.png'; // Replace with your actual image paths
import image2 from '../assets/mandesigning2.png';
import image3 from '../assets/mandesigning3.png';
import './Showcase.css'; // Import the CSS file
import Section from './Section';
import {curve} from "../assets"
import Button from './Button';

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
        <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            Our Designer showcase is in progress! Coming {` `}
            <span className="inline-block relative">
              Soon.{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <Button href="/" white>
            Back Home
          </Button>
        </div>
      <div className="parallax-wrapper">
        <img src={image1} alt="Showcase 1" className="parallax" />
        <img src={image2} alt="Showcase 2" className="parallax" />
        <img src={image3} alt="Showcase 3" className="parallax" />
      </div>
      </div>
    </Section>
  );
};

export default Showcase;
