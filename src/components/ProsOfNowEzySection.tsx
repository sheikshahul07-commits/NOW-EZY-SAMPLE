'use client';

import React from 'react';
import {
  Navigation,
  ShieldCheck,
  BadgeIndianRupee,
  UtensilsCrossed,
  Fuel,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  Building
} from 'lucide-react';

interface ProsOfNowEzySectionProps {
  onOpenRadar: () => void;
  onOpenListFlow: () => void;
}

export default function ProsOfNowEzySection({
  onOpenRadar,
  onOpenListFlow
}: ProsOfNowEzySectionProps) {
  const pros = [
    {
      icon: Navigation,
      badge: 'Flagship Technology',
      title: 'Now Ezy Radar™ Commute Search',
      description: 'Stop burning fuel and walking street-by-street looking for to-let boards. Set your office location and see verified empty flats in 5, 10, and 15-minute commute rings.',
      highlight: 'Zero fuel waste & zero street hunting'
    },
    {
      icon: ShieldCheck,
      badge: '0% Rejection Rate',
      title: '100% Pre-Screened Bachelor Landlords',
      description: 'Every homeowner on Now Ezy explicitly signs up to rent to bachelors. No awkward family-only rejections, moral policing, or gate interrogations.',
      highlight: 'Pre-approved bachelor tenancies'
    },
    {
      icon: BadgeIndianRupee,
      badge: 'Zero Brokerage',
      title: 'Direct Landlord Connect',
      description: 'Never pay 1 full month\'s rent to brokers. Access direct, verified homeowner phone numbers with our single 2-month unlimited subscription.',
      highlight: 'Save ₹15,000 to ₹35,000 brokerage'
    },
    {
      icon: UtensilsCrossed,
      badge: 'Total Transparency',
      title: 'Upfront House Rules',
      description: 'Know before you visit: Non-Veg cooking allowed, overnight guests welcome, opposite-gender visitors, and fair 2-month security deposit limit.',
      highlight: 'No surprise restrictions after paying advance'
    }
  ];

  return (
    <section className="bg-gradient-to-b from-[#0B0F19] via-[#111827] to-[#0B0F19] text-white py-16 sm:py-24 border-t border-slate-800 relative overflow-hidden">
      
      {/* Background Glows (NO PURPLE) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-[radial-gradient(#C01E4E_0%,transparent_70%)] opacity-15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-[#FD3752] text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Now Ezy Advantage</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            Why Indian Bachelors Choose <br />
            <span className="text-[#FD3752]">Now Ezy Over Everyone Else.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto">
            We built Now Ezy to solve the biggest housing headache for young working professionals and students across India&apos;s tech hubs.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
          {pros.map((pro, index) => {
            const IconComponent = pro.icon;
            return (
              <div
                key={index}
                className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-white/10 hover:border-[#C01E4E]/50 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#C01E4E]/20 text-[#FD3752] flex items-center justify-center border border-[#C01E4E]/40 group-hover:scale-105 transition-transform">
                    <IconComponent className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <span className="text-[11px] font-black uppercase tracking-wider bg-white/10 text-slate-300 px-3 py-1 rounded-full border border-white/10">
                    {pro.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#FD3752] transition-colors">
                  {pro.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {pro.description}
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{pro.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner: Try Radar or Post Property */}
        <div className="rounded-3xl bg-gradient-to-r from-[#C01E4E] via-[#A11840] to-[#801232] p-8 sm:p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Instant Commute Finding</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ready to find a bachelor flat near your stay in minutes?
            </h3>
            <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-xl">
              Use our live Radar Map to filter empty flats within 5, 10, or 15 minutes of your office.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenRadar}
              className="bg-white hover:bg-slate-100 text-[#C01E4E] font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-97 cursor-pointer flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-[#C01E4E]" />
              <span>Launch Now Ezy Radar</span>
            </button>

            <button
              type="button"
              onClick={onOpenListFlow}
              className="bg-black/30 hover:bg-black/40 text-white border border-white/30 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>List Property FREE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
