import React, { useState, useEffect } from 'react';

export default function Navbar({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const sections = [
        { id: 'hero', selector: 'header, section:first-of-type' },
        { id: 'why-us', selector: '#why-us' },
        { id: 'services', selector: '#services' },
        { id: 'interactive-studio', selector: '#interactive-studio' },
        { id: 'projects', selector: '#projects' },
        { id: 'testimonials', selector: '#testimonials' },
        { id: 'showrooms', selector: '#showrooms' },
        { id: 'get-in-touch', selector: '#get-in-touch' },
      ];

      const viewportMiddle = window.innerHeight * 0.35;
      let currentActive = 'hero';

      for (const section of sections) {
        const elem = document.querySelector(section.selector);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          if (rect.top <= viewportMiddle && rect.bottom >= 0) {
            currentActive = section.id;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const smoothScrollTo = (targetSelector) => {
    setMobileMenuOpen(false);
    const elem = document.querySelector(targetSelector);
    if (!elem) return;
    const bodyTop = document.body.getBoundingClientRect().top;
    const elemTop = elem.getBoundingClientRect().top;
    const targetY = elemTop - bodyTop;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  const navItems = [
    { label: 'Why Us', href: '#why-us', id: 'why-us' },
    { label: 'Services', href: '#/services', isPage: true, pageTarget: 'services', id: 'services' },
    { label: '3D Studio', href: '#interactive-studio', id: 'interactive-studio' },
    { label: 'Projects', href: '#/projects', isPage: true, pageTarget: 'projects', id: 'projects' },
    { label: 'Showrooms', href: '#showrooms', id: 'showrooms' },
    { label: 'Reviews', href: '#testimonials', id: 'testimonials' }
  ];

  return (
    <>
      <header
        className="absolute top-0 left-0 w-full z-50 py-4 md:py-6 bg-gradient-to-b from-luxury-charcoal/90 via-luxury-charcoal/40 to-transparent"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex flex-col focus:outline-none"
          >
            <span className="font-display text-lg sm:text-xl md:text-2xl font-light tracking-[0.25em] text-luxury-cream group-hover:text-[#c5a059] transition-colors duration-300">
              SHARKINGS
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] font-semibold tracking-[0.45em] text-luxury-sage mt-0.5 ml-[0.1em] group-hover:text-luxury-cream transition-colors duration-300">
              INTERIOR
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.isPage) {
                      onNavigate && onNavigate(item.pageTarget);
                    } else {
                      smoothScrollTo(item.href);
                    }
                  }}
                  className={`relative py-1 font-sans text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 group ${
                    isActive ? 'text-[#c5a059]' : 'text-luxury-cream/80 hover:text-[#c5a059]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#c5a059] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Action Controls: Contact CTA Button + Hamburger Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#get-in-touch"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('#get-in-touch');
              }}
              className="relative px-4 py-2 sm:px-6 sm:py-2.5 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#c5a059] border border-[#c5a059]/40 hover:border-[#c5a059] overflow-hidden group transition-colors duration-300"
            >
              <span className="relative z-10 group-hover:text-luxury-charcoal transition-colors">
                Contact Us
              </span>
              <span className="absolute inset-0 bg-[#c5a059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </a>

            {/* Hamburger Button (Mobile / Tablet) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-lg text-luxury-cream hover:bg-white/10 transition-colors focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Full Screen Mobile Drawer Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-luxury-charcoal/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-10 pt-24 transition-all duration-500 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        {/* Drawer Menu Nav Links */}
        <nav className="flex flex-col space-y-6 my-auto">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.isPage) {
                    setMobileMenuOpen(false);
                    onNavigate && onNavigate(item.pageTarget);
                  } else {
                    smoothScrollTo(item.href);
                  }
                }}
                className={`flex items-center justify-between font-display text-2xl sm:text-4xl font-extralight tracking-wider transition-all duration-300 py-1 group ${
                  isActive ? 'text-[#c5a059]' : 'text-luxury-cream hover:text-luxury-sage'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs font-sans font-semibold tracking-widest text-luxury-cream/30 group-hover:text-luxury-sage">
                  0{idx + 1}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Drawer Footer CTA & Location */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <a
            href="#book-consultation"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#book-consultation');
            }}
            className="w-full py-3.5 bg-[#c5a059] text-luxury-charcoal font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Book Free Consultation</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

          <div className="flex items-center justify-between text-[10px] font-sans tracking-widest text-luxury-cream/50 uppercase">
            <span>Madurai & Ramanathapuram</span>
            <span>Est. 2018</span>
          </div>
        </div>
      </div>
    </>
  );
}
