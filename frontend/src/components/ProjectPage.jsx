import { useState, useEffect } from 'react';

const galleryProjects = [
  {
    image: '/images/slide-living.png',
    title: 'The Obsidian Foyer',
    location: 'Madurai, TN',
    type: 'Residential Lounge',
    desc: 'An exploration of silence. Styled with raw wire-brushed oak veneer, dark marble slab slabs, and brushed brass details.'
  },
  {
    image: '/images/slide-dining.png',
    title: 'The Sculpted Hearth',
    location: 'Ramanathapuram, TN',
    type: 'Bespoke Dining Suite',
    desc: 'An intimate dining sanctuary utilizing micro-textured charcoal plaster, custom gold hanging structures, and organic sage seating.'
  },
  {
    image: '/images/slide-bedroom.png',
    title: 'Nocturnal Master Suites',
    location: 'Madurai, TN',
    type: 'Private Retreat',
    desc: 'Nocturnal isolation spaces crafted with velvet panelling, recessed amber LED lines, and modular walk-in wardrobes.'
  }
];

const ProjectPage = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-luxury-charcoal text-luxury-cream overflow-x-hidden font-sans">
      
      {/* Background Glows */}
      <div className="absolute w-[600px] h-[600px] bg-luxury-red/5 rounded-full blur-[180px] -left-40 top-10 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-luxury-sage/4 rounded-full blur-[180px] -right-40 bottom-20 pointer-events-none" />

      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 md:px-16 py-6 border-b border-white/5 bg-luxury-charcoal/80 backdrop-blur-md sticky top-0 z-50">
        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 font-sans text-xs uppercase tracking-widest text-luxury-cream/80 hover:text-luxury-cream transition-colors group focus:outline-none cursor-pointer"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span>Return to Atelier</span>
        </button>

        <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} className="flex flex-col items-center">
          <span className="font-display text-lg md:text-xl font-light tracking-[0.25em] text-luxury-cream">
            SHARKINGS
          </span>
          <span className="font-sans text-[8px] font-semibold tracking-[0.45em] text-luxury-sage mt-0.5 ml-[0.1em]">
            INTERIOR
          </span>
        </a>

        <a 
          href="#inquire" 
          onClick={() => onNavigate('services')}
          className="hidden md:inline-block relative px-5 py-2 font-sans text-[10px] font-medium uppercase tracking-widest text-luxury-cream border border-white/10 hover:border-luxury-sage transition-all duration-300"
        >
          Request Swatches
        </a>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-24 space-y-24 relative z-10">

        {/* Title Block */}
        <section className="space-y-6 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-luxury-sage" />
            <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-luxury-sage uppercase">
              PORTFOLIO EXHIBITION
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-7xl font-extralight text-luxury-cream leading-[1.08] tracking-wide">
            Selected Residence Profiles
          </h1>

          <p className="font-sans text-xs md:text-sm text-luxury-cream/70 leading-relaxed font-light">
            A photographic index of recent interior handovers. We operate as a quiet architectural atelier, delivering spatial balance and certified joinery to executive clients in southern India.
          </p>
        </section>

        {/* Gallery Showcase Grid */}
        <section className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {galleryProjects.map((proj) => (
              <div key={proj.title} className="group space-y-4 border border-white/5 p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500">
                
                {/* Image Frame */}
                <div className="overflow-hidden rounded-xl border border-white/5 aspect-[4/3] relative">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-luxury-charcoal/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
                    <span className="font-sans text-[8px] tracking-wider text-luxury-sage uppercase font-bold">{proj.location}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-[9px] font-bold text-luxury-sage tracking-wider uppercase">{proj.type}</span>
                  </div>
                  <h3 className="font-display text-xl font-light text-luxury-cream group-hover:text-luxury-sage transition-colors duration-300">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-xs text-luxury-cream/50 leading-relaxed font-light">
                    {proj.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-display text-sm tracking-widest text-luxury-cream/40">SHARKINGS INTERIOR ATELIER</span>
            <p className="font-sans text-[10px] text-luxury-cream/30 mt-1">© 2026 Sharkings Interior. All rights reserved.</p>
          </div>
          <button 
            onClick={() => onNavigate('landing')}
            className="font-sans text-[10px] tracking-widest uppercase font-semibold text-luxury-sage hover:text-luxury-cream transition-colors cursor-pointer"
          >
            ← Back to Main Studio
          </button>
        </div>
      </footer>

    </div>
  );
};

export default ProjectPage;
