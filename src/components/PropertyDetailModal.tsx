'use client';

import React, { useState } from 'react';
import { Property } from '../types';
import {
  X,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  BedDouble,
  Bath,
  Phone,
  MessageSquare,
  Sparkles,
  Heart,
  Navigation,
  Check,
  Clock,
  Users,
  Utensils,
  Award
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onContactOwner: (property: Property) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export default function PropertyDetailModal({
  property,
  onClose,
  onContactOwner,
  isSaved,
  onToggleSave
}: PropertyDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 md:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Floating Top Buttons */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleSave(property.id)}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              isSaved
                ? 'bg-[#C01E4E] text-white shadow-lg'
                : 'bg-white/85 text-slate-700 hover:bg-white hover:text-[#C01E4E] shadow-md'
            }`}
            title="Save Property"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/90 text-slate-700 hover:bg-white hover:text-slate-900 shadow-md transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* USER GREETING & ENCOURAGEMENT INDICATOR (Requested by User) */}
          <div className="bg-gradient-to-r from-rose-50 via-rose-100/50 to-emerald-50 p-3 sm:p-3.5 rounded-2xl border border-rose-200 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#C01E4E] text-white flex items-center justify-center shadow-xs shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                  Very Good Choice!
                </p>
                <p className="text-[11px] text-slate-600 font-medium">
                  Verified Bachelor-Friendly · 0% Rejection Guaranteed · Zero Brokerage
                </p>
              </div>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{property.matchPercentage || 100}% Requirement Match</span>
            </div>
          </div>

          {/* Image Showcase */}
          <div>
            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
                Photo {activeImageIndex + 1} of {property.images.length}
              </div>
            </div>

            {/* Thumbnail Row */}
            {property.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#C01E4E] scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Location */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-[#C01E4E] border border-rose-200">
                {property.propertyType}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                {property.furnishing}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                0% Rejection Guaranteed
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              {property.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 mt-2 font-medium">
              <div className="flex items-center gap-1 text-slate-900 font-bold">
                <MapPin className="w-4 h-4 text-[#C01E4E]" />
                <span>{property.street ? `${property.street}, ` : ''}{property.locality}, {property.city} ({property.pincode})</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <Navigation className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.distanceToHub}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Available: {property.availableFrom}</span>
              </div>
            </div>
          </div>

          {/* Pricing & Deposit Breakdown */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Transparent Financial Breakdown (Zero Brokerage)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 mb-0.5 font-medium">Monthly Rent</p>
                <p className="text-xl font-black text-slate-900">
                  ₹{property.rent.toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 mb-0.5 font-medium">Security Deposit</p>
                <p className="text-xl font-black text-[#C01E4E]">
                  ₹{property.deposit.toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 mb-0.5 font-medium">Maintenance</p>
                <p className="text-xl font-black text-slate-800">
                  {property.maintenance === 0 ? 'Included' : `₹${property.maintenance}/mo`}
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 mb-0.5 font-medium">Brokerage Fee</p>
                <p className="text-xl font-black text-emerald-600">
                  ₹0 (Zero)
                </p>
              </div>
            </div>
          </div>

          {/* CRUCIAL BACHELOR POLICY MATRIX (No Emojis!) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C01E4E]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Official Bachelor Policy Card
                </h3>
              </div>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                Owner Signed
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-[11px] block mb-1">Non-Veg Cooking</span>
                <strong className="text-slate-900 font-bold">
                  {property.bachelorRules.nonVegAllowed ? 'Allowed & Welcome' : 'Pure Veg Only'}
                </strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-[11px] block mb-1">Gate / Curfew Rule</span>
                <strong className="text-slate-900 font-bold">{property.bachelorRules.curfew}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-[11px] block mb-1">Overnight Guests</span>
                <strong className="text-slate-900 font-bold">{property.bachelorRules.overnightGuests}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-[11px] block mb-1">Opposite Gender Visitors</span>
                <strong className="text-slate-900 font-bold">{property.bachelorRules.oppositeGenderVisitors}</strong>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Property Overview & Rules
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              Amenities & Inclusions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {property.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 border border-slate-100">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Host / Owner Contact Footer */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={property.verifiedOwner.avatar}
                alt={property.verifiedOwner.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">{property.verifiedOwner.name}</p>
                <p className="text-xs text-slate-500">
                  {property.verifiedOwner.isDirectOwner ? 'Direct Property Owner' : 'Leaseholder'} · Responds {property.verifiedOwner.responseRate}
                </p>
              </div>
            </div>

            <button
              onClick={() => onContactOwner(property)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C01E4E] hover:bg-[#9F1239] text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-900/15 transition-all cursor-pointer active:scale-97"
            >
              Contact Owner Directly
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
