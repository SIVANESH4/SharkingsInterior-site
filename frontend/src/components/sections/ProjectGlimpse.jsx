import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const PROJECTS_DATA = [
  {
    id: 1,
    category: 'RESIDENTIAL',
    branch: 'MADURAI BRANCH',
    image: '/images/slide-living.png',
    title: 'The Terracotta Oasis',
    description: 'A modern, high-contrast living room crafted with beige textures, terracotta feature walls, and bespoke gold-brass hardware.',
    tags: ['Earthy Tones', 'Minimalist', 'Living Room', 'Bespoke Lighting'],
    architect: 'R. K. SIVANESH',
    sqft: '2,400 SQ. FT.',
    materials: [
      { name: 'Terracotta Plaster', color: '#c36241' },
      { name: 'Warm Oak Veneer', color: '#8a6543' },
      { name: 'Brushed Brass', color: '#d4af37' },
      { name: 'Linen Fiber', color: '#e3dfd5' }
    ]
  },
  {
    id: 2,
    category: 'RESIDENTIAL',
    branch: 'RAMANATHAPURAM BRANCH',
    image: '/images/slide-bedroom.png',
    title: 'The Sand & Serenity Lounge',
    description: 'An expansive bedroom layout that balances organic textures of warm sandstone, raw linen, and metallic brass details to create a calm retreat.',
    tags: ['Bedroom', 'Linen', 'Warm Tones', 'Calm Theme'],
    architect: 'A. MEERA',
    sqft: '1,850 SQ. FT.',
    materials: [
      { name: 'Raw Sandstone', color: '#dcc6a8' },
      { name: 'Bleached Linen', color: '#f5f3ef' },
      { name: 'Aged Gold', color: '#bfa15f' },
      { name: 'Obsidian Trim', color: '#111111' }
    ]
  },
  {
    id: 3,
    category: 'MODULAR KITCHEN',
    branch: 'MADURAI BRANCH',
    image: '/images/service-furniture.png',
    title: 'Minimalist Timber Kitchen',
    description: 'Precision-finished modular cabinetry accented with hand-polished golden grips and integrated hidden pull-out systems.',
    tags: ['Kitchen', 'Veneers', 'Gold Grips', 'German Hardware'],
    architect: 'S. KARTHIK',
    sqft: '520 SQ. FT.',
    materials: [
      { name: 'Charcoal Oak', color: '#2a2a2a' },
      { name: 'Satin Brass', color: '#cfb53b' },
      { name: 'Calacatta Marble', color: '#eaeaea' },
      { name: 'Toughened Glass', color: '#7a8a99' }
    ]
  },
  {
    id: 4,
    category: 'RESIDENTIAL',
    branch: 'RAMANATHAPURAM BRANCH',
    image: '/images/slide-dining.png',
    title: 'The Velvet Dining Pavilion',
    description: 'Bespoke velvet dining furniture paired with curved overhead brass lamps and low-glow moody backlights.',
    tags: ['Dining Room', 'Velvet Accent', 'Brass Lamp', 'Backlighting'],
    architect: 'R. K. SIVANESH',
    sqft: '1,200 SQ. FT.',
    materials: [
      { name: 'Sage Velvet', color: '#838f6f' },
      { name: 'Polished Brass', color: '#ffd700' },
      { name: 'Nero Marquina', color: '#1e1e1e' },
      { name: 'Smoked Mirror', color: '#333333' }
    ]
  },
  {
    id: 5,
    category: 'COMMERCIAL',
    branch: 'MADURAI BRANCH',
    image: '/images/service-commercial.png',
    title: 'The Corporate Obsidian Loft',
    description: 'A striking premium corporate boutique office utilizing floating slate panels and linear architectural fixtures.',
    tags: ['Workspace', 'Obsidian Slate', 'Linear Lighting', 'Glass Partitions'],
    architect: 'A. MEERA',
    sqft: '4,500 SQ. FT.',
    materials: [
      { name: 'Obsidian Slate', color: '#1a1d24' },
      { name: 'Brushed Steel', color: '#7a7e85' },
      { name: 'Tinted Glass', color: '#4a535c' },
      { name: 'Walnut Board', color: '#3d251d' }
    ]
  },
  {
    id: 6,
    category: 'RENOVATION',
    branch: 'RAMANATHAPURAM BRANCH',
    image: '/images/service-residential.png',
    title: 'The Coastal Villa Revival',
    description: 'Transforming an old coastal residence into a modern quiet luxury home utilizing terrazzo floors and rebuilt structural arches.',
    tags: ['Renovation', 'Terrazzo', 'Structural Arches', 'Coastal View'],
    architect: 'S. KARTHIK',
    sqft: '3,200 SQ. FT.',
    materials: [
      { name: 'White Terrazzo', color: '#efede8' },
      { name: 'Curved Stucco', color: '#eadecb' },
      { name: 'Marine Ply', color: '#6e5138' },
      { name: 'Gold Anodized', color: '#cda869' }
    ]
  }
];

function ProjectCard({ project, onClick, cardStyle, isActive }) {
  const [tiltStyle, setTiltStyle] = useState({});
  const [imgStyle, setImgStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!isActive) return; // Only tilt the active focused center card
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotX = ((yc - y) / yc) * 3;
    const rotY = ((x - xc) / xc) * 3;

    setTiltStyle({
      transform: `${cardStyle.transform} rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      transition: 'transform 0.1s ease-out',
      willChange: 'transform'
    });

    const transX = ((x - xc) / xc) * -8;
    const transY = ((yc - y) / yc) * -8;
    setImgStyle({
      transform: `scale(1.12) translate(${transX}px, ${transY}px)`,
      transition: 'transform 0.1s ease-out',
      willChange: 'transform'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({});
    setImgStyle({
      transform: `scale(1.05) translate(0px, 0px)`,
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'transform'
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...cardStyle,
        ...tiltStyle
      }}
      className={`absolute w-[265px] md:w-[350px] aspect-[3/4] bg-[#121622] rounded-3xl border overflow-hidden shadow-2xl transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none group [transform-style:preserve-3d] ${isActive
          ? 'border-[#c5a059]/40 ring-1 ring-[#c5a059]/20 shadow-[#c5a059]/5'
          : 'border-white/10 hover:border-white/20'
        }`}
    >
      {/* Image background with parallax */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
          src={project.image}
          alt={project.title}
          style={imgStyle}
          className="absolute inset-0 w-full h-full object-cover scale-[1.05] opacity-80 group-hover:scale-110 group-hover:opacity-95 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

        {/* Branch tag */}
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-black/60 backdrop-blur-sm text-luxury-cream border border-white/10 px-3 py-1 rounded text-[7px] font-sans font-bold tracking-[0.2em] uppercase">
            {project.branch.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Description Content */}
      <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end space-y-4">
        <div className="space-y-1 transform translate-z-[30px]">
          <span className="font-sans text-[8px] lg:text-[9px] font-bold tracking-[0.25em] text-[#c5a059] uppercase">
            {project.category}
          </span>
          <h3 className="font-display text-base lg:text-lg font-light text-luxury-cream leading-tight group-hover:text-[#c5a059] transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        <p className="font-sans text-[10px] lg:text-[11px] text-white/50 leading-relaxed font-light line-clamp-3 transform translate-z-[20px] group-hover:text-white/70 transition-colors duration-300">
          {project.description}
        </p>

        {/* Action helper */}
        <div className="pt-2 flex items-center justify-between transform translate-z-[10px]">
          {isActive ? (
            <span className="font-sans text-[7px] font-bold tracking-[0.2em] text-[#c5a059] uppercase">
              ✦ Click again to inspect specs
            </span>
          ) : (
            <span className="font-sans text-[7px] font-bold tracking-[0.2em] text-white/20 uppercase">
              Click to center
            </span>
          )}
          <span className="w-1.5 h-1.5 bg-[#838f6f] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectGlimpse({ onNavigate }) {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('RESIDENTIAL');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [specialtiesScrollProgress, setSpecialtiesScrollProgress] = useState(0.5);
  const [isDesktop, setIsDesktop] = useState(true);
  const sectionRef = useRef(null);

  const categories = ['ALL', 'RESIDENTIAL', 'MODULAR KITCHEN', 'COMMERCIAL', 'RENOVATION'];

  const filteredProjects = activeCategory === 'ALL'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  // Resize listener for responsive layout adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update active index to center of array when filtered list changes
  useEffect(() => {
    if (filteredProjects.length > 0) {
      setActiveIndex(Math.max(0, Math.floor((filteredProjects.length - 1) / 2)));
    } else {
      setActiveIndex(0);
    }
  }, [activeCategory]);

  // Section local scroll tracker for Y-axis rotation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalDist = rect.height + viewportHeight;
      const scrolled = viewportHeight - rect.top;

      const prog = Math.min(Math.max(0, scrolled / totalDist), 1);
      setSpecialtiesScrollProgress(prog);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerScanFetch = () => {
    if (isScanning) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1400);
  };

  const getCardTransform = (idx) => {
    const offset = idx - activeIndex;
    const scrollParallaxOffset = (specialtiesScrollProgress - 0.5) * 45;

    // Spread projects based on length of filtered set
    const spreadAngle = filteredProjects.length <= 3 ? 42 : 32;
    const angle = (offset * spreadAngle) + scrollParallaxOffset;
    const rad = (angle * Math.PI) / 180;

    const tx = Math.sin(rad) * (isDesktop ? 330 : 155);
    const tz = Math.cos(rad) * (isDesktop ? 140 : 75) - (isDesktop ? 140 : 75);
    const ry = -angle;

    const scale = 1 - Math.min(Math.abs(offset) * 0.12, 0.24);

    return {
      transform: `perspective(1200px) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity: Math.abs(angle) > 85 ? 0 : 1 - Math.min(Math.abs(angle) * 0.009, 0.8),
      zIndex: 100 - Math.round(Math.abs(offset) * 10),
      pointerEvents: Math.abs(angle) > 85 ? 'none' : 'auto',
      filter: idx === activeIndex ? 'none' : 'blur(1.2px) brightness(0.4) contrast(0.95)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s, filter 0.5s',
      willChange: 'transform, opacity, filter'
    };
  };

  const handleCardClick = (project, idx) => {
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <>
      <style>{`
        @keyframes scanLaser {
          0% { top: 0%; opacity: 1; }
          50% { top: 100%; opacity: 1; }
          100% { top: 0%; opacity: 0; }
        }
        .laser-line {
          animation: scanLaser 1.4s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="projects"
        className="relative z-30 bg-[#0a0c10] text-[#fbf9f6] py-10 px-6 md:px-16 lg:px-24 overflow-hidden border-t border-white/5"
      >
        {/* Grid lines background layout */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '35px 35px'
          }}
        />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-[#838f6f]/5 blur-[120px] -left-20 top-20 pointer-events-none" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-[#c5a059]/4 blur-[120px] -right-20 bottom-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 reveal-3d-popup">
            <div className="space-y-4 max-w-2xl">
              <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#838f6f] uppercase">
                SIGNATURE SHOWCASE
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extralight text-luxury-cream leading-tight uppercase tracking-wider">
                Our Masterpiece Portfolios
              </h2>
              <p className="font-sans text-xs md:text-sm text-white/50 leading-relaxed font-light">
                Explore custom spaces hand-engineered in Madurai and Ramanathapuram. Click cards or scroll the page to spin the curved 3D portfolio gallery.
              </p>
            </div>

            {/* Scan button */}
            <button
              onClick={triggerScanFetch}
              className="flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-[#838f6f] bg-white/5 rounded-none font-sans text-[10px] font-semibold tracking-wider uppercase text-white/80 hover:text-white transition-colors shadow-sm self-start md:self-end"
            >
              <svg className={`w-3.5 h-3.5 text-[#838f6f] ${isScanning ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span>Simulate Projects Fetch</span>
            </button>
          </div>

          {/* Filter row: Full-width row dedicated solely to filters */}
          <div className="flex justify-center border-b border-white/5">
            <div className="bg-white/5 border border-white/10 p-1 rounded-none flex flex-nowrap overflow-x-auto scrollbar-none gap-2 shadow-sm max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    triggerScanFetch();
                  }}
                  className={`px-5 py-2.5 rounded-none font-sans text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex-shrink-0 ${activeCategory === cat
                      ? 'bg-[#838f6f] text-white shadow-md'
                      : 'bg-transparent text-white/50 hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Perspective Curved Container */}
          <div className="relative w-full h-[450px] md:h-[560px] flex items-center justify-center overflow-visible">

            {/* Ring Center horizontal alignment line */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-[102%] h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/20 to-transparent" />
            </div>

            {/* Laser Line Scanning visual effect overlay */}
            {isScanning && (
              <div
                className="absolute left-0 right-0 h-[2px] bg-[#c5a059] z-20 pointer-events-none laser-line"
                style={{
                  boxShadow: '0 0 14px 2.5px #c5a059',
                  top: '50%'
                }}
              />
            )}

            {/* Cards Deck */}
            <div className="relative w-full h-full flex items-center justify-center overflow-visible [transform-style:preserve-3d]">
              {filteredProjects.map((project, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={project.id}
                    className={`transition-all duration-500 transform ${isScanning ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
                      }`}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none'
                    }}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => handleCardClick(project, idx)}
                      cardStyle={getCardTransform(idx)}
                      isActive={isActive}
                    />
                  </div>
                );
              })}
            </div>

          </div>

          {/* Indicator dots below ring */}
          <div className="flex justify-center items-center gap-3">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show project 0${idx + 1}`}
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${idx === activeIndex
                    ? 'border-[#c5a059] bg-[#c5a059]/10 scale-110'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                  }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-[#c5a059] scale-100' : 'bg-transparent scale-0'
                  }`} />
              </button>
            ))}
          </div>

          {/* Bottom Action CTA */}
          <div className="flex justify-center pt-6">
            <button
              onClick={() => onNavigate('projects')}
              className="relative px-9 py-3.5 bg-white text-luxury-charcoal font-sans text-[10px] uppercase tracking-[0.2em] font-semibold overflow-hidden group transition-all duration-300 shadow-[0_15px_30px_rgba(255,255,255,0.05)] rounded-full hover:shadow-[0_15px_35px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Explore Entire Gallery</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* Blueprint Details Sidebar/Drawer (Slides in from the right) */}
      <div
        className={`fixed inset-0 z-[9999] flex justify-end transition-opacity duration-500 ease-in-out ${selectedProject ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          onClick={() => setSelectedProject(null)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <div
          className={`relative w-full max-w-xl md:max-w-2xl h-full bg-[#121622] text-luxury-cream shadow-[0_0_50px_rgba(0,0,0,0.8)] border-l border-white/5 p-6 md:p-10 flex flex-col justify-between overflow-y-auto transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${selectedProject ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Header */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-5">
              <div className="space-y-1">
                <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-luxury-sage uppercase">
                  {selectedProject?.category} • SPECIFICATIONS
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-light text-luxury-cream">
                  {selectedProject?.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scope Summary metadata */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
              <div>
                <span className="block text-[8px] font-sans font-bold tracking-widest text-white/40 uppercase">architect in charge</span>
                <span className="text-[11px] font-semibold text-luxury-cream">{selectedProject?.architect}</span>
              </div>
              <div>
                <span className="block text-[8px] font-sans font-bold tracking-widest text-white/40 uppercase">project footprint</span>
                <span className="text-[11px] font-semibold text-luxury-cream">{selectedProject?.sqft}</span>
              </div>
              <div>
                <span className="block text-[8px] font-sans font-bold tracking-widest text-white/40 uppercase">project site branch</span>
                <span className="text-[11px] font-semibold text-luxury-sage">{selectedProject?.branch.split(' ')[0]}</span>
              </div>
            </div>

            {/* Material board swatches */}
            <div className="space-y-3">
              <span className="block text-[9px] font-sans font-bold tracking-[0.2em] text-luxury-sage uppercase">
                MATERIAL BOARD SELECTIONS
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedProject?.materials.map((mat, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-lg flex flex-col justify-between space-y-3">
                    <div className="w-6 h-6 rounded border border-white/10" style={{ backgroundColor: mat.color }} />
                    <span className="font-sans text-[10px] text-white/70 leading-tight font-medium">{mat.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Blueprint draft vector */}
            <div className="space-y-3">
              <span className="block text-[9px] font-sans font-bold tracking-[0.2em] text-luxury-sage uppercase">
                ARCHITECTURAL BLUEPRINT GRID
              </span>
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0d101d] border border-white/[0.05] flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #ffffff 1px, transparent 1px),
                      linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />

                <svg className="w-full h-full relative z-10 opacity-75 text-[#838f6f]" viewBox="0 0 400 200" fill="none" stroke="currentColor">
                  <rect x="20" y="20" width="360" height="160" rx="3" strokeWidth="1.5" strokeDasharray="3 3" />
                  <rect x="25" y="25" width="350" height="150" rx="2" strokeWidth="1.2" />

                  <line x1="140" y1="25" x2="140" y2="175" strokeWidth="1" />
                  <line x1="260" y1="25" x2="260" y2="110" strokeWidth="1" />
                  <line x1="140" y1="110" x2="375" y2="110" strokeWidth="1" />

                  <path d="M 140 145 A 30 30 0 0 1 170 175" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="140" y1="145" x2="140" y2="175" strokeWidth="0.8" />

                  <path d="M 260 80 A 30 30 0 0 0 230 110" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="260" y1="80" x2="260" y2="110" strokeWidth="0.8" />

                  <text x="75" y="100" fill="#ffffff" opacity="0.3" fontSize="8" fontFamily="sans-serif" textAnchor="middle" stroke="none">LOUNGE CHAMBER</text>
                  <text x="200" y="65" fill="#ffffff" opacity="0.3" fontSize="8" fontFamily="sans-serif" textAnchor="middle" stroke="none">VESTIBULE</text>
                  <text x="320" y="65" fill="#ffffff" opacity="0.3" fontSize="8" fontFamily="sans-serif" textAnchor="middle" stroke="none">OFFICE DRAFT</text>
                  <text x="255" y="150" fill="#ffffff" opacity="0.3" fontSize="8" fontFamily="sans-serif" textAnchor="middle" stroke="none">TERRACE PAVILION</text>

                  <rect x="40" y="40" width="70" height="25" rx="2" strokeWidth="0.8" opacity="0.5" />
                  <circle cx="200" cy="145" r="22" strokeWidth="0.8" opacity="0.5" />

                  <line x1="20" y1="10" x2="380" y2="10" strokeWidth="0.5" />
                  <line x1="20" y1="7" x2="20" y2="13" strokeWidth="0.5" />
                  <line x1="380" y1="7" x2="380" y2="13" strokeWidth="0.5" />
                  <text x="200" y="6" fill="#c5a059" fontSize="6" fontFamily="sans-serif" textAnchor="middle" stroke="none">38.0 METERS NOMINAL</text>
                </svg>

                <div className="absolute bottom-2 left-2 pointer-events-none">
                  <span className="font-sans text-[7px] text-[#c5a059] font-bold tracking-widest uppercase">
                    ARCHITECTURAL LAYOUT DRAFT v1.12
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Inquiry CTA */}
          <div className="border-t border-white/5 pt-6 mt-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="block text-[8px] font-sans font-bold tracking-widest text-white/40 uppercase">project footprint spec</span>
              <span className="text-xs text-white/70">Custom scale blueprints accessible for clients.</span>
            </div>
            <a
              href="#inquire"
              onClick={() => setSelectedProject(null)}
              className="px-6 py-2.5 bg-luxury-sage text-luxury-cream hover:bg-white hover:text-luxury-charcoal transition-colors duration-300 font-sans text-[9px] font-bold uppercase tracking-widest"
            >
              Inquire About Layout
            </a>
          </div>

        </div>

      </div>
    </>
  );
}
