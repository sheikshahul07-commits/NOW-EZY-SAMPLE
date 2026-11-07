'use client';

import React from 'react';
import { SlidersHorizontal, Check, RotateCcw } from 'lucide-react';

export interface FilterState {
  maxRent: number;
  noCurfewOnly: boolean;
  nonVegAllowedOnly: boolean;
  guestsAllowedOnly: boolean;
  fullyFurnishedOnly: boolean;
  zeroBrokerageOnly: boolean;
}

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalMatches: number;
}

export default function FilterBar({ filters, setFilters, totalMatches }: FilterBarProps) {
  const resetFilters = () => {
    setFilters({
      maxRent: 40000,
      noCurfewOnly: false,
      nonVegAllowedOnly: false,
      guestsAllowedOnly: false,
      fullyFurnishedOnly: false,
      zeroBrokerageOnly: false
    });
  };

  const hasActiveFilters =
    filters.maxRent < 40000 ||
    filters.noCurfewOnly ||
    filters.nonVegAllowedOnly ||
    filters.guestsAllowedOnly ||
    filters.fullyFurnishedOnly ||
    filters.zeroBrokerageOnly;

  return (
    <div className="bg-white border-y border-slate-200/90 py-3 px-4 sm:px-6 lg:px-8 mb-6 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Bachelor Criteria Filter Badges (No Emojis!) */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C01E4E]" />
            <span>Bachelor Filters:</span>
          </div>

          {/* Non-Veg Allowed */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, nonVegAllowedOnly: !prev.nonVegAllowedOnly }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              filters.nonVegAllowedOnly
                ? 'bg-[#C01E4E] text-white border-[#C01E4E] shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {filters.nonVegAllowedOnly && <Check className="w-3 h-3 stroke-[3]" />}
            Non-Veg Allowed
          </button>

          {/* No Curfew */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, noCurfewOnly: !prev.noCurfewOnly }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              filters.noCurfewOnly
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {filters.noCurfewOnly && <Check className="w-3 h-3 stroke-[3]" />}
            No Curfew
          </button>

          {/* Overnight Guests */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, guestsAllowedOnly: !prev.guestsAllowedOnly }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              filters.guestsAllowedOnly
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {filters.guestsAllowedOnly && <Check className="w-3 h-3 stroke-[3]" />}
            Overnight Guests Permitted
          </button>

          {/* Fully Furnished */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, fullyFurnishedOnly: !prev.fullyFurnishedOnly }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              filters.fullyFurnishedOnly
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {filters.fullyFurnishedOnly && <Check className="w-3 h-3 stroke-[3]" />}
            Fully Furnished
          </button>
        </div>

        {/* Right: Budget Slider & Matching Count */}
        <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Max Rent:</span>
            <span className="font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
              ₹{filters.maxRent.toLocaleString()}
            </span>
            <input
              type="range"
              min="10000"
              max="40000"
              step="2000"
              value={filters.maxRent}
              onChange={(e) => setFilters(prev => ({ ...prev, maxRent: Number(e.target.value) }))}
              className="w-24 sm:w-32 accent-[#C01E4E] cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#C01E4E] bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-xl">
              {totalMatches} {totalMatches === 1 ? 'place' : 'places'} available
            </span>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-slate-500 hover:text-slate-900 font-bold flex items-center gap-1 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Reset filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
