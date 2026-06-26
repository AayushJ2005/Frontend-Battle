"use client";

import { useEffect, useRef } from "react";

const PRICING_MATRIX = [
  { 
    name: 'Starter', 
    description: 'Perfect for small teams and individuals just getting started.',
    basePrice: 19, 
    features: [
      { name: '100 AI Automations', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'Community Support', included: true },
      { name: 'Custom Integrations', included: false },
      { name: 'Dedicated Account Manager', included: false }
    ] 
  },
  { 
    name: 'Professional', 
    description: 'Advanced capabilities for scaling businesses.',
    basePrice: 49, 
    features: [
      { name: '1,000 AI Automations', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Custom Integrations', included: true },
      { name: 'Dedicated Account Manager', included: false }
    ] 
  },
  { 
    name: 'Enterprise', 
    description: 'Uncapped potential for large organizations.',
    basePrice: 199, 
    features: [
      { name: 'Unlimited AI Automations', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: '24/7 Phone Support', included: true },
      { name: 'Custom Integrations', included: true },
      { name: 'Dedicated Account Manager', included: true }
    ] 
  },
];

type Currency = 'USD' | 'EUR' | 'INR';

const CURRENCY_MULTIPLIERS: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.9 },
  INR: { symbol: '₹', rate: 83.0 },
};

const ANNUAL_DISCOUNT = 0.8;

export default function PricingSection() {
  const stateRef = useRef({
    currency: 'USD' as Currency,
    isAnnual: false
  });

  // Array of refs to update price DOM nodes directly (avoiding re-renders)
  const priceRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const billingPeriodRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Array of refs for UI toggles
  const currencyBtnsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const currencyPillRef = useRef<HTMLDivElement | null>(null);
  const billingToggleRef = useRef<HTMLButtonElement | null>(null);

  const calculatePrice = (basePrice: number, currency: Currency, isAnnual: boolean) => {
    const rate = CURRENCY_MULTIPLIERS[currency].rate;
    const symbol = CURRENCY_MULTIPLIERS[currency].symbol;
    let finalPrice = basePrice * rate;
    if (isAnnual) {
      finalPrice *= ANNUAL_DISCOUNT;
    }
    
    // Formatting: no decimals for whole numbers, otherwise 2 decimals
    const formatted = finalPrice % 1 === 0 ? finalPrice.toString() : finalPrice.toFixed(2);
    return `${symbol}${formatted}`;
  };

  const updateDOM = () => {
    const { currency, isAnnual } = stateRef.current;
    
    // Update price text nodes
    priceRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.textContent = calculatePrice(PRICING_MATRIX[index].basePrice, currency, isAnnual);
      }
    });

    // Update billing period text
    billingPeriodRefs.current.forEach((ref) => {
        if (ref) {
            ref.textContent = isAnnual ? '/mo (billed annually)' : '/mo';
        }
    });

    // Update active state of currency buttons and sliding pill
    currencyBtnsRef.current.forEach((btn, idx) => {
      if (btn) {
        if (btn.dataset.currency === currency) {
          btn.classList.add('text-arctic-powder');
          btn.classList.remove('text-oceanic', 'hover:bg-oceanic/5');
          if (currencyPillRef.current) {
            currencyPillRef.current.style.transform = `translateX(${idx * 100}%)`;
          }
        } else {
          btn.classList.remove('text-arctic-powder');
          btn.classList.add('text-oceanic', 'hover:bg-oceanic/5');
        }
      }
    });

    // Update billing toggle visual state
    if (billingToggleRef.current) {
      const knob = billingToggleRef.current.querySelector('.toggle-knob');
      if (isAnnual) {
        billingToggleRef.current.classList.add('bg-deep-saffron');
        billingToggleRef.current.classList.remove('bg-gray-300');
        knob?.classList.add('translate-x-6');
      } else {
        billingToggleRef.current.classList.remove('bg-deep-saffron');
        billingToggleRef.current.classList.add('bg-gray-300');
        knob?.classList.remove('translate-x-6');
      }
    }
  };

  // Run initial DOM update on mount just in case
  useEffect(() => {
    updateDOM();
  }, []);

  const handleCurrencyClick = (currency: Currency) => {
    stateRef.current.currency = currency;
    updateDOM();
  };

  const handleBillingToggle = () => {
    stateRef.current.isAnnual = !stateRef.current.isAnnual;
    updateDOM();
  };

  return (
    <section id="pricing" className="py-24 bg-mystic-mint/30 dark:bg-oceanic/50 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-mono mb-4 text-nocturnal dark:text-white transition-colors duration-300">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg leading-8 text-oceanic/80 dark:text-arctic-powder/70 max-w-2xl mx-auto mb-10 transition-colors duration-300">
            Choose the perfect plan for your data automation needs. Switch between monthly and annual billing to see your savings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold dark:text-arctic-powder transition-colors duration-300">Monthly</span>
            <button
              type="button"
              ref={billingToggleRef}
              onClick={handleBillingToggle}
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-300 transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-deep-saffron focus:ring-offset-2"
              role="switch"
              aria-checked={stateRef.current.isAnnual}
            >
              <span className="sr-only">Toggle annual billing</span>
              <span
                className="toggle-knob inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ease-out translate-x-1 shadow-md"
              />
            </button>
            <span className="text-sm font-semibold flex items-center gap-2 dark:text-arctic-powder transition-colors duration-300">
              Annual <span className="px-2 py-0.5 rounded-full bg-deep-saffron/10 dark:bg-deep-saffron/20 text-deep-saffron text-xs">Save 20%</span>
            </span>
          </div>

          <div className="flex relative bg-white dark:bg-nocturnal rounded-lg p-1 border border-oceanic/10 dark:border-arctic-powder/10 shadow-sm w-48 transition-colors duration-300">
            <div 
              ref={currencyPillRef}
              className="absolute top-1 bottom-1 w-[calc(33.333%-2.66px)] bg-oceanic rounded-md transition-transform duration-200 ease-out z-0" 
            />
            {(['USD', 'EUR', 'INR'] as Currency[]).map((currency, idx) => (
              <button
                type="button"
                key={currency}
                ref={(el) => { currencyBtnsRef.current[idx] = el; }}
                data-currency={currency}
                onClick={() => handleCurrencyClick(currency)}
                className={`flex-1 py-1.5 rounded-md text-sm font-semibold transition-colors duration-200 ease-out relative z-10 ${
                  currency === 'USD' ? 'text-arctic-powder' : 'text-oceanic dark:text-arctic-powder hover:bg-oceanic/5 dark:hover:bg-arctic-powder/5'
                }`}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_MATRIX.map((tier, index) => (
            <div 
              key={tier.name} 
              className={`group rounded-2xl p-8 ring-1 ring-oceanic/10 dark:ring-arctic-powder/10 shadow-xl transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl bg-white dark:bg-nocturnal relative animate-entrance delay-${(index + 1) * 100} ${index === 1 ? 'border-2 border-deep-saffron ring-0' : ''}`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-deep-saffron text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold font-mono mb-2 text-nocturnal dark:text-white transition-colors duration-300">{tier.name}</h3>
              <p className="text-sm text-oceanic/70 dark:text-arctic-powder/70 mb-6 min-h-[40px] transition-colors duration-300">{tier.description}</p>
              
              <div className="flex items-baseline gap-2 mb-8 border-b border-oceanic/10 dark:border-arctic-powder/10 pb-8 min-h-[100px] transition-colors duration-300">
                <div className="min-w-[120px] flex items-baseline gap-2">
                  <span 
                    ref={(el) => { priceRefs.current[index] = el; }}
                    className="text-5xl font-extrabold tracking-tight transition-all text-nocturnal dark:text-white"
                  >
                    {calculatePrice(tier.basePrice, 'USD', false)}
                  </span>
                  <span ref={(el) => { billingPeriodRefs.current[index] = el; }} className="text-sm font-medium text-oceanic/60 dark:text-arctic-powder/60 whitespace-nowrap transition-colors duration-300">
                    /mo
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex gap-3 text-sm text-oceanic/80 dark:text-arctic-powder/80 transition-colors duration-300">
                    {feature.included ? (
                      <img src="/assets/arrow-path.svg" alt="Included" className="w-5 h-5 text-mystic-mint dark:invert" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(21%) saturate(350%) hue-rotate(110deg) brightness(97%) contrast(89%)' }} />
                    ) : (
                      <img src="/assets/x-mark.svg" alt="Not Included" className="w-5 h-5 opacity-40 dark:invert" />
                    )}
                    <span className={feature.included ? '' : 'opacity-60 line-through'}>{feature.name}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-4 rounded-xl font-bold transition-all ${index === 1 ? 'bg-deep-saffron text-white hover:bg-forsythia hover:shadow-lg' : 'bg-oceanic/5 dark:bg-arctic-powder/10 text-oceanic dark:text-white hover:bg-oceanic/10 dark:hover:bg-arctic-powder/20'}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
