'use client';

import React from 'react';
import {
  ShieldCheck,
  Award,
  Smartphone,
  QrCode,
  MapPin,
  ExternalLink,
  ChevronRight,
  Heart,
  Sparkles,
  Building2,
  Navigation
} from 'lucide-react';

interface FooterProps {
  onSelectLocality?: (locality: string) => void;
  onOpenRadar?: () => void;
  onOpenListProperty?: () => void;
}

export default function Footer({
  onSelectLocality,
  onOpenRadar,
  onOpenListProperty
}: FooterProps) {
  const localitiesCol1 = [
    'Flats for Bachelors in Kundanahalli',
    'Flats for Bachelors in Indiranagar',
    'Flats for Bachelors in Koramangala',
    'Flats for Bachelors in HSR Layout',
    'Flats for Bachelors in Whitefield (ITPL)',
    'Flats for Bachelors in Bellandur'
  ];

  const localitiesCol2 = [
    'Flats for Bachelors in Marathahalli',
    'Flats for Bachelors in Electronic City',
    'Flats for Bachelors in BTM Layout',
    'Flats for Bachelors in Sarjapur Road',
    'Flats for Bachelors in Manyata Tech Park',
    'Flats for Bachelors in Hebbal'
  ];

  const localitiesCol3 = [
    'Flats for Bachelors in Bagmane Constellation',
    'Flats for Bachelors in Domlur',
    'Flats for Bachelors in CV Raman Nagar',
    'Flats for Bachelors in Banashankari',
    'Flats for Bachelors in Jayanagar',
    'Flats for Bachelors in Malleshwaram'
  ];

  const localitiesCol4 = [
    'Bachelor Flats in Mumbai (Powai / BKC)',
    'Bachelor Flats in Pune (Hinjawadi / Kharadi)',
    'Bachelor Flats in Hyderabad (Hitec City)',
    'Bachelor Flats in Gurugram (Cyber City)',
    'Bachelor Flats in Noida (Sector 62)',
    'Bachelor Flats in Chennai (OMR IT Corridor)'
  ];

  return (
    <footer className="bg-[#0B0F19] text-white pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: Popular Localities Grid (Matching Housing.com format in reference screenshot) */}
        <div className="pb-12 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C01E4E]" />
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
              Find Bachelor Flats &amp; Shared Homes
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-400">
            {/* Col 1 */}
            <ul className="space-y-2.5">
              {localitiesCol1.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onSelectLocality?.(item.replace('Flats for Bachelors in ', ''))}
                    className="hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            {/* Col 2 */}
            <ul className="space-y-2.5">
              {localitiesCol2.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onSelectLocality?.(item.replace('Flats for Bachelors in ', ''))}
                    className="hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            {/* Col 3 */}
            <ul className="space-y-2.5">
              {localitiesCol3.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onSelectLocality?.(item.replace('Flats for Bachelors in ', ''))}
                    className="hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            {/* Col 4 */}
            <ul className="space-y-2.5">
              {localitiesCol4.map((item, idx) => (
                <li key={idx}>
                  <span className="hover:text-white transition-colors cursor-pointer block">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION: Branded Banner + Links + Mobile App Showcase */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Branded Showcase Box (Replacing purple Housing banner with Now Ezy Crimson Startup Seal) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#800F31] via-[#A11840] to-[#C01E4E] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl shadow-rose-950/40">
            {/* Ambient Graphic Accent */}
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/brand/icon.png"
                  alt="Now Ezy"
                  className="w-12 h-12 object-contain bg-white rounded-2xl p-1.5 shadow-md"
                />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-200 block">
                    India&apos;s 1st Bachelor Living Network
                  </span>
                  <span className="text-xl font-black text-white block">
                    now ezy
                  </span>
                </div>
              </div>

              <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Say Goodbye to &quot;Family Only&quot; Rejections.
              </h4>

              <p className="text-xs text-rose-100 leading-relaxed font-medium">
                Now Ezy was built with one mission: to eliminate the stress, high brokerage, and humiliation faced by young working bachelors when finding a home in Indian cities.
              </p>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-[11px] font-extrabold text-white flex items-center gap-1.5 border border-white/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>0% Rejection Guaranteed</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-[11px] font-extrabold text-white flex items-center gap-1.5 border border-white/15">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Ranked #1 for Bachelors</span>
                </span>
              </div>
            </div>
          </div>

          {/* Center Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6 text-xs">
            <div>
              <h5 className="font-black uppercase tracking-wider text-slate-300 mb-3.5">
                Company
              </h5>
              <ul className="space-y-2 text-slate-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">About Now Ezy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers (We&apos;re Hiring)</a></li>
                <li>
                  <button
                    onClick={onOpenListProperty}
                    className="hover:text-white transition-colors text-left"
                  >
                    For Property Owners
                  </button>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bachelor Respect Charter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-wider text-slate-300 mb-3.5">
                Solutions
              </h5>
              <ul className="space-y-2 text-slate-400 font-medium">
                <li>
                  <button
                    onClick={onOpenRadar}
                    className="hover:text-white transition-colors text-left flex items-center gap-1"
                  >
                    <span>Now Ezy Radar™</span>
                    <span className="text-[9px] bg-[#C01E4E] text-white px-1 py-0.2 rounded font-black">NEW</span>
                  </button>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">60-Day Bachelor Pass</a></li>
                <li><a href="#" className="hover:text-white transition-colors">2-Month Deposit Shield</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roommate Matchmaker</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pre-Screened Landlords</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rental Agreements</a></li>
              </ul>
            </div>
          </div>

          {/* Right Column: Experience on Mobile & QR Code (Matching Housing.com layout) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Experience Now Ezy on Mobile
            </h5>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
              <a
                href="#"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 flex items-center justify-center font-black text-lg"></div>
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">Download on the</span>
                  <span className="text-xs font-bold text-white block">App Store</span>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 flex items-center justify-center text-emerald-400 font-bold">▶</div>
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">Get it on</span>
                  <span className="text-xs font-bold text-white block">Google Play</span>
                </div>
              </a>
            </div>

            {/* QR Code Card */}
            <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center gap-3">
              {/* Minimal SVG QR Code Representation */}
              <div className="w-16 h-16 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-black">
                  <rect x="10" y="10" width="30" height="30" />
                  <rect x="15" y="15" width="20" height="20" fill="white" />
                  <rect x="20" y="20" width="10" height="10" />
                  
                  <rect x="60" y="10" width="30" height="30" />
                  <rect x="65" y="15" width="20" height="20" fill="white" />
                  <rect x="70" y="20" width="10" height="10" />
                  
                  <rect x="10" y="60" width="30" height="30" />
                  <rect x="15" y="65" width="20" height="20" fill="white" />
                  <rect x="20" y="70" width="10" height="10" />
                  
                  <rect x="45" y="15" width="8" height="8" />
                  <rect x="45" y="35" width="8" height="8" />
                  <rect x="60" y="50" width="10" height="10" />
                  <rect x="80" y="60" width="10" height="10" />
                  <rect x="45" y="75" width="15" height="15" />
                  <rect x="70" y="80" width="10" height="10" />
                </svg>
              </div>

              <div className="text-[11px] text-slate-400 leading-snug">
                <strong className="text-white block font-bold">Quick Mobile Scan</strong>
                Open phone camera to view empty bachelor flats near you.
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block mb-2">
                Follow Us
              </span>
              <div className="flex items-center gap-2.5 text-slate-400">
                <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-[#C01E4E] transition-colors">
                  <span className="text-xs font-black">f</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-[#C01E4E] transition-colors">
                  <span className="text-xs font-black">ig</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-[#C01E4E] transition-colors">
                  <span className="text-xs font-black">𝕏</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-[#C01E4E] transition-colors">
                  <span className="text-xs font-black">in</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM COPYRIGHT STRIP */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            &copy; 2026 Now Ezy Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Built exclusively for India&apos;s Bachelor Community</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">0% Rejection Guaranteed</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
