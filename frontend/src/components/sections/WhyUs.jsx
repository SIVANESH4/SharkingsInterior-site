export default function WhyUs({ 
  whyUsRef, 
  whyUsBgProgress = 1, 
  whyUsContentProgress = 0 
}) {
  return (
    <section id="why-us" className="relative w-full bg-luxury-cream z-30 shadow-[0_-20px_50px_rgba(22,22,22,0.05)]">
      
      {/* MOBILE VIEW (< lg breakpoint): Clean, glitch-free static flow with 100% visible cards */}
      <div className="block lg:hidden w-full py-16 px-6 text-luxury-charcoal bg-luxury-cream">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-luxury-sage" />
              <span className="font-sans text-[10px] font-bold tracking-[0.35em] text-luxury-sage uppercase">
                WHY SHARKINGS?
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-light text-luxury-charcoal leading-tight tracking-wide">
              The Golden Standards of Interior Craft
            </h2>
            <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed font-light">
              Every home we touch is forged with meticulous attention, state-of-the-art virtual pre-planning, and premium handpicked materials.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Card 1: Signature Finish */}
            <div className="sm:col-span-2 bg-luxury-charcoal text-luxury-cream border border-luxury-cream/[0.03] p-6 rounded-2xl flex flex-col justify-between space-y-6 shadow-lg">
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-luxury-cream/5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 text-luxury-sage">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-5.75c-.622 0-1.125.504-1.125 1.125v3.375m9 0h-9M9 10.5a3 3 0 0 0-3-3H4.5A1.5 1.5 0 0 0 3 9v1.5a3 3 0 0 0 3 3h.75m10.5-6a3 3 0 0 1 3 3V12a3 3 0 0 1-3 3h-.75M12 3v3m0 0a3 3 0 0 0-3 3v3.375M12 6a3 3 0 0 1 3 3v3.375" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-luxury-sage border border-luxury-sage/20 px-3.5 py-1 rounded-full bg-luxury-sage/5">
                    SIGNATURE FINISH
                  </span>
                </div>
                <h3 className="font-display text-xl font-light text-luxury-cream mt-5">
                  Luxury Veneers & Elegant Brushed Gold Fittings
                </h3>
                <p className="font-sans text-xs text-luxury-cream/70 leading-relaxed font-light mt-2.5">
                  We custom-engineer all cabinet doors with solid marine plywood, laminated in high-grade natural timber veneers. Accented by hand-selected solid brass handles and rust-resistant premium mechanisms.
                </p>
              </div>
              <div className="font-sans text-[9px] tracking-wider text-luxury-sage font-medium uppercase mt-3">
                + 100% Water Resistant Core • + Life-time Structural Guarantee
              </div>
            </div>

            {/* Card 2: Showrooms */}
            <div className="bg-white text-luxury-charcoal border border-luxury-charcoal/5 p-5 rounded-2xl flex flex-col justify-between space-y-5 shadow-sm">
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-luxury-charcoal/5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 text-luxury-red">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-luxury-charcoal/50 border border-luxury-charcoal/10 px-3.5 py-1 rounded-full bg-luxury-charcoal/5">
                    LOCATIONS
                  </span>
                </div>
                <h3 className="font-display text-lg font-light text-luxury-charcoal mt-4">
                  State-of-the-Art Showrooms
                </h3>
                <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed font-light mt-2.5">
                  Our experience centres in Madurai & Ramanathapuram host 50+ luxury spatial mockups.
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-sans text-[10px] tracking-wider text-luxury-red font-medium uppercase">
                <span>Explore Addresses</span>
              </div>
            </div>

            {/* Card 3: Interactive 3D Planner */}
            <div className="bg-white text-luxury-charcoal border border-luxury-charcoal/5 p-5 rounded-2xl flex flex-col justify-between space-y-5 shadow-sm">
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-luxury-charcoal/5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 text-luxury-sage">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l3.75-2.25L16.5 21l-.813-5.096L20 12h-5.25L13.5 7.5 12 12H6.75l4.188 3.904z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-luxury-charcoal/50 border border-luxury-charcoal/10 px-3.5 py-1 rounded-full bg-luxury-charcoal/5">
                    VIRTUAL VR
                  </span>
                </div>
                <h3 className="font-display text-lg font-light text-luxury-charcoal mt-4">
                  Interactive 3D Planner
                </h3>
                <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed font-light mt-2.5">
                  Swap colors, shift modules, and choose light styles live using our customized virtual canvas.
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-sans text-[10px] tracking-wider text-luxury-sage font-medium uppercase">
                <span>Start 3D Studio</span>
              </div>
            </div>

            {/* Card 4: Timeline */}
            <div className="bg-white text-luxury-charcoal border border-luxury-charcoal/5 p-5 rounded-2xl flex flex-col justify-between space-y-5 shadow-sm">
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-luxury-charcoal/5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 text-luxury-sage">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-luxury-charcoal/50 border border-luxury-charcoal/10 px-3.5 py-1 rounded-full bg-luxury-charcoal/5">
                    TIMELINE
                  </span>
                </div>
                <h3 className="font-display text-lg font-light text-luxury-charcoal mt-4">
                  Rapid Premium Turnaround
                </h3>
                <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed font-light mt-2.5">
                  We deliver complete transformations inside 6 weeks. Factory-finished modular builds assembled with absolute precision.
                </p>
              </div>
              <div className="font-sans text-[9px] tracking-wider text-luxury-red font-semibold uppercase">
                30-Day Assembly Target
              </div>
            </div>

            {/* Card 5: Credentials */}
            <div className="bg-[#64000f] text-luxury-cream border border-white/5 p-5 rounded-2xl flex flex-col justify-between space-y-5 shadow-md">
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 text-luxury-cream">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-luxury-cream/80 border border-white/20 px-3.5 py-1 rounded-full bg-white/5">
                    CREDENTIALS
                  </span>
                </div>
                <h3 className="font-display text-lg font-light text-luxury-cream mt-4">
                  Award-Winning Residential Architecture
                </h3>
                <p className="font-sans text-xs text-luxury-cream/85 leading-relaxed font-light mt-2.5">
                  Lauded by design bodies for delivering Tamil Nadu's most cohesive organic-luxury interior design implementations.
                </p>
              </div>
              <div className="font-sans text-[9px] tracking-wide text-luxury-cream/70 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-luxury-cream/40">★</span>
                  <span>Design Summit Winner 2025</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-luxury-cream/40">★</span>
                  <span>ISO 9001:2015 Certified Factory</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* DESKTOP VIEW (>= lg breakpoint): Pinned 2-step scroll reveal animation */}
      <div 
        ref={whyUsRef}
        className="hidden lg:block relative w-full h-[180vh] bg-luxury-cream"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-luxury-cream text-luxury-charcoal z-10">
          
          {/* Decorative Background Parallax floating characters */}
          <div 
            className="absolute font-display text-[18vw] text-luxury-charcoal/[0.025] font-extralight select-none pointer-events-none z-0 right-4 top-1/2 -translate-y-1/2"
            style={{
              opacity: whyUsBgProgress,
              transform: `translateY(${-50 + (1 - whyUsBgProgress) * 20}%)`,
              willChange: 'opacity, transform'
            }}
          >
            ATELIER
          </div>

          {/* Content reveal */}
          <div 
            className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 relative z-10 py-6 md:py-8 text-luxury-charcoal"
            style={{
              opacity: whyUsContentProgress,
              transform: `translateY(${(1 - whyUsContentProgress) * 40}px)`,
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
              willChange: 'opacity, transform',
              pointerEvents: whyUsContentProgress > 0.3 ? 'auto' : 'none'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">
              
              {/* LEFT COLUMN: Header & Card 1 */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:space-y-8">
                
                {/* Header */}
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-luxury-sage" />
                    <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-luxury-sage uppercase">
                      WHY SHARKINGS?
                    </span>
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl xl:text-4xl font-light text-luxury-charcoal leading-tight tracking-wide">
                    The Golden Standards of Interior Craft
                  </h2>
                  <p className="font-sans text-[11px] lg:text-xs xl:text-sm text-luxury-charcoal/70 leading-relaxed font-light">
                    Every home we touch is forged with meticulous attention, state-of-the-art virtual pre-planning, and premium handpicked materials.
                  </p>
                </div>

                {/* Card 1: Signature Finish */}
                <div 
                  className="bg-luxury-charcoal text-luxury-cream border border-luxury-cream/[0.03] p-5 lg:p-6 xl:p-8 rounded-2xl flex flex-col justify-between space-y-6 cursor-pointer group hover:bg-[#1a1a1a] hover:border-luxury-sage/10 hover:-translate-y-1 transition-all duration-500 ease-out shadow-[0_15px_35px_-15px_rgba(22,22,22,0.4)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-luxury-cream/5 flex items-center justify-center group-hover:bg-luxury-sage/10 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 text-luxury-sage">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-5.75c-.622 0-1.125.504-1.125 1.125v3.375m9 0h-9M9 10.5a3 3 0 0 0-3-3H4.5A1.5 1.5 0 0 0 3 9v1.5a3 3 0 0 0 3 3h.75m10.5-6a3 3 0 0 1 3 3V12a3 3 0 0 1-3 3h-.75M12 3v3m0 0a3 3 0 0 0-3 3v3.375M12 6a3 3 0 0 1 3 3v3.375" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-luxury-sage border border-luxury-sage/20 px-3.5 py-1 rounded-full bg-luxury-sage/5">
                        SIGNATURE FINISH
                      </span>
                    </div>
                    
                    <h3 className="font-display text-lg lg:text-xl xl:text-2xl font-light text-luxury-cream mt-5 group-hover:text-luxury-sage transition-colors duration-300">
                      Luxury Veneers & Elegant Brushed Gold Fittings
                    </h3>
                    <p className="font-sans text-[11px] lg:text-xs text-luxury-cream/70 leading-relaxed font-light mt-2.5">
                      We custom-engineer all cabinet doors with solid marine plywood, laminated in high-grade natural timber veneers. Accented by hand-selected solid brass handles and rust-resistant premium mechanisms.
                    </p>
                  </div>
                  
                  <div className="font-sans text-[9px] tracking-wider text-luxury-sage font-medium uppercase mt-3">
                    + 100% Water Resistant Core • + Life-time Structural Guarantee
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Cards 2, 3, 4, 5 */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 xl:gap-6 self-center">
                
                {/* Card 2: Showrooms */}
                <div 
                  className="bg-white text-luxury-charcoal border border-luxury-charcoal/5 p-5 rounded-2xl flex flex-col justify-between space-y-5 cursor-pointer group hover:bg-white hover:border-luxury-red/20 hover:-translate-y-1 transition-all duration-500 ease-out shadow-[0_15px_35px_-15px_rgba(22,22,22,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(22,22,22,0.08)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-luxury-charcoal/5 flex items-center justify-center group-hover:bg-luxury-red/10 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 text-luxury-red">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-luxury-charcoal/50 border border-luxury-charcoal/10 px-3.5 py-1 rounded-full bg-luxury-charcoal/5">
                        LOCATIONS
                      </span>
                    </div>

                    <h3 className="font-display text-lg lg:text-xl xl:text-2xl font-light text-luxury-charcoal mt-4 group-hover:text-luxury-red transition-colors duration-300">
                      State-of-the-Art Showrooms
                    </h3>
                    <p className="font-sans text-[11px] lg:text-xs text-luxury-charcoal/70 leading-relaxed font-light mt-2.5">
                      Our experience centres in Madurai & Ramanathapuram host 50+ luxury spatial mockups.
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 font-sans text-[10px] tracking-wider text-luxury-red font-medium uppercase group-hover:translate-x-1 transition-transform duration-300">
                    <span>Explore Addresses</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>

                {/* Card 3: Interactive 3D Planner */}
                <div 
                  className="bg-white text-luxury-charcoal border border-luxury-charcoal/5 p-5 rounded-2xl flex flex-col justify-between space-y-5 cursor-pointer group hover:bg-white hover:border-luxury-sage/20 hover:-translate-y-1 transition-all duration-500 ease-out shadow-[0_15px_35px_-15px_rgba(22,22,22,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(22,22,22,0.08)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-luxury-charcoal/5 flex items-center justify-center group-hover:bg-luxury-sage/10 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 text-luxury-sage">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l3.75-2.25L16.5 21l-.813-5.096L20 12h-5.25L13.5 7.5 12 12H6.75l4.188 3.904z" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-luxury-charcoal/50 border border-luxury-charcoal/10 px-3.5 py-1 rounded-full bg-luxury-charcoal/5">
                        VIRTUAL VR
                      </span>
                    </div>

                    <h3 className="font-display text-lg lg:text-xl xl:text-2xl font-light text-luxury-charcoal mt-4 group-hover:text-luxury-sage transition-colors duration-300">
                      Interactive 3D Planner
                    </h3>
                    <p className="font-sans text-[11px] lg:text-xs text-luxury-charcoal/70 leading-relaxed font-light mt-2.5">
                      Swap colors, shift modules, and choose light styles live using our customized virtual canvas.
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 font-sans text-[10px] tracking-wider text-luxury-sage font-medium uppercase group-hover:translate-x-1 transition-transform duration-300">
                    <span>Start 3D Studio</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>

                {/* Card 4: Timeline */}
                <div 
                  className="bg-white text-luxury-charcoal border border-luxury-charcoal/5 p-5 rounded-2xl flex flex-col justify-between space-y-5 cursor-pointer group hover:bg-white hover:border-luxury-sage/20 hover:-translate-y-1 transition-all duration-500 ease-out shadow-[0_15px_35px_-15px_rgba(22,22,22,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(22,22,22,0.08)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-luxury-charcoal/5 flex items-center justify-center group-hover:bg-luxury-sage/10 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 text-luxury-sage">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-luxury-charcoal/50 border border-luxury-charcoal/10 px-3.5 py-1 rounded-full bg-luxury-charcoal/5">
                        TIMELINE
                      </span>
                    </div>

                    <h3 className="font-display text-lg lg:text-xl xl:text-2xl font-light text-luxury-charcoal mt-4 group-hover:text-luxury-sage transition-colors duration-300">
                      Rapid Premium Turnaround
                    </h3>
                    <p className="font-sans text-[11px] lg:text-xs text-luxury-charcoal/70 leading-relaxed font-light mt-2.5">
                      We deliver complete transformations inside 6 weeks. Factory-finished modular builds assembled with absolute precision.
                    </p>
                  </div>

                  <div className="font-sans text-[9px] tracking-wider text-luxury-red font-semibold uppercase">
                    30-Day Assembly Target
                  </div>
                </div>

                {/* Card 5: Credentials */}
                <div 
                  className="bg-[#64000f] text-luxury-cream border border-white/5 p-5 rounded-2xl flex flex-col justify-between space-y-5 cursor-pointer group hover:bg-[#7a0518] hover:border-white/10 hover:-translate-y-1 transition-all duration-500 ease-out shadow-[0_15px_35px_-15px_rgba(100,0,15,0.25)] hover:shadow-[0_20px_40px_-15px_rgba(100,0,15,0.35)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 text-luxury-cream">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-luxury-cream/80 border border-white/20 px-3.5 py-1 rounded-full bg-white/5">
                        CREDENTIALS
                      </span>
                    </div>

                    <h3 className="font-display text-lg lg:text-xl xl:text-2xl font-light text-luxury-cream mt-4">
                      Award-Winning Residential Architecture
                    </h3>
                    <p className="font-sans text-xs text-luxury-cream/85 leading-relaxed font-light mt-2.5">
                      Lauded by design bodies for delivering Tamil Nadu's most cohesive organic-luxury interior design implementations.
                    </p>
                  </div>

                  <div className="font-sans text-[9px] tracking-wide text-luxury-cream/70 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-luxury-cream/40">★</span>
                      <span>Design Summit Winner 2025</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-luxury-cream/40">★</span>
                      <span>ISO 9001:2015 Certified Factory</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

