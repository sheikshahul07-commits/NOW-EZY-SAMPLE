'use client';

import React, { useState } from 'react';
import { X, Check, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { PropertyType, OccupancyType, FurnishingType } from '../types';

export interface FilterState {
  propertyTypes: PropertyType[];
  maxRent: number;
  occupancy: OccupancyType | 'All';
  furnishing: FurnishingType | 'All';
  nonVegOnly: boolean;
  noCurfewOnly: boolean;
  overnightGuestsOnly: boolean;
  depositTwoMonthsMax: boolean;
}

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export default function FilterBottomSheet({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount
}: FilterBottomSheetProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  if (!isOpen) return null;

  const togglePropertyType = (type: PropertyType) => {
    setLocalFilters((prev) => {
      const exists = prev.propertyTypes.includes(type);
      return {
        ...prev,
        propertyTypes: exists
          ? prev.propertyTypes.filter((t) => t !== type)
          : [...prev.propertyTypes, type]
      };
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    onResetFilters();
    onClose();
  };

  const allPropertyTypes: PropertyType[] = [
    'Entire Flat',
    'Independent House',
    'Private Room',
    'Shared Room',
    'Single Bed in PG',
    'Co-Living Studio'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#C01E4E]" />
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Filter Bachelor Homes
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Filter Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-slate-900">
          
          {/* 1. Property Categories */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5">
              Property Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {allPropertyTypes.map((type) => {
                const active = localFilters.propertyTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => togglePropertyType(type)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      active
                        ? 'border-[#C01E4E] bg-rose-50 text-[#C01E4E]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{type}</span>
                    {active && <Check className="w-3.5 h-3.5 text-[#C01E4E]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Maximum Monthly Rent Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                Max Monthly Rent
              </label>
              <span className="text-xs font-black text-[#C01E4E] font-mono bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                Up to ₹{localFilters.maxRent.toLocaleString()} / mo
              </span>
            </div>
            <input
              type="range"
              min={8000}
              max={50000}
              step={1000}
              value={localFilters.maxRent}
              onChange={(e) => setLocalFilters({ ...localFilters, maxRent: Number(e.target.value) })}
              className="w-full accent-[#C01E4E] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
              <span>₹8,000</span>
              <span>₹25,000</span>
              <span>₹50,000+</span>
            </div>
          </div>

          {/* 3. Occupancy Preference */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5">
              Occupancy Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['All', 'Male Bachelors', 'Female Bachelors'] as const).map((occ) => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, occupancy: occ })}
                  className={`py-2 px-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                    localFilters.occupancy === occ
                      ? 'border-[#C01E4E] bg-rose-50 text-[#C01E4E]'
                      : 'border-slate-200 text-slate-700 bg-white'
                  }`}
                >
                  {occ === 'All' ? 'Any Bachelor' : occ}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Bachelor Rules & Permissions */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5">
              Bachelor Rules &amp; Permissions
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Non-Vegetarian Cooking Allowed</span>
                  <span className="text-[11px] text-slate-500">Filter out strict pure-veg landlords</span>
                </div>
                <input
                  type="checkbox"
                  checked={localFilters.nonVegOnly}
                  onChange={(e) => setLocalFilters({ ...localFilters, nonVegOnly: e.target.checked })}
                  className="w-4 h-4 accent-[#C01E4E] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">No Gate Curfew / Flexible Entry</span>
                  <span className="text-[11px] text-slate-500">Freedom for late shifts and night work</span>
                </div>
                <input
                  type="checkbox"
                  checked={localFilters.noCurfewOnly}
                  onChange={(e) => setLocalFilters({ ...localFilters, noCurfewOnly: e.target.checked })}
                  className="w-4 h-4 accent-[#C01E4E] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Overnight Guests Welcomed</span>
                  <span className="text-[11px] text-slate-500">Friends and family allowed anytime</span>
                </div>
                <input
                  type="checkbox"
                  checked={localFilters.overnightGuestsOnly}
                  onChange={(e) => setLocalFilters({ ...localFilters, overnightGuestsOnly: e.target.checked })}
                  className="w-4 h-4 accent-[#C01E4E] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Security Deposit Capped at Max 2 Months</span>
                  <span className="text-[11px] text-slate-500">Protected by Now Ezy bachelor deposit rule</span>
                </div>
                <input
                  type="checkbox"
                  checked={localFilters.depositTwoMonthsMax}
                  onChange={(e) => setLocalFilters({ ...localFilters, depositTwoMonthsMax: e.target.checked })}
                  className="w-4 h-4 accent-[#C01E4E] rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* 5. Furnishing Status */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5">
              Furnishing Status
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['All', 'Fully Furnished', 'Semi-Furnished', 'Unfurnished'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, furnishing: f })}
                  className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all cursor-pointer text-center truncate ${
                    localFilters.furnishing === f
                      ? 'border-[#C01E4E] bg-rose-50 text-[#C01E4E]'
                      : 'border-slate-200 text-slate-700 bg-white'
                  }`}
                >
                  {f === 'Fully Furnished' ? 'Full' : f === 'Semi-Furnished' ? 'Semi' : f}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer with Action Button */}
        <div className="p-4 border-t border-slate-100 bg-white shrink-0 flex items-center gap-3">
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-3 px-4 bg-[#C01E4E] hover:bg-[#A11840] text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>View {totalResultsCount} Matching Bachelor Homes</span>
          </button>
        </div>

      </div>
    </div>
  );
}
