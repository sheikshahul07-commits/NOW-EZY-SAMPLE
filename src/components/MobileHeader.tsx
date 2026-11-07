'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  Bell,
  User,
  Plus,
  Search,
  MapPin,
  LocateFixed,
  Navigation,
  Users,
  Heart,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Send,
  Headphones,
  FileText,
  RefreshCw,
  LogOut,
  Building
} from 'lucide-react';
import { AreaSuggestion } from '../types';
import { getSuggestionsForQuery, MAJOR_AREA_SUGGESTIONS } from '../data/areas';
import { ALL_INDIAN_LOCATIONS } from '../data/indianLocations';

interface MobileHeaderProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectArea: (area: AreaSuggestion) => void;
  onOpenRadar: () => void;
  onOpenRoommates: () => void;
  onOpenSaved: () => void;
  onOpenMyAccount: () => void;
  onOpenListFlow: () => void;
  onOpenNotifications: () => void;
  onOpenSupport: () => void;
  onOpenReceipt?: () => void;
  onToggleRole?: () => void;
  onLogout?: () => void;
  savedCount: number;
  unreadNotificationsCount?: number;
  isLoggedIn: boolean;
  userRole?: 'tenant' | 'owner';
  currentUser: { name: string; avatar?: string; phone?: string; email?: string } | null;
}

export default function MobileHeader({
  selectedCity,
  setSelectedCity,
  searchQuery,
  setSearchQuery,
  onSelectArea,
  onOpenRadar,
  onOpenRoommates,
  onOpenSaved,
  onOpenMyAccount,
  onOpenListFlow,
  onOpenNotifications,
  onOpenSupport,
  onOpenReceipt,
  onToggleRole,
  onLogout,
  savedCount,
  unreadNotificationsCount = 2,
  isLoggedIn,
  userRole = 'tenant',
  currentUser
}: MobileHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search suggestions: Major tech hubs & all Indian locations (Bengaluru, Dharmapuri, Salem, etc.)
  const suggestions = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return MAJOR_AREA_SUGGESTIONS.slice(0, 5).map((a) => ({
        city: a.city,
        locality: a.locality,
        street: a.street,
        pincode: a.pincode,
        lat: a.lat,
        lng: a.lng
      }));
    }
    const q = searchQuery.toLowerCase().trim();
    const areaMatches = getSuggestionsForQuery(q);
    const indianMatches: AreaSuggestion[] = ALL_INDIAN_LOCATIONS.filter((loc) =>
      loc.name.toLowerCase().includes(q) ||
      loc.cityOrDistrict.toLowerCase().includes(q) ||
      loc.state.toLowerCase().includes(q) ||
      loc.secondaryText.toLowerCase().includes(q)
    ).map((loc) => ({
      city: loc.cityOrDistrict,
      locality: loc.name,
      street: loc.secondaryText,
      pincode: '560001',
      lat: 12.9716,
      lng: 77.5946
    }));
    const combined: AreaSuggestion[] = [...areaMatches, ...indianMatches];
    const unique = combined.filter((item, idx, self) =>
      idx === self.findIndex((t) => t.locality.toLowerCase() === item.locality.toLowerCase() && t.city.toLowerCase() === item.city.toLowerCase())
    );
    return unique.slice(0, 6);
  }, [searchQuery]);

  const handleUseCurrentLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLocating(true);
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsLocating(false);
          setSearchQuery('Kundanahalli Gate, ITPL Main Rd, Bengaluru');
          setShowSearchDropdown(false);
        },
        () => {
          setIsLocating(false);
          setSearchQuery('Kundanahalli, Bengaluru');
          setShowSearchDropdown(false);
        },
        { timeout: 4000 }
      );
    } else {
      setIsLocating(false);
      setSearchQuery('Kundanahalli, Bengaluru');
      setShowSearchDropdown(false);
    }
  };

  return (
    <header className="md:hidden bg-gradient-to-b from-[#8B0029] via-[#9E1B42] to-[#B31742] text-white pt-2.5 pb-3 px-3 shadow-md relative z-40">
      
      {/* ROW 1: TOP NAVIGATION ROW */}
      <div className="flex items-center justify-between gap-2 h-11">
        
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="p-1.5 -ml-1 text-white/90 hover:text-white active:scale-95 transition-transform cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 stroke-[2.2]" />
          </button>

          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center cursor-pointer active:scale-95 transition-transform"
            aria-label="Now Ezy Home"
          >
            <img
              src="/brand/logo-white-transparent.png"
              alt="now ezy"
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </a>
        </div>

        {/* Right: Notifications, Profile, Post Property FREE Button */}
        <div className="flex items-center gap-2">
          
          {/* Notification Bell */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="p-1.5 text-white/90 hover:text-white relative active:scale-95 transition-transform cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute 1 top-1 right-1 w-2 h-2 rounded-full bg-amber-400 border border-[#9E1B42]" />
            )}
          </button>

          {/* Profile / Account Icon */}
          <button
            type="button"
            onClick={onOpenMyAccount}
            className="p-1 rounded-full bg-white/15 text-white active:scale-95 transition-transform cursor-pointer border border-white/20"
            aria-label={isLoggedIn ? 'Manage Profile' : 'Login'}
          >
            {isLoggedIn && currentUser?.avatar ? (
              <img 
                src={currentUser.avatar} 
                alt="Profile" 
                className="w-5 h-5 rounded-full object-cover" 
              />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </button>

          {/* Prominent Post Property Button with small FREE badge */}
          <div className="relative">
            <button
              type="button"
              onClick={onOpenListFlow}
              className="flex items-center gap-1 bg-white active:bg-slate-100 text-[#9E1B42] text-xs font-black px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Post Property</span>
            </button>
            <span className="absolute -top-1.5 -right-1 bg-amber-400 text-slate-950 text-[8px] font-black px-1 py-0.2 rounded-full uppercase tracking-tighter shadow-2xs pointer-events-none">
              FREE
            </span>
          </div>

        </div>

      </div>

      {/* ROW 2: WIDE ROUNDED SEARCH BAR */}
      <div ref={searchWrapperRef} className="mt-2.5 relative">
        <div className="bg-white rounded-2xl p-1.5 shadow-md flex items-center gap-1.5 text-slate-800">
          
          {/* Category Dropdown Pill (Rent) */}
          <div className="flex items-center gap-0.5 px-2 py-1 text-xs font-bold text-slate-800 shrink-0">
            <span>Rent</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <div className="h-4 w-px bg-slate-200 shrink-0" />

          {/* Search Input */}
          <div className="relative flex-1 flex items-center min-w-0">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 mr-1.5" />
            <input
              type="text"
              placeholder="Search locality, tech park or university..."
              value={searchQuery}
              onFocus={() => setShowSearchDropdown(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              className="w-full text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none bg-transparent truncate"
            />
          </div>

          {/* Near Me GPS Icon */}
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="flex items-center gap-1 pl-1.5 pr-2 py-1 text-[11px] font-extrabold text-[#9E1B42] hover:text-[#7A0023] shrink-0 cursor-pointer active:scale-95 transition-transform"
            title="Use current location"
          >
            <LocateFixed className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">Near me</span>
          </button>

        </div>

        {/* Live Location Autocomplete Dropdown */}
        {showSearchDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 text-left">
            <div className="p-2 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Suggested Locations</span>
              <span className="text-[10px] text-[#9E1B42]">{selectedCity}</span>
            </div>

            <div className="max-h-56 overflow-y-auto divide-y divide-slate-100">
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSearchQuery(`${item.locality}, ${item.city}`);
                    onSelectArea(item);
                    setShowSearchDropdown(false);
                  }}
                  className="w-full p-2.5 text-left hover:bg-rose-50/60 flex items-center justify-between text-xs text-slate-800 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#9E1B42] shrink-0" />
                    <div className="truncate">
                      <strong className="text-slate-900 font-bold block truncate">{item.locality}</strong>
                      <span className="text-[10px] text-slate-500 truncate block">
                        {item.street ? `${item.street}, ` : ''}{item.city} ({item.pincode})
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-[#9E1B42] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ROW 3: FOUR QUICK-ACCESS CIRCULAR SHORTCUTS */}
      <div className="grid grid-cols-4 gap-1 pt-3.5 pb-1 text-center">
        
        {/* 1. EZY RADAR (Visually prominent with burgundy circle) */}
        <button
          type="button"
          onClick={onOpenRadar}
          className="flex flex-col items-center justify-center group cursor-pointer active:scale-95 transition-transform"
          aria-label="Open EZY Radar"
        >
          <div className="w-11 h-11 rounded-full bg-white text-[#9E1B42] flex items-center justify-center shadow-md relative ring-2 ring-white/30 group-hover:scale-105 transition-transform">
            <Navigation className="w-5 h-5 stroke-[2.4]" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border border-[#9E1B42] animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border border-[#9E1B42]" />
          </div>
          <span className="text-[10px] font-black tracking-tight mt-1 text-white drop-shadow-xs">
            EZY RADAR
          </span>
        </button>

        {/* 2. Roommates */}
        <button
          type="button"
          onClick={onOpenRoommates}
          className="flex flex-col items-center justify-center group cursor-pointer active:scale-95 transition-transform"
          aria-label="Find Roommates"
        >
          <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-xs text-white flex items-center justify-center border border-white/25 group-hover:bg-white/25 transition-all">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-1 text-white/95">
            Roommates
          </span>
        </button>

        {/* 3. Saved Homes */}
        <button
          type="button"
          onClick={onOpenSaved}
          className="flex flex-col items-center justify-center group cursor-pointer active:scale-95 transition-transform"
          aria-label="Saved Homes"
        >
          <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-xs text-white flex items-center justify-center border border-white/25 relative group-hover:bg-white/25 transition-all">
            <Heart className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C01E4E] text-white text-[9px] font-black flex items-center justify-center border border-white">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-1 text-white/95">
            Saved Homes
          </span>
        </button>

        {/* 4. My Account */}
        <button
          type="button"
          onClick={onOpenMyAccount}
          className="flex flex-col items-center justify-center group cursor-pointer active:scale-95 transition-transform"
          aria-label="My Account"
        >
          <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-xs text-white flex items-center justify-center border border-white/25 group-hover:bg-white/25 transition-all">
            <User className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-1 text-white/95">
            My Account
          </span>
        </button>

      </div>

      {/* SLIDE-OUT MOBILE NAVIGATION DRAWER (HAMBURGER) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          
          {/* Backdrop */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-xs bg-white text-slate-900 h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
            
            {/* Drawer Header */}
            <div>
              <div className="p-4 bg-[#8B0029] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="/brand/logo-white-transparent.png"
                    alt="Now Ezy"
                    className="h-6 w-auto object-contain"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Card inside Drawer */}
              <div className="p-4 border-b border-slate-100 bg-slate-50/70">
                {isLoggedIn && currentUser ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8B0029] text-white font-black text-sm flex items-center justify-center">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-sm text-slate-900 truncate">{currentUser.name}</p>
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified {userRole === 'owner' ? 'Landlord' : 'Bachelor'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsDrawerOpen(false);
                      onOpenMyAccount();
                    }}
                    className="w-full py-2.5 px-4 bg-[#8B0029] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Login or Sign Up
                  </button>
                )}
              </div>

              {/* Navigation Links */}
              <div className="p-3 space-y-1 text-xs font-bold text-slate-700">
                
                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors"
                >
                  <Search className="w-4 h-4 text-slate-400" />
                  <span>Browse Homes Feed</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onOpenRadar();
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-rose-50 text-[#8B0029] text-left font-black"
                >
                  <Navigation className="w-4 h-4 text-[#8B0029]" />
                  <span>Now Ezy Radar Commute</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onOpenRoommates();
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors"
                >
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>Roommate Discovery Network</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onOpenSaved();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-slate-400" />
                    <span>Saved Homes</span>
                  </div>
                  {savedCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-[#8B0029] text-[10px] font-black">
                      {savedCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onOpenListFlow();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors text-[#8B0029]"
                >
                  <div className="flex items-center gap-3">
                    <Plus className="w-4 h-4 text-[#8B0029] stroke-[2.5]" />
                    <span>Post Bachelor Property</span>
                  </div>
                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900">
                    FREE
                  </span>
                </button>

                <div className="pt-2 border-t border-slate-100 my-2" />

                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onOpenNotifications();
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors"
                >
                  <Send className="w-4 h-4 text-slate-400" />
                  <span>Requests Sent &amp; Inquiries</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onOpenSupport();
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors"
                >
                  <Headphones className="w-4 h-4 text-slate-400" />
                  <span>24/7 Tenant Support</span>
                </button>

                {onOpenReceipt && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsDrawerOpen(false);
                      onOpenReceipt();
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors"
                  >
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span>GST Tax Invoices &amp; Receipts</span>
                  </button>
                )}

                {onToggleRole && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsDrawerOpen(false);
                      onToggleRole();
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 text-slate-400" />
                    <span>Switch to {userRole === 'tenant' ? 'Landlord' : 'Tenant'} Mode</span>
                  </button>
                )}

              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-100 text-xs">
              {isLoggedIn && onLogout ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-rose-200 text-[#8B0029] font-bold hover:bg-rose-50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              ) : (
                <p className="text-[11px] text-slate-400 text-center font-medium">
                  Now Ezy · Bachelor Living Network
                </p>
              )}
            </div>

          </div>

        </div>
      )}

    </header>
  );
}
