'use client';

import React from 'react';
import { X, Headphones, Phone, MessageSquare, ShieldCheck, HelpCircle, Mail, Clock } from 'lucide-react';

interface CustomerSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomerSupportModal({
  isOpen,
  onClose
}: CustomerSupportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C01E4E] text-white flex items-center justify-center shadow-xs">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                24/7 Bachelor Support
              </h3>
              <p className="text-xs text-slate-500">
                Dedicated support for Indian bachelors &amp; home owners.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channels */}
        <div className="p-6 space-y-3.5">
          {/* WhatsApp Direct Help */}
          <a
            href="https://wa.me/919845122334?text=Hi%20Now%20Ezy%20Support,%20I%20need%20help%20with%20finding%20a%20bachelor%20home."
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50 flex items-center justify-between transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs sm:text-sm font-extrabold text-slate-900 block group-hover:text-emerald-700 transition-colors">
                  Instant WhatsApp Helpline
                </strong>
                <span className="text-[11px] text-slate-500 block">
                  Typical response time: under 3 minutes
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold shrink-0">
              Chat Now
            </span>
          </a>

          {/* Phone Call Support */}
          <a
            href="tel:+918000112233"
            className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-[#C01E4E] flex items-center justify-between transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C01E4E] border border-rose-200 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs sm:text-sm font-extrabold text-slate-900 block group-hover:text-[#C01E4E] transition-colors">
                  Toll-Free Bachelor Helpline
                </strong>
                <span className="text-[11px] text-slate-500 block">
                  +91 8000 11 22 33 · Available 9 AM - 9 PM
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-slate-100 group-hover:bg-[#C01E4E] group-hover:text-white text-slate-800 text-xs font-bold shrink-0 transition-colors">
              Call
            </span>
          </a>

          {/* Email Support */}
          <a
            href="mailto:support@nowezy.com"
            className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 flex items-center justify-between transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs sm:text-sm font-extrabold text-slate-900 block">
                  Email Support
                </strong>
                <span className="text-[11px] text-slate-500 block">
                  support@nowezy.com · 24-hour turnaround
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold shrink-0">
              Email
            </span>
          </a>

          {/* 0% Rejection Promise Alert */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Facing landlord friction or deposit dispute?</strong> Our bachelor escalation team steps in directly to advocate for you or issue a full refund of your pass.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
