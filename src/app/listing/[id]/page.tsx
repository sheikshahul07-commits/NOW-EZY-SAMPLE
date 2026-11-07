'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { INITIAL_PROPERTIES } from '../../../data/mockData';
import { Property } from '../../../types';
import LoginModal from '../../../components/LoginModal';
import SubscriptionModal from '../../../components/SubscriptionModal';
import Footer from '../../../components/Footer';
import ScrollProgressBar from '../../../components/ScrollProgressBar';
import {
  MapPin,
  ArrowLeft,
  Heart,
  ShieldCheck,
  Check,
  Sofa,
  Home,
  Users,
  Calendar,
  Clock,
  Sparkles,
  Phone,
  Award,
  Video
} from 'lucide-react';

function ListingContent() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;

  const [property, setProperty] = useState<Property | null>(() => {
    return INITIAL_PROPERTIES.find((p) => p.id === propertyId) || INITIAL_PROPERTIES[0];
  });
  const [activePhoto, setActivePhoto] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [unlockedPhone, setUnlockedPhone] = useState<string | null>(null);

  const handleGetOwnerDetailsClick = () => {
    if (!property) return;
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else if (!isSubscribed) {
      setIsSubscriptionModalOpen(true);
    } else {
      setUnlockedPhone(property.verifiedOwner.phone);
    }
  };

  useEffect(() => {
    let sourceProperties = INITIAL_PROPERTIES;
    try {
      const saved = localStorage.getItem('nowezy_properties_inventory_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          sourceProperties = parsed;
        }
      }
      const savedSession = localStorage.getItem('nowezy_user_session_v2');
      if (savedSession) {
        const sess = JSON.parse(savedSession);
        if (sess.isLoggedIn) {
          setIsLoggedIn(true);
          if (sess.isSubscribed) {
            setIsSubscribed(true);
          }
        }
      }
    } catch (e) {}

    const found = sourceProperties.find((p) => p.id === propertyId) || INITIAL_PROPERTIES[0];
    setProperty(found);
  }, [propertyId]);

  useEffect(() => {
    if (isSubscribed && property) {
      setUnlockedPhone(property.verifiedOwner.phone);
    }
  }, [isSubscribed, property]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F8] font-sans">
        <p className="text-slate-500 font-bold">Loading property details...</p>
      </div>
    );
  }

  const builtupSqft = property.propertyType.includes('3BHK')
    ? 1450
    : property.propertyType.includes('2BHK')
    ? 1050
    : property.propertyType.includes('1BHK')
    ? 650
    : 450;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1D1E2C] font-sans">
      
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Top Header with Clean Logo & Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Back to all homes"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Logo (Click/Touch brings to Home) */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                router.push('/');
              }}
              className="cursor-pointer group flex items-center py-1 transition-transform active:scale-95 shrink-0"
              title="Now Ezy — Return to Home"
            >
              <img
                src="/brand/logo.png"
                alt="now ezy"
                className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              0% Bachelor Rejection Guaranteed
            </span>
            <button
              onClick={handleGetOwnerDetailsClick}
              className="bg-[#FD3752] hover:bg-[#E02640] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition-all active:scale-97"
            >
              Get Owner Details
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-8">
        
        {/* VERY GOOD CHOICE GREETING BANNER */}
        <div className="bg-gradient-to-r from-rose-50 via-rose-100/50 to-emerald-50 p-4 rounded-2xl border border-rose-200 mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C01E4E] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                Very Good Choice!
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Verified Bachelor Friendly · 0% Rejection Guaranteed · Zero Brokerage
              </p>
            </div>
          </div>

          <span className="text-xs font-black text-emerald-800 bg-white px-3 py-1 rounded-xl border border-emerald-200 shadow-2xs">
            100% Match to Your Requirement
          </span>
        </div>

        {/* Title & Location Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold bg-rose-50 text-[#C01E4E] px-2.5 py-0.5 rounded-md border border-rose-200">
                  {property.propertyType}
                </span>
                <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Bachelor Friendly
                </span>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  {property.occupancy || 'Any Bachelor'}
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-snug">
                {property.title} in {property.locality}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mt-2 font-medium">
                <MapPin className="w-4 h-4 text-[#C01E4E] shrink-0" />
                <span>{property.street ? `${property.street}, ` : ''}{property.locality}, {property.city} ({property.pincode})</span>
                <span>•</span>
                <span className="text-slate-400">{property.distanceToHub}</span>
              </div>

              {/* 4 Trust Verification Badges */}
              {property.verification && (
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                  {property.verification.idVerified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      <Check className="w-3 h-3 text-emerald-600" /> ID Verified
                    </span>
                  )}
                  {property.verification.ownershipConfirmed && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      <Check className="w-3 h-3 text-emerald-600" /> Ownership Confirmed
                    </span>
                  )}
                  {property.verification.physicallyInspected && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      <Check className="w-3 h-3 text-emerald-600" /> Physical Inspection
                    </span>
                  )}
                  {property.verification.lastAvailabilityCheck && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                      <Clock className="w-3 h-3 text-slate-400" /> {property.verification.lastAvailabilityCheck}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-rose-50 border-rose-200 text-[#C01E4E]'
                    : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
                title="Save Property"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current text-[#C01E4E]' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Photos & Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Photo Gallery Showcase */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-slate-100 mb-3">
                <img
                  src={property.images[activePhoto] || property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md text-white text-xs font-bold">
                  {activePhoto + 1} / {property.images.length} Photos
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhoto(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activePhoto === idx ? 'border-[#C01E4E] scale-96' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Video Walkthrough Showcase */}
            {property.videoUrl && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-[#C01E4E]" />
                    <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                      Verified Video Walkthrough
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#C01E4E] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    Direct Video Tour
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden bg-black aspect-video shadow-inner">
                  <video
                    src={property.videoUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* 3 Metric Columns: Rent, Deposit, Builtup */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs grid grid-cols-3 gap-3 text-center">
              <div className="border-r border-slate-100">
                <p className="text-xl sm:text-2xl font-black text-slate-900">
                  ₹ {property.rent.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 font-medium">+ {property.maintenance} maintenance</p>
                <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mt-1">Rent</p>
              </div>

              <div className="border-r border-slate-100">
                <p className="text-xl sm:text-2xl font-black text-slate-900">
                  ₹ {property.deposit.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-700 font-bold">Max 2 Mos Capped</p>
                <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mt-1">Deposit</p>
              </div>

              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">
                  {builtupSqft} sqft
                </p>
                <p className="text-xs text-slate-500 font-medium">Carpet Area</p>
                <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mt-1">Builtup</p>
              </div>
            </div>

            {/* Crucial Bachelor Policy Matrix */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C01E4E]" />
                  <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                    Official Bachelor Policy Card
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Owner Signed
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 text-[11px] block mb-1 font-semibold">Non-Veg Food</span>
                  <strong className="text-slate-900 font-bold block text-sm">
                    {property.bachelorRules.nonVegAllowed ? 'Allowed' : 'Veg Only'}
                  </strong>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 text-[11px] block mb-1 font-semibold">Gate / Curfew Rule</span>
                  <strong className="text-slate-900 font-bold block text-sm">
                    {property.bachelorRules.curfew}
                  </strong>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 text-[11px] block mb-1 font-semibold">Overnight Guests</span>
                  <strong className="text-slate-900 font-bold block text-sm">
                    {property.bachelorRules.overnightGuests}
                  </strong>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 text-[11px] block mb-1 font-semibold">Brokerage Fee</span>
                  <strong className="text-emerald-700 font-bold block text-sm">
                    ₹0 (Zero)
                  </strong>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-3">
                Property Overview & Society Rules
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-4">
                Amenities & Features
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-800 border border-slate-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Contact Owner Card */}
          <div className="space-y-6">
            
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md space-y-5">
              
              <div className="pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Monthly Rent
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-900">
                    ₹ {property.rent.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">+ {property.maintenance} Maint.</span>
                </div>
              </div>

              {/* Owner Details Profile */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <img
                  src={property.verifiedOwner.avatar}
                  alt={property.verifiedOwner.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <p className="font-bold text-sm text-slate-900">{property.verifiedOwner.name}</p>
                  <p className="text-xs text-emerald-700 font-semibold">Verified Owner · 0% Rejection</p>
                </div>
              </div>

              {/* Contact Button */}
              {unlockedPhone ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mb-1">
                      Direct Owner Unlocked
                    </span>
                    <p className="text-xs text-slate-600 font-semibold">Verified Owner Number:</p>
                    <p className="text-xl font-black text-slate-900 mt-0.5">{unlockedPhone}</p>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`tel:${unlockedPhone}`}
                      className="flex-1 py-2.5 rounded-xl bg-[#C01E4E] hover:bg-[#A11840] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={`https://wa.me/${unlockedPhone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(property.verifiedOwner.name)},%20I%20saw%20your%20property%20on%20Now%20Ezy.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleGetOwnerDetailsClick}
                  className="w-full py-4 bg-[#C01E4E] hover:bg-[#A11840] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-rose-900/20 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Get Owner Details (0% Brokerage)</span>
                </button>
              )}

              {/* Genuine Owner Guarantee Checklist */}
              <ul className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Genuine Owner, No Broker</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>0% Rejection for Bachelors</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Deposit capped at max 2 months</span>
                </li>
              </ul>

            </div>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <Footer />

      {/* STICKY BOTTOM ENQUIRY ACTION BAR FOR MOBILE (1-Thumb Touch) */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 sm:hidden z-30 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Monthly Rent</div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-slate-900">₹{property.rent.toLocaleString()}</span>
            <span className="text-[11px] text-slate-500 font-medium">/mo</span>
          </div>
        </div>

        {unlockedPhone ? (
          <div className="flex items-center gap-2">
            <a
              href={`tel:${unlockedPhone}`}
              className="px-4 py-2.5 rounded-xl bg-[#C01E4E] active:bg-[#A11840] text-white text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
            <a
              href={`https://wa.me/${unlockedPhone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(property.verifiedOwner.name)},%20I%20saw%20your%20property%20on%20Now%20Ezy.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white text-xs font-black shadow-md"
            >
              WhatsApp
            </a>
          </div>
        ) : (
          <button
            onClick={handleGetOwnerDetailsClick}
            className="px-5 py-2.5 bg-[#C01E4E] active:bg-[#A11840] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer active:scale-97 flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact Owner</span>
          </button>
        )}
      </div>

      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        targetProperty={property}
        intent="contact_owner"
        onSuccess={(phone) => {
          setIsLoggedIn(true);
          setIsLoginModalOpen(false);
          if (!isSubscribed) {
            setIsSubscriptionModalOpen(true);
          } else {
            setUnlockedPhone(property.verifiedOwner.phone);
          }
        }}
      />

      {/* 60-DAY BACHELOR PASS SUBSCRIPTION MODAL */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        targetProperty={property}
        onSubscribeSuccess={(receipt) => {
          setIsSubscribed(true);
          setIsSubscriptionModalOpen(false);
          setUnlockedPhone(property.verifiedOwner.phone);
          try {
            const current = localStorage.getItem('nowezy_user_session_v2');
            const base = current ? JSON.parse(current) : {};
            localStorage.setItem('nowezy_user_session_v2', JSON.stringify({ ...base, isLoggedIn: true, isSubscribed: true }));
            if (receipt) localStorage.setItem('nowezy_user_receipt_v2', JSON.stringify(receipt));
          } catch (e) {}
        }}
      />

    </div>
  );
}

export default function ListingDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F8] font-sans">
        <p className="text-slate-500 font-bold">Loading Now Ezy Listing...</p>
      </div>
    }>
      <ListingContent />
    </Suspense>
  );
}
