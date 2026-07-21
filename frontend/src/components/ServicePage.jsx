import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

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
    title: 'Wardrobe',
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

const MATERIAL_FINISHES = {
  veneers: [
    { name: 'Natural Walnut', spec: 'A Grade, Book-matched, Low-VOC Matte Seal', desc: 'Deep warm wood grains with fine horizontal striations, perfect for study panels and kitchen cabinets.' },
    { name: 'Smoked Oak', spec: 'Quarter-cut, Wire-brushed Texture, Charcoal Stain', desc: 'Moody dark gray texture with strong tactile presence, anchoring living room feature walls.' },
    { name: 'Ebony Macassar', spec: 'High-gloss Lacquer Finish, Hand-polished', desc: 'Rare linear striping that creates a striking luxury backdrop for custom console tables.' }
  ],
  metals: [
    { name: 'Brushed Gold', spec: 'Electroplated Brass, Anti-fingerprint Coating', desc: 'Warm glowing trim details used on cabinet handles, socket frames, and recess profiles.' },
    { name: 'Antiqued Brass', spec: 'Hand-patinated Solid Brass, Raw Wax Seal', desc: 'Bespoke aging look that gains character over time, perfect for custom luxury hardware.' },
    { name: 'Gunmetal Black', spec: 'PVD Coated Stainless Steel, Sandblasted Matte', desc: 'Industrial refinement with absolute scratch resistance, highlighting edge channels and brackets.' }
  ],
  fabrics: [
    { name: 'Luxury Sage Velvet', spec: '100% Organic Cotton, 50,000 Martindale Rubs', desc: 'Rich mossy green drape with high texture, custom woven for lounge armchairs.' },
    { name: 'Cream Bouclé', spec: 'Alpaca Wool Blend, Heavy Textured Weave', desc: 'Soft cloud-like warmth for master bedroom seating, creating sensory tactile comfort.' },
    { name: 'Crimson Silk Velvet', spec: 'Mulberry Silk Back, Deep Crimson Pile', desc: 'A striking focal accent fabric for custom dining chairs and decorative cushions.' }
  ]
};

export default function ServicePage({ onNavigate }) {
  useScrollReveal();
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(3); // Container Cafe active by default
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [activeMaterialCat, setActiveMaterialCat] = useState('veneers');
  const [selectedMaterialIdx, setSelectedMaterialIdx] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Filtered Services List
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
    <div className="relative min-h-screen bg-[#fbf9f6] text-luxury-charcoal font-sans overflow-x-hidden">
      
      {/* Background Watermark */}
      <div className="absolute font-display text-[16vw] text-[#710014]/[0.02] font-extralight select-none pointer-events-none z-0 left-0 top-1/4 whitespace-nowrap">
        ARCHITECTURAL SERVICES
      </div>

      {/* Subtle Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#710014]/[0.03] rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-[#838f6f]/[0.04] rounded-full blur-[150px] pointer-events-none z-0" />

      {/* TOP STICKY BAR */}
      <header className="w-full flex items-center justify-between px-6 md:px-16 py-5 border-b border-black/10 bg-[#fbf9f6]/90 backdrop-blur-md sticky top-0 z-50">
        
        {/* Back Button */}
        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 px-4 py-2 bg-white border border-black/10 text-xs font-sans font-bold tracking-widest text-[#1a1a1a] hover:bg-[#710014] hover:text-white transition-all duration-300 rounded-none group cursor-pointer shadow-sm"
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
          <span>BACK TO HOME</span>
        </button>

        {/* Branding Logo */}
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} 
          className="flex flex-col items-center group cursor-pointer"
        >
          <span className="font-display text-lg md:text-2xl font-light tracking-[0.2em] text-[#1a1a1a] group-hover:text-[#710014] transition-colors">
            SHARKINGS
          </span>
          <span className="font-sans text-[8px] font-bold tracking-[0.45em] text-[#710014] mt-0.5 ml-[0.1em]">
            INTERIOR
          </span>
        </a>

        {/* Call to Action */}
        <button
          onClick={() => onNavigate('landing')}
          className="hidden md:inline-flex px-6 py-2.5 bg-[#710014] text-white text-xs font-sans font-extrabold tracking-widest uppercase hover:bg-[#580010] transition-all duration-300 rounded-none shadow-md cursor-pointer"
        >
          BOOK CONSULTATION
        </button>

      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-12 md:py-20 space-y-20 relative z-10">

        {/* PAGE HEADER */}
        <section className="space-y-4 reveal-3d-popup border-b border-black/10 pb-10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#710014]/30" />
            <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#710014] uppercase">
              OUR EXPERTISE
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-[#1a1a1a] tracking-tight">
            Architectural <span className="italic font-normal text-[#710014]">Services</span>
          </h1>

          <p className="font-sans text-xs md:text-sm text-luxury-charcoal/70 max-w-3xl leading-relaxed font-light">
            An immersive look into our structural engineering capabilities, high-performance interior blueprints, and bespoke modular creations across Madurai and Ramanathapuram.
          </p>
        </section>

        {/* CATEGORY FILTER TABS */}
        <section className="space-y-4 reveal-3d-popup">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
            {['ALL', 'RESIDENTIAL', 'MODULAR', 'CONTAINER', 'COMMERCIAL', 'SPECIALTY'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-5 py-2 rounded-none font-sans text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex-shrink-0 cursor-pointer ${
                  activeCategoryFilter === cat
                    ? 'bg-[#710014] text-white shadow-md'
                    : 'bg-white text-luxury-charcoal/60 border border-black/10 hover:border-[#710014] hover:text-[#710014]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* 2-COLUMN INTERACTIVE ATELIER SHOWCASE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start reveal-3d-popup delay-100">
          
          {/* LEFT COLUMN: 13 Services Navigation List (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-black/10 p-6 md:p-8 space-y-3 shadow-[0_15px_45px_rgba(0,0,0,0.03)] relative overflow-hidden">
            
            {/* Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#710014]" />

            <div className="border-b border-black/10 pb-4 mb-4 flex items-center justify-between">
              <span className="font-sans text-xs font-bold tracking-wider text-[#710014] uppercase">
                CAPABILITIES LIST ({filteredServices.length})
              </span>
              <span className="font-sans text-[10px] text-black/40 font-semibold">SELECT TO EXPLORE</span>
            </div>

            <div className="space-y-1 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
              {filteredServices.map((service) => {
                const globalIdx = SERVICES_CATALOG.findIndex(s => s.id === service.id);
                const isSelected = selectedServiceIdx === globalIdx;

                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedServiceIdx(globalIdx)}
                    className={`w-full text-left py-3.5 px-4 transition-all duration-300 flex items-center justify-between group cursor-pointer rounded-none border-b border-black/5 last:border-0 ${
                      isSelected
                        ? 'bg-[#710014]/5 text-[#710014] font-bold border-l-4 border-l-[#710014] pl-5'
                        : 'text-luxury-charcoal/70 hover:bg-[#f6f5f1] hover:text-[#710014]'
                    }`}
                  >
                    <span className="font-sans text-xs md:text-sm tracking-wide font-semibold">
                      {service.title.toUpperCase()}
                    </span>

                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isSelected 
                          ? 'text-[#710014] translate-x-1 rotate-45' 
                          : 'text-black/20 group-hover:text-[#710014] group-hover:translate-x-1'
                      }`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </button>
                );
              })}
            </div>

          </div>

          {/* RIGHT COLUMN: 3D Active Card Showcase Stage (7 Cols) */}
          <div className="lg:col-span-7">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: isDesktop ? `perspective(1200px) rotateY(${mouseOffset.x}deg) rotateX(${mouseOffset.y}deg)` : 'none',
                transition: 'transform 0.15s ease-out'
              }}
              className="w-full bg-white border border-black/10 shadow-[0_25px_70px_rgba(0,0,0,0.06)] relative overflow-hidden backdrop-blur-xl space-y-6"
            >
              {/* Top Burgundy Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#710014] to-transparent z-30" />

              {/* Showcase Image Area */}
              <div className="relative w-full aspect-[16/9] bg-luxury-charcoal overflow-hidden group">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge Overlay Top Left */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3.5 py-1.5 bg-black/80 border border-white/10 text-[#c5a059] text-[9px] font-sans font-bold tracking-[0.25em] uppercase rounded-none backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                    <span>✨</span>
                    <span>{activeService.badge}</span>
                  </span>
                </div>

                {/* Timeline Tag Top Right */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-[#710014] text-white text-[9px] font-sans font-extrabold tracking-widest uppercase rounded-none shadow-md">
                    {activeService.timeline} Execution
                  </span>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Category & Title */}
                <div className="space-y-1 border-b border-black/10 pb-4">
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#710014] uppercase">
                    {activeService.category}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-light text-[#1a1a1a]">
                    {activeService.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="font-sans text-xs md:text-sm text-luxury-charcoal/80 leading-relaxed font-light">
                  {activeService.description}
                </p>

                {/* Features Grid */}
                <div className="space-y-3 bg-[#f6f5f1] border border-black/5 p-4 md:p-5">
                  <span className="text-[10px] font-sans font-bold tracking-wider text-[#710014] uppercase block">
                    ARCHITECTURAL SPECIFICATIONS & SCOPE
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeService.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-sans text-luxury-charcoal/85">
                        <span className="text-[#710014] font-bold">✦</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantee Banner */}
                <div className="flex items-center gap-3 py-3 px-4 bg-[#710014]/5 border border-[#710014]/20 text-[#710014]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  <span className="font-sans text-xs font-bold tracking-wider uppercase">
                    {activeService.guarantee}
                  </span>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    onClick={() => onNavigate('landing')}
                    className="w-full sm:w-1/2 py-3.5 px-6 bg-[#710014] text-white text-xs font-sans font-extrabold tracking-widest uppercase hover:bg-[#580010] transition-all shadow-lg cursor-pointer text-center rounded-none"
                  >
                    BOOK VIP CONSULTATION
                  </button>

                  <a
                    href="tel:+918098090204"
                    className="w-full sm:w-1/2 py-3.5 px-6 bg-white border-2 border-[#710014] text-[#710014] text-xs font-sans font-extrabold tracking-widest uppercase hover:bg-[#710014] hover:text-white transition-all cursor-pointer text-center rounded-none flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c.135.252.286.505.452.757.946 1.433 2.164 2.651 3.597 3.597.252.166.505.317.757.452l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                    <span>CALL DIRECT LINE</span>
                  </a>
                </div>

              </div>

            </div>
          </div>

        </section>

        {/* MATERIAL SPECIFICATION LIBRARY */}
        <section className="space-y-10 bg-white border border-black/10 p-8 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.05)] relative overflow-hidden reveal-3d-popup">
          
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#710014] to-transparent" />

          <div className="max-w-2xl space-y-3">
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#710014] uppercase">
              INTERACTIVE MATERIAL TACTILITY
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1a1a1a]">
              The Material Specification Library
            </h2>
            <p className="font-sans text-xs md:text-sm text-luxury-charcoal/70 font-light leading-relaxed">
              Explore custom teak veneers, brushed gold hardware, and organic velvet swatches integrated across our bespoke interior blueprints.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 border-b border-black/10 pb-4">
            {Object.keys(MATERIAL_FINISHES).map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveMaterialCat(cat); setSelectedMaterialIdx(0); }}
                className={`px-5 py-2.5 font-sans text-[10px] tracking-widest uppercase font-bold transition-all duration-300 cursor-pointer rounded-none ${
                  activeMaterialCat === cat
                    ? 'bg-[#710014] text-white shadow-md'
                    : 'bg-[#f6f5f1] border border-black/10 text-luxury-charcoal/60 hover:text-[#710014]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Material Split Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-5 space-y-2">
              {MATERIAL_FINISHES[activeMaterialCat].map((finish, idx) => (
                <button
                  key={finish.name}
                  onClick={() => setSelectedMaterialIdx(idx)}
                  className={`w-full text-left p-4 border transition-all duration-300 cursor-pointer rounded-none ${
                    selectedMaterialIdx === idx
                      ? 'bg-[#710014]/5 border-[#710014] text-[#710014] font-bold border-l-4'
                      : 'bg-white border-black/5 text-luxury-charcoal/70 hover:bg-[#f6f5f1]'
                  }`}
                >
                  <div className="font-display text-lg font-light">{finish.name}</div>
                  <div className="font-sans text-[9px] text-black/40 uppercase tracking-widest mt-1">{finish.spec}</div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 bg-[#f6f5f1] border border-black/10 p-6 md:p-8 space-y-4">
              <span className="text-[10px] font-sans text-[#710014] font-bold tracking-widest uppercase block">
                COORDINATE PREVIEW
              </span>
              
              <div className="space-y-1">
                <h4 className="font-display text-2xl font-light text-[#1a1a1a]">
                  {MATERIAL_FINISHES[activeMaterialCat][selectedMaterialIdx].name}
                </h4>
                <div className="text-[10px] font-sans text-[#710014] font-semibold uppercase tracking-wider">
                  SPEC: {MATERIAL_FINISHES[activeMaterialCat][selectedMaterialIdx].spec}
                </div>
              </div>

              <div className="w-12 h-[1px] bg-[#710014]/30" />

              <p className="font-sans text-xs md:text-sm text-luxury-charcoal/80 leading-relaxed font-light">
                {MATERIAL_FINISHES[activeMaterialCat][selectedMaterialIdx].desc}
              </p>
            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#38000a] text-white py-12 px-6 md:px-16 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display text-xl font-light tracking-[0.2em] text-[#c5a059]">
              SHARKINGS INTERIOR
            </span>
            <span className="font-sans text-[9px] text-white/50 tracking-widest mt-1">
              Madurai & Ramanathapuram Architectural Atelier
            </span>
          </div>

          <div className="font-sans text-xs text-white/60">
            © {new Date().getFullYear()} Sharkings Interior. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
}
