import React, { useState, useEffect, useRef } from 'react';
import slogo from '../assets/slogo.webp';

const PROJECTS_DATA = [
  {
    id: 'velvet-atelier-salon',
    title: 'The Velvet Atelier Salon',
    category: 'COMMERCIAL / HOSPITALITY',
    branch: 'MADURAI ATELIER',
    locationFull: 'LAKE VIEW ROAD, MADURAI, TAMIL NADU',
    description: 'A high-end salon conceptualized with rich velvets, custom brass fittings and flooring, and consolidated architectural lighting designed to elevate the luxury styling experience.',
    year: '2025',
    sqft: '3,400 SQ. FT.',
    duration: '5 WEEKS',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'amber-residence',
    title: 'The Amber Residence',
    category: 'RESIDENTIAL ARCHITECTURE',
    branch: 'RAMANATHAPURAM',
    locationFull: 'PALACE ROAD, RAMANATHAPURAM, TAMIL NADU',
    description: 'A residential sanctuary featuring natural oak timber, custom hand-stitched leather furniture, and curated monochrome wall art galleries under warm ambient coves.',
    year: '2024',
    sqft: '4,800 SQ. FT.',
    duration: '6 WEEKS',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'gilded-executive-suite',
    title: 'Gilded Executive Suite',
    category: 'CORPORATE OFFICE',
    branch: 'MADURAI ATELIER',
    locationFull: 'KK NAGAR, MADURAI, TAMIL NADU',
    description: 'A corporate headquarters designed with double-glazed acoustic glass partitions, polished micro-cement flooring, and warm linear architectural luminaire channels.',
    year: '2025',
    sqft: '5,200 SQ. FT.',
    duration: '7 WEEKS',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'alabaster-villa',
    title: 'The Alabaster Villa',
    category: 'RESIDENTIAL / LIVING',
    branch: 'MADURAI ATELIER',
    locationFull: 'ANNA NAGAR, MADURAI, TAMIL NADU',
    description: 'An open-plan residential living space balancing organic linen upholstery, brushed brass lighting fixtures, and floor-to-ceiling natural daylighting apertures.',
    year: '2024',
    sqft: '3,900 SQ. FT.',
    duration: '5 WEEKS',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'majestique-cafe',
    title: 'The Majestique Cafe',
    category: 'COMMERCIAL / HOSPITALITY',
    branch: 'RAMANATHAPURAM',
    locationFull: 'MAIN ROAD, RAMANATHAPURAM, TAMIL NADU',
    description: 'A luxury dining experience center with solid teakwood wall paneling, directional narrow-beam spotlights, and bespoke lounge seating modules.',
    year: '2025',
    sqft: '2,800 SQ. FT.',
    duration: '4 WEEKS',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'meridian-penthouse',
    title: 'The Meridian Penthouse',
    category: 'RESIDENTIAL / SUITE',
    branch: 'MADURAI ATELIER',
    locationFull: 'RIVER BANK, MADURAI, TAMIL NADU',
    description: 'A multi-level luxury penthouse with custom timber exterior privacy louvers, floor-to-ceiling double glazing, and sweeping panoramic city skyline views.',
    year: '2025',
    sqft: '6,100 SQ. FT.',
    duration: '8 WEEKS',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop'
    ]
  }
];

export default function ProjectPage({ onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [mobileFeaturedIdx, setMobileFeaturedIdx] = useState(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') {
        setSelectedProject(null);
        document.body.style.overflow = '';
      } else if (e.key === 'ArrowRight') {
        setActiveGalleryIndex((prev) => (prev + 1) % selectedProject.gallery.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveGalleryIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'RESIDENTIAL') return proj.category.includes('RESIDENTIAL');
    if (activeCategory === 'COMMERCIAL') return proj.category.includes('COMMERCIAL') || proj.category.includes('CORPORATE');
    if (activeCategory === 'MADURAI') return proj.branch.includes('MADURAI');
    if (activeCategory === 'RAMANATHAPURAM') return proj.branch.includes('RAMANATHAPURAM');
    return true;
  });

  const openProjectModal = (proj) => {
    setSelectedProject(proj);
    setActiveGalleryIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  // Touch Swipe for Mobile Featured Showcase Card
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setMobileFeaturedIdx((prev) => (prev + 1) % filteredProjects.length);
      } else {
        setMobileFeaturedIdx((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
      }
    }
  };

  const featuredProj = filteredProjects[mobileFeaturedIdx] || filteredProjects[0];

  return (
    <div className="min-h-screen bg-[#f9f8f4] text-[#1a1a1a] font-sans selection:bg-[#710014] selection:text-white relative overflow-x-hidden">
      
      {/* Background Grid Pattern */}
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

      {/* Header Bar */}
      <header className="w-full bg-[#f9f8f4]/90 backdrop-blur-md border-b border-[#e5e0d3] sticky top-0 z-50 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 flex items-center justify-between">
          
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 font-sans text-xs font-bold tracking-[0.2em] text-[#1a1a1a] hover:text-[#710014] transition-colors uppercase cursor-pointer focus:outline-none group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform text-[#710014]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
            INQUIRE
          </button>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-5 sm:px-12 lg:px-16 py-8 sm:py-16 space-y-8 sm:space-y-10 relative z-10">
        
        {/* Title & Filter Bar */}
        <div className="space-y-4 border-b border-[#e5e0d3] pb-6">
          <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.35em] text-[#710014] uppercase block">
            SIGNATURE SHOWCASE
          </span>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#1a1a1a] leading-tight uppercase tracking-wider">
            Our Masterpiece Portfolios
          </h1>

          <p className="font-sans text-xs sm:text-sm text-[#4a4a4a] leading-relaxed font-normal max-w-2xl">
            Explore custom spaces hand-engineered in Madurai and Ramanathapuram since 2010. Tap any project to inspect full specifications and gallery photos.
          </p>

          {/* Filter Bar Row */}
          <div className="pt-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <div className="bg-white border border-[#e5e0d3] p-1 flex flex-nowrap overflow-x-auto gap-2 shadow-sm w-full sm:w-auto">
              {[
                { label: 'ALL MASTERPIECES', value: 'ALL' },
                { label: 'RESIDENTIAL', value: 'RESIDENTIAL' },
                { label: 'COMMERCIAL & OFFICE', value: 'COMMERCIAL' },
                { label: 'MADURAI ATELIER', value: 'MADURAI' },
                { label: 'RAMANATHAPURAM', value: 'RAMANATHAPURAM' }
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveCategory(tab.value);
                    setMobileFeaturedIdx(0);
                  }}
                  className={`px-4 py-2 font-sans text-[9px] sm:text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    activeCategory === tab.value
                      ? 'bg-[#710014] text-white shadow-md'
                      : 'bg-transparent text-[#666666] hover:text-[#710014] hover:bg-[#710014]/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DISTINCT MOBILE FEATURED SHOWCASE CAROUSEL (< lg) */}
        {featuredProj && (
          <section className="lg:hidden space-y-3">
            <div className="flex items-center justify-between font-sans text-xs font-bold text-[#710014]">
              <span className="uppercase tracking-wider">Featured Masterpiece</span>
              <span className="text-[10px] text-[#777] font-normal">👈 Swipe to Explore 👉</span>
            </div>

            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onClick={() => openProjectModal(featuredProj)}
              className="bg-white border border-[#e5e0d3] rounded-3xl p-4 shadow-lg cursor-pointer relative overflow-hidden space-y-3 active:scale-[0.99] transition-transform"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative bg-[#eee9df]">
                <img
                  src={featuredProj.coverImage}
                  alt={featuredProj.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 z-20">
                  <span className="bg-[#710014] text-white px-2.5 py-1 rounded text-[8px] font-sans font-bold tracking-wider uppercase shadow">
                    {featuredProj.branch}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between font-sans text-[10px] font-bold text-[#710014] uppercase">
                  <span>{featuredProj.category}</span>
                  <span className="text-[#a38652]">{featuredProj.sqft}</span>
                </div>
                <h3 className="font-display text-2xl font-light text-[#1a1a1a] uppercase leading-tight">
                  {featuredProj.title}
                </h3>
                <p className="font-sans text-xs text-[#555] line-clamp-2 leading-relaxed">
                  {featuredProj.description}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-[#f0ece1] text-[9px] font-bold text-[#710014] uppercase">
                  <span>✦ Tap to view gallery ({featuredProj.gallery.length} photos)</span>
                  <span>➔</span>
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center items-center gap-1.5 pt-1">
              {filteredProjects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setMobileFeaturedIdx(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === mobileFeaturedIdx ? 'w-6 bg-[#710014]' : 'w-1.5 bg-[#d8d2c4]'
                  }`}
                />
              ))}
            </div>
          </section>
        )}

        {/* PROJECT GRID (Compact 2-col on Mobile, 3-col on Desktop) */}
        <section className="space-y-4">
          <div className="lg:hidden font-sans text-xs font-bold text-[#1a1a1a] border-t border-[#e5e0d3] pt-6 uppercase tracking-wider">
            All Masterpieces Grid ({filteredProjects.length})
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => openProjectModal(proj)}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d3] hover:border-[#710014] shadow-sm hover:shadow-2xl p-3 sm:p-5 flex flex-col justify-between cursor-pointer space-y-2 sm:space-y-4 group transition-all duration-500 hover:-translate-y-2 focus:outline-none relative overflow-hidden"
              >
                {/* Image Frame */}
                <div className="w-full aspect-[4/3] sm:aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl bg-[#eee9df] relative">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Branch Badge */}
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
                    <span className="bg-[#710014] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded text-[7px] sm:text-[8px] font-sans font-bold tracking-[0.15em] uppercase shadow">
                      {proj.branch.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Card Meta & Title */}
                <div className="space-y-1 sm:space-y-2 pt-0.5">
                  <div className="flex items-center justify-between font-sans text-[8px] sm:text-[9px] font-bold text-[#710014] uppercase">
                    <span className="truncate max-w-[70%]">{proj.category}</span>
                    <span className="text-[#a38652]">{proj.year}</span>
                  </div>

                  <h3 className="font-display text-sm sm:text-2xl font-light text-[#1a1a1a] leading-tight group-hover:text-[#710014] transition-colors duration-300 uppercase tracking-wide line-clamp-2">
                    {proj.title}
                  </h3>

                  <p className="hidden sm:block font-sans text-[11px] text-[#555555] leading-relaxed font-normal line-clamp-3">
                    {proj.description}
                  </p>

                  <div className="pt-1.5 flex items-center justify-between border-t border-[#f0ece1] text-[7px] sm:text-[8px] font-bold text-[#710014] uppercase">
                    <span>Inspect</span>
                    <span>➔</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Full-Screen Exhibition Split Showcase Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] bg-[#0a0c10]/95 backdrop-blur-3xl flex flex-col lg:flex-row overflow-hidden transition-all duration-500">
          
          {/* LEFT SIDEBAR / MOBILE TOP SHEET: Info Panel */}
          <div className="w-full lg:w-[35%] xl:w-[32%] bg-[#f9f8f4] border-b lg:border-b-0 lg:border-r border-[#e5e0d3] p-5 sm:p-10 flex flex-col justify-between overflow-y-auto z-10 text-[#1a1a1a] max-h-[45vh] lg:max-h-full">
            
            <div className="space-y-4 sm:space-y-8">
              {/* Back Button */}
              <button
                onClick={closeProjectModal}
                className="flex items-center gap-2 font-sans text-xs font-bold tracking-[0.2em] text-[#555555] hover:text-[#710014] transition-colors uppercase cursor-pointer focus:outline-none"
              >
                <svg className="w-4 h-4 text-[#710014]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span>BACK TO PORTFOLIO</span>
              </button>

              {/* Info Details */}
              <div className="space-y-2 sm:space-y-4 pt-1">
                <span className="font-sans text-[10px] font-bold tracking-[0.35em] text-[#710014] uppercase block">
                  {selectedProject.category}
                </span>

                <h2 className="font-display text-2xl sm:text-4xl font-light text-[#1a1a1a] leading-tight uppercase tracking-wider">
                  {selectedProject.title}
                </h2>

                <p className="font-sans text-[10px] font-bold tracking-widest text-[#a38652] uppercase">
                  {selectedProject.locationFull}
                </p>

                <p className="font-sans text-xs text-[#555555] leading-relaxed font-normal pt-1 line-clamp-3 sm:line-clamp-none">
                  {selectedProject.description}
                </p>

                {/* Specs Box */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 sm:pt-6 border-t border-[#e5e0d3] text-[10px] font-sans bg-white p-3 rounded-xl border shadow-sm">
                  <div>
                    <span className="text-[#888888] block text-[9px]">YEAR</span>
                    <span className="font-bold text-[#1a1a1a]">{selectedProject.year}</span>
                  </div>
                  <div>
                    <span className="text-[#888888] block text-[9px]">AREA</span>
                    <span className="font-bold text-[#1a1a1a]">{selectedProject.sqft}</span>
                  </div>
                  <div>
                    <span className="text-[#888888] block text-[9px]">TIMELINE</span>
                    <span className="font-bold text-[#1a1a1a]">{selectedProject.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="hidden sm:flex items-center justify-between pt-8 border-t border-[#e5e0d3] font-sans text-[10px] tracking-widest text-[#777777] uppercase">
              <span>SHARKINGS ATELIER</span>
              <span className="font-bold text-[#710014]">
                0{activeGalleryIndex + 1} / 0{selectedProject.gallery.length}
              </span>
            </div>

          </div>

          {/* RIGHT SIDE: Full Gallery Media Stage */}
          <div className="w-full lg:w-[65%] xl:w-[68%] h-[55vh] lg:h-full relative bg-black overflow-hidden flex items-center justify-center">
            
            {/* Gallery Image */}
            <img
              src={selectedProject.gallery[activeGalleryIndex]}
              alt={selectedProject.title}
              className="w-full h-full object-cover transition-all duration-700 ease-out"
            />

            {/* Close Button Top Right for Mobile */}
            <button
              onClick={closeProjectModal}
              aria-label="Close Modal"
              className="lg:hidden absolute top-3 right-3 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center backdrop-blur-md focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Arrows at Bottom Right */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-3 z-30">
              <button
                onClick={() =>
                  setActiveGalleryIndex(
                    (prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length
                  )
                }
                aria-label="Previous Image"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:border-[#710014] hover:bg-[#710014] transition-all duration-300 cursor-pointer focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <button
                onClick={() =>
                  setActiveGalleryIndex(
                    (prev) => (prev + 1) % selectedProject.gallery.length
                  )
                }
                aria-label="Next Image"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:border-[#710014] hover:bg-[#710014] transition-all duration-300 cursor-pointer focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

          </div>

        </div>
      )}

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
