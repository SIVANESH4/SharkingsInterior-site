import React from 'react';

export default function Footer({ onNavigate }) {
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
    <footer className="relative w-full bg-[#38000a] text-[#f2f1ed] border-t border-[#c5a059]/30 z-30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 space-y-12">
        
        {/* MAIN 3-COLUMN MINIMAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* COLUMN 1: BRAND LOGO & DIRECT CONTACT (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Minimal Brand Title */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#710014] border border-[#c5a059] flex items-center justify-center text-[#c5a059] font-display text-lg font-bold">
                S
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-white tracking-wider uppercase leading-none">
                  SHARKINGS
                </h4>
                <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-[#c5a059] uppercase block mt-1">
                  INTERIORS & EXTERIORS
                </span>
              </div>
            </div>

            {/* Clean Description */}
            <p className="font-sans text-xs text-white/70 font-light leading-relaxed max-w-sm">
              We engineer luxury residential and commercial architecture. Marrying warm natural wood timbers, sandstone elements, and handcrafted gold accents to yield absolute spatial harmony.
            </p>

            {/* Direct Contact Links */}
            <div className="space-y-1.5 font-sans text-xs pt-1">
              <a href="tel:+918098090204" className="block text-[#c5a059] hover:text-white transition-colors font-medium">
                +91 80980 90204 (Central Customer Support)
              </a>
              <a href="mailto:sharkingsindia@gmail.com" className="block text-[#c5a059] hover:text-white transition-colors font-medium">
                sharkingsindia@gmail.com
              </a>
            </div>

          </div>

          {/* COLUMN 2: COMPANY NAVIGATION (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display text-xs font-bold text-[#c5a059] tracking-[0.2em] uppercase border-b border-[#c5a059]/20 pb-2">
              COMPANY NAVIGATION
            </h4>

            <ul className="space-y-2 font-sans text-xs font-light text-white/80">
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('services');
                  }} 
                  className="hover:text-[#c5a059] transition-colors"
                >
                  › Services
                </a>
              </li>
              <li>
                <a 
                  href="#interactive-studio" 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#interactive-studio');
                  }} 
                  className="hover:text-[#c5a059] transition-colors"
                >
                  › 3D Planner Studio
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#projects');
                  }} 
                  className="hover:text-[#c5a059] transition-colors"
                >
                  › Our Masterpieces
                </a>
              </li>
              <li>
                <a 
                  href="#showrooms" 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#showrooms');
                  }} 
                  className="hover:text-[#c5a059] transition-colors"
                >
                  › Experience Centres
                </a>
              </li>
              <li>
                <a 
                  href="#book-consultation" 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#book-consultation');
                  }} 
                  className="hover:text-[#c5a059] transition-colors"
                >
                  › VIP Booking
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: EXPERIENCE CENTRES (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display text-xs font-bold text-[#c5a059] tracking-[0.2em] uppercase border-b border-[#c5a059]/20 pb-2">
              EXPERIENCE CENTRES
            </h4>

            <div className="space-y-3 font-sans text-xs">
              {/* Madurai */}
              <div>
                <h5 className="font-display font-bold text-white text-xs">Madurai Centre</h5>
                <p className="text-white/60 font-light leading-relaxed mt-0.5">
                  TNHB Colony, Villapuram, Madurai, Tamil Nadu.
                </p>
              </div>

              {/* Ramanathapuram */}
              <div className="pt-2 border-t border-white/10">
                <h5 className="font-display font-bold text-white text-xs">Ramanathapuram Centre</h5>
                <p className="text-white/60 font-light leading-relaxed mt-0.5">
                  Opposite Government Girls Higher Secondary School, Ramanathapuram, Tamil Nadu.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* MINIMAL SUB-BAR */}
        <div className="border-t border-[#c5a059]/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-[11px] text-white/50 text-center sm:text-left">
          <div>
            © 2026 Sharkings Interiors & Exteriors Ltd. All Rights Reserved.
          </div>

          <div>
            Crafted for <span className="text-[#c5a059] font-medium">Sharkings Interiors & Exteriors Company</span>. Designed offline-first.
          </div>
        </div>

      </div>
    </footer>
  );
}
