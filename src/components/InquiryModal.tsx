'use client';

import React, { useState } from 'react';
import { Property, FlatmateProfile, Inquiry } from '../types';
import { X, Send, Calendar, Phone, CheckCircle, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProperty: Property | null;
  targetFlatmate: FlatmateProfile | null;
  onSendInquiry: (inquiry: Inquiry) => void;
}

export default function InquiryModal({
  isOpen,
  onClose,
  targetProperty,
  targetFlatmate,
  onSendInquiry
}: InquiryModalProps) {
  const [name, setName] = useState('Rahul Verma');
  const [phone, setPhone] = useState('+91 98765 12345');
  const [email, setEmail] = useState('rahul.verma@example.com');
  const [occupation, setOccupation] = useState('Software Engineer');
  const [moveInDate, setMoveInDate] = useState('2026-11-15');
  const [message, setMessage] = useState(
    'Hi! I saw your listing on Now Ezy. I work nearby and am interested in scheduling a visit this weekend. My bachelor profile is verified.'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const targetTitle = targetProperty ? targetProperty.title : `Connect with ${targetFlatmate?.name}`;
  const targetContact = targetProperty
    ? targetProperty.verifiedOwner.phone
    : (targetFlatmate?.contactPhone || '+91 98765 00000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      propertyId: targetProperty?.id || targetFlatmate?.id || 'general',
      propertyTitle: targetTitle,
      senderName: name,
      senderPhone: phone,
      senderEmail: email,
      occupation,
      moveInDate,
      message,
      status: 'Confirmed',
      createdAt: 'Just now'
    };

    onSendInquiry(newInquiry);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#C01E4E] text-white flex items-center justify-center shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {targetProperty ? 'Contact Property Owner' : 'Connect with Roommate'}
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-xs">{targetTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Banner */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Direct Contact Unlocked!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              The owner has received your verified profile. You can call or WhatsApp them directly:
            </p>
            <p className="text-sm font-black text-[#C01E4E] bg-rose-50 py-2.5 px-4 rounded-xl inline-block border border-rose-200">
              Phone: {targetContact}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 text-[#C01E4E] text-xs font-bold border border-rose-200">
              <ShieldCheck className="w-4 h-4 text-[#C01E4E]" />
              <span>Verified Bachelor Pass Active (0% Rejection Rate)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:ring-2 focus:ring-[#C01E4E]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">WhatsApp / Mobile Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:ring-2 focus:ring-[#C01E4E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Occupation / Company</label>
                <input
                  type="text"
                  required
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:ring-2 focus:ring-[#C01E4E]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Move-in Date</label>
                <input
                  type="date"
                  required
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:ring-2 focus:ring-[#C01E4E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Message to Property Owner
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-[#C01E4E]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#C01E4E] hover:bg-[#9F1239] active:scale-98 text-white font-bold text-sm shadow-md shadow-rose-900/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Unlock Owner Number & Send Request</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
