import { useState, useEffect } from 'react';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Sivakumar Rajendran',
    role: 'Managing Director',
    location: 'ANNA NAGAR, MADURAI',
    quote: '"Sharkings Interior completely transformed our brand-new villa into a piece of art. Their earthy palette, coupled with precise gold accents, created a warm yet deeply luxurious look. The modular kitchen is both highly functional and beautiful."',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Meera Krishnakumar',
    role: 'Creative Director',
    location: 'RAMANATHAPURAM',
    quote: '"I wanted a home that felt deeply rooted in nature but retained a modern architectural edge. The designers at Sharkings Interior nailed the brief. Their interactive 3D concepts made it incredibly easy to visualize and tweak designs beforehand."',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Arun Pragadeesh',
    role: 'Restaurateur',
    location: 'KK NAGAR, MADURAI',
    quote: '"Sharkings Interior handled our restaurant renovation. They used earthy tones of terracotta and gold, which look phenomenal under ambient lighting. Our footfall increased by 40% after the redesign. Absolute professionals!"',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  }
];

export default function Testimonial({ 
  testimonialRef, 
  testimonialProgress = 0, 
  isDesktop = true 
}) {
  const [manualIndex, setManualIndex] = useState(null);

  // Determine active index based on scroll progress or manual click
  let activeIndex = 0;
  if (manualIndex !== null) {
    activeIndex = manualIndex;
  } else {
    if (testimonialProgress < 0.33) {
      activeIndex = 0;
    } else if (testimonialProgress < 0.66) {
      activeIndex = 1;
    } else {
      activeIndex = 2;
    }
  }

  // Calculate card layout styles dynamically
  const getCardStyle = (idx) => {
    // If user is scrolling, calculate exact fractional offsets for fluid card tosses!
    let tx = 0;
    let ty = 0;
    let tz = 0;
    let ry = 0;
    let rz = 0;
    let opacity = 1;
    let scale = 1;

    // Slices for each card transition
    // Card 0 tosses to the left
    if (idx === 0) {
      if (testimonialProgress > 0.23) {
        const factor = Math.min((testimonialProgress - 0.23) / 0.10, 1);
        tx = factor * -420; // Toss left
        ry = factor * -25;
        rz = factor * -12;
        opacity = 1 - factor;
      }
    } 
    // Card 1 tosses to the right
    else if (idx === 1) {
      if (testimonialProgress < 0.33) {
        // Sit behind Card 0
        const factor = Math.min((0.33 - testimonialProgress) / 0.25, 1);
        scale = 1 - (factor * 0.07);
        tz = factor * -60;
        ty = factor * -12;
        opacity = 1 - (factor * 0.4);
      } else if (testimonialProgress > 0.56) {
        // Toss right
        const factor = Math.min((testimonialProgress - 0.56) / 0.10, 1);
        tx = factor * 420; // Toss right
        ry = factor * 25;
        rz = factor * 12;
        opacity = 1 - factor;
      }
    } 
    // Card 2 moves from back to front
    else if (idx === 2) {
      if (testimonialProgress < 0.66) {
        const factor = Math.min((0.66 - testimonialProgress) / 0.33, 1);
        scale = 1 - (factor * 0.14);
        tz = factor * -120;
        ty = factor * -24;
        opacity = 1 - (factor * 0.6);
      }
    }

    // Override with manual index coordinates if click navigation is active
    if (manualIndex !== null) {
      const offset = idx - manualIndex;
      if (offset < 0) {
        tx = -420;
        ry = -25;
        opacity = 0;
      } else if (offset > 0) {
        scale = 1 - (offset * 0.08);
        tz = offset * -60;
        ty = offset * -12;
        opacity = 0.6;
      } else {
        tx = 0;
        ty = 0;
        tz = 0;
        scale = 1;
        opacity = 1;
      }
    }

    return {
      transform: `perspective(1000px) translateX(${tx}px) translateY(${ty}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: 100 - idx,
      transition: manualIndex !== null || testimonialProgress === 0 || testimonialProgress === 1 
        ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s' 
        : 'transform 0.1s ease-out, opacity 0.1s ease-out',
      willChange: 'transform, opacity'
    };
  };

  const selectTestimonial = (idx) => {
    setManualIndex(idx);
    // Reset manual controls after scroll occurs
  };

  useEffect(() => {
    // If user scrolls again, reset manual index to let scroll progress take over
    setManualIndex(null);
  }, [testimonialProgress]);

  return (
    <div 
      ref={testimonialRef}
      id="testimonials" 
      className="relative w-full h-[400vh] bg-luxury-charcoal text-luxury-cream z-30"
    >
      {/* Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-luxury-charcoal text-luxury-cream">
        
        {/* Glow ambient panels */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-luxury-red/[0.06] rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#838f6f]/[0.05] rounded-full blur-[120px] pointer-events-none z-0" />

        {/* Huge background text */}
        <div 
          className="absolute font-display text-[20vw] text-white/[0.012] font-extralight select-none pointer-events-none z-0"
          style={{
            right: '5%',
            top: '25%',
            transform: `translateY(${(testimonialProgress - 0.5) * -80}px)`,
            willChange: 'transform'
          }}
        >
          PRESTIGE
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 relative z-10 flex flex-col justify-between h-full py-16">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-luxury-sage" />
              <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-luxury-sage uppercase">
                CLIENT GRATITUDE
              </span>
              <span className="w-8 h-[1px] bg-luxury-sage" />
            </div>
            
            <h2 className="font-display text-3xl md:text-5xl font-light text-luxury-cream leading-tight uppercase tracking-wider">
              Trusted by Discriminating Families
            </h2>
            <p className="font-sans text-xs md:text-sm text-white/50 leading-relaxed font-light">
              Read how we turned homes across Madurai and Ramanathapuram into curated sanctuaries of comfort and luxury. Real reviews from real homeowners.
            </p>
          </div>

          {/* 3D Stacked Card Area */}
          <div className="relative w-full h-[320px] md:h-[380px] flex items-center justify-center overflow-visible mt-10">
            
            <div className="relative w-full max-w-[320px] md:max-w-[550px] h-full flex items-center justify-center [transform-style:preserve-3d]">
              {TESTIMONIALS_DATA.map((client, idx) => {
                const isActive = idx === activeIndex;
                
                return (
                  <div
                    key={client.id}
                    style={getCardStyle(idx)}
                    className={`absolute w-full p-6 md:p-10 rounded-[28px] bg-[#14161e] border flex flex-col justify-between space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.6)] ${
                      isActive 
                        ? 'border-[#c5a059]/30 ring-1 ring-[#c5a059]/10' 
                        : 'border-white/5'
                    }`}
                  >
                    {/* Review Quote text */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                            </svg>
                          ))}
                        </div>
                        <span className="font-display text-5xl text-white/5 font-light select-none group-hover:text-luxury-sage/30 transition-colors duration-300">“</span>
                      </div>
                      
                      <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed font-light italic">
                        {client.quote}
                      </p>
                    </div>

                    {/* Reviewer Details */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0 ring-1 ring-white/10">
                        <img 
                          src={client.avatar} 
                          alt={client.name} 
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-medium text-luxury-cream">{client.name}</h4>
                        <p className="font-sans text-[10px] text-luxury-sage font-medium tracking-wide">{client.role}</p>
                        <p className="font-sans text-[9px] text-white/40 tracking-widest uppercase mt-0.5">{client.location}</p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Navigation indicator dots and buttons */}
          <div className="flex flex-col items-center space-y-4">
            
            {/* Indicators */}
            <div className="flex items-center gap-3">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => selectTestimonial(idx)}
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                    idx === activeIndex 
                      ? 'border-[#c5a059] bg-[#c5a059]/10 scale-110' 
                      : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                  }`}
                  aria-label={`Show testimonial 0${idx + 1}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'bg-[#c5a059] scale-100' : 'bg-transparent scale-0'
                  }`} />
                </button>
              ))}
            </div>

            {/* Helper tooltip */}
            <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-white/30 animate-pulse mt-5">
              ← Scroll down the page or click dots to toss cards →
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}
