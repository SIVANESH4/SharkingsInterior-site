import news1Img from '../../assets/news-1.webp';
import news2Img from '../../assets/news-2.webp';
import news3Img from '../../assets/news-3.webp';

export default function WhyUs({ 
  whyUsRef,
  whyUsBgProgress = 1,
  whyUsContentProgress = 1
}) {
  const steps = [
    {
      num: '01',
      tag: 'OUR TEAM',
      title: 'Experienced Design & Build Team',
      description: 'Our team brings 15+ years of experience in residential, office, and commercial interior design. We work directly with you to plan every detail.',
      pill: 'Homes, Offices & Commercial Spaces',
      image: news1Img,
      alt: 'Experienced interior design and build team by Sharkings Interiors & Exteriors',
      bgTag: 'bg-luxury-sage/10 text-luxury-sage'
    },
    {
      num: '02',
      tag: 'FACTORY & MATERIALS',
      title: 'Quality Materials & Factory Finish',
      description: 'We manufacture all modular furniture and cabinets in our own factory using water-resistant marine plywood and premium fittings built to last.',
      pill: 'Water-Resistant Marine Plywood',
      image: news2Img,
      alt: 'Quality factory materials and modular furniture finish',
      bgTag: 'bg-luxury-charcoal/10 text-luxury-charcoal'
    },
    {
      num: '03',
      tag: 'PROJECT PLANNING',
      title: '3D Design Preview & Timely Delivery',
      description: 'See your exact space in 3D before production starts. We follow a clear timeline so your project gets completed on schedule without hassle.',
      pill: '3D Preview & On-Time Completion',
      image: news3Img,
      alt: 'Custom 3D interior design preview and project planning',
      bgTag: 'bg-luxury-red/10 text-luxury-red'
    }
  ];

  return (
    <section 
      ref={whyUsRef}
      id="why-us" 
      className="relative w-full min-h-screen flex flex-col justify-center py-12 lg:py-16 px-4 sm:px-8 lg:px-16 xl:px-24 bg-luxury-cream text-luxury-charcoal z-30 shadow-[0_-20px_50px_rgba(22,22,22,0.05)] overflow-hidden"
    >
      {/* Smooth Parallax Watermark Typography */}
      <div 
        className="absolute font-display text-[14vw] text-luxury-charcoal/[0.025] font-extralight select-none pointer-events-none z-0 right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
        style={{
          opacity: whyUsBgProgress,
          transform: `translateY(${-50 + (1 - whyUsBgProgress) * 15}%)`,
          willChange: 'transform, opacity'
        }}
      >
        SHARKINGS
      </div>

      <div 
        className="max-w-7xl mx-auto w-full my-auto space-y-6 sm:space-y-8 relative z-10"
        style={{
          opacity: Math.max(whyUsContentProgress, 0.85),
          transform: `translateY(${(1 - Math.max(whyUsContentProgress, 0.85)) * 15}px)`,
          transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
          willChange: 'opacity, transform'
        }}
      >
        
        {/* Compact Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-[1px] bg-luxury-sage" />
            <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-luxury-sage uppercase">
              WHY CHOOSE US
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-luxury-charcoal leading-tight tracking-wide">
            Why Work With Sharkings Interiors?
          </h2>

          <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 leading-relaxed font-light max-w-2xl">
            We handle design, factory manufacturing, and installation for homes, offices, and commercial spaces in Madurai and Ramanathapuram.
          </p>
        </div>

        {/* Compact Responsive Step Cards (3 Column Row) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {steps.map((step) => (
            <div 
              key={step.num}
              className="bg-white/90 backdrop-blur-md border border-luxury-charcoal/8 p-4 sm:p-5 rounded-2xl flex flex-col justify-between space-y-4 group hover:border-luxury-sage/40 hover:-translate-y-1 transition-all duration-300 ease-out shadow-[0_10px_25px_-10px_rgba(22,22,22,0.04)] hover:shadow-[0_15px_30px_-10px_rgba(22,22,22,0.08)] cursor-pointer"
            >
              <div className="space-y-3">
                {/* Header Tag & Step Number */}
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-sans font-bold tracking-[0.2em] px-2.5 py-0.5 rounded-full ${step.bgTag}`}>
                    {step.tag}
                  </span>
                  <span className="font-display text-xl font-light text-luxury-charcoal/25 group-hover:text-luxury-sage transition-colors duration-300">
                    {step.num}
                  </span>
                </div>

                {/* Compact Image Accent */}
                <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden border border-luxury-charcoal/5">
                  <img 
                    src={step.image} 
                    alt={step.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <h3 className="font-display text-lg sm:text-xl font-light text-luxury-charcoal leading-snug group-hover:text-luxury-sage transition-colors duration-300">
                  {step.title}
                </h3>

                <p className="font-sans text-[11px] sm:text-xs text-luxury-charcoal/75 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-luxury-charcoal/8 font-sans text-[11px] font-semibold tracking-wide text-luxury-sage uppercase">
                ✓ {step.pill}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
