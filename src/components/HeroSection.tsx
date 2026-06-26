import PricingSection from "./PricingSection";
import FeatureShowcase from "./FeatureShowcase";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-mystic-mint to-forsythia dark:from-oceanic dark:to-nocturnal opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] transition-colors duration-500" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oceanic/5 dark:bg-arctic-powder/10 text-sm font-semibold text-oceanic dark:text-arctic-powder/90 mb-8 ring-1 ring-inset ring-oceanic/10 dark:ring-arctic-powder/10 transition-colors duration-300">
          <span className="flex h-2 w-2 rounded-full bg-deep-saffron"></span>
          Next-Gen AI Platform Speed Run
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-nocturnal dark:text-arctic-powder mb-8 font-mono transition-colors duration-300">
          Automate Data with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-saffron to-forsythia dark:from-forsythia dark:to-deep-saffron">
            Zero Reflows
          </span>
        </h1>
        
        <p className="mt-6 text-xl leading-8 text-oceanic/80 dark:text-arctic-powder/70 max-w-2xl mx-auto mb-10 transition-colors duration-300">
          A premium, high-converting, responsive landing page for an advanced AI-driven data automation platform. Built with architectural integrity, engineering speed, and SEO hygiene.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-nocturnal dark:bg-forsythia text-arctic-powder dark:text-nocturnal font-bold rounded-xl shadow-lg shadow-nocturnal/20 dark:shadow-forsythia/20 hover:shadow-xl hover:bg-oceanic dark:hover:bg-deep-saffron transition-all hover:-translate-y-1">
            View Pricing
          </a>
          <a href="https://github.com/AayushJ2005/Frontend-Battle" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-oceanic text-nocturnal dark:text-arctic-powder font-bold rounded-xl ring-1 ring-inset ring-oceanic/10 dark:ring-arctic-powder/10 hover:bg-mystic-mint/50 dark:hover:bg-nocturnal transition-all flex items-center justify-center gap-2">
            <img src="/assets/link.svg" alt="GitHub" className="w-5 h-5 opacity-70 dark:invert" />
            GitHub Repo
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 text-sm font-semibold text-oceanic/70 dark:text-arctic-powder/70 transition-colors duration-300">
          <div className="flex items-center gap-2 bg-white/50 dark:bg-nocturnal/50 backdrop-blur-sm px-4 py-2 rounded-full border border-oceanic/10 dark:border-arctic-powder/10">
            <img src="/assets/arrow-trending-up.svg" alt="Trending" className="w-5 h-5 text-deep-saffron" />
            <span>2.5x Faster Automation</span>
          </div>
          <div className="flex items-center gap-2 bg-white/50 dark:bg-nocturnal/50 backdrop-blur-sm px-4 py-2 rounded-full border border-oceanic/10 dark:border-arctic-powder/10">
            <img src="/assets/chart-pie.svg" alt="Analytics" className="w-5 h-5 text-oceanic dark:invert dark:brightness-200" style={{ filter: 'brightness(0) invert(0.2)' }} />
            <span>99.9% Accuracy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
