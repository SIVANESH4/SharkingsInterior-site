import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import slogo from '../assets/slogo.webp';

const SERVICES_CATALOG = [
  {
    id: 'turnkey',
    category: 'RESIDENTIAL & COMMERCIAL',
    categoryGroup: 'RESIDENTIAL',
    title: 'Turnkey Projects',
    badge: 'SHARKINGS STUDIO',
    description: 'Complete end-to-end architectural execution from bare shell to luxury handover. Includes civil modifications, electrical grids, acoustic ceilings, and custom furniture fitting.',
    image: '/images/slide-living.png',
    timeline: '6 - 8 Weeks',
    features: [
      'ISO 9001:2015 Quality Standards',
      'Single Point Atelier Concierge',
      'Guaranteed 45-Day Handover',
      '3D VR Pre-visualization'
    ],
    guarantee: 'CERTIFIED QUALITY ASSURANCE GUARANTEE'
  },
  {
    id: 'modular-kitchen',
    category: 'GERMAN-ENGINEERED KITCHENS',
    categoryGroup: 'MODULAR',
    title: 'Modular Kitchen',
    badge: 'ATELIER KITCHEN',
    description: 'Bespoke European smart kitchen systems featuring textured natural veneers, rust-resistant stainless steel carcasses, and soft-closing Hettich & Blum dampeners.',
    image: '/images/service-furniture.png',
    timeline: '4 - 5 Weeks',
    features: [
      'Marine Plywood Core Carcass',
      'Anti-Fingerprint Acrylic & Veneer',
      'Corner Magic Pull-out Systems',
      '10-Year Structural Warranty'
    ],
    guarantee: '10-YEAR CARCASS & HARDWARE WARRANTY'
  },
  {
    id: 'container-interior',
    category: 'INDUSTRIAL ECO-ARCHITECTURE',
    categoryGroup: 'CONTAINER',
    title: 'Container Interior',
    badge: 'SHARKINGS ECO',
    description: 'High-performance interior adaptations for shipping container architectures. Features thermal polyurethane insulation, concealed wiring, and space-saving modular layouts.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
    timeline: '3 - 4 Weeks',
    features: [
      'Thermal & Acoustic Insulation',
      'Weather-proof Double Sealings',
      'Integrated LED Mood Channels',
      'Modular Expandable Wall Paneling'
    ],
    guarantee: 'WEATHER-PROOF THERMAL SEAL GUARANTEE'
  },
  {
    id: 'container-cafe',
    category: 'COMMERCIAL HOSPITALITY DESIGN',
    categoryGroup: 'CONTAINER',
    title: 'Container Cafe',
    badge: 'SHARKINGS STUDIO',
    description: 'Bespoke, compact restaurant and cafe environments engineered from structural containers. Optimized for workflow efficiency, unique brand presentation, and atmospheric customer seating.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
    timeline: '4 - 6 Weeks',
    features: [
      'Custom Espresso Bar Countertops',
      'Pop-out Hydraulic Canopy Windows',
      'Outdoor Decking Integration',
      'Turnkey Commercial Plumbing Grid'
    ],
    guarantee: 'CERTIFIED QUALITY ASSURANCE GUARANTEE'
  },
  {
    id: 'container-homes',
    category: 'MODULAR ECO-RESIDENCES',
    categoryGroup: 'CONTAINER',
    title: 'Container Homes',
    badge: 'ATELIER RESIDENCE',
    description: 'Sustainable multi-container private homes engineered with luxury wood finishes, expansive double-glazed glass windows, and off-grid solar readiness.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    timeline: '5 - 7 Weeks',
    features: [
      'Double-glazed Energy Glass Windows',
      'Teak Decking & Balcony Framework',
      'Smart Home Automation Grid',
      'Rapid 30-Day On-site Assembly'
    ],
    guarantee: 'STRUCTURAL LIFETIME INTEGRITY GUARANTEE'
  },
  {
    id: 'false-ceiling',
    category: 'ACOUSTIC & LIGHTING ARCHITECTURE',
    categoryGroup: 'SPECIALTY',
    title: 'False Ceiling Work',
    badge: 'ATELIER LIGHTING',
    description: 'Custom Gypsum, Saint-Gobain, and wooden louvre ceiling designs integrated with cove uplighting, magnetic track spotlights, and concealed AC diffuser slots.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
    timeline: '2 - 3 Weeks',
    features: [
      'Seamless Gypsum Board Grid',
      'Concealed Magnetic Track Lighting',
      'Acoustic Dampening Insulation Layer',
      'Zero-Cracking Moisture Shield'
    ],
    guarantee: 'ZERO-CRACK ACOUSTIC GUARANTEE'
  },
  {
    id: 'wardrobe',
    category: 'BESPOKE STORAGE SYSTEMS',
    categoryGroup: 'MODULAR',
    title: 'Wardrobe Suite',
    badge: 'LUXURY SUITE',
    description: 'Floor-to-ceiling luxury wardrobe suites featuring tinted glass sliding doors, integrated sensor strip lighting, velvet jewelry drawers, and lacquered finish panels.',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop',
    timeline: '3 - 4 Weeks',
    features: [
      'Tinted Toughened Glass Profiles',
      'Proximity Sensor LED Light Strips',
      'Soft-close Sliding Mechanism',
      'Velvet Watch & Jewelry Dividers'
    ],
    guarantee: '10-YEAR MOTION FITTINGS WARRANTY'
  },
  {
    id: 'home-interior',
    category: 'PRIVATE RESIDENCES',
    categoryGroup: 'RESIDENTIAL',
    title: 'Home Interior',
    badge: 'FULL VILLA',
    description: 'Holistic residential interior design for villas and luxury apartments. Unifies living spaces, dining halls, and master suites with custom veneers, plush fabrics, and ambient light ratios.',
    image: '/images/slide-living.png',
    timeline: '6 - 8 Weeks',
    features: [
      'Custom Veneer Feature Walls',
      'Ergonomic Furniture Layouts',
      'Designer Lighting & Chandeliers',
      'Harmonious Color Palette Curation'
    ],
    guarantee: 'CERTIFIED QUALITY ASSURANCE GUARANTEE'
  },
  {
    id: 'acp-elevation',
    category: 'ARCHITECTURAL FACADES',
    categoryGroup: 'SPECIALTY',
    title: 'ACP Elevation',
    badge: 'EXTERIOR FACADE',
    description: 'Aluminum Composite Panel (ACP) exterior facade cladding designed for extreme coastal weather resistance, contemporary thermal insulation, and striking visual presence.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    timeline: '3 - 4 Weeks',
    features: [
      'PVDF Weather-resistant Coating',
      'Fire-retardant Core Panel Grid',
      'CNC Laser-cut Decorative Grills',
      'Concealed Structural Fasteners'
    ],
    guarantee: 'WEATHER & COLOR FADE WARRANTY'
  },
  {
    id: 'aluminium-partition',
    category: 'COMMERCIAL & OFFICE SPACES',
    categoryGroup: 'COMMERCIAL',
    title: 'Aluminium Partition',
    badge: 'OFFICE BLUEPRINT',
    description: 'Minimalist slimline aluminum and acoustic double-glazed glass partition systems for modern office cabins, conference rooms, and commercial enclosures.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    timeline: '2 - 3 Weeks',
    features: [
      'Anodized Slim Aluminium Frames',
      'Acoustic Double-glazed Glass',
      'Integrated Venetian Blinds Option',
      'Rapid Clean Installation Process'
    ],
    guarantee: 'ACOUSTIC ISOLATION ASSURANCE'
  },
  {
    id: 'conditioner-portable',
    category: 'HVAC & CLIMATE SOLUTIONS',
    categoryGroup: 'SPECIALTY',
    title: 'Conditioner Portable',
    badge: 'CLIMATE TECH',
    description: 'Architecturally concealed HVAC ducting and portable industrial cooling systems engineered for temporary pavilions, pop-up showrooms, and commercial events.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop',
    timeline: '1 - 2 Weeks',
    features: [
      'High-efficiency Inverter Compressor',
      'Quiet Operation Low-decibel Ducting',
      'Architectural Flush Grilles',
      'Rapid Deployment Mobility'
    ],
    guarantee: 'CLIMATE & PERFORMANCE GUARANTEE'
  },
  {
    id: 'office-interior',
    category: 'CORPORATE & WORKSPACE',
    categoryGroup: 'COMMERCIAL',
    title: 'Office Interior',
    badge: 'CORPORATE ATELIER',
    description: 'High-productivity corporate interiors featuring ergonomic workstation clusters, acoustic phone booths, executive boardroom setups, and biophilic interior accents.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop',
    timeline: '4 - 6 Weeks',
    features: [
      'Ergonomic Modular Workstations',
      'Executive Boardroom AV Grids',
      'Biophilic Planter Walls',
      'Cable Management Concealment'
    ],
    guarantee: 'WORKFLOW & ERGONOMIC GUARANTEE'
  },
  {
    id: 'salon-interior',
    category: 'RETAIL BEAUTY & WELLNESS',
    categoryGroup: 'COMMERCIAL',
    title: 'Salon Interior',
    badge: 'BEAUTY ATELIER',
    description: 'Chic, sensory luxury beauty salon and spa interiors. Integrates halo-lit vanity mirrors, custom wash station plumbing, anti-stain flooring, and ambient relaxation lighting.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop',
    timeline: '4 - 5 Weeks',
    features: [
      'Halo LED Vanity Mirrors',
      'Chemical-resistant Epoxy Flooring',
      'Plush Ergonomic Styling Chairs',
      'Integrated Sound & Aromatherapy'
    ],
    guarantee: 'LUXURY FINISH & HYGIENE GUARANTEE'
  }
];

export default function ServicePage({ onNavigate }) {
  useScrollReveal();
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(3);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [isDesktop, setIsDesktop] = useState(true);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const stageRef = useRef(null);

  const filteredServices = activeCategoryFilter === 'ALL'
    ? SERVICES_CATALOG
    : SERVICES_CATALOG.filter(s => s.categoryGroup === activeCategoryFilter);

  const activeService = SERVICES_CATALOG[selectedServiceIdx] || SERVICES_CATALOG[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selectService = (globalIdx) => {
    setSelectedServiceIdx(globalIdx);
    // Smooth auto scroll to active card stage on mobile view
    if (window.innerWidth < 1024 && stageRef.current) {
      stageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;

    setMouseOffset({
      x: dx * 3,
      y: -dy * 3
    });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-[#f9f8f4] text-[#1a1a1a] font-sans selection:bg-[#710014] selection:text-white relative overflow-x-hidden">
      
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000000 1px, transparent 1px),
            linear-gradient(to bottom, #000000 1px, transparent 1px)
          `,
          backgroundSize: '35px 35px'
        }}
      />

      {/* Header */}
      <header className="w-full bg-[#f9f8f4]/90 backdrop-blur-md border-b border-[#e5e0d3] sticky top-0 z-50 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 flex items-center justify-between">
          
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 font-sans text-xs font-bold tracking-[0.2em] text-[#1a1a1a] hover:text-[#710014] transition-colors uppercase cursor-pointer focus:outline-none group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform text-[#710014]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span>HOME</span>
          </button>

          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} 
            className="flex items-center group cursor-pointer"
          >
            <img
              src={slogo}
              alt="Sharkings Interior"
              className="h-7 sm:h-8.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
            />
          </a>

          <button
            onClick={() => onNavigate('landing')}
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#710014] text-white text-[10px] font-sans font-bold tracking-wider uppercase hover:bg-[#580010] transition-colors cursor-pointer shadow-sm"
          >
            CONSULTATION
          </button>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-5 sm:px-12 lg:px-16 py-8 sm:py-16 space-y-8 sm:space-y-10 relative z-10">

        {/* Title Block */}
        <section className="space-y-3 border-b border-[#e5e0d3] pb-6">
          <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.35em] text-[#710014] uppercase block">
            OUR EXPERTISE
          </span>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#1a1a1a] leading-tight uppercase tracking-wider">
            Architectural Services
          </h1>

          <p className="font-sans text-xs sm:text-sm text-[#4a4a4a] leading-relaxed font-normal max-w-2xl">
            An immersive look into our structural engineering capabilities, high-performance interior blueprints, and bespoke modular creations across Madurai and Ramanathapuram.
          </p>

          {/* Filter Bar Row */}
          <div className="pt-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <div className="bg-white border border-[#e5e0d3] p-1 flex flex-nowrap overflow-x-auto gap-2 shadow-sm w-full sm:w-auto">
              {[
                { label: 'ALL SERVICES', value: 'ALL' },
                { label: 'RESIDENTIAL', value: 'RESIDENTIAL' },
                { label: 'MODULAR SYSTEMS', value: 'MODULAR' },
                { label: 'ECO CONTAINER', value: 'CONTAINER' },
                { label: 'COMMERCIAL & OFFICE', value: 'COMMERCIAL' },
                { label: 'SPECIALTY ARCHITECTURE', value: 'SPECIALTY' }
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveCategoryFilter(tab.value)}
                  className={`px-4 py-2 font-sans text-[9px] sm:text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    activeCategoryFilter === tab.value
                      ? 'bg-[#710014] text-white shadow-md'
                      : 'bg-transparent text-[#666666] hover:text-[#710014] hover:bg-[#710014]/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* MOBILE INSTANT SELECTOR BAR (< lg): Touch-Friendly Horizontal Pill Scroller */}
        <section className="lg:hidden space-y-3 bg-white border border-[#e5e0d3] p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between font-sans text-xs font-bold text-[#710014]">
            <span className="uppercase tracking-wider">Tap Service to Inspect ({filteredServices.length})</span>
            <span className="text-[10px] text-[#777] font-normal">Auto-scrolls to details ↓</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {filteredServices.map((service) => {
              const globalIdx = SERVICES_CATALOG.findIndex(s => s.id === service.id);
              const isSelected = selectedServiceIdx === globalIdx;

              return (
                <button
                  key={service.id}
                  onClick={() => selectService(globalIdx)}
                  className={`px-4 py-2 rounded-xl text-xs font-sans font-bold flex-shrink-0 transition-all border ${
                    isSelected
                      ? 'bg-[#710014] text-white border-[#710014] shadow-md scale-105'
                      : 'bg-[#f9f8f4] text-[#333] border-[#e5e0d3] hover:border-[#710014]'
                  }`}
                >
                  {service.title}
                </button>
              );
            })}
          </div>
        </section>

        {/* 2-Column Atelier Showcase Stage */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* DESKTOP LEFT COLUMN: Capabilities List (5 Cols) */}
          <div className="hidden lg:block lg:col-span-5 bg-white border border-[#e5e0d3] p-6 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
            <div className="border-b border-[#e5e0d3] pb-4 mb-2 flex items-center justify-between">
              <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#710014] uppercase">
                CAPABILITIES ({filteredServices.length})
              </span>
              <span className="font-sans text-[10px] text-[#777777] font-semibold uppercase">SELECT TO INSPECT</span>
            </div>

            <div className="space-y-1 max-h-[550px] overflow-y-auto pr-2 scrollbar-thin">
              {filteredServices.map((service) => {
                const globalIdx = SERVICES_CATALOG.findIndex(s => s.id === service.id);
                const isSelected = selectedServiceIdx === globalIdx;

                return (
                  <button
                    key={service.id}
                    onClick={() => selectService(globalIdx)}
                    className={`w-full text-left py-3.5 px-4 transition-all duration-300 flex items-center justify-between group cursor-pointer border-b border-[#f0ece1] last:border-0 ${
                      isSelected
                        ? 'bg-[#710014]/5 text-[#710014] font-bold border-l-4 border-l-[#710014] pl-5'
                        : 'text-[#333333] hover:bg-[#f6f4ee] hover:text-[#710014]'
                    }`}
                  >
                    <span className="font-sans text-xs md:text-sm tracking-wide font-semibold uppercase">
                      {service.title}
                    </span>

                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isSelected 
                          ? 'text-[#710014] translate-x-1' 
                          : 'text-[#999999] group-hover:text-[#710014] group-hover:translate-x-1'
                      }`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN / MOBILE ACTIVE STAGE: Active Card Showcase Stage */}
          <div ref={stageRef} className="lg:col-span-7 scroll-mt-24">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: isDesktop ? `perspective(1200px) rotateY(${mouseOffset.x}deg) rotateX(${mouseOffset.y}deg)` : 'none',
                transition: 'transform 0.15s ease-out'
              }}
              className="w-full bg-white border border-[#e5e0d3] rounded-3xl shadow-xl relative overflow-hidden space-y-6"
            >
              {/* Top Red Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#710014] z-30" />

              {/* Showcase Image Area */}
              <div className="relative w-full aspect-[16/9] bg-[#eee9df] overflow-hidden group">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Badge Overlay Top Left */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                  <span className="px-3 py-1 bg-[#710014] text-white text-[9px] font-sans font-bold tracking-[0.2em] uppercase rounded shadow-md">
                    ✨ {activeService.badge}
                  </span>
                </div>

                {/* Timeline Tag Top Right */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                  <span className="px-3 py-1 bg-black/80 text-white text-[9px] font-sans font-bold tracking-widest uppercase rounded shadow-md">
                    {activeService.timeline} EXECUTION
                  </span>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-5 sm:p-8 space-y-5">
                
                {/* Category & Title */}
                <div className="space-y-1 border-b border-[#e5e0d3] pb-4">
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#710014] uppercase">
                    {activeService.category}
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl font-light text-[#1a1a1a] uppercase tracking-wide">
                    {activeService.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-[#4a4a4a] leading-relaxed font-normal">
                  {activeService.description}
                </p>

                {/* Features Grid */}
                <div className="space-y-3 bg-[#f9f8f4] border border-[#e5e0d3] p-4 sm:p-5 rounded-2xl">
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#710014] uppercase block">
                    ARCHITECTURAL SPECIFICATIONS & SCOPE
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans font-semibold text-[#333333]">
                    {activeService.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[#710014] font-bold">✦</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantee Banner */}
                <div className="flex items-center gap-3 py-3 px-4 bg-[#710014]/5 border border-[#710014]/20 text-[#710014] rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0 text-[#710014]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  <span className="font-sans text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                    {activeService.guarantee}
                  </span>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => onNavigate('landing')}
                    className="w-full sm:w-1/2 py-3.5 px-6 bg-[#710014] text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#580010] transition-all shadow-md cursor-pointer text-center rounded-none"
                  >
                    BOOK VIP CONSULTATION
                  </button>

                  <a
                    href="tel:+918098090204"
                    className="w-full sm:w-1/2 py-3.5 px-6 bg-white border border-[#710014] text-[#710014] text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#710014] hover:text-white transition-all cursor-pointer text-center rounded-none flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#710014]">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c.135.252.286.505.452.757.946 1.433 2.164 2.651 3.597 3.597.252.166.505.317.757.452l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                    <span>CALL DIRECT LINE</span>
                  </a>
                </div>

              </div>

            </div>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#38000a] text-white py-10 px-6 md:px-16 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-xs tracking-widest text-[#c5a059] uppercase">
            SHARKINGS INTERIOR ATELIER • MADURAI & RAMANATHAPURAM
          </span>
          <button
            onClick={() => onNavigate('landing')}
            className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-white/80 hover:text-[#c5a059] transition-colors cursor-pointer"
          >
            ← RETURN TO MAIN STUDIO
          </button>
        </div>
      </footer>

    </div>
  );
}
