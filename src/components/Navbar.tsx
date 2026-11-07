'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  MapPin,
  Plus,
  Menu,
  Navigation,
  Sparkles,
  User,
  Send,
  Headphones,
  Building,
  Bell,
  LogOut,
  Zap,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  MoreVertical,
  FileText
} from 'lucide-react';
import CitySelectorModal from './CitySelectorModal';
import MobileHeader from './MobileHeader';
import { AreaSuggestion } from '../types';

interface NavbarProps {
  activeTab: 'homes' | 'map' | 'flatmates';
  setActiveTab: (tab: 'homes' | 'map' | 'flatmates') => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  onOpenListFlow: () => void;
  onOpenLogin: () => void;
  userName?: string;
  userAvatar?: string;
  isLoggedIn?: boolean;
  userRole?: 'tenant' | 'owner';
  isSubscribed?: boolean;
  requestsSentCount?: number;
  incomingInquiriesCount?: number;
  onOpenManageAccount?: () => void;
  onOpenRequestsSent?: () => void;
  onOpenCustomerSupport?: () => void;
  onOpenOwnerPortal?: () => void;
  onOpenSubscription?: () => void;
  onOpenReceipt?: () => void;
  onToggleRole?: () => void;
  onLogout?: () => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSelectArea?: (area: AreaSuggestion) => void;
  onOpenSaved?: () => void;
  savedCount?: number;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  onOpenListFlow,
  onOpenLogin,
  userName = 'Rahul Sharma',
  userAvatar,
  isLoggedIn = false,
  userRole = 'tenant',
  isSubscribed = false,
  requestsSentCount = 3,
  incomingInquiriesCount = 8,
  onOpenManageAccount,
  onOpenRequestsSent,
  onOpenCustomerSupport,
  onOpenOwnerPortal,
  onOpenSubscription,
  onOpenReceipt,
  onToggleRole,
  onLogout,
  searchQuery,
  setSearchQuery,
  onSelectArea,
  onOpenSaved,
  savedCount
}: NavbarProps) {
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdown menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab('homes');
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* 1. COMPACT PROFESSIONAL MOBILE HEADER (Magicbricks Inspired Layout + Now Ezy Brand Identity) */}
      <MobileHeader
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        searchQuery={searchQuery || ''}
        setSearchQuery={setSearchQuery || (() => {})}
        onSelectArea={onSelectArea || (() => {})}
        onOpenRadar={() => {
          setActiveTab('map');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenRoommates={() => {
          setActiveTab('flatmates');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSaved={onOpenSaved || (() => {
          const el = document.getElementById('bachelor-listings-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        })}
        onOpenMyAccount={isLoggedIn ? (onOpenManageAccount || (() => {})) : onOpenLogin}
        onOpenListFlow={onOpenListFlow}
        onOpenNotifications={onOpenRequestsSent || (() => {})}
        onOpenSupport={onOpenCustomerSupport || (() => {})}
        onOpenReceipt={onOpenReceipt}
        onToggleRole={onToggleRole}
        onLogout={onLogout}
        savedCount={savedCount || 0}
        unreadNotificationsCount={requestsSentCount}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        currentUser={isLoggedIn ? { name: userName, avatar: userAvatar } : null}
      />

      {/* 2. DESKTOP FLOATING MENU BAR (Hidden on Mobile, 100% Intact on Desktop) */}
      <header
        className={`hidden md:block sticky top-0 z-40 transition-all duration-150 ease-out ${
          isScrolled
            ? 'pt-2.5 sm:pt-3 px-3 sm:px-6 pointer-events-none'
            : 'pt-2 pb-2 px-4 sm:px-8 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs'
        }`}
      >
        <div
          className={`transition-all duration-150 ease-out will-change-transform ${
            isScrolled
              ? 'pointer-events-auto max-w-6xl mx-auto rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 ring-1 ring-black/5 px-4 sm:px-6 py-2'
              : 'max-w-7xl mx-auto w-full'
          }`}
        >
          <div className="flex items-center justify-between h-13 sm:h-14">
            
            {/* Left: Prominent Logo & City Selector */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              
              {/* Logo (Touch/Click brings to Home) */}
              <a
                href="/"
                onClick={handleLogoClick}
                className="flex items-center group cursor-pointer py-1 transition-transform active:scale-95 shrink-0"
                title="Now Ezy — Return to Home"
                aria-label="Now Ezy Home"
              >
                <img
                  src="/brand/logo.png"
                  alt="now ezy"
                  className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-102"
                />
              </a>

              {/* City Selector Pill */}
              <button
                type="button"
                onClick={() => setIsCityModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 bg-slate-50/90 hover:bg-slate-100 transition-colors text-xs font-bold text-slate-800 cursor-pointer shrink-0"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C01E4E]" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

            </div>

            {/* Center Navigation Links */}
            <nav className="hidden md:flex items-center gap-5 sm:gap-6 text-xs sm:text-sm font-bold text-slate-700">
              <button
                onClick={() => {
                  setActiveTab('homes');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`transition-colors cursor-pointer py-1 ${
                  activeTab === 'homes' ? 'text-[#C01E4E] font-black' : 'hover:text-slate-900'
                }`}
              >
                Browse Homes
              </button>

              {/* HIGHLIGHTED NOW EZY RADAR LINK */}
              <button
                onClick={() => {
                  setActiveTab('map');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === 'map'
                    ? 'bg-[#C01E4E] text-white font-black shadow-xs'
                    : 'bg-rose-50/90 text-[#C01E4E] hover:bg-rose-100 border border-rose-200/80'
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeTab === 'map' ? 'bg-white' : 'bg-[#C01E4E]'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${activeTab === 'map' ? 'bg-white' : 'bg-[#C01E4E]'}`}></span>
                </span>
                <Navigation className="w-3.5 h-3.5" />
                <span>Now Ezy Radar</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('flatmates');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`transition-colors cursor-pointer py-1 ${
                  activeTab === 'flatmates' ? 'text-[#C01E4E] font-black' : 'hover:text-slate-900'
                }`}
              >
                Roommates
              </button>
            </nav>

            {/* Right Action Buttons & 3-Dots User Menu */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative" ref={menuRef}>
              
              {/* POST PROPERTY FREE BUTTON */}
              <button
                type="button"
                onClick={onOpenListFlow}
                className="flex items-center gap-1 bg-[#C01E4E] hover:bg-[#A11840] text-white text-xs sm:text-sm font-extrabold px-3.5 sm:px-4 py-2 rounded-full shadow-xs transition-all active:scale-97 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Post Property</span>
                <span className="bg-white text-[#C01E4E] text-[9px] uppercase font-black px-1.5 py-0.2 rounded-full ml-0.5">
                  FREE
                </span>
              </button>

              {/* LOGIN OR 3-DOTS USER MENU BUTTON */}
              {!isLoggedIn ? (
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold text-slate-800 shadow-2xs transition-all cursor-pointer"
                >
                  <span>Login</span>
                  <Menu className="w-3.5 h-3.5 text-slate-500" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-1.5 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-slate-800 shadow-2xs transition-all cursor-pointer group"
                >
                  {userAvatar ? (
                    <img src={userAvatar} alt={userName} className="w-6 h-6 rounded-full object-cover shrink-0 border border-slate-200" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#C01E4E] text-white text-[10px] font-black flex items-center justify-center shrink-0">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[90px] truncate">{userName.split(' ')[0]}</span>
                  <MoreVertical className="w-4 h-4 text-slate-500 group-hover:text-[#C01E4E] transition-colors" />
                </button>
              )}

              {/* 3-DOTS USER DROPDOWN MENU (Requested: Manage Account, Requests, Support, Manage Property) */}
              {isLoggedIn && isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  
                  {/* User Profile Summary */}
                  <div className="p-4 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      {userAvatar ? (
                        <img src={userAvatar} alt={userName} className="w-10 h-10 rounded-full object-cover border-2 border-rose-100 shrink-0 shadow-2xs" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#C01E4E] text-white font-black text-sm flex items-center justify-center shrink-0">
                          {userName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <strong className="text-xs font-black text-slate-900 block truncate">
                          {userName}
                        </strong>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-50 text-[#C01E4E] border border-rose-200 inline-block mt-0.5">
                          {userRole === 'owner' ? 'Property Owner' : 'Bachelor Tenant'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options Based on Role */}
                  <div className="p-2 space-y-1 text-xs font-bold text-slate-700">
                    
                    {/* TENANT OPTIONS */}
                    {userRole === 'tenant' && (
                      <>
                        {/* Manage Account */}
                        <button
                          type="button"
                          onClick={() => {
                            setIsMenuOpen(false);
                            onOpenManageAccount?.();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left cursor-pointer"
                        >
                          <User className="w-4 h-4 text-slate-500" />
                          <span>Manage Account &amp; Profile</span>
                        </button>

                        {/* Requests Sent Tracker */}
                        <button
                          type="button"
                          onClick={() => {
                            setIsMenuOpen(false);
                            onOpenRequestsSent?.();
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <Send className="w-4 h-4 text-slate-500" />
                            <span>Requests Sent for Properties</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C01E4E] text-[10px] font-black border border-rose-200">
                            {requestsSentCount}
                          </span>
                        </button>

                        {/* Subscription Status */}
                        <button
                          type="button"
                          onClick={() => {
                            setIsMenuOpen(false);
                            onOpenSubscription?.();
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-rose-50 transition-colors text-left cursor-pointer text-[#C01E4E]"
                        >
                          <div className="flex items-center gap-2.5">
                            <Zap className="w-4 h-4 fill-current" />
                            <span>60-Day Bachelor Pass</span>
                          </div>
                          <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {isSubscribed ? 'Active' : 'Upgrade'}
                          </span>
                        </button>

                        {/* View Tax Invoice & Receipt if Subscribed */}
                        {isSubscribed && onOpenReceipt && (
                          <button
                            type="button"
                            onClick={() => {
                              setIsMenuOpen(false);
                              onOpenReceipt();
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors text-left cursor-pointer text-slate-700 font-bold"
                          >
                            <FileText className="w-4 h-4 text-emerald-600" />
                            <span>View Tax Invoice &amp; Receipt</span>
                          </button>
                        )}
                      </>
                    )}

                    {/* OWNER OPTIONS */}
                    {userRole === 'owner' && (
                      <>
                        {/* Manage Listed Properties */}
                        <button
                          type="button"
                          onClick={() => {
                            setIsMenuOpen(false);
                            onOpenOwnerPortal?.();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left cursor-pointer text-[#C01E4E]"
                        >
                          <Building className="w-4 h-4 text-[#C01E4E]" />
                          <span>Manage Listed Properties</span>
                        </button>

                        {/* Notifications of Inquiries Received */}
                        <button
                          type="button"
                          onClick={() => {
                            setIsMenuOpen(false);
                            onOpenOwnerPortal?.();
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <Bell className="w-4 h-4 text-slate-500" />
                            <span>Tenant Inquiries Received</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                            {incomingInquiriesCount} New
                          </span>
                        </button>

                        {/* Post Another Property */}
                        <button
                          type="button"
                          onClick={() => {
                            setIsMenuOpen(false);
                            onOpenListFlow();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left cursor-pointer"
                        >
                          <Plus className="w-4 h-4 text-slate-500" />
                          <span>Post Another Property FREE</span>
                        </button>
                      </>
                    )}

                    {/* Customer Support (For all) */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenCustomerSupport?.();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left cursor-pointer border-t border-slate-100 pt-2"
                    >
                      <Headphones className="w-4 h-4 text-slate-500" />
                      <span>24/7 Bachelor Support</span>
                    </button>

                    {/* Log Out */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onLogout?.();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-rose-50 text-slate-600 hover:text-[#C01E4E] transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

          {/* Mobile Quick Navigation Strip */}
          <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs font-bold text-slate-700">
            <button
              onClick={() => {
                setActiveTab('homes');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`py-1 px-3 rounded-full ${
                activeTab === 'homes' ? 'bg-rose-50 text-[#C01E4E]' : ''
              }`}
            >
              Browse Homes
            </button>
            <button
              onClick={() => {
                setActiveTab('map');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1 py-1 px-3 rounded-full ${
                activeTab === 'map' ? 'bg-[#C01E4E] text-white' : 'text-[#C01E4E] font-bold'
              }`}
            >
              <Navigation className="w-3 h-3" />
              <span>Now Ezy Radar</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('flatmates');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`py-1 px-3 rounded-full ${
                activeTab === 'flatmates' ? 'bg-rose-50 text-[#C01E4E]' : ''
              }`}
            >
              Roommates
            </button>
          </div>

        </div>
      </header>

      {/* City Selector Modal Popover */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(city) => setSelectedCity(city)}
      />
    </>
  );
}
