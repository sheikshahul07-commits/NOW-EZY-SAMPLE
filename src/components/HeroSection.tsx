'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Sparkles, ArrowRight, Navigation, LocateFixed, ShieldCheck, CheckCircle2, Building, Lock } from 'lucide-react';
import { getSuggestionsForQuery, MAJOR_AREA_SUGGESTIONS } from '../data/areas';
import { ALL_INDIAN_LOCATIONS } from '../data/indianLocations';
import { AreaSuggestion } from '../types';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  selectedCity: string;
  onOpenListFlow: () => void;
  onSelectArea: (area: AreaSuggestion) => void;
  onOpenRadar: () => void;
}

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedTab,
  setSelectedTab,
  selectedCity,
  onOpenListFlow,
  onSelectArea,
  onOpenRadar
}: HeroProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsLocating(false);
          setSearchQuery('Kundanahalli Gate, ITPL Main Rd, Bengaluru 560037');
          setShowDropdown(false);
        },
        () => {
          setIsLocating(false);
          setSearchQuery('Kundanahalli, Bengaluru 560037');
          setShowDropdown(false);
        },
        { timeout: 5000 }
      );
    } else {
      setIsLocating(false);
      setSearchQuery('Kundanahalli, Bengaluru 560037');
      setShowDropdown(false);
    }
  };

  // Unified suggestions: Searches across all Indian cities/localities (e.g. Dharmapuri, Salem, Bengaluru)
  const locationSuggestions = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return MAJOR_AREA_SUGGESTIONS.slice(0, 6).map((a) => ({
        id: a.locality,
        name: `${a.locality}, ${a.city}`,
        secondaryText: `LOCALITY | ${a.city.toUpperCase()}`,
        type: 'LOCALITY' as const,
        cityOrDistrict: a.city,
        state: 'Karnataka'
      }));
    }
    const q = searchQuery.trim().toLowerCase();
    const matchedIndian = ALL_INDIAN_LOCATIONS.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.cityOrDistrict.toLowerCase().includes(q) ||
        loc.state.toLowerCase().includes(q) ||
        loc.secondaryText.toLowerCase().includes(q)
    );
    if (matchedIndian.length > 0) return matchedIndian.slice(0, 8);

    // Fallback to local areas
    return getSuggestionsForQuery(searchQuery).map((a) => ({
      id: a.locality,
      name: `${a.locality}, ${a.street}`,
      secondaryText: `LOCALITY | ${a.city.toUpperCase()}`,
      type: 'LOCALITY' as const,
      cityOrDistrict: a.city,
      state: 'Karnataka'
    }));
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="relative overflow-visible z-30 bg-[#F8FAFC] pt-8 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      
      {/* Restrained Corporate Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* TWO-COLUMN PRO-TECH RESPONSIVE LAYOUT */}
      <div className="max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: BRAND HEADLINE & SEARCH (7 COLS) */}
          <div className="lg:col-span-7 text-left">
            
            {/* BRAND POSITIONING PILL: CLEAN, RESTRAINED, ENTERPRISE */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-3.5 max-w-full truncate">
              <span className="w-2 h-2 rounded-full bg-[#C01E4E] shrink-0" />
              <span className="hidden sm:inline">India&apos;s Verified Bachelor Housing &amp; Roommate Network</span>
              <span className="sm:hidden truncate">Verified Bachelor Living Network</span>
            </div>

            {/* MAIN HEADLINE */}
            <h1 className="text-2xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-slate-900 mb-3 leading-[1.18] sm:leading-[1.15]">
              Find Verified Bachelor Homes <br />
              <span className="text-[#C01E4E]">With Zero Rejection &amp; No Brokerage.</span>
            </h1>

            {/* CLEAN PROFESSIONAL SUBTITLE */}
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mb-6 leading-relaxed">
              Explore pre-screened bachelor flats, private rooms, and compatible roommates near your tech park or university. Transparent deposits and verified owner contacts.
            </p>

            {/* SPECIAL & UNIQUE FEATURE HIGHLIGHT: NOW EZY RADAR */}
            <div className="mb-6">
              <button
                type="button"
                onClick={onOpenRadar}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm shadow-xs border border-slate-300 hover:border-[#C01E4E] transition-all cursor-pointer group max-w-full"
              >
                <Navigation className="w-4 h-4 text-[#C01E4E] shrink-0" />
                <span className="truncate">Search by Travel Time with Radar</span>
                <span className="bg-rose-50 text-[#C01E4E] text-[10px] font-black px-2 py-0.5 rounded border border-rose-200 shrink-0">
                  5m · 10m · 15m
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            </div>

            {/* FLOATING TABBED SEARCH BAR */}
            <div ref={wrapperRef} className="max-w-2xl text-left relative">
              
              {/* Category Filter Tabs */}
              <div className="flex max-w-full overflow-x-auto scrollbar-none rounded-t-xl bg-slate-900 px-1.5 sm:px-2 pt-1.5 border-t border-x border-slate-800 text-[10px] sm:text-xs font-bold text-slate-300">
                {['ALL HOMES', 'ENTIRE FLATS', 'PRIVATE ROOMS', 'PG & CO-LIVING'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedTab(tab)}
                    className={`px-2.5 sm:px-4 py-1.5 transition-all cursor-pointer shrink-0 relative ${
                      selectedTab === tab
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                    {selectedTab === tab && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#C01E4E] rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Search Input Box */}
              <div className="bg-white rounded-b-2xl rounded-tr-2xl p-2 sm:p-2.5 shadow-md border border-slate-200 flex flex-col sm:flex-row items-center gap-2">
                
                <div className="relative flex-1 w-full flex items-center">
                  <Search className="w-4 h-4 text-slate-400 ml-2.5 shrink-0" />
                  <input
                    type="text"
                    placeholder={`Search locality, tech park, or street in ${selectedCity}...`}
                    value={searchQuery}
                    onFocus={() => setShowDropdown(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowDropdown(true);
                    }}
                    className="w-full pl-2.5 pr-2 py-2 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
                  />

                  {/* GPS Auto-Detect Location Button */}
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={isLocating}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold mr-1 shrink-0 border border-slate-200 cursor-pointer"
                  >
                    <LocateFixed className={`w-3.5 h-3.5 text-[#C01E4E] ${isLocating ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">{isLocating ? 'Locating...' : 'Near Me'}</span>
                  </button>
                </div>

                {/* Solid Search Button in Brand Crimson */}
                <button
                  type="button"
                  onClick={() => setShowDropdown(false)}
                  className="w-full sm:w-auto bg-[#C01E4E] hover:bg-[#A11840] text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer shrink-0"
                >
                  Search
                </button>

              </div>

              {/* Autocomplete Dropdown (Matching Reference Image 2 style) */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-slate-900 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>Matching Locations Across India</span>
                    <span className="text-slate-400">Search Any City / Town</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {locationSuggestions.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSearchQuery(item.name);
                          onSelectArea({
                            city: item.cityOrDistrict,
                            locality: item.name,
                            street: item.secondaryText,
                            pincode: 'Verified',
                            lat: 12.9716,
                            lng: 77.5946
                          });
                          setShowDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-rose-50/70 transition-colors flex items-start gap-3.5 cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-[#C01E4E] group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                          {item.type === 'PROJECT' ? (
                            <Building className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-extrabold text-slate-900 text-sm group-hover:text-[#C01E4E] transition-colors block truncate">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                            {item.secondaryText}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-pill below search */}
              <div className="mt-3 text-left">
                <button
                  onClick={onOpenListFlow}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer"
                >
                  <span>Are you a Property Owner?</span>
                  <strong className="text-[#C01E4E] underline underline-offset-2">Post Bachelor Property for FREE &rsaquo;</strong>
                </button>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: HIGH-END ARCHITECTURAL EXECUTIVE BACHELOR SUITE (5 COLS) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-[480px] lg:max-w-[500px]">
              
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#C01E4E]/25 via-rose-300/30 to-[#FD3752]/25 rounded-[32px] blur-md opacity-70 group-hover:opacity-100 transition duration-500" />

              {/* Main Photo Card Frame */}
              <div className="relative rounded-[28px] overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                
                {/* Pristine Modern Executive Bachelor Apartment Image */}
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85"
                  alt="Modern Executive Bachelor Living Space"
                  className="w-full h-[360px] sm:h-[400px] lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-bold shadow-lg border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>100% Bachelor Welcomed</span>
                </div>

                {/* Top-Right Commute Radar & Security Pill */}
                <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1.5">
                  <div className="flex items-center gap-1 bg-[#C01E4E] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg border border-white/20">
                    <Navigation className="w-3 h-3" />
                    <span>Radar Verified</span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <Lock className="w-2.5 h-2.5 text-emerald-400" />
                    <span>256-Bit PII Vault</span>
                  </div>
                </div>

                {/* Bottom Glassmorphic Information Overlay */}
                <div className="absolute inset-x-3 bottom-3 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-[#C01E4E] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C01E4E]" />
                      Zero Rejection Guarantee
                    </span>
                    <span className="text-sm font-mono font-black text-slate-900">
                      ₹18,000 / mo
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    Spacious Executive Studio for Tech Professionals
                  </h4>

                  <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-[#C01E4E]" />
                      <span>8 mins to ITPL Tech Park</span>
                    </span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">Zero Brokerage</span>
                    <span>•</span>
                    <span>Deposit Max 2 Mos</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* CORPORATE ENTERPRISE TRUST METRICS STRIP */}
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 shadow-2xs text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-xs border border-emerald-200">
                  0%
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Zero Rejections
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Pre-approved bachelor landlords. No &ldquo;families only&rdquo; turns.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 shadow-2xs text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-[#C01E4E] flex items-center justify-center font-black text-xs border border-rose-200">
                  ₹0
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Zero Brokerage
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Direct owner deals. Save ₹15,000 to ₹35,000 on broker commissions.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 shadow-2xs text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-emerald-400 flex items-center justify-center font-black text-xs">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  256-Bit PII Vault
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                No scrapers, bots, or telemarketers. Numbers never exposed in plain text.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 shadow-2xs text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xs border border-blue-200">
                  2M
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Deposit Capped
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Max 2-month security deposit limit. No 10-month lockup exploitation.
              </p>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
