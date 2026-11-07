'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  Phone,
  User,
  Building,
  Home
} from 'lucide-react';
import { Property, UserRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProperty?: Property | null;
  intent?: 'post_property' | 'view_property' | 'contact_owner' | 'general';
  onSuccess: (phone: string, name?: string, role?: UserRole) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  targetProperty,
  intent = 'general',
  onSuccess
}: LoginModalProps) {
  const [tab, setTab] = useState<'signup' | 'login'>(intent === 'post_property' ? 'signup' : 'login');
  
  // Sign up fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>(intent === 'post_property' ? 'owner' : 'tenant');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Login fields
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // OTP step state
  const [step, setStep] = useState<'form' | 'otp' | 'google_loading'>('form');
  const [otp, setOtp] = useState(['4', '2', '8', '9']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Handle Sign Up Submission -> Trigger OTP
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (password.length < 4) {
      alert('Password must be at least 4 characters long.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
    }, 400);
  };

  // Handle Login Submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = loginPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter your 10-digit mobile number.');
      return;
    }
    if (!loginPassword) {
      alert('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Auto-detect role or default
      const assignedRole: UserRole = intent === 'post_property' ? 'owner' : 'tenant';
      onSuccess(cleanPhone, 'Rahul Sharma', assignedRole);
    }, 500);
  };

  // Google 1-Click Fast Connect
  const handleGoogleLogin = () => {
    setStep('google_loading');
    setTimeout(() => {
      const googleRole: UserRole = intent === 'post_property' ? 'owner' : role;
      onSuccess('9876543210', 'Rahul Sharma (Google)', googleRole);
    }, 600);
  };

  // Confirm 4-Digit OTP
  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const cleanPhone = phone.replace(/\D/g, '') || '9876543210';
      onSuccess(cleanPhone, name.trim(), role);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200 overflow-y-auto max-h-[92vh] sm:max-h-[90vh] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto -mt-2 mb-4 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {tab === 'signup' ? 'Create Your Account' : 'Log in to Now Ezy'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {tab === 'signup' 
              ? 'Join India’s 1st dedicated bachelor & verified owner network.' 
              : 'Enter your mobile number and password to access your dashboard & chats.'}
          </p>
          {targetProperty && (
            <div className="mt-2.5 p-2.5 bg-rose-50/80 border border-rose-200 rounded-xl text-xs">
              <span className="text-slate-500 block text-[11px] font-semibold">Action requires account:</span>
              <strong className="text-slate-900 line-clamp-1">{targetProperty.title}</strong>
            </div>
          )}
        </div>

        {/* TABS: SIGN UP FOR NEW MEMBERS vs LOGIN FOR EXISTING USERS */}
        {step === 'form' && (
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl mb-5">
            <button
              type="button"
              onClick={() => setTab('signup')}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                tab === 'signup'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign Up (New Member)
            </button>
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                tab === 'login'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Log In (Existing User)
            </button>
          </div>
        )}

        {/* STEP 1: FORM VIEW */}
        {step === 'form' && (
          <div>
            {/* SIGN UP FORM (Asks Name, Mobile Number, Role, Create Password, OTP) */}
            {tab === 'signup' ? (
              <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
                {/* 1. Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 focus:border-[#C01E4E] outline-none"
                    />
                  </div>
                </div>

                {/* 2. Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Mobile Number (For OTP verification) *
                  </label>
                  <div className="flex rounded-xl border border-slate-300 focus-within:border-[#C01E4E] overflow-hidden">
                    <span className="px-3 py-2.5 bg-slate-50 border-r border-slate-200 text-xs font-bold text-slate-700">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="Enter 10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 outline-none"
                    />
                  </div>
                </div>

                {/* 3. Role Selection Column (Explicit user requirement) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    I am registering as: *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      data-role-selector="tenant"
                      onClick={() => setRole('tenant')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                        role === 'tenant'
                          ? 'border-[#C01E4E] bg-rose-50 text-[#C01E4E] font-black shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 font-semibold'
                      }`}
                    >
                      <Home className="w-4 h-4 shrink-0 text-[#C01E4E]" />
                      <div className="leading-tight">
                        <span className="text-xs block">Bachelor</span>
                        <span className="text-[10px] text-slate-400 font-normal">Finding Home</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      data-role-selector="owner"
                      onClick={() => setRole('owner')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                        role === 'owner'
                          ? 'border-[#C01E4E] bg-rose-50 text-[#C01E4E] font-black shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 font-semibold'
                      }`}
                    >
                      <Building className="w-4 h-4 shrink-0 text-[#C01E4E]" />
                      <div className="leading-tight">
                        <span className="text-xs block">Property Owner</span>
                        <span className="text-[10px] text-slate-400 font-normal">Listing Home</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 4. Create Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Create Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Minimum 4 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 focus:border-[#C01E4E] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Sign Up Button */}
                <button
                  type="button"
                  onClick={handleSignUpSubmit}
                  disabled={isSubmitting || phone.length < 10}
                  className="w-full py-3.5 rounded-full bg-[#C01E4E] hover:bg-[#A11840] disabled:bg-slate-300 text-white font-extrabold text-sm shadow-md transition-all active:scale-98 cursor-pointer mt-2"
                >
                  {isSubmitting ? 'Sending OTP...' : 'Sign Up & Send Mobile OTP'}
                </button>
              </form>
            ) : (
              /* LOGIN FORM (Mobile Number + Password) */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* 1. Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Registered Mobile Number
                  </label>
                  <div className="flex rounded-xl border border-slate-300 focus-within:border-[#C01E4E] overflow-hidden">
                    <span className="px-3 py-2.5 bg-slate-50 border-r border-slate-200 text-xs font-bold text-slate-700">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="Enter 10-digit mobile number"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 outline-none"
                      autoFocus
                    />
                  </div>
                </div>

                {/* 2. Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-800">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Demo recovery: Use password "1234" or login via Google 1-Click.')}
                      className="text-[11px] font-bold text-[#C01E4E] hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter your account password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 focus:border-[#C01E4E] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || loginPhone.length < 10}
                  className="w-full py-3.5 rounded-full bg-[#111827] hover:bg-black disabled:bg-slate-300 text-white font-extrabold text-sm shadow-md transition-all active:scale-98 cursor-pointer mt-2"
                >
                  {isSubmitting ? 'Logging In...' : 'Log In to Account'}
                </button>
              </form>
            )}

            {/* "or" Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs font-medium text-slate-400">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Google One-Click Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 shadow-2xs transition-all active:scale-98 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Disclaimer */}
            <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-3">
              By registering, you agree to Now Ezy&apos;s Terms &amp; 0% Bachelor Discrimination Guarantee.
            </p>
          </div>
        )}

        {/* STEP 2: GOOGLE CONNECTING SIMULATION */}
        {step === 'google_loading' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-3 border-[#C01E4E] border-t-transparent animate-spin mx-auto" />
            <h4 className="text-base font-extrabold text-slate-900">
              Connecting with Google Account...
            </h4>
            <p className="text-xs text-slate-500">
              Verified bachelor credentials imported automatically.
            </p>
          </div>
        )}

        {/* STEP 3: OTP VERIFICATION */}
        {step === 'otp' && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <div>
              <h4 className="text-lg font-black text-slate-900 mb-1">
                Verify 4-Digit Mobile OTP
              </h4>
              <p className="text-xs text-slate-500">
                Code sent to <strong className="text-slate-800">+91 {phone}</strong> ·{' '}
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="text-[#C01E4E] font-bold hover:underline"
                >
                  Edit details
                </button>
              </p>
            </div>

            {/* 4 OTP Digit Boxes */}
            <div className="flex items-center justify-center gap-3 py-2">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  id={`reg-otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={otp[idx]}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    const newOtp = [...otp];
                    newOtp[idx] = val;
                    setOtp(newOtp);
                    if (val && idx < 3) {
                      document.getElementById(`reg-otp-${idx + 1}`)?.focus();
                    }
                  }}
                  className="w-12 h-13 text-center text-xl font-black text-slate-900 border-2 border-slate-300 rounded-xl focus:border-[#C01E4E] focus:outline-none"
                />
              ))}
            </div>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center text-xs text-[#C01E4E] font-bold">
              Auto-fill demo code: <strong>4 2 8 9</strong>
            </div>

            <button
              type="button"
              onClick={handleOtpVerify}
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#C01E4E] hover:bg-[#A11840] text-white font-extrabold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
            >
              {isSubmitting ? 'Verifying Account...' : 'Complete Sign Up'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
