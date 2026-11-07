'use client';

import React, { useState, useMemo } from 'react';
import { X, Search, MapPin, Building, Building2, Check } from 'lucide-react';
import { ALL_INDIAN_LOCATIONS, POPULAR_CITIES, LocationItem } from '../data/indianLocations';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export default function CitySelectorModal({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity
}: CitySelectorModalProps) {
  const [search, setSearch] = useState('');

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.trim().toLowerCase();
    return ALL_INDIAN_LOCATIONS.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.cityOrDistrict.toLowerCase().includes(q) ||
        loc.state.toLowerCase().includes(q) ||
        loc.secondaryText.toLowerCase().includes(q)
    );
  }, [search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Search header (Matching Reference Image 1) */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-white sticky top-0 z-10">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search for city, district, or town (e.g. Dharmapuri, Bengaluru)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-normal"
            autoFocus
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {/* If User Is Typing: Show Dynamic Suggestion List (Matching Reference Image 2!) */}
          {search.trim() ? (
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
                Matching Indian Locations ({searchResults.length})
              </p>

              {searchResults.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {searchResults.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => {
                        onSelectCity(loc.cityOrDistrict);
                        onClose();
                      }}
                      className="w-full py-3 px-3 hover:bg-rose-50/60 rounded-xl transition-colors flex items-start gap-3 text-left cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#C01E4E] group-hover:text-white flex items-center justify-center shrink-0 transition-colors text-slate-600 mt-0.5">
                        {loc.type === 'PROJECT' ? (
                          <Building className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <strong className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#C01E4E] transition-colors block truncate">
                          {loc.name}
                        </strong>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                          {loc.secondaryText}
                        </span>
                      </div>
                      {selectedCity.toLowerCase() === loc.cityOrDistrict.toLowerCase() && (
                        <Check className="w-4 h-4 text-[#C01E4E] shrink-0 self-center" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-xs text-slate-500 font-semibold mb-2">
                    City not in popular index? Set custom city:
                  </p>
                  <button
                    onClick={() => {
                      onSelectCity(search.trim());
                      onClose();
                    }}
                    className="px-4 py-2 bg-[#C01E4E] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Set City as &quot;{search.trim()}&quot;
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Default View: Popular Cities Grid (Matching Reference Image 1) */
            <div>
              <p className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
                Popular Cities
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => {
                      onSelectCity(city.name);
                      onClose();
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedCity === city.name
                        ? 'border-[#C01E4E] bg-rose-50/50 text-[#C01E4E] font-bold shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 font-medium'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      selectedCity === city.name ? 'bg-[#C01E4E] text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="text-xs font-bold block truncate">{city.name}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{city.state}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
          <button
            onClick={() => {
              onSelectCity('All India');
              onClose();
            }}
            className="font-bold text-[#C01E4E] hover:underline cursor-pointer"
          >
            All India
          </button>
          <span className="text-slate-400">View all 100+ cities &gt;</span>
        </div>
      </div>
    </div>
  );
}
