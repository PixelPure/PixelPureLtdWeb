import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ButtonGradient from './assets/svg/ButtonGradient';
import Benefits from './components/Benefits';
import Collaboration from './components/Collaboration';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import NextSteps from './components/NextSteps';
import Showcase from './components/Showcase';
import ScrollToTop from './components/helper/ScrollToTop';
import Seo from './components/Seo';
import Story from './pages/Story';
import PricingPage from './pages/Pricing';

const App = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.dispatchEvent(new Event("prerender-ready"));
    }
  }, []);

  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Header />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={
          <>
            <Seo page="home" />
            <Hero />
            <Benefits />
            <Collaboration />
            {/* <Services /> */}
            <Pricing />
            {/* <Roadmap /> */}
          </>
        } />
        <Route path="/contact" element={
            <>
            <Seo page="contact" />
            <Contact />
            <NextSteps/>
            {/* <Showcase/> */}
            </>
            } />
        <Route path="/designers" element={
            <>
            <Seo page="designers" />
            <Showcase/>
            </>
        } />
        <Route path="/pricing" element={
          <>
            <Seo page="pricing" />
            <PricingPage />
          </>
        } />
        <Route path="/story" element={
          <>
            <Seo page="story" />
            <Story />
          </>
        } />
      </Routes>
      <Footer />
      <ButtonGradient />
    </div>
  );
};

export default App;
