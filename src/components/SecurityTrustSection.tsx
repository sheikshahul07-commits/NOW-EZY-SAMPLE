'use client';

import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, UserCheck, CheckCircle2 } from 'lucide-react';

export default function SecurityTrustSection() {
  const securityPillars = [
    {
      icon: Lock,
      title: '256-Bit Cryptographic PII Vault',
      description:
        'Phone numbers and personal identifiers are never stored in plain text or rendered into public HTML code. Data is protected with military-grade encryption.',
      badge: 'AES-256 ENCRYPTION'
    },
    {
      icon: EyeOff,
      title: 'Zero-Scraping Perimeter Shield',
      description:
        'Automated web scrapers, crawler bots, and commercial broker scripts are blocked automatically by our rate-limiting AI security firewall.',
      badge: 'ANTI-BOT FIREWALL'
    },
    {
      icon: UserCheck,
      title: 'Audit-Logged Owner Gateway',
      description:
        'Contact numbers are revealed strictly on-demand to verified, logged-in bachelors with an active pass. Every access is recorded in an immutable security audit log.',
      badge: 'VERIFIED REVEAL ONLY'
    },
    {
      icon: Server,
      title: 'Zero Telemarketing & Spam Guarantee',
      description:
        'We never sell, syndicate, or broker your personal information to insurance sellers, loan telemarketers, or unauthorized brokers.',
      badge: 'NO SPAM POLICY'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-900 via-[#0B0F19] to-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      
      {/* Background Matrix & Subtle Gradient Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle, #C01E4E 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#C01E4E]/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-black uppercase tracking-wider mb-4 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-[#FD3752]" />
            <span>Zero-Exposure Data Vault & Anti-Hacking Guard</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            Your Personal Data Is Cryptographically Sealed.{' '}
            <span className="bg-gradient-to-r from-rose-400 via-rose-300 to-white bg-clip-text text-transparent">
              No Hackers. No Data Leaks.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            In traditional real estate portals, landlord and tenant phone numbers are publicly scraped by thousands of spam brokers and telemarketers. Now Ezy’s proprietary Zero-Trust Vault prevents unauthorized data extraction.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-slate-700/70 hover:border-rose-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-rose-950/20 group text-left relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-[#FD3752] mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 mb-2 block">
                    {pillar.badge}
                  </span>

                  <h3 className="text-base font-extrabold text-white mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-normal leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/50 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Enterprise Active Protection</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Trust Banner Bar */}
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5 sm:p-6 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-200 font-bold sm:text-sm">
              Now Ezy Security Engine v2.4 Active
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-slate-400 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-black">✓</span> 0 Plain-Text Phone Exposes
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-black">✓</span> 100% Cryptographic Masking
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-black">✓</span> Zero Broker Scraper Access
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-black">✓</span> 60-Day Bachelor Pass Protected
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
