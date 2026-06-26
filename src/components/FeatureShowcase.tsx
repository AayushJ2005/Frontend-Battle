"use client";

import { useState, useEffect, useRef } from "react";

const FEATURES = [
  {
    title: "Predictive Analytics Engine",
    description: "Leverage historical data to forecast trends with 99.9% accuracy using our proprietary machine learning models.",
    icon: "/assets/chart-pie.svg",
    color: "bg-mystic-mint text-nocturnal",
    colSpan: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Automated Workflows",
    description: "Connect APIs and automate repetitive tasks without writing a single line of code.",
    icon: "/assets/cog-8-tooth.svg",
    color: "bg-deep-saffron text-white",
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Real-time Synchronization",
    description: "Keep your data consistent across all platforms with millisecond latency.",
    icon: "/assets/arrow-path.svg",
    color: "bg-forsythia text-nocturnal",
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Deep Search Intelligence",
    description: "Instantly query terabytes of unstructured data with our natural language search interface.",
    icon: "/assets/search.svg",
    color: "bg-oceanic text-arctic-powder",
    colSpan: "md:col-span-2 md:row-span-1",
  },
];

export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Event listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInteraction = (index: number) => {
    setActiveIndex(activeIndex === index && isMobile ? null : index);
  };

  return (
    <section className="py-24 bg-white text-oceanic overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-mono mb-4">
            Intelligence at Scale
          </h2>
          <p className="text-lg leading-8 text-oceanic/80 max-w-2xl">
            Our platform combines cutting-edge AI with robust data pipelines, delivering actionable insights faster than ever before.
          </p>
        </div>

        <div 
          ref={showcaseRef}
          className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[minmax(200px,auto)] gap-4 md:gap-6"
        >
          {FEATURES.map((feature, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-200 ease-out border border-oceanic/10 cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:border-oceanic/30 animate-entrance delay-${(index % 2 + 1) * 100} ${
                  isMobile ? "" : feature.colSpan
                } ${feature.color}`}
                onMouseEnter={() => !isMobile && handleInteraction(index)}
                onClick={() => isMobile && handleInteraction(index)}
              >
                {/* Desktop Bento Content */}
                <div className="hidden md:flex flex-col h-full p-8 z-10 relative">
                  <div className={`p-3 rounded-xl inline-flex w-fit mb-6 bg-white/20 backdrop-blur-md transition-transform duration-200 ease-out ${isActive ? 'scale-110' : ''}`}>
                    <img src={feature.icon} alt={feature.title} className="w-8 h-8" style={{ filter: feature.color.includes('text-white') || feature.color.includes('text-arctic-powder') ? 'brightness(0) invert(1)' : 'brightness(0) invert(0.1)' }} />
                  </div>
                  <h3 className="text-2xl font-bold font-mono mb-3">{feature.title}</h3>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-base opacity-90 leading-relaxed mt-2">{feature.description}</p>
                  </div>
                  
                  {/* Decorative background element */}
                  <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl transition-transform duration-500 ${isActive ? 'scale-150' : 'scale-100'}`} />
                </div>

                {/* Mobile Accordion Content */}
                <div className="md:hidden flex flex-col p-6 z-10 relative">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md">
                        <img src={feature.icon} alt={feature.title} className="w-6 h-6" style={{ filter: feature.color.includes('text-white') || feature.color.includes('text-arctic-powder') ? 'brightness(0) invert(1)' : 'brightness(0) invert(0.1)' }} />
                      </div>
                      <h3 className="text-xl font-bold font-mono">{feature.title}</h3>
                    </div>
                    <img 
                      src={isActive ? "/assets/chevron-up.svg" : "/assets/chevron-down.svg"} 
                      alt="Toggle" 
                      className="w-5 h-5 transition-transform duration-200 ease-out"
                      style={{ filter: feature.color.includes('text-white') || feature.color.includes('text-arctic-powder') ? 'brightness(0) invert(1)' : 'brightness(0) invert(0.1)' }}
                    />
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}
                  >
                    <p className="text-sm opacity-90 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
