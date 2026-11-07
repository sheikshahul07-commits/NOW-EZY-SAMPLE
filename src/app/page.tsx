'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PropertyCard from '../components/PropertyCard';
import ProsOfNowEzySection from '../components/ProsOfNowEzySection';
import FlatmateMatcher from '../components/FlatmateMatcher';
import HomeRadarMap from '../components/HomeRadarMap';
import OwnerListingWizard from '../components/OwnerListingWizard';
import LoginModal from '../components/LoginModal';
import SubscriptionModal from '../components/SubscriptionModal';
import OwnerPortalModal from '../components/OwnerPortalModal';
import TenantRequestsModal from '../components/TenantRequestsModal';
import CustomerSupportModal from '../components/CustomerSupportModal';
import AccountDetailsModal from '../components/AccountDetailsModal';
import OwnerDetailsRevealedModal from '../components/OwnerDetailsRevealedModal';
import ReviewsMarqueeSection from '../components/ReviewsMarqueeSection';
import LandlordListingLimitModal from '../components/LandlordListingLimitModal';
import SecurityTrustSection from '../components/SecurityTrustSection';
import MobileBottomNav from '../components/MobileBottomNav';
import FilterBottomSheet, { FilterState } from '../components/FilterBottomSheet';
import ReceiptModal from '../components/ReceiptModal';
import Footer from '../components/Footer';
import ScrollProgressBar from '../components/ScrollProgressBar';
import { INITIAL_PROPERTIES, INITIAL_FLATMATES } from '../data/mockData';
import { Property, FlatmateProfile, AreaSuggestion, TenantRequest, UserRole, PaymentReceipt, PropertyType } from '../types';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Navigation,
  ArrowRight,
  ArrowLeft,
  SlidersHorizontal,
  Plus
} from 'lucide-react';

export default function Home() {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'homes' | 'map' | 'flatmates'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'map') return 'map';
      if (tab === 'flatmates') return 'flatmates';
    }
    return 'homes';
  });
  const [selectedCity, setSelectedCity] = useState('Bengaluru');
  const [selectedHeroTab, setSelectedHeroTab] = useState('RENT');

  // User Session & Verification
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('rahul.sharma@example.com');
  const [userAvatar, setUserAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80');
  const [userRole, setUserRole] = useState<UserRole>('tenant');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [authIntent, setAuthIntent] = useState<'post_property' | 'view_property' | 'contact_owner' | 'general'>('general');
  const [pendingProperty, setPendingProperty] = useState<Property | null>(null);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(['prop-itpl-1']);

  // Landlord Listing Limits (Free limit: 2 posts)
  const [isLandlordLimitModalOpen, setIsLandlordLimitModalOpen] = useState(false);
  const [hasLandlordPass, setHasLandlordPass] = useState(false);
  const [ownerPostsCount, setOwnerPostsCount] = useState(2); // Initial demo: 2 free posts used

  // Pagination State (10 postings on first page, then rounded next page button)
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Tenant Requests Sent Tracker
  const [tenantRequests, setTenantRequests] = useState<TenantRequest[]>([
    {
      id: 'req-1',
      propertyId: 'prop-itpl-1',
      propertyTitle: 'Spacious 1BHK / Studio for Tech Professionals',
      propertyLocality: 'Kundanahalli Gate',
      ownerName: 'Vikram Joshi (Direct Owner)',
      ownerPhone: '+91 98450 12345',
      requestedAt: 'Today, 10:30 AM',
      status: 'Owner Contacted'
    },
    {
      id: 'req-2',
      propertyId: 'prop-2',
      propertyTitle: 'Sunny Master Bedroom in 3BHK Apartment',
      propertyLocality: 'AECS Layout, Kundanahalli',
      ownerName: 'Priya Sundaram',
      ownerPhone: '+91 98860 99887',
      requestedAt: 'Yesterday',
      status: 'Visit Scheduled'
    }
  ]);

  // Modals
  const [isListingFlowOpen, setIsListingFlowOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeLoginTargetProperty, setActiveLoginTargetProperty] = useState<Property | null>(null);

  // New Modals
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [targetSubscriptionProperty, setTargetSubscriptionProperty] = useState<Property | null>(null);

  const [isOwnerPortalOpen, setIsOwnerPortalOpen] = useState(false);
  const [isTenantRequestsOpen, setIsTenantRequestsOpen] = useState(false);
  const [isCustomerSupportOpen, setIsCustomerSupportOpen] = useState(false);
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false);

  const [isRevealedModalOpen, setIsRevealedModalOpen] = useState(false);
  const [revealedProperty, setRevealedProperty] = useState<Property | null>(null);

  // Filter Bottom Sheet & Receipt Modal
  const DEFAULT_FILTERS: FilterState = {
    propertyTypes: [],
    maxRent: 60000,
    occupancy: 'All',
    furnishing: 'All',
    nonVegOnly: false,
    noCurfewOnly: false,
    overnightGuestsOnly: false,
    depositTwoMonthsMax: false
  };
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTERS);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedCategoryChip, setSelectedCategoryChip] = useState<string>('All');
  const [userReceipt, setUserReceipt] = useState<PaymentReceipt | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Properties State
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [flatmates] = useState<FlatmateProfile[]>(INITIAL_FLATMATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [noCurfewOnly, setNoCurfewOnly] = useState(false);

  // LocalStorage Hydration & Persistence
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedProps = localStorage.getItem('nowezy_properties_inventory_v2');
      if (savedProps) {
        const parsed = JSON.parse(savedProps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProperties(parsed);
        }
      }

      const savedSession = localStorage.getItem('nowezy_user_session_v2');
      if (savedSession) {
        const sess = JSON.parse(savedSession);
        if (sess.isLoggedIn) {
          setIsLoggedIn(true);
          if (sess.phone) setUserPhone(sess.phone);
          if (sess.name) setUserName(sess.name);
          if (sess.email) setUserEmail(sess.email);
          if (sess.avatar) setUserAvatar(sess.avatar);
          if (sess.role) setUserRole(sess.role);
          if (sess.isSubscribed !== undefined) setIsSubscribed(sess.isSubscribed);
        }
      }

      const savedReqs = localStorage.getItem('nowezy_tenant_requests_v2');
      if (savedReqs) {
        const reqs = JSON.parse(savedReqs);
        if (Array.isArray(reqs)) setTenantRequests(reqs);
      }

      const savedIds = localStorage.getItem('nowezy_saved_properties_v2');
      if (savedIds) {
        const ids = JSON.parse(savedIds);
        if (Array.isArray(ids)) setSavedPropertyIds(ids);
      }

      const savedRcpt = localStorage.getItem('nowezy_user_receipt_v2');
      if (savedRcpt) {
        setUserReceipt(JSON.parse(savedRcpt));
      }
    } catch (e) {
      console.warn('Could not restore from localStorage', e);
    }
  }, []);

  const persistSession = (updated: {
    isLoggedIn?: boolean;
    phone?: string;
    name?: string;
    email?: string;
    avatar?: string;
    role?: UserRole;
    isSubscribed?: boolean;
  }) => {
    if (typeof window === 'undefined') return;
    try {
      const current = localStorage.getItem('nowezy_user_session_v2');
      const base = current ? JSON.parse(current) : {};
      const merged = { ...base, ...updated };
      localStorage.setItem('nowezy_user_session_v2', JSON.stringify(merged));
    } catch (e) {
      console.warn('Failed saving user session', e);
    }
  };

  // Filtered Properties Computation
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Hide deactivated listings from search feed
      if (prop.status === 'deactivated') {
        return false;
      }

      // City Filter (bypassed when user is actively searching with a query)
      if (selectedCity !== 'All India' && !searchQuery.trim() && prop.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesLocality = prop.locality.toLowerCase().includes(q);
        const matchesStreet = prop.street ? prop.street.toLowerCase().includes(q) : false;
        const matchesPincode = prop.pincode ? prop.pincode.includes(q) : false;
        const matchesCity = prop.city.toLowerCase().includes(q);

        if (!matchesTitle && !matchesLocality && !matchesStreet && !matchesPincode && !matchesCity) {
          return false;
        }
      }

      // Category Chip Filter (Matches the 5 standard categories requested)
      if (selectedCategoryChip !== 'All' && selectedCategoryChip !== 'All Homes') {
        if (selectedCategoryChip === 'Entire Flats') {
          if (prop.propertyType !== 'Entire Flat') return false;
        } else if (selectedCategoryChip === 'Private Rooms') {
          if (prop.propertyType !== 'Private Room') return false;
        } else if (selectedCategoryChip === 'PG & Co-living') {
          if (prop.propertyType !== 'Co-Living Studio' && prop.propertyType !== 'Single Bed in PG') return false;
        } else if (selectedCategoryChip === 'Shared Accommodation') {
          if (prop.propertyType !== 'Shared Room') return false;
        } else if (prop.propertyType !== selectedCategoryChip) {
          return false;
        }
      }

      // Bottom Sheet Property Type Filters (multi-select)
      if (filterState.propertyTypes.length > 0 && !filterState.propertyTypes.includes(prop.propertyType)) {
        return false;
      }

      // Max Rent Filter
      if (filterState.maxRent < 60000 && prop.rent > filterState.maxRent) {
        return false;
      }

      // Occupancy Filter
      if (filterState.occupancy !== 'All') {
        if (prop.occupancy !== filterState.occupancy && prop.occupancy !== 'Any Bachelor') {
          return false;
        }
      }

      // Furnishing Filter
      if (filterState.furnishing !== 'All' && prop.furnishing !== filterState.furnishing) {
        return false;
      }

      // Hero Tab Filter (legacy support)
      if (selectedHeroTab === 'PRIVATE ROOM' && prop.propertyType !== 'Private Room') {
        return false;
      }
      if (selectedHeroTab === '2BHK / 3BHK' && prop.propertyType !== 'Entire Flat') {
        return false;
      }
      if (selectedHeroTab === 'PG/CO-LIVING' && prop.propertyType !== 'Co-Living Studio' && prop.propertyType !== 'Single Bed in PG') {
        return false;
      }

      // Bachelor Rules
      if ((nonVegOnly || filterState.nonVegOnly) && !prop.bachelorRules.nonVegAllowed) {
        return false;
      }
      if ((noCurfewOnly || filterState.noCurfewOnly) && prop.bachelorRules.curfew !== 'No Curfew') {
        return false;
      }
      if (filterState.overnightGuestsOnly && prop.bachelorRules.overnightGuests !== 'Allowed Anytime') {
        return false;
      }
      if (filterState.depositTwoMonthsMax && prop.deposit > prop.rent * 2) {
        return false;
      }

      return true;
    });
  }, [properties, selectedCity, searchQuery, selectedCategoryChip, filterState, selectedHeroTab, nonVegOnly, noCurfewOnly]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filterState.propertyTypes.length > 0) count += filterState.propertyTypes.length;
    if (filterState.maxRent < 60000) count += 1;
    if (filterState.occupancy !== 'All') count += 1;
    if (filterState.furnishing !== 'All') count += 1;
    if (filterState.nonVegOnly) count += 1;
    if (filterState.noCurfewOnly) count += 1;
    if (filterState.overnightGuestsOnly) count += 1;
    if (filterState.depositTwoMonthsMax) count += 1;
    return count;
  }, [filterState]);

  // Reset pagination to Page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCity, searchQuery, selectedCategoryChip, filterState, selectedHeroTab, nonVegOnly, noCurfewOnly]);

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / ITEMS_PER_PAGE));
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  const handleToggleSave = (id: string) => {
    setSavedPropertyIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('nowezy_saved_properties_v2', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleAddProperty = (newProp: Property) => {
    setProperties((prev) => {
      const updated = [newProp, ...prev];
      try {
        localStorage.setItem('nowezy_properties_inventory_v2', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    setOwnerPostsCount((prev) => prev + 1);
    setIsListingFlowOpen(false);
  };

  const handleUpdateProperty = (updated: Property) => {
    setProperties((prev) => {
      const list = prev.map((p) => (p.id === updated.id ? updated : p));
      try {
        localStorage.setItem('nowezy_properties_inventory_v2', JSON.stringify(list));
      } catch (e) {}
      return list;
    });
  };

  const handleUpdateProfile = (updated: { name: string; email: string; avatar: string }) => {
    setUserName(updated.name);
    setUserEmail(updated.email);
    setUserAvatar(updated.avatar);
    persistSession({ name: updated.name, email: updated.email, avatar: updated.avatar });
  };

  // Auth Gate: Posting Property requires account creation/login first
  // Owner Limit Gate: If role is owner, free limit is 2 posts. 3rd post requires Landlord Pass!
  const handleOpenListFlow = () => {
    if (!isLoggedIn) {
      setAuthIntent('post_property');
      setActiveLoginTargetProperty(null);
      setIsLoginModalOpen(true);
    } else if (userRole === 'owner' && ownerPostsCount >= 2 && !hasLandlordPass) {
      setIsLandlordLimitModalOpen(true);
    } else {
      setIsListingFlowOpen(true);
    }
  };

  // Auth Gate: Viewing listed property requires account creation/login first
  const handleSelectProperty = (property: Property) => {
    if (!isLoggedIn) {
      setPendingProperty(property);
      setAuthIntent('view_property');
      setActiveLoginTargetProperty(property);
      setIsLoginModalOpen(true);
    } else {
      window.open(`/listing/${property.id}`, '_blank');
    }
  };

  // Auth & Subscription Gate: Contacting Direct Owner
  // Requires: 1. Account created/logged in -> 2. 60-Day Bachelor Pass active!
  const handleOpenContactOwner = (prop: Property) => {
    if (!isLoggedIn) {
      setPendingProperty(null);
      setAuthIntent('contact_owner');
      setActiveLoginTargetProperty(prop);
      setIsLoginModalOpen(true);
    } else if (!isSubscribed) {
      setTargetSubscriptionProperty(prop);
      setIsSubscriptionModalOpen(true);
    } else {
      // User is authenticated & subscribed -> reveal owner contact details directly!
      setRevealedProperty(prop);
      setIsRevealedModalOpen(true);

      // Track request in sent list
      setTenantRequests((prev) => {
        const updated: TenantRequest[] = [
          {
            id: `req-${Date.now()}`,
            propertyId: prop.id,
            propertyTitle: prop.title,
            propertyLocality: prop.locality,
            ownerName: prop.verifiedOwner.name,
            ownerPhone: prop.verifiedOwner.phone,
            requestedAt: 'Just Now',
            status: 'Owner Contacted'
          },
          ...prev
        ];
        try {
          localStorage.setItem('nowezy_tenant_requests_v2', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  };

  // On Login/Signup Success: Activate session and automatically resume pending user action
  const handleLoginSuccess = (phone: string, name?: string, role?: 'tenant' | 'owner') => {
    setIsLoggedIn(true);
    setUserPhone(phone);
    if (name) setUserName(name);
    if (role) setUserRole(role);

    persistSession({
      isLoggedIn: true,
      phone,
      name: name || userName,
      role: role || userRole
    });

    setIsLoginModalOpen(false);

    if (authIntent === 'post_property') {
      const activeRole = role || userRole;
      if (activeRole === 'owner' && ownerPostsCount >= 2 && !hasLandlordPass) {
        setIsLandlordLimitModalOpen(true);
      } else {
        setIsListingFlowOpen(true);
      }
    } else if (authIntent === 'view_property' && pendingProperty) {
      const target = pendingProperty;
      setPendingProperty(null);
      window.open(`/listing/${target.id}`, '_blank');
    } else if (authIntent === 'contact_owner' && activeLoginTargetProperty) {
      // After login completed, check subscription for contacting owner
      const target = activeLoginTargetProperty;
      setActiveLoginTargetProperty(null);
      if (!isSubscribed) {
        setTargetSubscriptionProperty(target);
        setIsSubscriptionModalOpen(true);
      } else {
        setRevealedProperty(target);
        setIsRevealedModalOpen(true);
      }
    }
  };

  // On Subscription Activated
  const handleSubscribeSuccess = (receipt?: PaymentReceipt) => {
    setIsSubscribed(true);
    setIsSubscriptionModalOpen(false);

    if (receipt) {
      setUserReceipt(receipt);
      try {
        localStorage.setItem('nowezy_user_receipt_v2', JSON.stringify(receipt));
      } catch (e) {}
    }

    persistSession({ isSubscribed: true });

    if (targetSubscriptionProperty) {
      setRevealedProperty(targetSubscriptionProperty);
      setIsRevealedModalOpen(true);

      setTenantRequests((prev) => {
        const updated: TenantRequest[] = [
          {
            id: `req-${Date.now()}`,
            propertyId: targetSubscriptionProperty.id,
            propertyTitle: targetSubscriptionProperty.title,
            propertyLocality: targetSubscriptionProperty.locality,
            ownerName: targetSubscriptionProperty.verifiedOwner.name,
            ownerPhone: targetSubscriptionProperty.verifiedOwner.phone,
            requestedAt: 'Just Now',
            status: 'Owner Contacted'
          },
          ...prev
        ];
        try {
          localStorage.setItem('nowezy_tenant_requests_v2', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPhone('');
    setUserName('');
    setIsSubscribed(false);
    try {
      localStorage.removeItem('nowezy_user_session_v2');
    } catch (e) {}
  };

  const handleToggleRole = () => {
    setUserRole((prev) => {
      const nextRole: UserRole = prev === 'tenant' ? 'owner' : 'tenant';
      persistSession({ role: nextRole });
      return nextRole;
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#1D1E2C]">
      
      {/* SCROLL PROGRESS LINE AT TOP OF WEBSITE */}
      <ScrollProgressBar />

      {/* Top Navbar with Soft Floating Capsule Island on Scroll & 3-Dots User Menu */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onOpenListFlow={handleOpenListFlow}
        onOpenLogin={() => {
          setAuthIntent('general');
          setActiveLoginTargetProperty(null);
          setIsLoginModalOpen(true);
        }}
        userName={isLoggedIn ? (userName || `User (${userPhone.slice(-4)})`) : 'Login'}
        userAvatar={isLoggedIn ? userAvatar : undefined}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        isSubscribed={isSubscribed}
        requestsSentCount={tenantRequests.length}
        incomingInquiriesCount={3}
        onOpenManageAccount={() => setIsAccountDetailsOpen(true)}
        onOpenRequestsSent={() => setIsTenantRequestsOpen(true)}
        onOpenCustomerSupport={() => setIsCustomerSupportOpen(true)}
        onOpenOwnerPortal={() => setIsOwnerPortalOpen(true)}
        onOpenSubscription={() => {
          setTargetSubscriptionProperty(null);
          setIsSubscriptionModalOpen(true);
        }}
        onOpenReceipt={() => setIsReceiptModalOpen(true)}
        onToggleRole={handleToggleRole}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectArea={(area: AreaSuggestion) => {
          setSearchQuery(`${area.locality}, ${area.city}`);
          if (area.city) {
            setSelectedCity(area.city);
          }
        }}
        onOpenSaved={() => {
          setSelectedCategoryChip('All');
          const el = document.getElementById('bachelor-listings-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        savedCount={savedPropertyIds.length}
      />

      <main className="flex-1 pb-28 md:pb-0">
        {activeTab === 'homes' ? (
          <div>
            
            {/* Desktop Hero Section (Search, Radar Highlight & Autocomplete - Hidden on mobile) */}
            <div className="hidden md:block">
              <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedTab={selectedHeroTab}
                setSelectedTab={setSelectedHeroTab}
                selectedCity={selectedCity}
                onOpenListFlow={handleOpenListFlow}
                onSelectArea={(area: AreaSuggestion) => {
                  setSearchQuery(`${area.locality}, ${area.city}`);
                  if (area.city) {
                    setSelectedCity(area.city);
                  }
                }}
                onOpenRadar={() => {
                  setActiveTab('map');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>

            {/* Mobile Compact Introduction (Replaces oversized hero on mobile) */}
            <div className="md:hidden px-4 pt-4 pb-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-[#C01E4E] px-2.5 py-0.5 rounded-full">
                  Zero Brokerage
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  Bengaluru &amp; Tech Parks
                </span>
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                Find Your Place. Without Brokerage.
              </h1>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Discover bachelor-friendly homes, private rooms and compatible roommates across {selectedCity}.
              </p>
            </div>

            {/* Mobile "Let's continue your search" (Recent Searches / Suggested Locality Cards) */}
            <div className="md:hidden px-4 pt-3 pb-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-black text-slate-900">Let&apos;s continue your search</h2>
                <span className="text-[11px] font-bold text-[#C01E4E]">Recent</span>
              </div>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
                {[
                  { type: 'Flat, House/Villa', location: 'Kundanahalli Gate', query: 'Kundanahalli' },
                  { type: 'Private Room / PG', location: 'Koramangala 4th Block', query: 'Koramangala' },
                  { type: 'Tech Park Flat', location: 'ITPL Main Road', query: 'ITPL' },
                  { type: 'Independent House', location: 'Indiranagar 100ft Rd', query: 'Indiranagar' },
                  { type: 'Bachelor Shared Flat', location: 'HSR Layout Sector 1', query: 'HSR Layout' }
                ].map((card, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSearchQuery(card.query);
                      const el = document.getElementById('bachelor-listings-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="shrink-0 w-44 bg-white border border-slate-200 hover:border-[#C01E4E] p-3 rounded-2xl shadow-2xs active:scale-97 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        YOUR SEARCH
                      </span>
                      <p className="text-xs font-bold text-slate-800 mt-1.5 truncate">{card.type}</p>
                      <p className="text-xs font-semibold text-slate-500 truncate">{card.location}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[#C01E4E] text-[11px] font-black">
                      <span>View Results</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Property Owner Conversion Banner Card */}
            <div className="md:hidden px-4 py-2">
              <div className="bg-gradient-to-r from-rose-50/80 via-white to-white border border-rose-200/90 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#C01E4E] bg-rose-100 px-2 py-0.5 rounded-full">
                    For Owners
                  </span>
                  <h3 className="text-sm font-black text-slate-900 mt-1">
                    Planning to <span className="text-[#C01E4E]">Rent</span> Your Property?
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Zero brokerage. Connect directly with verified bachelors.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenListFlow}
                  className="shrink-0 bg-[#C01E4E] hover:bg-[#A11840] active:scale-95 text-white text-xs font-black px-3.5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Post FREE</span>
                </button>
              </div>
            </div>

            {/* SPECIAL & UNIQUE FEATURE HIGHLIGHT: NOW EZY RADAR COMMUTE LOCATOR (Visible on Desktop) */}
            <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
              <div 
                onClick={() => {
                  setActiveTab('map');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-rose-100 hover:border-[#C01E4E] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-5 cursor-pointer group relative overflow-hidden"
              >
                {/* Subtle Crimson Ambient Glow */}
                <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-rose-50 to-transparent pointer-events-none" />

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-13 h-13 rounded-2xl bg-[#C01E4E] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <Navigation className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-[#C01E4E] px-2.5 py-0.5 rounded-full">
                        Our Special &amp; Unique Feature
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Zero Street Hunting
                      </span>
                    </div>
                    <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-[#C01E4E] transition-colors">
                      Now Ezy Radar: View Empty Flats Near Your Current Stay
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Interactive commute rings (5 min, 10 min, 15 min) around Kundanahalli, Koramangala &amp; major tech parks.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-black text-xs sm:text-sm bg-[#C01E4E] group-hover:bg-[#A11840] text-white px-5 py-3 rounded-2xl shadow-md shrink-0 transition-all active:scale-97 relative z-10">
                  <span>Open Radar Commute Map</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Category Selector Chips & Filter Row */}
            <div id="bachelor-listings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-6">
              {/* Category Pills (Horizontal scrollable on mobile) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { label: 'All Homes', value: 'All' },
                  { label: 'Entire Flats', value: 'Entire Flats' },
                  { label: 'Private Rooms', value: 'Private Rooms' },
                  { label: 'PG & Co-living', value: 'PG & Co-living' },
                  { label: 'Shared Accommodation', value: 'Shared Accommodation' }
                ].map((cat) => {
                  const isSelected = selectedCategoryChip === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategoryChip(cat.value)}
                      className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#C01E4E] text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Quick Filters Row with "All Filters" Bottom Sheet Trigger */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {/* All Filters Button */}
                  <button
                    onClick={() => setIsFilterSheetOpen(true)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activeFilterCount > 0
                        ? 'bg-rose-50 border border-[#C01E4E] text-[#C01E4E]'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>All Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#C01E4E] text-white text-[10px] font-black flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {/* Non-Veg Allowed Filter */}
                  <button
                    onClick={() => setNonVegOnly(!nonVegOnly)}
                    className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                      nonVegOnly || filterState.nonVegOnly
                        ? 'bg-[#C01E4E] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    Non-Veg Allowed
                  </button>

                  {/* No Curfew Filter */}
                  <button
                    onClick={() => setNoCurfewOnly(!noCurfewOnly)}
                    className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                      noCurfewOnly || filterState.noCurfewOnly
                        ? 'bg-[#C01E4E] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    No Curfew
                  </button>

                  {/* Reset if active */}
                  {(activeFilterCount > 0 || nonVegOnly || noCurfewOnly || selectedCategoryChip !== 'All') && (
                    <button
                      onClick={() => {
                        setFilterState(DEFAULT_FILTERS);
                        setNonVegOnly(false);
                        setNoCurfewOnly(false);
                        setSelectedCategoryChip('All');
                      }}
                      className="text-xs text-rose-600 hover:text-rose-700 font-bold underline px-2 cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="text-xs text-slate-500 font-semibold">
                  Showing <strong className="text-slate-900">{filteredProperties.length}</strong> Verified Bachelor Homes
                </div>
              </div>
            </div>

            {/* Property Listing Grid Heading */}
            <div id="bachelor-listings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 scroll-mt-24">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Verified Bachelor Homes in {selectedCity}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Direct Genuine Owner Contacts · Zero Brokerage · Transparent House Rules
                  </p>
                </div>
                
                {/* Current Page Indicator Badge */}
                {totalPages > 1 && (
                  <span className="text-xs font-black px-3 py-1 bg-rose-50 text-[#C01E4E] border border-rose-200 rounded-full">
                    Page {currentPage} of {totalPages}
                  </span>
                )}
              </div>

              {filteredProperties.length > 0 ? (
                <div className="space-y-6">
                  {/* Paginated 10-12 listings */}
                  {paginatedProperties.map((prop) => (
                    <PropertyCard
                      key={prop.id}
                      property={prop}
                      onSelect={handleSelectProperty}
                      isSaved={savedPropertyIds.includes(prop.id)}
                      onToggleSave={handleToggleSave}
                      onGetOwnerDetails={handleOpenContactOwner}
                    />
                  ))}

                  {/* ROUNDED PAGINATION CONTROLS (Next Page Button) */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-2 border-t border-slate-200 mt-8">
                      <div className="text-xs font-bold text-slate-500">
                        Showing <strong className="text-slate-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</strong> - <strong className="text-slate-900">{Math.min(currentPage * ITEMS_PER_PAGE, filteredProperties.length)}</strong> of <strong className="text-slate-900">{filteredProperties.length}</strong> listings
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Previous Page Round Button */}
                        {currentPage > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentPage((p) => Math.max(1, p - 1));
                              document.getElementById('bachelor-listings-section')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs hover:shadow-sm transition-all cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Previous</span>
                          </button>
                        )}

                        {/* Page Numbers Rounded Pills */}
                        <div className="flex items-center gap-1.5">
                          {[...Array(totalPages)].map((_, idx) => {
                            const pageNum = idx + 1;
                            const isActive = currentPage === pageNum;
                            return (
                              <button
                                key={pageNum}
                                type="button"
                                onClick={() => {
                                  setCurrentPage(pageNum);
                                  document.getElementById('bachelor-listings-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`w-9 h-9 rounded-full text-xs font-black transition-all cursor-pointer flex items-center justify-center ${
                                  isActive
                                    ? 'bg-[#C01E4E] text-white shadow-xs scale-105'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>

                        {/* Next Page Round Button (Prominent) */}
                        {currentPage < totalPages && (
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentPage((p) => Math.min(totalPages, p + 1));
                              document.getElementById('bachelor-listings-section')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C01E4E] hover:bg-[#A11840] text-white text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-97 cursor-pointer"
                          >
                            <span>Next Page</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
                  <div className="w-14 h-14 bg-rose-50 text-[#C01E4E] rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    No matching bachelor listings found
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Try relaxing your filters or selecting a different locality in {selectedCity}.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedHeroTab('RENT');
                      setNonVegOnly(false);
                      setNoCurfewOnly(false);
                    }}
                    className="px-4 py-2 bg-[#C01E4E] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>

            {/* 10-15 SCROLLING REVIEWS MARQUEE WITH 3D NOW EZY LOGO MARK */}
            <ReviewsMarqueeSection />

            {/* THE PROS OF NOW EZY SECTION (Below All First Page Listings) */}
            <ProsOfNowEzySection
              onOpenRadar={() => {
                setActiveTab('map');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenListFlow={handleOpenListFlow}
            />

            {/* ZERO-TRUST DATA SECURITY & ANTI-HACKING VAULT SECTION */}
            <SecurityTrustSection />

          </div>
        ) : activeTab === 'map' ? (
          /* RADAR LOCATOR (Google Maps style) */
          <HomeRadarMap
            properties={properties}
            onSelectProperty={handleSelectProperty}
            onDirectConnect={handleOpenContactOwner}
          />
        ) : (
          /* Roommate Matching */
          <FlatmateMatcher
            flatmates={flatmates}
            selectedCity={selectedCity}
            currentUser={isLoggedIn ? { name: userName || 'Rahul Sharma', phone: userPhone, email: userEmail } : null}
            onOpenLogin={() => {
              setAuthIntent('contact_owner');
              setActiveLoginTargetProperty(null);
              setIsLoginModalOpen(true);
            }}
          />
        )}
      </main>

      {/* COMPREHENSIVE PROPTECH FOOTER (Modeled directly after reference screenshot 3) */}
      <Footer
        onSelectLocality={(loc) => setSearchQuery(loc)}
        onOpenRadar={() => {
          setActiveTab('map');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenListProperty={handleOpenListFlow}
      />

      {/* ALL MODALS & PORTALS */}
      {/* 1. Login / Sign Up Modal with Google Account & Manual Option */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        targetProperty={activeLoginTargetProperty}
        intent={authIntent}
        onSuccess={handleLoginSuccess}
      />

      {/* 2. Professional 7-Step Owner Listing Wizard with Autosave & Media Verification */}
      <OwnerListingWizard
        isOpen={isListingFlowOpen}
        onClose={() => setIsListingFlowOpen(false)}
        onPublish={handleAddProperty}
      />

      {/* 3. 60-Day Bachelor Pass Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        targetProperty={targetSubscriptionProperty}
        currentUser={{ name: userName || 'Rahul Sharma', phone: userPhone, email: userEmail }}
        onSubscribeSuccess={handleSubscribeSuccess}
      />

      {/* Filter Bottom Sheet (Mobile & Desktop) */}
      <FilterBottomSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        filters={filterState}
        onApplyFilters={(newFilters) => setFilterState(newFilters)}
        onResetFilters={() => setFilterState(DEFAULT_FILTERS)}
        totalResultsCount={filteredProperties.length}
      />

      {/* Printable Tax Invoice & Payment Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        receipt={userReceipt}
      />

      {/* 4. Landlord Property Management Portal (Edit / Deactivate) */}
      <OwnerPortalModal
        isOpen={isOwnerPortalOpen}
        onClose={() => setIsOwnerPortalOpen(false)}
        properties={properties}
        onUpdateProperty={handleUpdateProperty}
        onOpenListingFlow={handleOpenListFlow}
      />

      {/* 5. Bachelor Tenant Property Requests Sent Tracker */}
      <TenantRequestsModal
        isOpen={isTenantRequestsOpen}
        onClose={() => setIsTenantRequestsOpen(false)}
        requests={tenantRequests}
      />

      {/* 6. 24/7 Bachelor Customer Support Modal */}
      <CustomerSupportModal
        isOpen={isCustomerSupportOpen}
        onClose={() => setIsCustomerSupportOpen(false)}
      />

      {/* 7. Manage Account & Profile Details Modal (Profile pic upload, Email, Name edit) */}
      <AccountDetailsModal
        isOpen={isAccountDetailsOpen}
        onClose={() => setIsAccountDetailsOpen(false)}
        userName={userName || 'Rahul Sharma'}
        userPhone={userPhone || '98765 43210'}
        userEmail={userEmail}
        userAvatar={userAvatar}
        userRole={userRole}
        isSubscribed={isSubscribed}
        onOpenSubscription={() => {
          setIsAccountDetailsOpen(false);
          setIsSubscriptionModalOpen(true);
        }}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* 8. Direct Owner Details Revealed Modal (Post-Subscription) */}
      <OwnerDetailsRevealedModal
        isOpen={isRevealedModalOpen}
        onClose={() => setIsRevealedModalOpen(false)}
        property={revealedProperty}
      />

      {/* 9. Landlord Free 2-Post Limit & Charge Fee Modal */}
      <LandlordListingLimitModal
        isOpen={isLandlordLimitModalOpen}
        onClose={() => setIsLandlordLimitModalOpen(false)}
        usedCount={ownerPostsCount}
        freeLimit={2}
        onUpgradeSuccess={() => {
          setHasLandlordPass(true);
          setIsLandlordLimitModalOpen(false);
          setIsListingFlowOpen(true);
        }}
      />

      {/* 10. Native Mobile Bottom Navigation Bar (1-Thumb Easy Touch) */}
      <MobileBottomNav
        activeTab={activeTab}
        currentRole={userRole}
        currentUser={isLoggedIn ? { name: userName || 'Rahul', phone: userPhone, email: userEmail } : null}
        onOpenLogin={() => {
          setAuthIntent('general');
          setIsLoginModalOpen(true);
        }}
        onOpenManageAccount={() => setIsAccountDetailsOpen(true)}
        onOpenRadar={() => {
          setActiveTab('map');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenListFlow={handleOpenListFlow}
        onScrollToFeed={() => {
          setActiveTab('homes');
          setTimeout(() => {
            document.getElementById('bachelor-listings-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onScrollToFlatmates={() => {
          setActiveTab('flatmates');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
