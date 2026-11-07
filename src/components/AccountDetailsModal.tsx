'use client';

import React, { useState, useRef } from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Zap,
  Camera,
  Check,
  Building,
  Home,
  Upload
} from 'lucide-react';

interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userPhone: string;
  userEmail?: string;
  userAvatar?: string;
  userRole: 'tenant' | 'owner';
  isSubscribed: boolean;
  onOpenSubscription: () => void;
  onUpdateProfile?: (updated: { name: string; email: string; avatar: string }) => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
];

export default function AccountDetailsModal({
  isOpen,
  onClose,
  userName,
  userPhone,
  userEmail = 'rahul.sharma@example.com',
  userAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  userRole,
  isSubscribed,
  onOpenSubscription,
  onUpdateProfile
}: AccountDetailsModalProps) {
  const [name, setName] = useState(userName || 'Rahul Sharma');
  const [email, setEmail] = useState(userEmail || 'rahul.sharma@example.com');
  const [avatar, setAvatar] = useState(userAvatar || PRESET_AVATARS[0]);
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle uploading custom profile picture from device
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
      setIsSaved(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile({
        name: name.trim() || userName,
        email: email.trim(),
        avatar
      });
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-y-auto max-h-[92vh] sm:max-h-[90vh] border-t sm:border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C01E4E] text-white flex items-center justify-center font-black text-sm shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Manage Account &amp; Profile
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Update profile picture, name, and email address
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

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          
          {/* 1. Profile Picture Section (Device Upload + Presets) */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            {/* Current Avatar with change button */}
            <div className="relative group shrink-0">
              <img
                src={avatar}
                alt={name}
                className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-md ring-2 ring-rose-200"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-1.5 bg-[#C01E4E] text-white rounded-full shadow-md hover:bg-[#A11840] transition-transform hover:scale-110 cursor-pointer"
                title="Upload Photo from Device"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-xs font-black text-slate-900">Profile Picture</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-[#C01E4E]">
                  Device Upload &amp; Presets
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2.5">
                Upload your picture or select an avatar preset below:
              </p>

              {/* Preset Avatars Row */}
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                {PRESET_AVATARS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(preset)}
                    className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-transform cursor-pointer ${
                      avatar === preset
                        ? 'border-[#C01E4E] scale-110 ring-2 ring-[#C01E4E]/30'
                        : 'border-slate-200 hover:scale-105'
                    }`}
                  >
                    <img src={preset} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Editable Inputs: Name, Email & Verified Mobile */}
          <div className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setIsSaved(false);
                  }}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 focus:border-[#C01E4E] outline-none"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Email Address (For booking receipts &amp; notifications) *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsSaved(false);
                  }}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 focus:border-[#C01E4E] outline-none"
                  placeholder="e.g. name@company.com"
                />
              </div>
            </div>

            {/* Mobile Number (Verified) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Mobile Number (Verified via OTP)
              </label>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="font-bold text-slate-800">+91 {userPhone || '98765 43210'}</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified</span>
                </span>
              </div>
            </div>

            {/* Registered Account Role Badge */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-600">Account Type</span>
              <span className="px-2.5 py-1 bg-rose-50 text-[#C01E4E] font-black rounded-lg text-xs border border-rose-200 flex items-center gap-1.5">
                {userRole === 'owner' ? (
                  <>
                    <Building className="w-3.5 h-3.5" />
                    <span>Property Owner (Landlord)</span>
                  </>
                ) : (
                  <>
                    <Home className="w-3.5 h-3.5" />
                    <span>House Finding Bachelor</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* 3. Subscription Pass Status */}
          <div className="p-4 bg-gradient-to-br from-rose-50 to-slate-50 rounded-2xl border border-rose-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                <Zap className="w-4 h-4 text-[#C01E4E] fill-current" />
                <span>Now Ezy 60-Day Bachelor Pass</span>
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                isSubscribed
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {isSubscribed ? 'Active · 58 Days Remaining' : 'Inactive'}
              </span>
            </div>

            <p className="text-[11px] text-slate-600 leading-snug mb-3">
              {isSubscribed
                ? 'Unlimited direct owner phone calls & WhatsApp access active with 0% rejection guarantee.'
                : 'Unlock unlimited verified homeowner phone numbers with our single 2-month subscription.'}
            </p>

            {!isSubscribed && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSubscription();
                }}
                className="w-full py-2.5 rounded-xl bg-[#C01E4E] hover:bg-[#A11840] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Activate 60-Day Pass for ₹499
              </button>
            )}
          </div>

          {/* Submit / Save Button */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <span className="text-xs text-emerald-700 font-bold">
              {isSaved ? '✓ Profile changes saved successfully!' : ''}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#C01E4E] hover:bg-[#A11840] text-white font-black text-xs shadow-xs transition-all active:scale-97 cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}