'use client';

import React from 'react';
import { Inquiry, Property } from '../types';
import { X, CheckCircle, Clock, Phone, Building, ExternalLink } from 'lucide-react';

interface InquiryListModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: Inquiry[];
  savedProperties: Property[];
  onSelectProperty: (property: Property) => void;
}

export default function InquiryListModal({
  isOpen,
  onClose,
  inquiries,
  savedProperties,
  onSelectProperty
}: InquiryListModalProps) {
  const [activeTab, setActiveTab] = React.useState<'inquiries' | 'saved'>('inquiries');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-[#C01E4E] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              My Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'saved'
                  ? 'bg-[#C01E4E] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Saved Homes ({savedProperties.length})
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-3">
          
          {activeTab === 'inquiries' ? (
            inquiries.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Clock className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="font-bold text-sm text-slate-700">No active inquiries yet.</p>
                <p className="text-xs text-slate-400">Browse verified listings and click &ldquo;Contact Owner&rdquo;.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:border-rose-200 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-bold text-slate-900 text-sm">{inq.propertyTitle}</h4>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        {inq.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl mb-2 border border-slate-100">
                      &ldquo;{inq.message}&rdquo;
                    </p>

                    <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-semibold">
                      <span>Target Move-in: <strong className="text-slate-800">{inq.moveInDate}</strong></span>
                      <span className="text-[#C01E4E] font-bold">Owner Phone: {inq.senderPhone}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            savedProperties.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Building className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="font-bold text-sm text-slate-700">No saved homes.</p>
                <p className="text-xs text-slate-400">Click the heart icon on any card to save it.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {savedProperties.map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => {
                      onSelectProperty(prop);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-[#C01E4E] hover:shadow-xs transition-all cursor-pointer bg-white group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#C01E4E] transition-colors line-clamp-1">
                          {prop.title}
                        </h4>
                        <p className="text-xs text-slate-500">{prop.locality}, {prop.city}</p>
                        <p className="text-xs font-black text-slate-900 mt-0.5">
                          ₹{prop.rent.toLocaleString()}/mo
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#C01E4E] shrink-0" />
                  </div>
                ))}
              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
}
