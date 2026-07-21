import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const SHOWROOMS_DATA = [
  {
    id: 'madurai',
    name: 'Madurai Experience Centre',
    tagline: 'Main Flagship Atelier & Spatial Gallery',
    badge: 'EXPERIENCE CENTRE',
    landmark: 'Landmark: TNHB Colony, Villapuram',
    address: 'Plot no, 3552, TNHB Colony, Villapuram, Madurai, Tamil Nadu 625001',
    phone: '+91 80980 90204',
    email: 'sharkingsindia@gmail.com',
    hours: 'Monday - Saturday: 10:00 AM to 8:30 PM (Sunday Closed)',
    status: 'OPEN NOW',
    mapUrl: 'https://maps.google.com/maps?q=3552,+TNHB+Colony,+Villapuram,+Madurai,+Tamil+Nadu+625001&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directMapUrl: 'https://maps.google.com/?q=3552,+TNHB+Colony,+Villapuram,+Madurai,+Tamil+Nadu+625001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
        caption: 'Modular Kitchen & Veneer Suite'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        caption: 'Luxury Living Room Setup'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop',
        caption: 'Tactile Material Wall & Hardware Gallery'
      }
    ],
    features: [
      '2,500 sq.ft. Full-Scale Spatial Mockups',
      '100+ Live Material & Veneer Swatches',
      'Dedicated Architectural Darkroom',
      '3D VR Virtual Spatial Walkthrough'
    ]
  },
  {
    id: 'ramanathapuram',
    name: 'Ramanathapuram Experience Centre',
    tagline: 'Coastal Design Studio & Material Atelier',
    badge: 'EXPERIENCE CENTRE',
    landmark: 'Landmark: Near New Bus Stand, Kenikarai Main Road',
    address: 'Door No. 12/450, Near New Bus Stand, Kenikarai Main Road, Ramanathapuram, Tamil Nadu 623501',
    phone: '+91 80980 90204',
    email: 'sharkingsindia@gmail.com',
    hours: 'Monday - Saturday: 10:00 AM to 8:30 PM (Sunday Closed)',
    status: 'OPEN NOW',
    mapUrl: 'https://maps.google.com/maps?q=Kenikarai+Main+Road,+Ramanathapuram,+Tamil+Nadu+623501&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directMapUrl: 'https://maps.google.com/?q=Kenikarai+Main+Road,+Ramanathapuram,+Tamil+Nadu+623501',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop',
        caption: 'Coastal Moisture-Resistant Wardrobes'
      },
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop',
        caption: 'Designer Consultation & Material Desk'
      },
      {
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop',
        caption: 'Teak & Brushed Brass Fittings Studio'
      }
    ],
    features: [
      'Specialized Coastal Weather-Proof Materials',
      'Smart Home Lighting & Automation Mockups',
      'Custom Solid Wood & Brass Hardware Studio',
      'Interactive 3D Planning Suite'
    ]
  }
];

export default function Showrooms({ showroomRef, scrollProgress = 0, isDesktop = true }) {
  useScrollReveal();
  const [activeLocationIdx, setActiveLocationIdx] = useState(0);
  const [activeMediaType, setActiveMediaType] = useState('map'); // 'map' or 'gallery'
  const [activeGalleryImgIdx, setActiveGalleryImgIdx] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingLocation, setSelectedBookingLocation] = useState('madurai');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Form state for booking modal
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '11:00 AM',
    interests: ['Modular Kitchen']
  });

  const currentLocation = SHOWROOMS_DATA[activeLocationIdx];

  // Mouse tilt parallax effect
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 8, y: y * -8 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleInterestToggle = (interest) => {
    setBookingForm((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setBookingModalOpen(false);
      setBookingForm({ name: '', phone: '', date: '', time: '11:00 AM', interests: ['Modular Kitchen'] });
    }, 2500);
  };

  return (
    <section 
      ref={showroomRef} 
      id="showrooms" 
      className="relative w-full py-28 bg-[#f8f7f3] text-luxury-charcoal overflow-hidden z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]"
    >
      {/* Background Parallax Floating Watermark */}
      <div 
        className="absolute font-display text-[18vw] text-[#710014]/[0.025] font-extralight select-none pointer-events-none z-0 left-0 top-1/4 whitespace-nowrap"
        style={{
          transform: `translateX(${(scrollProgress - 0.5) * -120}px)`,
          willChange: 'transform'
        }}
      >
        EXPERIENCE CENTRES
      </div>

      {/* Subtle burgundy & sage ambient lighting glows */}
      <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-[#710014]/[0.04] rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-[#838f6f]/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 relative z-10 space-y-12">
        
        {/* SECTION HEADER (Rich Light Theme with Royal Burgundy Accent) */}
        <div className="text-center max-w-3xl mx-auto space-y-4 reveal-3d-popup">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#710014]/30" />
            <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#710014] uppercase">
              EXPERIENCE CENTRES
            </span>
            <span className="w-8 h-[1px] bg-[#710014]/30" />
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] tracking-tight">
            Visit Our <span className="italic font-normal text-[#710014]">Showrooms</span>
          </h2>
          
          <p className="font-sans text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-light max-w-2xl mx-auto">
            Step in to feel the premium veneers, run your hands along brushed gold finishes, and interact with smart modular cabinet pull-outs. Our designers are waiting to host you.
          </p>

          {/* LOCATION TABS SWITCHER (Royal Burgundy Pill Tabs) */}
          <div className="pt-6 flex items-center justify-center">
            <div className="p-1 rounded-none bg-white border border-black/10 shadow-lg inline-flex items-center gap-1.5 relative">
              {SHOWROOMS_DATA.map((loc, idx) => {
                const isActive = activeLocationIdx === idx;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLocationIdx(idx)}
                    className={`px-8 py-3 rounded-none text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2.5 cursor-pointer relative ${
                      isActive 
                        ? 'bg-[#710014] text-white shadow-md font-extrabold' 
                        : 'text-luxury-charcoal/70 hover:text-[#710014]'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                    <span>{loc.name.split(' ')[0].toUpperCase()}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* MAIN SHOWROOM CARD (Cool Light Luxury White Card with Burgundy & Gold Accents) */}
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: isDesktop ? `perspective(1200px) rotateY(${mouseOffset.x}deg) rotateX(${mouseOffset.y}deg)` : 'none',
            transition: 'transform 0.15s ease-out'
          }}
          className="w-full rounded-none bg-white border border-black/10 p-6 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.05)] relative overflow-hidden backdrop-blur-xl"
        >
          {/* Top burgundy accent gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#710014] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* LEFT COLUMN: Clean Info Details & Aligned Action Buttons */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                
                {/* Badge & Title Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#710014] border border-[#710014]/25 px-3.5 py-1 rounded-full bg-[#710014]/5 uppercase">
                      {currentLocation.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl font-light text-luxury-charcoal pt-1">
                    {currentLocation.name}
                  </h3>
                  
                  <p className="font-sans text-xs italic text-[#710014] font-medium">
                    {currentLocation.landmark}
                  </p>
                </div>

                {/* Vertical Details List with Royal Burgundy Circle Icons */}
                <div className="space-y-5 pt-2">
                  
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-none bg-[#710014]/5 border border-[#710014]/20 flex items-center justify-center text-[#710014] flex-shrink-0 mt-0.5 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#710014]/70 block mb-0.5">ADDRESS</span>
                      <p className="font-sans text-xs text-luxury-charcoal/85 font-medium leading-relaxed">
                        {currentLocation.address}
                      </p>
                    </div>
                  </div>

                  {/* Direct Line */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-none bg-[#710014]/5 border border-[#710014]/20 flex items-center justify-center text-[#710014] flex-shrink-0 mt-0.5 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c.135.252.286.505.452.757.946 1.433 2.164 2.651 3.597 3.597.252.166.505.317.757.452l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#710014]/70 block mb-0.5">DIRECT LINE</span>
                      <a 
                        href={`tel:${currentLocation.phone.replace(/\s+/g, '')}`}
                        className="font-sans text-xs font-bold text-luxury-charcoal hover:text-[#710014] transition-colors"
                      >
                        {currentLocation.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email Support */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-none bg-[#710014]/5 border border-[#710014]/20 flex items-center justify-center text-[#710014] flex-shrink-0 mt-0.5 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#710014]/70 block mb-0.5">E-MAIL SUPPORT</span>
                      <a 
                        href={`mailto:${currentLocation.email}`}
                        className="font-sans text-xs font-medium text-luxury-charcoal/80 hover:text-[#710014] transition-colors"
                      >
                        {currentLocation.email}
                      </a>
                    </div>
                  </div>

                  {/* Visiting Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-none bg-[#710014]/5 border border-[#710014]/20 flex items-center justify-center text-[#710014] flex-shrink-0 mt-0.5 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .2.079.39.22.53l3.75 3.75a.75.75 0 1 0 1.06-1.06l-3.53-3.53V6Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#710014]/70 block mb-0.5">VISITING HOURS</span>
                      <p className="font-sans text-xs text-luxury-charcoal/85 leading-relaxed font-medium">
                        {currentLocation.hours}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Action Buttons Row */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                
                <a
                  href={currentLocation.directMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-1/2 px-6 py-3.5 rounded-none border-2 border-[#710014] text-xs font-sans font-bold tracking-widest text-[#710014] bg-white hover:bg-[#710014] hover:text-white transition-all text-center flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  <span>GET DIRECTIONS</span>
                </a>

                <a
                  href={`tel:${currentLocation.phone.replace(/\s+/g, '')}`}
                  className="w-full sm:w-1/2 px-6 py-3.5 rounded-none bg-[#710014] text-white text-xs font-sans font-extrabold tracking-widest uppercase hover:bg-[#580010] transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-[#710014]/20 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c.135.252.286.505.452.757.946 1.433 2.164 2.651 3.597 3.597.252.166.505.317.757.452l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  <span>CALL EXPERIENCE</span>
                </a>

              </div>

            </div>

            {/* RIGHT COLUMN: Map Frame & Floating Regal Burgundy Live Photo Overlay */}
            <div className="lg:col-span-7 relative flex flex-col min-h-[380px] lg:min-h-[440px]">
              
              {/* Map View Container */}
              <div className="w-full h-full min-h-[380px] lg:min-h-[440px] rounded-2xl overflow-hidden border border-black/10 relative bg-[#eae8e3]">
                {activeMediaType === 'map' ? (
                  <iframe
                    title={`${currentLocation.name} Map`}
                    src={currentLocation.mapUrl}
                    className="w-full h-full border-0 filter grayscale contrast-110 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    loading="lazy"
                    allowFullScreen
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img 
                      src={currentLocation.images[activeGalleryImgIdx].url} 
                      alt={currentLocation.images[activeGalleryImgIdx].caption} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-16 left-6 text-white font-display text-lg font-light">
                      {currentLocation.images[activeGalleryImgIdx].caption}
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Regal Burgundy Live Showroom Photo Overlay */}
              <div 
                onClick={() => {
                  if (activeMediaType === 'map') {
                    setActiveMediaType('gallery');
                  } else {
                    setLightboxImg(currentLocation.images[0].url);
                    setLightboxOpen(true);
                  }
                }}
                className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#710014] text-white border border-[#8a1226] flex items-center justify-between cursor-pointer hover:bg-[#5c0010] transition-all shadow-2xl group/photo z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-12 rounded-xl overflow-hidden relative border border-white/20 flex-shrink-0">
                    <img 
                      src={currentLocation.images[0].url} 
                      alt="Live showroom preview" 
                      className="w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] font-sans font-bold tracking-widest text-[#c5a059] uppercase">
                        LIVE SHOWROOM PHOTO
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-light text-white mt-0.5">
                      Visit us in {currentLocation.name.split(' ')[0]}
                    </h4>
                  </div>
                </div>

                <span className="text-[10px] font-sans font-bold text-[#c5a059] group-hover/photo:translate-x-1 transition-transform flex items-center gap-1">
                  {activeMediaType === 'map' ? 'SEE PHOTOS →' : 'FULL GALLERY →'}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* BOOKING APPOINTMENT MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white border border-black/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-luxury-charcoal">
            
            {/* Close Button */}
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-luxury-charcoal cursor-pointer"
            >
              ✕
            </button>

            {bookingSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#710014]/10 text-[#710014] border border-[#710014]/30 flex items-center justify-center mx-auto text-2xl animate-bounce">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-light">VIP Reservation Confirmed!</h3>
                <p className="font-sans text-xs text-luxury-charcoal/70">
                  Our principal interior architect will reach out to confirm your private walkthrough at the {selectedBookingLocation === 'madurai' ? 'Madurai' : 'Ramanathapuram'} Experience Centre.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div>
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-[#710014] uppercase block mb-1">
                    PRIVATE APPOINTMENT
                  </span>
                  <h3 className="font-display text-2xl font-light">Book VIP Showroom Tour</h3>
                  <p className="font-sans text-xs text-luxury-charcoal/60 font-light">
                    Select your location and time to get dedicated one-on-one spatial guidance.
                  </p>
                </div>

                {/* Location Picker */}
                <div className="grid grid-cols-2 gap-3">
                  {SHOWROOMS_DATA.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setSelectedBookingLocation(loc.id)}
                      className={`p-3 rounded-2xl border text-xs font-sans text-left transition-all cursor-pointer ${
                        selectedBookingLocation === loc.id 
                          ? 'border-[#710014] bg-[#710014]/10 text-[#710014] font-bold' 
                          : 'border-black/10 bg-black/5 text-luxury-charcoal/60 hover:border-black/30'
                      }`}
                    >
                      <div className="font-bold">{loc.name.split(' ')[0]}</div>
                      <div className="text-[9px] text-black/40 uppercase">{loc.badge}</div>
                    </button>
                  ))}
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f7f3] border border-black/10 text-xs font-sans text-luxury-charcoal focus:outline-none focus:border-[#710014]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f7f3] border border-black/10 text-xs font-sans text-luxury-charcoal focus:outline-none focus:border-[#710014]"
                  />
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f7f3] border border-black/10 text-xs font-sans text-luxury-charcoal focus:outline-none focus:border-[#710014]"
                  />
                  <select
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f7f3] border border-black/10 text-xs font-sans text-luxury-charcoal focus:outline-none focus:border-[#710014]"
                  >
                    <option value="10:30 AM">10:30 AM Slot</option>
                    <option value="02:00 PM">02:00 PM Slot</option>
                    <option value="05:00 PM">05:00 PM Slot</option>
                    <option value="07:00 PM">07:00 PM Slot</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#710014] text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#580010] transition-all shadow-lg shadow-[#710014]/20 cursor-pointer"
                >
                  CONFIRM VIP RESERVATION
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* LIGHTBOX PHOTO MODAL */}
      {lightboxOpen && (
        <div 
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/20">
            <img src={lightboxImg} alt="Enlarged showroom interior" className="w-full h-full object-contain" />
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center text-xl">
              ✕
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
