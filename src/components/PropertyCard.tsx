'use client';

import React from 'react';
import { Property } from '../types';
import {
  MapPin,
  Heart,
  Sofa,
  Home,
  Users,
  Check,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Lock,
  ArrowRight
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onGetOwnerDetails: (property: Property) => void;
}

export default function PropertyCard({
  property,
  onSelect,
  isSaved,
  onToggleSave,
  onGetOwnerDetails
}: PropertyCardProps) {
  const handleOpenNewPage = () => {
    window.open(`/listing/${property.id}`, '_blank');
  };

  const depositMonths = Math.round(property.deposit / Math.max(1, property.rent));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden text-left">
      
      {/* Top Verification & Availability Header Bar */}
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ID Verified Owner</span>
          </span>
          <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
            · {property.verification?.lastAvailabilityCheck || 'Availability Verified Recently'}
          </span>
        </div>

        <span className="text-[11px] font-black uppercase tracking-wider text-[#C01E4E] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
          {property.propertyType}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        
        {/* Title & Shortlist Bar */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 
              onClick={handleOpenNewPage}
              className="text-base sm:text-lg font-black text-slate-900 hover:text-[#C01E4E] transition-colors cursor-pointer leading-snug line-clamp-1"
            >
              {property.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#C01E4E] shrink-0" />
              <span className="truncate">{property.street ? `${property.street}, ` : ''}{property.locality}, {property.city}</span>
              <span>•</span>
              <span className="text-slate-600 font-semibold shrink-0">{property.distanceToHub}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(property.id);
            }}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
              isSaved
                ? 'bg-rose-50 border-rose-200 text-[#C01E4E]'
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title="Save to Shortlist"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-[#C01E4E]' : ''}`} />
          </button>
        </div>

        {/* 3 Metric Columns: Rent, Deposit, Built-up (OLX / NoBroker Marketplace Style) */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50/80 border border-slate-100 text-center mb-4">
          <div className="border-r border-slate-200 pr-2">
            <p className="text-sm sm:text-lg font-black text-slate-900 font-mono">
              ₹ {property.rent.toLocaleString()}
            </p>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Rent + {property.maintenance ? `₹${property.maintenance}` : '0'} Maint
            </p>
          </div>

          <div className="border-r border-slate-200 px-2">
            <p className="text-sm sm:text-lg font-black text-slate-900 font-mono">
              ₹ {property.deposit.toLocaleString()}
            </p>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Deposit ({depositMonths} Mo{depositMonths > 1 ? 's' : ''})
            </p>
          </div>

          <div className="pl-2">
            <p className="text-sm sm:text-lg font-black text-slate-900 font-mono">
              {property.carpetAreaSqft || (property.bedrooms === 1 ? 450 : property.bedrooms === 2 ? 850 : 1200)} sqft
            </p>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              {property.floor || `${property.bedrooms} BHK`}
            </p>
          </div>
        </div>

        {/* Split Card Layout: Photo Thumbnail Left & Specs Right */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          
          {/* Photo Gallery Thumbnail */}
          <div 
            onClick={handleOpenNewPage}
            className="sm:w-5/12 relative rounded-xl overflow-hidden bg-slate-100 aspect-16/10 cursor-pointer group shrink-0 border border-slate-200"
          >
            <img
              src={property.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'}
              alt={property.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85';
              }}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            />
            
            {/* Occupancy Badge */}
            <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-black/75 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
              <Users className="w-3 h-3 text-rose-400" />
              <span>{property.occupancy || 'Bachelor Friendly'}</span>
            </div>

            <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-white text-[10px] font-bold">
              1/{property.images.length || 1} Photos
            </div>
          </div>

          {/* Specs & Bachelor Policies */}
          <div className="sm:w-7/12 flex flex-col justify-between">
            
            {/* 2x2 Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <Sofa className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate font-bold text-slate-800">{property.furnishing}</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <Home className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate font-bold text-slate-800">{property.bedrooms} BHK / {property.bathrooms} Bath</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate font-bold text-emerald-800">
                  {property.verification?.physicallyInspected ? 'Verified Property' : 'Direct Owner'}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate font-bold text-slate-800">{property.availableFrom || 'Immediate'}</span>
              </div>
            </div>

            {/* Bachelor Policy Chips */}
            <div className="flex flex-wrap gap-1.5 my-2.5 text-[11px]">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                <Check className="w-3 h-3 text-emerald-600" />
                {property.bachelorRules.nonVegAllowed ? 'Non-Veg Allowed' : 'Veg Only'}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                <Clock className="w-3 h-3 text-slate-500" />
                {property.bachelorRules.curfew}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                Guests: {property.bachelorRules.overnightGuests.split(' ')[0]}
              </span>
            </div>

            {/* Action Buttons: Contact Owner & Full Details */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onGetOwnerDetails(property)}
                className="flex-1 min-h-[42px] py-2.5 px-3 bg-[#C01E4E] hover:bg-[#A11840] text-white font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 text-center"
              >
                <span>Contact Owner</span>
              </button>

              <button
                type="button"
                onClick={handleOpenNewPage}
                className="min-h-[42px] py-2.5 px-3.5 border border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
