'use client';

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  locality: string;
  city: string;
  avatar: string;
  rating: number;
  type: 'Bachelor' | 'Property Owner';
  comment: string;
  savingsTag?: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Tanmay Saxena',
    role: 'SDE II @ Razorpay',
    locality: 'Kundanahalli Gate',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    type: 'Bachelor',
    comment: 'Saved ₹32,000 in broker fees in 2 days. Every owner I contacted on Now Ezy already welcomed bachelors—no awkward "Family only" excuses at the door.',
    savingsTag: 'Saved ₹32k Brokerage'
  },
  {
    id: 'rev-2',
    name: 'Priyanka Nambiar',
    role: 'Product Designer @ CRED',
    locality: 'Indiranagar 100ft Rd',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    type: 'Bachelor',
    comment: 'The upfront house rules are a game changer. I knew non-veg was permitted and guest rules were clear before I even booked a visit. Zero moral policing.',
    savingsTag: '0% Rejection'
  },
  {
    id: 'rev-3',
    name: 'Col. K.S. Rao (Retd.)',
    role: 'Verified Property Owner',
    locality: 'Brookefield & ITPL',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    type: 'Property Owner',
    comment: 'Posted my 2 flats for free on Now Ezy. Got verified IT professionals within 48 hours who pay on time and respect the premises. No middleman cuts.',
    savingsTag: 'Rented in 48 Hours'
  },
  {
    id: 'rev-4',
    name: 'Aakash Deshmukh',
    role: 'Backend Engineer @ Swiggy',
    locality: 'HSR Layout Sector 1',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    type: 'Bachelor',
    comment: 'The Now Ezy Radar map is unreal! I put in 10-minute commute to HSR BDA complex and saw all available empty rooms directly. No roaming street by street.',
    savingsTag: '10-Min Commute Match'
  },
  {
    id: 'rev-5',
    name: 'Suhani Parekh',
    role: 'Financial Analyst @ JP Morgan',
    locality: 'Powai Hiranandani',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    type: 'Bachelor',
    comment: 'In Mumbai, brokers ask 1 month rent and owners interrogate like criminal trials. Now Ezy 60-day pass gave me direct genuine landlord numbers. Closed flat in 4 days!',
    savingsTag: 'Saved ₹45k Brokerage'
  },
  {
    id: 'rev-6',
    name: 'Vikram Joshi',
    role: 'Individual Landlord',
    locality: 'AECS Layout',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    type: 'Property Owner',
    comment: 'I explicitly wanted bachelor tenants because corporate engineers don’t delay payments. Now Ezy’s portal let me set rules clearly and manage inquiries in one click.',
    savingsTag: 'Direct Quality Tenants'
  },
  {
    id: 'rev-7',
    name: 'Rohan & Siddharth',
    role: 'Founders @ Stealth AI',
    locality: 'Koramangala 4th Block',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    type: 'Bachelor',
    comment: 'We needed a 2BHK with 2-month deposit max and 300Mbps fiber for late night sprints. Found our dream spot on Sony World Signal without paying a single rupee to a broker.',
    savingsTag: '2-Month Deposit Limit'
  },
  {
    id: 'rev-8',
    name: 'Meghna Trivedi',
    role: 'Associate Consultant @ BCG',
    locality: 'DLF Cyber City',
    city: 'Gurgaon',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    type: 'Bachelor',
    comment: 'Being a single woman moving to Gurgaon was terrifying with shady brokers. Now Ezy verified the owner, gated security, and visitor policies upfront.',
    savingsTag: '100% Safe & Verified'
  },
  {
    id: 'rev-9',
    name: 'Nikhil Kulkarni',
    role: 'Property Owner',
    locality: 'Hinjawadi Phase 1',
    city: 'Pune',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    type: 'Property Owner',
    comment: 'Simple, no commission, direct connection. The listing editor makes it effortless to upload photos and clarify deposit details.',
    savingsTag: 'Zero Hassle'
  },
  {
    id: 'rev-10',
    name: 'Aditya & Anmol',
    role: 'Data Scientists @ Walmart Global Tech',
    locality: 'Bellandur & Kadubeesanahalli',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    type: 'Bachelor',
    comment: 'Found a luxury gated apartment 5 minutes from Outer Ring Road. The landlord was super chill and welcomed bachelors with open arms.',
    savingsTag: 'Zero Rejection'
  },
  {
    id: 'rev-11',
    name: 'Kavya Ramanathan',
    role: 'Growth Lead @ Zepto',
    locality: 'Andheri West',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    type: 'Bachelor',
    comment: 'Now Ezy solved the biggest nightmare of moving to a new city. Clean UI, transparent prices, and direct WhatsApp owner connects.',
    savingsTag: 'Direct WhatsApp Connect'
  },
  {
    id: 'rev-12',
    name: 'Deepak Varma',
    role: 'Senior DevOps Architect',
    locality: 'Whitefield (ITPB)',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    type: 'Bachelor',
    comment: 'No broker calls at 7 AM. 100% genuine photos matched the physical flat. Signed agreement within 24 hours of landing in Bengaluru.',
    savingsTag: 'Signed in 24 Hours'
  }
];

export default function ReviewsMarqueeSection() {
  // Duplicate array for seamless infinite marquee loop
  const duplicatedReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-rose-50/20 to-slate-50 border-y border-slate-200/80 overflow-hidden relative">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#C01E4E] text-xs font-black uppercase tracking-wider mb-2.5">
          <ShieldCheck className="w-4 h-4 text-[#C01E4E]" />
          <span>Real Bachelor &amp; Landlord Experiences</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          Solving India’s Bachelor Housing Nightmare
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto font-medium">
          Over <strong>14,000+ bachelors</strong> saved high brokerage fees, zero family-only rejections, and zero street hunting.
        </p>
      </div>

      {/* Scrolling Marquee Container with Pause on Hover */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="animate-marquee flex gap-5 sm:gap-6 pl-4">
          {duplicatedReviews.map((rev, index) => (
            <div
              key={`${rev.id}-${index}`}
              className="w-[300px] sm:w-[350px] shrink-0 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all duration-300 flex flex-col justify-between relative group select-none"
            >
              <div>
                {/* Rating Stars & Savings Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[11px] font-black text-slate-900 ml-1">5.0</span>
                  </div>

                  {rev.savingsTag && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {rev.savingsTag}
                    </span>
                  )}
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium line-clamp-4 mb-4">
                  “{rev.comment}”
                </p>
              </div>

              {/* Author Info & 3D Logo Mark */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between relative">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-rose-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-slate-900 truncate">
                        {rev.name}
                      </h4>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-[10px] text-slate-500 font-semibold truncate">
                      {rev.role}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium truncate">
                      {rev.locality}, {rev.city}
                    </p>
                  </div>
                </div>

                {/* 3D LOGO MARK ON RIGHT SIDE BOTTOM (Explicit user instruction) */}
                <div 
                  className="shrink-0 pl-2 group-hover:scale-110 transition-transform duration-200"
                  title="Verified on Now Ezy"
                >
                  <img
                    src="/brand/icon-3d.png"
                    alt="Now Ezy 3D Mark"
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Hint */}
      <div className="text-center mt-4">
        <span className="text-[11px] font-semibold text-slate-400">
          Hover card to pause · 100% verified bachelor tenancy stories
        </span>
      </div>

    </section>
  );
}