'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Check,
  Sparkles,
  Building,
  Zap,
  ArrowRight,
  Lock,
  Award
} from 'lucide-react';

interface LandlordListingLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess: () => void;
  usedCount?: number;
  freeLimit?: number;
}

export default function LandlordListingLimitModal({
  isOpen,
  onClose,
  onUpgradeSuccess,
  usedCount = 2,
  freeLimit = 2
}: LandlordListingLimitModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'tier_3' | 'unlimited'>('tier_3');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUpgradeSuccess();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200 overflow-y-auto max-h-[92vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="w-12 h-1 bg-white/40 rounded-full mx-auto my-2 sm:hidden relative z-30" />

        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-slate-900 to-[#1E0812] text-white relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#C01E4E]/30 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Free Limit Reached ({usedCount}/{freeLimit} Used)</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Upgrade to Landlord Growth Pass
          </h3>
          <p className="text-xs text-rose-200/90 mt-1 leading-relaxed">
            You have utilized your <strong>{freeLimit} free property listings</strong>. Upgrade to post more flats and get corporate bachelor tenants directly with 0% brokerage.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Plan 1: 3 Listings */}
            <div
              onClick={() => setSelectedPlan('tier_3')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                selectedPlan === 'tier_3'
                  ? 'border-[#C01E4E] bg-rose-50/50 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Growth 3-Pack
                </span>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === 'tier_3'
                      ? 'border-[#C01E4E] bg-[#C01E4E]'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedPlan === 'tier_3' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>

              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">₹299</span>
                  <span className="text-xs text-slate-400 line-through">₹799</span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold block">
                  One-time · 60 Days Validity
                </span>
              </div>

              <p className="text-[11px] text-slate-600 font-medium">
                +3 Additional Verified Bachelor Listings with direct WhatsApp tenant connect.
              </p>
            </div>

            {/* Plan 2: Unlimited Platinum */}
            <div
              onClick={() => setSelectedPlan('unlimited')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                selectedPlan === 'unlimited'
                  ? 'border-[#C01E4E] bg-rose-50/50 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <span className="absolute -top-2.5 right-3 text-[9px] font-black uppercase tracking-wider bg-[#C01E4E] text-white px-2 py-0.5 rounded-full shadow-xs">
                Best Value
              </span>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Unlimited 1-Year
                </span>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === 'unlimited'
                      ? 'border-[#C01E4E] bg-[#C01E4E]'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedPlan === 'unlimited' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>

              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">₹699</span>
                  <span className="text-xs text-slate-400 line-through">₹1,999</span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold block">
                  365 Days Access
                </span>
              </div>

              <p className="text-[11px] text-slate-600 font-medium">
                Unlimited Property Postings + Now Ezy Radar Priority Spotlight for all listings.
              </p>
            </div>
          </div>

          {/* Key Landlord Benefits */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
              What You Get with Now Ezy:
            </h4>
            
            <div className="space-y-1.5 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero brokerage commission on tenant rent forever (Save ₹25,000+)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pre-verified working bachelors (Razorpay, Swiggy, CRED, Infosys)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full Page listing editor with instant photo and amenity controls</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Now Ezy Radar commute mapping visibility to tech parks</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-2xl bg-[#C01E4E] hover:bg-[#A11840] text-white font-extrabold text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span>Activating Pass...</span>
            ) : (
              <>
                <span>Upgrade Landlord Pass · {selectedPlan === 'tier_3' ? '₹299' : '₹699'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-400 font-medium">
            100% Secure Checkout · Instant Listing Activation · No Recurring Subscriptions
          </p>
        </div>
      </div>
    </div>
  );
}