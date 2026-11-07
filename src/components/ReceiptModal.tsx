'use client';

import React from 'react';
import { X, CheckCircle2, Download, Printer, ShieldCheck, FileText } from 'lucide-react';
import { PaymentReceipt } from '../types';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt: PaymentReceipt | null;
}

export default function ReceiptModal({
  isOpen,
  onClose,
  receipt
}: ReceiptModalProps) {
  if (!isOpen || !receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200 p-6 sm:p-8 text-left text-slate-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto -mt-2 mb-4 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Invoice Header */}
        <div className="border-b border-slate-200 pb-5 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <img src="/brand/logo.png" alt="Now Ezy" className="h-7 w-auto object-contain" />
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Paid &amp; Active</span>
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-900">
            Official Tax Invoice &amp; Receipt
          </h3>
          <p className="text-xs text-slate-500">
            Receipt Ref: <strong className="text-slate-800 font-mono">{receipt.receiptId}</strong>
          </p>
        </div>

        {/* Details Grid */}
        <div className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block text-[11px]">Billed To:</span>
              <strong className="text-slate-900 block text-xs">{receipt.customerName}</strong>
              <span className="text-slate-600">{receipt.customerPhone}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Payment Mode:</span>
              <strong className="text-slate-900 block text-xs">{receipt.paymentMethod}</strong>
              <span className="text-slate-600 font-mono text-[11px]">{receipt.transactionRef}</span>
            </div>
          </div>

          {/* Line Items */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 p-2.5 font-bold text-slate-700 flex justify-between">
              <span>Description</span>
              <span>Amount</span>
            </div>
            <div className="p-3 border-b border-slate-100 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 block">{receipt.planName}</strong>
                <span className="text-[11px] text-slate-500">Validity: 60 Days (Expires {receipt.validUntil})</span>
              </div>
              <span className="font-mono font-bold text-slate-900">₹{(receipt.amount - receipt.gstAmount).toFixed(2)}</span>
            </div>
            <div className="p-3 border-b border-slate-100 flex justify-between items-center text-slate-600">
              <span>Applicable GST (18%)</span>
              <span className="font-mono">₹{receipt.gstAmount.toFixed(2)}</span>
            </div>
            <div className="p-3 bg-rose-50/50 flex justify-between items-center font-black text-slate-900 text-sm">
              <span>Total Paid</span>
              <span className="font-mono text-[#C01E4E] text-base">₹{receipt.totalPaid.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Now Ezy 100% Genuine Owner Guarantee: Your pass grants unlimited verified landlord contacts with zero brokerage.
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#C01E4E] hover:bg-[#A11840] text-white text-xs font-bold transition-all cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
