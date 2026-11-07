'use client';

import React from 'react';
import {
  ShieldCheck,
  XCircle,
  CheckCircle2,
  Clock,
  Fuel,
  Ban,
  BadgeIndianRupee,
  Navigation,
  UtensilsCrossed,
  Users2,
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BrandVisionSectionProps {
  onOpenListFlow: () => void;
  onExploreRadar: () => void;
}

export default function BrandVisionSection({
  onOpenListFlow,
  onExploreRadar
}: BrandVisionSectionProps) {
  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[#C01E4E] text-xs font-black uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-[#C01E4E]" />
            <span>Our Core Mission & Vision</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Solving the #1 Nightmare of <br className="hidden sm:inline" />
            <span className="text-[#C01E4E]">Indian Bachelors.</span>
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Every year, millions of young professionals and students move to Bengaluru, Mumbai, Pune, and Gurugram—only to face humiliating landlord rejections, broker scams, and exhausting street-by-street searches.
            <strong className="text-slate-900 block mt-1">Now Ezy exists solely to change this forever.</strong>
          </p>
        </div>

        {/* High-Impact Comparison: Old Nightmare vs. Now Ezy Platform */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-14">
          
          {/* THE NIGHTMARE: Traditional House Hunting */}
          <div className="rounded-3xl p-6 sm:p-8 bg-slate-50 border-2 border-slate-200/80 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-5 border-b border-slate-200 mb-6">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-rose-600">
                  The Old Nightmare
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Traditional Portals & Brokers
                </h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-black">
                <XCircle className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Ban className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">70%+ Landlord Rejection Rate</strong>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Calling dozens of numbers only to hear &ldquo;Sorry, we rent only to families, not bachelors.&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <BadgeIndianRupee className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">₹15,000 – ₹35,000 Brokerage Waste</strong>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Forced to pay 1 full month&apos;s rent as middleman fee for merely showing a flat.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Fuel className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">Exhausting Street-by-Street Hunting</strong>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Burning fuel in peak traffic, walking lanes in heat or rain searching for yellow &ldquo;To-Let&rdquo; boards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">Humiliating Curfews & Moral Policing</strong>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Intrusive questions, 9 PM gate curfews, ban on friends visiting, and food restrictions after paying advance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* THE SOLUTION: Now Ezy Dedicated Bachelor Platform */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#0F172A] text-white border-2 border-[#C01E4E]/40 shadow-xl relative overflow-hidden">
            
            {/* Subtle crimson radial glow (NO PURPLE) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(#C01E4E_0%,transparent_70%)] opacity-25 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6 relative z-10">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#FD3752]">
                  The New Standard
                </span>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <span>Now Ezy Platform</span>
                  <span className="text-[10px] font-black uppercase bg-[#C01E4E] text-white px-2 py-0.5 rounded">
                    Only Bachelors
                  </span>
                </h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#C01E4E] text-white flex items-center justify-center font-black">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm relative z-10">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#C01E4E]/20 text-[#FD3752] flex items-center justify-center shrink-0 mt-0.5 border border-[#C01E4E]/40">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="text-white block font-bold">0% Bachelor Rejection Guaranteed</strong>
                  <p className="text-slate-300 text-xs mt-0.5">
                    100% of homeowners on our platform have explicitly opted-in to rent to bachelors. No awkward refusals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#C01E4E]/20 text-[#FD3752] flex items-center justify-center shrink-0 mt-0.5 border border-[#C01E4E]/40">
                  <BadgeIndianRupee className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="text-white block font-bold">₹0 Brokerage & Direct Owner Connect</strong>
                  <p className="text-slate-300 text-xs mt-0.5">
                    One simple 2-month plan gives unlimited genuine owner contacts. You save your entire first-month salary.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#C01E4E]/20 text-[#FD3752] flex items-center justify-center shrink-0 mt-0.5 border border-[#C01E4E]/40">
                  <Navigation className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="text-white block font-bold">Now Ezy Commute Radar (No Street Hunting)</strong>
                  <p className="text-slate-300 text-xs mt-0.5">
                    Find empty homes within 5, 10, or 15 minutes of your office or tech park. Save 100% of fuel and stress.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#C01E4E]/20 text-[#FD3752] flex items-center justify-center shrink-0 mt-0.5 border border-[#C01E4E]/40">
                  <UtensilsCrossed className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="text-white block font-bold">Transparent House Rules Upfront</strong>
                  <p className="text-slate-300 text-xs mt-0.5">
                    Know before calling: Non-Veg policy, overnight guests, curfew, and fair 2-month security deposit limit.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 3 Pillars of Now Ezy Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-rose-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#C01E4E] flex items-center justify-center mb-4 border border-rose-200">
              <Fuel className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900 mb-1.5">
              Zero Fuel & Travel Waste
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No need to walk lane by lane in Kundanahalli, Indiranagar, or HSR. Explore real room photos, amenities, and exact coordinates from your bed.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-rose-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#C01E4E] flex items-center justify-center mb-4 border border-rose-200">
              <Users2 className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900 mb-1.5">
              100% Respect & Dignity
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              You are an independent adult driving India&apos;s digital economy. Rent with pride without awkward judgment or moral gatekeeping.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-rose-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#C01E4E] flex items-center justify-center mb-4 border border-rose-200">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900 mb-1.5">
              Verified Genuine Owners Only
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero fake broker listings. Speak directly to landlords who value reliable, verified bachelor tenants and quick rental cycles.
            </p>
          </div>

        </div>

        {/* Landlord CTA Strip */}
        <div className="mt-12 bg-gradient-to-r from-rose-50 via-white to-rose-50 rounded-2xl p-6 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase bg-[#C01E4E] text-white px-2 py-0.5 rounded">
                For Property Owners
              </span>
              <strong className="text-sm font-extrabold text-slate-900">
                Have a flat or room vacant in your building?
              </strong>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              List for FREE in 60 seconds. Get high-earning, verified tech tenants and zero days of vacancy.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenListFlow}
            className="bg-[#C01E4E] hover:bg-[#A11840] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-97 cursor-pointer shrink-0 flex items-center gap-2"
          >
            <span>Post Bachelor Property FREE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
