import { useState, useEffect, useRef } from 'react';
import Hero from './sections/Hero';
import WhyUs from './sections/WhyUs';
import ServicesSlider from './sections/ServicesSlider';
import CuratedAtelier from './sections/CuratedAtelier';
import InteractiveStudio from './sections/InteractiveStudio';
import BeforeAfter from './sections/BeforeAfter';
import ProjectGlimpse from './sections/ProjectGlimpse';
import Testimonial from './sections/Testimonial';
import Showrooms from './sections/Showrooms';
import BookConsultation from './sections/BookConsultation';
import GetInTouch from './sections/GetInTouch';
import Footer from './sections/Footer';
import ReturnToHomeFAB from './sections/ReturnToHomeFAB';

const LandingPage = ({ onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [whyUsScrollProgress, setWhyUsScrollProgress] = useState(0);
  const [whyUsBgProgress, setWhyUsBgProgress] = useState(0);
  const [whyUsCardsProgress, setWhyUsCardsProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // 3D Studio state
  const [selectedPigmentIdx, setSelectedPigmentIdx] = useState(3);
  const [spatialArrangement, setSpatialArrangement] = useState('compact');
  const [lampOn, setLampOn] = useState(true);
  const [studioAutoRotate, setStudioAutoRotate] = useState(false);

  // Curation tab state
  const [activeTabIdx, setActiveTabIdx] = useState(1);

  const timerRef = useRef(null);
  const whyUsRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialRef = useRef(null);
  const showroomRef = useRef(null);
  const consultationRef = useRef(null);
  const getInTouchRef = useRef(null);
  const [testimonialProgress, setTestimonialProgress] = useState(0);
  const [showroomProgress, setShowroomProgress] = useState(0);
  const [consultationProgress, setConsultationProgress] = useState(0);
  const [getInTouchProgress, setGetInTouchProgress] = useState(0);

  // Monitor viewport size for responsive layout styling
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Trigger once on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preloading images in JS (All 6 key visual assets)
  useEffect(() => {
    let loadedCount = 0;
    const imageUrls = [
      '/images/slide-living.png',
      '/images/slide-dining.png',
      '/images/slide-bedroom.png',
      '/images/service-residential.png',
      '/images/service-commercial.png',
      '/images/service-furniture.png'
    ];

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      
      const handleLoad = () => {
        loadedCount++;
        const percent = Math.round((loadedCount / imageUrls.length) * 100);
        setProgress(percent);
        if (loadedCount === imageUrls.length) {
          setTimeout(() => {
            setLoading(false);
          }, 800);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleLoad;
    });
  }, []);

  // Auto slide interval
  useEffect(() => {
    if (loading) return;

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          setPrevActiveIndex(prev);
          return (prev + 1) % 3; // 3 slides total
        });
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, loading]);

  // Track window scroll for parallax effects, relative bounds, and services section pinning
  useEffect(() => {
    const handleScroll = () => {
      // 1. Hero scroll position
      const scrollPos = window.scrollY;
      setScrollY(scrollPos);

      // 2. Services section horizontal scroll progress calculation
      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        const scrolled = -rect.top;
        const totalScrollable = sectionHeight - viewportHeight;
        
        if (scrolled >= 0 && scrolled <= totalScrollable) {
          setScrollProgress(scrolled / totalScrollable);
        } else if (scrolled < 0) {
          setScrollProgress(0);
        } else {
          setScrollProgress(1);
        }
      }

      // 3. Why Us section relative scroll progress inside its h-[300vh] wrapper
      if (whyUsRef.current) {
        const rect = whyUsRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        const scrolled = -rect.top;
        const totalScrollable = sectionHeight - viewportHeight;
        
        if (scrolled >= 0 && scrolled <= totalScrollable) {
          setWhyUsScrollProgress(scrolled / totalScrollable);
        } else if (scrolled < 0) {
          setWhyUsScrollProgress(0);
        } else {
          setWhyUsScrollProgress(1);
        }

        // Phase 1: Background rises up from scrolled = 0 to scrolled = viewportHeight (100vh runway)
        const bgProg = Math.min(Math.max(0, scrolled / viewportHeight), 1);
        setWhyUsBgProgress(bgProg);

        // Phase 2: Cards reveal sequentially from scrolled = viewportHeight to scrolled = totalScrollable
        const cardsStart = viewportHeight;
        const cardsEnd = totalScrollable;
        let cardsProg = 0;
        if (scrolled > cardsStart) {
          cardsProg = Math.min(Math.max(0, (scrolled - cardsStart) / (cardsEnd - cardsStart)), 1);
        }
        setWhyUsCardsProgress(cardsProg);
      }

      // 4. Testimonial section relative scroll progress
      if (testimonialRef.current) {
        const rect = testimonialRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top;
        const totalScrollable = sectionHeight - viewportHeight;
        if (scrolled >= 0 && scrolled <= totalScrollable) {
          setTestimonialProgress(scrolled / totalScrollable);
        } else if (scrolled < 0) {
          setTestimonialProgress(0);
        } else {
          setTestimonialProgress(1);
        }
      }

      // 5. Showroom section relative scroll progress
      if (showroomRef.current) {
        const rect = showroomRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top + viewportHeight;
        if (sectionHeight > 0) {
          setShowroomProgress(Math.min(Math.max(0, scrolled / (sectionHeight + viewportHeight)), 1));
        }
      }

      // 6. Consultation section relative scroll progress
      if (consultationRef.current) {
        const rect = consultationRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top + viewportHeight;
        if (sectionHeight > 0) {
          setConsultationProgress(Math.min(Math.max(0, scrolled / (sectionHeight + viewportHeight)), 1));
        }
      }

      // 7. Get In Touch section relative scroll progress
      if (getInTouchRef.current) {
        const rect = getInTouchRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top;
        if (sectionHeight > viewportHeight) {
          setGetInTouchProgress(Math.min(Math.max(0, scrolled / (sectionHeight - viewportHeight)), 1));
        } else {
          setGetInTouchProgress(Math.min(Math.max(0, (-rect.top + viewportHeight) / (sectionHeight + viewportHeight)), 1));
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse move for a very minor, subtle ambient shift (6px max) to maintain premium feel
  const handleMouseMove = (e) => {
    const { clientWidth, clientHeight } = e.currentTarget;
    const x = (e.clientX / clientWidth - 0.5) * 6;
    const y = (e.clientY / clientHeight - 0.5) * 6;
    setMousePos({ x, y });
  };

  const handlePrev = () => {
    setPrevActiveIndex(activeIndex);
    setActiveIndex((prev) => (prev - 1 + 3) % 3);
  };

  const handleNext = () => {
    setPrevActiveIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % 3);
  };

  const selectSlide = (index) => {
    if (index === activeIndex) return;
    setPrevActiveIndex(activeIndex);
    setActiveIndex(index);
  };

  // Parallax Scroll calculations
  const heroOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.7));
  const heroTextY = scrollY * 0.2;
  const heroBgY = scrollY * 0.35;

  // Cinematic Framed Card Reveal Transition Calculations
  const frameProgress = typeof window !== 'undefined' ? Math.min(scrollY / window.innerHeight, 1) : 0;
  const heroScale = 1 - frameProgress * 0.08; 
  const heroRadius = frameProgress * 24; 
  const heroPadding = frameProgress * 16; 

  // Scroll-linked Gradual Staggered Card Reveal calculation helper for pinned Why Us section
  const getWhyUsRevealStyle = (startThreshold, duration) => {
    if (!isDesktop) {
      // Stacking overlay card logic for mobile to fit everything inside 100vh
      const localProgress = Math.min(Math.max(0, (whyUsCardsProgress - startThreshold) / duration), 1);
      
      let opacity = 0;
      if (whyUsCardsProgress >= startThreshold) {
        opacity = localProgress;
        const nextStart = startThreshold + duration;
        if (whyUsCardsProgress > nextStart) {
          const fadeOutProgress = Math.min(Math.max(0, (whyUsCardsProgress - nextStart) / 0.05), 1);
          opacity = 1 - fadeOutProgress;
        }
      }
      const translateY = (1 - localProgress) * 30; 
      const rotateX = (1 - localProgress) * 12; // 3D Tilt on mobile
      const rotateY = (1 - localProgress) * -8;
      const scale = 0.96 + localProgress * 0.04;
      return {
        position: 'absolute',
        left: '16px',
        right: '16px',
        top: '16px',
        bottom: '16px',
        opacity: opacity,
        transform: `perspective(800px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        transition: 'opacity 0.4s ease-out, transform 0.5s ease-out',
        willChange: 'opacity, transform'
      };
    }
    // Desktop layout reveals (side-by-side grids - 3D Card Unfolding)
    const localProgress = Math.min(Math.max(0, (whyUsCardsProgress - startThreshold) / duration), 1);
    const opacity = localProgress;
    const translateY = (1 - localProgress) * 50;
    const rotateX = (1 - localProgress) * 16; 
    const rotateY = (1 - localProgress) * -12;
    const scale = 0.95 + localProgress * 0.05;
    return {
      opacity: opacity,
      transform: `perspective(1200px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'opacity, transform'
    };
  };

  return (
    <div className="relative w-full bg-luxury-charcoal text-luxury-cream">
      
      <Hero 
        onNavigate={onNavigate}
        loading={loading}
        progress={progress}
        activeIndex={activeIndex}
        prevActiveIndex={prevActiveIndex}
        mousePos={mousePos}
        handleMouseMove={handleMouseMove}
        handlePrev={handlePrev}
        handleNext={handleNext}
        selectSlide={selectSlide}
        heroPadding={heroPadding}
        heroRadius={heroRadius}
        heroScale={heroScale}
        heroBgY={heroBgY}
        heroTextY={heroTextY}
        heroOpacity={heroOpacity}
      />

      <WhyUs 
        whyUsRef={whyUsRef}
        whyUsBgProgress={whyUsBgProgress}
        whyUsCardsProgress={whyUsCardsProgress}
        isDesktop={isDesktop}
        getWhyUsRevealStyle={getWhyUsRevealStyle}
      />

      <ServicesSlider 
        servicesRef={servicesRef}
        scrollProgress={scrollProgress}
        onNavigate={onNavigate}
      />

      <CuratedAtelier 
        activeTabIdx={activeTabIdx}
        setActiveTabIdx={setActiveTabIdx}
        onNavigate={onNavigate}
      />

      <InteractiveStudio 
        selectedPigmentIdx={selectedPigmentIdx}
        setSelectedPigmentIdx={setSelectedPigmentIdx}
        spatialArrangement={spatialArrangement}
        setSpatialArrangement={setSpatialArrangement}
        lampOn={lampOn}
        setLampOn={setLampOn}
        studioAutoRotate={studioAutoRotate}
        setStudioAutoRotate={setStudioAutoRotate}
        loading={loading}
      />

      <BeforeAfter />

      <ProjectGlimpse onNavigate={onNavigate} />

      <Testimonial 
        testimonialRef={testimonialRef}
        testimonialProgress={testimonialProgress}
        isDesktop={isDesktop}
      />

      <Showrooms 
        showroomRef={showroomRef}
        scrollProgress={showroomProgress}
        isDesktop={isDesktop}
      />

      <BookConsultation 
        consultationRef={consultationRef}
        scrollProgress={consultationProgress}
        isDesktop={isDesktop}
        onNavigate={onNavigate}
      />

      <GetInTouch 
        getInTouchRef={getInTouchRef}
        scrollProgress={getInTouchProgress}
        isDesktop={isDesktop}
      />

      <Footer onNavigate={onNavigate} />

      <ReturnToHomeFAB />

    </div>
  );
};

export default LandingPage;