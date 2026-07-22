
const localSlides = [
  {
    image: '/images/slide-living.png',
    subtitle: 'ARCHITECTURAL POETRY',
    title: 'Designing Silent Sophistication',
    description: 'We believe that space is a canvas of silence. Sharkings Interior shapes raw materials, moody shadows, and refined structures into bespoke personal residences.',
    accent: 'text-luxury-red',
    borderAccent: 'border-luxury-red',
    glowColor: 'rgba(113, 0, 20, 0.12)',
    accentHex: '#710014'
  },
  {
    image: '/images/slide-dining.png',
    subtitle: 'ORGANIC SYMPHONY',
    title: 'A Sculpted Sensory Experience',
    description: 'Intimate dining environments enriched with tactile charcoal textures, sculptural gold light designs, and calming luxury sage velvet seating.',
    accent: 'text-luxury-sage',
    borderAccent: 'border-luxury-sage',
    glowColor: 'rgba(131, 143, 111, 0.12)',
    accentHex: '#838F6F'
  },
  {
    image: '/images/slide-bedroom.png',
    subtitle: 'NOCTURNAL SANCTUARY',
    title: 'Intimate Master Retreats',
    description: 'Moody textured wall panels, rich crimson velvet comforts, and recessed golden uplighting crafted to provide absolute isolation and luxury.',
    accent: 'text-luxury-red',
    borderAccent: 'border-luxury-red',
    glowColor: 'rgba(113, 0, 20, 0.12)',
    accentHex: '#710014'
  }
];

export default function Hero({
  onNavigate,
  loading,
  progress,
  activeIndex,
  prevActiveIndex,
  mousePos,
  handleMouseMove,
  handlePrev,
  handleNext,
  selectSlide,
  heroPadding,
  heroRadius,
  heroScale,
  heroBgY,
  heroTextY,
  heroOpacity
}) {
  const smoothScrollToTarget = (targetSelector) => {
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

  return (
    <>
      {/* Elegant Dark Minimalist Preloader */}
      <div
        className={`fixed inset-0 z-[999] bg-luxury-charcoal flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="absolute w-[300px] h-[300px] bg-luxury-red/10 rounded-full blur-[80px] animate-pulse pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center text-center">
            <span className="font-display text-3xl md:text-4xl font-light tracking-[0.3em] text-luxury-cream">
              SHARKINGS
            </span>
            <span className="font-sans text-[10px] font-semibold tracking-[0.55em] text-luxury-sage mt-1">
              INTERIOR
            </span>
          </div>

          <div className="w-48 h-[1px] bg-luxury-cream/10 relative">
            <div
              className="absolute left-0 top-0 h-full bg-luxury-sage transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="font-sans text-[9px] tracking-widest text-luxury-cream/40">
            {progress}%
          </span>
        </div>
      </div>

      {/* STICKY HERO CONTAINER */}
      <div
        className="sticky top-0 h-screen w-full bg-luxury-charcoal z-10 overflow-hidden"
        onMouseMove={handleMouseMove}
        style={{
          padding: `${heroPadding}px`,
          willChange: 'padding'
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden bg-luxury-charcoal shadow-2xl transition-all duration-100 ease-out"
          style={{
            borderRadius: `${heroRadius}px`,
            transform: `scale(${heroScale})`,
            willChange: 'transform, border-radius'
          }}
        >
          {/* Dynamic Background Glows */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 animate-ambient-glow"
            style={{
              backgroundColor: localSlides[activeIndex].glowColor,
              left: `calc(15% + ${mousePos.x}px)`,
              top: `calc(20% + ${mousePos.y}px)`,
              zIndex: 1
            }}
          />

          {/* Sliding Images */}
          <div className="absolute inset-0 w-full h-full z-0">
            {localSlides.map((slide, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={idx}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-transparent to-black/10 z-20 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(22,22,22,0.4)_95%)] z-20 pointer-events-none" />

                  <div
                    className={`w-full h-full overflow-hidden ${(idx === activeIndex || idx === prevActiveIndex) ? 'animate-ken-burns' : ''
                      }`}
                  >
                    <img
                      src={slide.image}
                      alt="Luxury Interior Design"
                      className="w-full h-full object-cover"
                      style={{
                        transform: `translate(${mousePos.x * -0.2}px, calc(${mousePos.y * -0.2}px + ${heroBgY}px))`,
                        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>

                  <div
                    className="absolute inset-0 flex items-center px-6 md:px-24 z-30 transition-all"
                    style={{
                      transform: `translateY(${heroTextY}px)`,
                      opacity: isActive ? heroOpacity : 0
                    }}
                  >
                    <div className="max-w-3xl space-y-6 md:space-y-8 mt-12 md:mt-20">

                      <div
                        className={`flex items-center gap-3 transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
                          }`}
                        style={{ transitionDelay: '0ms' }}
                      >
                        <span className="w-8 h-[1px] bg-luxury-sage" />
                        <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.3em] text-luxury-sage uppercase">
                          {slide.subtitle}
                        </span>
                      </div>

                      <h1
                        className={`font-display text-4xl md:text-7xl lg:text-8xl font-extralight leading-[1.08] text-luxury-cream transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
                          }`}
                        style={{ transitionDelay: '150ms' }}
                      >
                        {slide.title}
                      </h1>

                      <p
                        className={`font-sans text-xs md:text-sm text-luxury-cream/70 max-w-lg leading-relaxed font-light tracking-wide transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
                          }`}
                        style={{ transitionDelay: '300ms' }}
                      >
                        {slide.description}
                      </p>

                      <div
                        className={`flex items-center gap-4 pt-4 md:pt-6 transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
                          }`}
                        style={{ transitionDelay: '450ms' }}
                      >
                        <a
                          href="#/projects"
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate && onNavigate('projects');
                          }}
                          className="relative px-8 py-3.5 bg-luxury-cream text-luxury-charcoal font-sans text-xs uppercase tracking-widest font-semibold overflow-hidden group transition-all duration-300 cursor-pointer"
                          style={{
                            boxShadow: isActive ? `0 10px 30px -15px ${slide.accentHex}` : 'none'
                          }}
                        >
                          <span className="relative z-10 transition-colors duration-500 group-hover:text-luxury-cream">
                            Explore Spaces
                          </span>
                          <span className="absolute inset-0 bg-luxury-red -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        </a>

                        <a
                          href="#book-consultation"
                          onClick={(e) => {
                            e.preventDefault();
                            smoothScrollToTarget('#book-consultation');
                          }}
                          className="relative px-8 py-3.5 text-luxury-cream border border-luxury-cream/20 hover:border-luxury-cream font-sans text-xs uppercase tracking-widest font-medium overflow-hidden group transition-all duration-300 cursor-pointer"
                        >
                          <span className="relative z-10">
                            Book Consultation
                          </span>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div
            className="absolute bottom-10 right-6 md:right-16 z-30 flex items-center gap-4 transition-opacity duration-300"
            style={{ opacity: heroOpacity }}
          >
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-12 h-12 rounded-none border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/70 hover:text-luxury-cream hover:border-luxury-cream hover:bg-luxury-cream/5 transition-all duration-300 group cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="flex items-center gap-2 px-2 font-display text-base tracking-widest text-luxury-cream">
              <span className="font-semibold">0{activeIndex + 1}</span>
              <span className="opacity-30">/</span>
              <span className="opacity-50">0{localSlides.length}</span>
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-12 h-12 rounded-none border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/70 hover:text-luxury-cream hover:border-luxury-cream hover:bg-luxury-cream/5 transition-all duration-300 group cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Indicators */}
          <div
            className="hidden md:flex absolute bottom-10 left-6 md:left-24 z-30 items-center gap-6 transition-opacity duration-300"
            style={{ opacity: heroOpacity }}
          >
            {localSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => selectSlide(idx)}
                className="group py-4 flex flex-col items-start focus:outline-none cursor-pointer"
              >
                <span className={`font-sans text-[9px] tracking-widest transition-all duration-300 ${idx === activeIndex ? 'text-luxury-cream font-bold opacity-100' : 'text-luxury-cream/40 opacity-70 group-hover:text-luxury-cream/80'
                  }`}>
                  0{idx + 1}
                </span>
                <div className="w-16 md:w-24 h-[1px] bg-luxury-cream/20 mt-1 relative overflow-hidden">
                  {idx === activeIndex && (
                    <div
                      key={activeIndex}
                      className="absolute left-0 top-0 h-full bg-luxury-sage animate-progress-bar"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Scroll Down Indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden lg:flex flex-col items-center gap-2 transition-opacity duration-300"
            style={{ opacity: heroOpacity }}
          >
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-luxury-cream/30">
              Scroll Down
            </span>
            <div className="w-5 h-8 border border-luxury-cream/20 rounded-full flex justify-center py-1">
              <div className="w-1.5 h-1.5 bg-luxury-sage rounded-full animate-scroll-bounce" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
