'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Zap,
  PhoneCall,
  Clock,
  Sparkles,
  ArrowRight,
  Award,
  Check
} from 'lucide-react';
import { Property, PaymentReceipt } from '../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProperty?: Property | null;
  currentUser?: { name: string; phone?: string; email?: string } | null;
  onSubscribeSuccess: (receipt: PaymentReceipt) => void;
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  targetProperty,
  currentUser,
  onSubscribeSuccess
}: SubscriptionModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubscribedSuccess, setIsSubscribedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleActivatePass = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSubscribedSuccess(true);

      const receipt: PaymentReceipt = {
        receiptId: `RCP-${Date.now().toString(36).toUpperCase()}`,
        planName: 'Now Ezy 60-Day Bachelor Pass',
        planType: 'TENANT_PASS',
        amount: 499,
        gstAmount: 76.12,
        totalPaid: 499,
        paymentMethod: 'UPI / Card Payment',
        transactionRef: `UPI-${Date.now()}`,
        paidAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        validUntil: new Date(Date.now() + 60 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'SUCCESS',
        customerName: currentUser?.name || 'Rahul Sharma',
        customerPhone: currentUser?.phone || '+91 98765 43210'
      };

      setTimeout(() => {
        onSubscribeSuccess(receipt);
      }, 1000);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-y-auto max-h-[92vh] sm:max-h-[90vh] border-t sm:border border-slate-200"
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

        {/* Top Gradient Banner */}
        <div className="bg-gradient-to-r from-[#C01E4E] via-[#FD3752] to-[#800F31] p-6 sm:p-8 text-white relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider mb-2.5">
              <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
              <span>Unlimited Direct Owner Connect</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              60-Day Bachelor Pass
            </h2>

            <p className="text-xs sm:text-sm text-rose-100 max-w-lg leading-relaxed">
              One-time subscription for 2 full months. Contact unlimited verified house owners directly with <strong>0% rejection</strong> and <strong>zero brokerage</strong>.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {targetProperty && (
            <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl mb-5 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 font-semibold block text-[11px]">Unlocking Contact For:</span>
                <span className="font-bold text-slate-900 line-clamp-1">{targetProperty.title}</span>
              </div>
              <span className="text-[#C01E4E] font-black shrink-0 px-2.5 py-1 bg-white rounded-lg border border-rose-200">
                ₹{targetProperty.rent.toLocaleString()}/mo
              </span>
            </div>
          )}

          {/* Pricing Highlight Box */}
          <div className="bg-slate-50 border-2 border-[#C01E4E]/30 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-slate-900">₹499</span>
                <span className="text-sm font-semibold text-slate-400 line-through">₹1,999</span>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Save 75% Today
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Valid for <strong>2 Full Months (60 Days)</strong> · Unlimited House Owner Numbers
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-slate-200 sm:pl-5">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 block">
                Brokerage Saved
              </span>
              <span className="text-base font-black text-emerald-600">
                ₹15,000 - ₹35,000
              </span>
            </div>
          </div>

          {/* PROS OF NOW EZY SECTION (Explicitly required on subscription page) */}
          <div className="mb-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3.5 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C01E4E]" />
              <span>What You Get with Now Ezy Bachelor Pass (The Pros)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C01E4E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">0% Bachelor Rejections</strong>
                  <span className="text-[11px] text-slate-500 leading-snug block">Every landlord is pre-screened to welcome bachelors with zero discrimination.</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#C01E4E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">Unlimited Owner Contacts</strong>
                  <span className="text-[11px] text-slate-500 leading-snug block">No limits on direct phone calls or WhatsApp messages for 60 days.</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C01E4E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">Zero Brokerage Guarantee</strong>
                  <span className="text-[11px] text-slate-500 leading-snug block">Never pay 1 month rent to brokers. Connect with 100% direct genuine owners.</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#C01E4E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">Upfront House Rules</strong>
                  <span className="text-[11px] text-slate-500 leading-snug block">Non-veg cooking, visitor policy, and max 2-month deposit verified upfront.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {isSubscribedSuccess ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center flex items-center justify-center gap-2 text-emerald-800 font-extrabold text-sm">
              <Check className="w-5 h-5 stroke-[3] text-emerald-600" />
              <span>Bachelor Pass Activated! Unlocking Owner Details...</span>
            </div>
          ) : (
            <button
              onClick={handleActivatePass}
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-[#C01E4E] hover:bg-[#A11840] disabled:bg-slate-300 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-rose-900/20 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>
                {isProcessing ? 'Processing Secure Pass...' : 'Activate 60-Day Bachelor Pass for ₹499'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <p className="text-[11px] text-slate-500 text-center mt-3">
            Instant activation · 100% Money-back guarantee if you face bachelor rejection · Secure 256-bit encrypted
          </p>
        </div>
      </div>
    </div>
  );
}
