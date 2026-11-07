'use client';

import React from 'react';
import { BachelorRules } from '../types';
import { Clock, Users, Utensils, ShieldCheck, Banknote, Check } from 'lucide-react';

interface Props {
  rules: BachelorRules;
  compact?: boolean;
}

export default function BachelorRuleBadge({ rules, compact = false }: Props) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-1.5 text-xs">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
          <Check className="w-3 h-3 text-emerald-600" />
          {rules.nonVegAllowed ? 'Non-Veg Allowed' : 'Veg Only'}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold border border-slate-200">
          <Clock className="w-3 h-3 text-slate-600" />
          {rules.curfew}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-rose-50 text-[#C01E4E] font-semibold border border-rose-200">
          <Users className="w-3 h-3 text-[#C01E4E]" />
          Guests: {rules.overnightGuests}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold border border-slate-200">
          <Banknote className="w-3 h-3 text-slate-600" />
          {rules.brokerage}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 my-3">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-rose-100 text-[#C01E4E] rounded-lg">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 text-sm">
            Official Bachelor House Rules Matrix
          </span>
        </div>
        <span className="text-xs px-2.5 py-0.5 bg-[#C01E4E] text-white rounded-full font-bold">
          Verified Owner Pledge
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 text-[11px] block mb-1">Non-Veg Food</span>
          <p className="font-bold text-slate-900">
            {rules.nonVegAllowed ? 'Allowed' : 'Veg Only'}
          </p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 text-[11px] block mb-1">Curfew / Gate Rule</span>
          <p className="font-bold text-slate-900">{rules.curfew}</p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 text-[11px] block mb-1">Overnight Guests</span>
          <p className="font-bold text-slate-900">{rules.overnightGuests}</p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 text-[11px] block mb-1">Security Deposit</span>
          <p className="font-bold text-slate-900">{rules.depositMonths} Months Max</p>
        </div>
      </div>
    </div>
  );
}
