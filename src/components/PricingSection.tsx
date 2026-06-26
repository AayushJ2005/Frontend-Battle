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
    <section id="pricing" className="py-24 bg-arctic-powder text-oceanic relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-oceanic sm:text-5xl font-mono mb-4">
            Transparent, Matrix-Driven Pricing
          </h2>
          <p className="text-lg leading-8 text-oceanic/80">
            Select your preferred currency and billing cycle. Our dynamic matrix instantly computes your exact tariff with zero global reflows.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16">
          {/* Billing Toggle */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">Monthly</span>
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
            <span className="text-sm font-semibold flex items-center gap-2">
              Annually <span className="inline-flex items-center rounded-full bg-forsythia/20 px-2.5 py-0.5 text-xs font-semibold text-oceanic border border-forsythia/50">Save 20%</span>
            </span>
          </div>

          <div className="h-8 w-px bg-oceanic/20 hidden sm:block"></div>

          {/* Currency Switcher */}
          <div className="flex relative bg-white rounded-lg p-1 border border-oceanic/10 shadow-sm w-48">
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
                  currency === 'USD' ? 'text-arctic-powder' : 'text-oceanic hover:bg-oceanic/5'
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
              className={`group rounded-2xl p-8 ring-1 ring-oceanic/10 shadow-xl transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl bg-white relative animate-entrance delay-${(index + 1) * 100} ${index === 1 ? 'border-2 border-deep-saffron ring-0' : ''}`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-deep-saffron text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold font-mono mb-2 text-nocturnal">{tier.name}</h3>
              <p className="text-sm text-oceanic/70 mb-6 min-h-[40px]">{tier.description}</p>
              
              <div className="flex items-baseline gap-2 mb-8 border-b border-oceanic/10 pb-8 min-h-[100px]">
                <div className="min-w-[120px] flex items-baseline gap-2">
                  <span 
                    ref={(el) => { priceRefs.current[index] = el; }}
                    className="text-5xl font-extrabold tracking-tight transition-all"
                  >
                    {calculatePrice(tier.basePrice, 'USD', false)}
                  </span>
                  <span ref={(el) => { billingPeriodRefs.current[index] = el; }} className="text-sm font-medium text-oceanic/60 whitespace-nowrap">
                    /mo
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className={`flex gap-3 items-center ${feature.included ? '' : 'opacity-50'}`}>
                    <img 
                      src={feature.included ? "/assets/chevron-right.svg" : "/assets/x-mark.svg"} 
                      alt={feature.included ? "Included" : "Not included"} 
                      className={`w-5 h-5 ${feature.included ? 'text-deep-saffron' : 'opacity-60'}`} 
                    />
                    <span className={`text-oceanic/80 text-sm font-medium ${feature.included ? '' : 'line-through'}`}>{feature.name}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
                index === 1 
                ? 'bg-deep-saffron text-white hover:bg-deep-saffron/90 shadow-lg shadow-deep-saffron/30' 
                : 'bg-mystic-mint text-nocturnal hover:bg-mystic-mint/80'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
