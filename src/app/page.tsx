import HeroSection from "@/components/HeroSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-arctic-powder">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">Next-Gen AI Platform</span>
              <img className="h-8 w-auto" src="/assets/cube-16-solid.svg" alt="Logo" style={{ filter: 'brightness(0) invert(0.2)' }} />
              <span className="font-bold text-nocturnal font-mono text-xl tracking-tight">AI.Auto</span>
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#features" className="text-sm font-semibold leading-6 text-oceanic hover:text-deep-saffron transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-semibold leading-6 text-oceanic hover:text-deep-saffron transition-colors">Pricing</a>
            <a href="#" className="text-sm font-semibold leading-6 text-oceanic hover:text-deep-saffron transition-colors">Company</a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-oceanic hover:text-deep-saffron transition-colors">Log in <span aria-hidden="true">&rarr;</span></a>
          </div>
        </nav>
      </header>

      <HeroSection />
      
      <div id="features">
        <FeatureShowcase />
      </div>
      
      <PricingSection />

      {/* Testimonial Section to use chevron-left and chevron-right */}
      <section className="py-16 bg-white border-t border-oceanic/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6">
            <button aria-label="Previous testimonial" className="p-2 rounded-full hover:bg-mystic-mint transition-colors">
              <img src="/assets/chevron-left.svg" alt="Previous" className="w-6 h-6" />
            </button>
            <blockquote className="text-xl font-medium italic text-oceanic/80 max-w-2xl">
              "This Next-Gen AI platform has completely revolutionized how we process data. The matrix-driven pricing is transparent, and the automations are flawless."
            </blockquote>
            <button aria-label="Next testimonial" className="p-2 rounded-full hover:bg-mystic-mint transition-colors">
              <img src="/assets/chevron-right.svg" alt="Next" className="w-6 h-6" />
            </button>
          </div>
          <p className="mt-4 font-bold text-nocturnal font-mono">- Alex Cristoche</p>
        </div>
      </section>

      <footer id="company" className="bg-oceanic text-arctic-powder py-12 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img className="h-6 w-auto" src="/assets/cube-16-solid.svg" alt="Logo" style={{ filter: 'brightness(0) invert(1)' }} />
            <span className="font-bold font-mono text-lg tracking-tight">AI.Auto</span>
          </div>
          <p className="text-sm text-arctic-powder/60 text-center md:text-left">
            &copy; 2026 Web and Design Society, IIT Bhubaneswar. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
            <a href="#" className="text-arctic-powder/60 hover:text-deep-saffron transition-colors">
              <span className="sr-only">Social Link</span>
              <img src="/assets/link-solid.svg" alt="Social" className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
            </a>
            <a href="#" aria-label="Back to top" className="bg-white/10 p-2 rounded-md hover:bg-deep-saffron transition-colors ml-4">
               <img src="/assets/chevron-up-solid.svg" alt="Back to top" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
