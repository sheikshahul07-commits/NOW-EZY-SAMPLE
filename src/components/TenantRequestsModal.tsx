'use client';

import React from 'react';
import { X, Send, Phone, MessageSquare, Clock, CheckCircle2, Home } from 'lucide-react';
import { TenantRequest } from '../types';

interface TenantRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: TenantRequest[];
}

export default function TenantRequestsModal({
  isOpen,
  onClose,
  requests
}: TenantRequestsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C01E4E] text-white flex items-center justify-center shadow-xs">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                My Property Inquiries & Requests
              </h3>
              <p className="text-xs text-slate-500">
                Track status of owner contacts and flat visit requests sent by you.
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

        {/* List of Requests */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {requests.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Home className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold text-slate-700">No Inquiries Sent Yet</p>
              <p className="text-xs text-slate-400">
                Browse bachelor flats and tap &quot;Get Owner Details&quot; to connect directly.
              </p>
            </div>
          ) : (
            requests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-rose-200 transition-all shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#C01E4E] bg-rose-50 px-2 py-0.5 rounded border border-rose-200 inline-block mb-1">
                      {req.propertyLocality}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {req.propertyTitle}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0 self-start sm:self-center">
                    {req.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-500">Owner:</span>
                    <strong className="text-slate-800">{req.ownerName}</strong>
                    <span>({req.ownerPhone})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${req.ownerPhone}`}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Phone className="w-3 h-3 text-[#C01E4E]" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${req.ownerPhone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(req.ownerName)},%20I%20found%20your%20property%20on%20Now%20Ezy.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-bold text-white flex items-center gap-1 cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
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
