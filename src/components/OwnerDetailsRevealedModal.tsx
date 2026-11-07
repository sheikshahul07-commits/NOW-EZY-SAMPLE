'use client';

import React from 'react';
import { X, Phone, MessageSquare, ShieldCheck, CheckCircle2, Award, Clock } from 'lucide-react';
import { Property } from '../types';

interface OwnerDetailsRevealedModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

export default function OwnerDetailsRevealedModal({
  isOpen,
  onClose,
  property
}: OwnerDetailsRevealedModalProps) {
  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border-t sm:border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="w-12 h-1 bg-white/40 rounded-full mx-auto my-2 sm:hidden relative z-30" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-white">
              60-Day Bachelor Pass Active
            </span>
            <span className="text-xs font-bold text-emerald-200">
              Zero Brokerage Unlocked
            </span>
          </div>

          <h3 className="text-xl font-black text-white">
            Direct Owner Contact Unlocked
          </h3>
          <p className="text-xs text-emerald-100 mt-1 line-clamp-1">
            {property.title} · {property.locality}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Owner Identity */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <img
              src={property.verifiedOwner.avatar}
              alt={property.verifiedOwner.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-base font-black text-slate-900">
                  {property.verifiedOwner.name}
                </h4>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full">
                  Direct Owner
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Response speed: <strong>{property.verifiedOwner.responseRate}</strong> · Pre-screened for bachelors
              </p>
            </div>
          </div>

          {/* Action Call & WhatsApp Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`tel:${property.verifiedOwner.phone}`}
              className="py-3.5 px-4 rounded-2xl bg-[#C01E4E] hover:bg-[#A11840] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-rose-900/20 transition-all active:scale-98 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Owner Now</span>
            </a>

            <a
              href={`https://wa.me/${property.verifiedOwner.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(property.verifiedOwner.name)},%20I%20saw%20your%20property%20"${encodeURIComponent(property.title)}"%20on%20Now%20Ezy%20and%20am%20interested%20in%20a%20visit.`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 transition-all active:scale-98 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-700 font-bold">
            Direct Phone: <span className="text-slate-900 font-black">{property.verifiedOwner.phone}</span>
          </div>

          {/* Upfront Bachelor Rules Summary */}
          <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-200 text-xs space-y-1.5">
            <strong className="text-slate-900 font-black block">Confirmed Bachelor Terms:</strong>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-700 font-medium">
              <span className="px-2 py-0.5 bg-white rounded border border-rose-200">
                Non-Veg: <strong>{property.bachelorRules.nonVegAllowed ? 'Allowed' : 'Veg Only'}</strong>
              </span>
              <span className="px-2 py-0.5 bg-white rounded border border-rose-200">
                Curfew: <strong>{property.bachelorRules.curfew}</strong>
              </span>
              <span className="px-2 py-0.5 bg-white rounded border border-rose-200">
                Deposit: <strong>₹{property.deposit.toLocaleString()} (Max 2 Mos)</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>0% Rejection Guaranteed</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
