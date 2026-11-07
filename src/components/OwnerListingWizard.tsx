'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Building,
  MapPin,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  Camera,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Trash2,
  Video,
  FileCheck,
  Check,
  Home,
  Info
} from 'lucide-react';
import { Property, PropertyType, FurnishingType, OccupancyType, BachelorRules } from '../types';

interface OwnerListingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (property: Property) => void;
}

const STORAGE_KEY = 'nowezy_owner_listing_draft_v2';

export default function OwnerListingWizard({
  isOpen,
  onClose,
  onPublish
}: OwnerListingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);

  // Step 1: Category & Basic Specs
  const [propertyType, setPropertyType] = useState<PropertyType>('Entire Flat');
  const [title, setTitle] = useState('');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [furnishing, setFurnishing] = useState<FurnishingType>('Fully Furnished');
  const [carpetAreaSqft, setCarpetAreaSqft] = useState(850);
  const [floor, setFloor] = useState('3rd of 5 floors');

  // Step 2: Location
  const [city, setCity] = useState('Bengaluru');
  const [locality, setLocality] = useState('');
  const [street, setStreet] = useState('');
  const [pincode, setPincode] = useState('560037');
  const [distanceToHub, setDistanceToHub] = useState('');

  // Step 3: Rent & Financials
  const [rent, setRent] = useState(22000);
  const [deposit, setDeposit] = useState(44000);
  const [maintenance, setMaintenance] = useState(1500);
  const [availableFrom, setAvailableFrom] = useState('Immediate');
  const [occupancy, setOccupancy] = useState<OccupancyType>('Any Bachelor');

  // Step 4: Bachelor Rules & Policy Agreement
  const [nonVegAllowed, setNonVegAllowed] = useState(true);
  const [curfew, setCurfew] = useState<BachelorRules['curfew']>('No Curfew');
  const [overnightGuests, setOvernightGuests] = useState<BachelorRules['overnightGuests']>('Allowed Anytime');
  const [oppositeGenderVisitors, setOppositeGenderVisitors] = useState<BachelorRules['oppositeGenderVisitors']>('Allowed Anytime');

  // Step 5: Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'High-Speed Wi-Fi',
    '100% Power Backup',
    'Washing Machine',
    'Dedicated Workstation',
    'Covered Bike Parking'
  ]);
  const [description, setDescription] = useState('');

  // Step 6: Photos & Video
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85'
  ]);
  const [videoUrl, setVideoUrl] = useState('');

  // Step 7: Owner Verification
  const [ownerName, setOwnerName] = useState('Anand Narayan');
  const [ownerPhone, setOwnerPhone] = useState('98450 11223');
  const [ownerRoleDeclaration, setOwnerRoleDeclaration] = useState<'Owner' | 'Caretaker' | 'Existing Flatmate'>('Owner');
  const [agreedToFairTerms, setAgreedToFairTerms] = useState(true);

  // Load auto-saved draft from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.propertyType) setPropertyType(parsed.propertyType);
        if (parsed.locality) setLocality(parsed.locality);
        if (parsed.street) setStreet(parsed.street);
        if (parsed.rent) setRent(parsed.rent);
        if (parsed.deposit) setDeposit(parsed.deposit);
        if (parsed.images && parsed.images.length) setImages(parsed.images);
        setHasRestoredDraft(true);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Auto-save changes to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const draftData = {
      propertyType,
      title,
      bedrooms,
      bathrooms,
      furnishing,
      carpetAreaSqft,
      floor,
      city,
      locality,
      street,
      pincode,
      distanceToHub,
      rent,
      deposit,
      maintenance,
      availableFrom,
      occupancy,
      nonVegAllowed,
      curfew,
      overnightGuests,
      oppositeGenderVisitors,
      selectedAmenities,
      description,
      images,
      ownerName,
      ownerPhone
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));
    } catch {
      // Storage quota safety
    }
  }, [
    propertyType,
    title,
    bedrooms,
    bathrooms,
    furnishing,
    carpetAreaSqft,
    floor,
    city,
    locality,
    street,
    pincode,
    distanceToHub,
    rent,
    deposit,
    maintenance,
    availableFrom,
    occupancy,
    nonVegAllowed,
    curfew,
    overnightGuests,
    oppositeGenderVisitors,
    selectedAmenities,
    description,
    images,
    ownerName,
    ownerPhone
  ]);

  if (!isOpen) return null;

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleAddSamplePhoto = (url: string) => {
    setImages((prev) => [...prev, url]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newUrls: string[] = [];
      files.forEach((file) => {
        const objectUrl = URL.createObjectURL(file);
        newUrls.push(objectUrl);
      });
      setImages((prev) => [...prev, ...newUrls]);
    }
  };

  const handleFinalPublish = () => {
    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      title: title || `${furnishing} ${propertyType} in ${locality || 'Bengaluru'}`,
      propertyType,
      rent: Number(rent),
      deposit: Number(deposit),
      maintenance: Number(maintenance),
      city,
      locality: locality || 'Koramangala',
      street: street || 'Main Access Road',
      pincode: pincode || '560034',
      distanceToHub: distanceToHub || '5 mins to nearest tech park',
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      furnishing,
      occupancy,
      carpetAreaSqft: Number(carpetAreaSqft),
      floor,
      images: images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
      ],
      videoUrl: videoUrl || undefined,
      verification: {
        idVerified: true,
        ownershipConfirmed: true,
        physicallyInspected: false,
        lastAvailabilityCheck: 'Verified just now'
      },
      bachelorRules: {
        nonVegAllowed,
        curfew,
        overnightGuests,
        oppositeGenderVisitors,
        depositMonths: Math.round(Number(deposit) / Math.max(1, Number(rent))),
        brokerage: 'Zero Brokerage'
      },
      amenities: selectedAmenities,
      availableFrom,
      description: description || 'Verified bachelor-friendly space with 0% rejection and transparent house rules.',
      lat: 12.9345 + (Math.random() - 0.5) * 0.05,
      lng: 77.6265 + (Math.random() - 0.5) * 0.05,
      status: 'active',
      verifiedOwner: {
        name: ownerName || 'Verified Landlord',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        responseRate: 'Under 15 mins',
        isDirectOwner: ownerRoleDeclaration === 'Owner',
        phone: ownerPhone ? `+91 ${ownerPhone}` : '+91 98450 11223',
        registeredSince: 'November 2026',
        totalListings: 1
      }
    };

    // Clean up draft from storage on successful publish
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }

    onPublish(newProperty);
    onClose();
  };

  const stepsList = [
    { number: 1, label: 'Category' },
    { number: 2, label: 'Location' },
    { number: 3, label: 'Pricing' },
    { number: 4, label: 'Policies' },
    { number: 5, label: 'Amenities' },
    { number: 6, label: 'Media' },
    { number: 7, label: 'Review' }
  ];

  const availableAmenityOptions = [
    'High-Speed Wi-Fi',
    '100% Power Backup',
    'Split AC',
    'Washing Machine',
    'Dedicated Workstation',
    'Attached Washroom',
    'Private Balcony',
    'Covered Bike Parking',
    'Covered Car Parking',
    'Geyser / Hot Water',
    'Refrigerator',
    'Lift & Elevator',
    'Cook / Maid Setup',
    '24/7 Security CCTV'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200 flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Wizard Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C01E4E] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Step {currentStep} of 7
              </span>
              <span className="text-xs font-bold text-slate-500">
                {stepsList[currentStep - 1].label} Details
              </span>
              {hasRestoredDraft && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Draft Restored
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              List Your Property for Bachelors
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="bg-slate-50 px-4 sm:px-6 py-2.5 border-b border-slate-200 flex items-center justify-between gap-1 overflow-x-auto shrink-0">
          {stepsList.map((step) => (
            <div
              key={step.number}
              onClick={() => {
                if (step.number < currentStep) setCurrentStep(step.number);
              }}
              className={`flex items-center gap-1.5 text-xs font-black cursor-pointer whitespace-nowrap transition-colors ${
                currentStep === step.number
                  ? 'text-[#C01E4E]'
                  : step.number < currentStep
                  ? 'text-emerald-700'
                  : 'text-slate-400'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  currentStep === step.number
                    ? 'bg-[#C01E4E] text-white shadow-xs'
                    : step.number < currentStep
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step.number < currentStep ? '✓' : step.number}
              </div>
              <span className="hidden sm:inline">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Scrollable Step Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-900 text-left">
          
          {/* STEP 1: CATEGORY & SPECS */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Select Property Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {([
                    'Entire Flat',
                    'Independent House',
                    'Private Room',
                    'Shared Room',
                    'Single Bed in PG',
                    'Co-Living Studio'
                  ] as PropertyType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                        propertyType === type
                          ? 'border-[#C01E4E] bg-rose-50 text-[#C01E4E] shadow-2xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="block">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Listing Heading / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spacious 2BHK High-Rise near ITPL Tech Park"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 focus:border-[#C01E4E] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Bedrooms
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none bg-white"
                  >
                    <option value={1}>1 BHK / 1 Room</option>
                    <option value={2}>2 BHK</option>
                    <option value={3}>3 BHK</option>
                    <option value={4}>4 BHK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Bathrooms
                  </label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none bg-white"
                  >
                    <option value={1}>1 Bathroom</option>
                    <option value={2}>2 Bathrooms</option>
                    <option value={3}>3 Bathrooms</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Furnishing Status
                  </label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value as FurnishingType)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none bg-white"
                  >
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Carpet Area (sqft)
                  </label>
                  <input
                    type="number"
                    value={carpetAreaSqft}
                    onChange={(e) => setCarpetAreaSqft(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION & COMMUTE */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  City *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none bg-white"
                >
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Locality / Neighborhood *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kundanahalli, Koramangala 4th Block, HSR Sector 1"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 focus:border-[#C01E4E] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Street Address &amp; Building Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. 60 Feet Main Road, AECS Layout"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Distance to Nearest Hub / Metro
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4 mins to ITPL Tech Park"
                    value={distanceToHub}
                    onChange={(e) => setDistanceToHub(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: RENT & FINANCIALS */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Monthly Rent (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={rent}
                    onChange={(e) => {
                      const r = Number(e.target.value);
                      setRent(r);
                      setDeposit(r * 2); // Default to fair 2 months deposit
                    }}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 focus:border-[#C01E4E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Security Deposit (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none"
                  />
                  <span className="text-[10px] text-emerald-700 font-bold block mt-1">
                    ✓ Recommended: Capped at 2 months for 10x faster tenant occupancy
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Maintenance (₹ / month)
                  </label>
                  <input
                    type="number"
                    value={maintenance}
                    onChange={(e) => setMaintenance(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Available From Date
                  </label>
                  <select
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none bg-white"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="Within 15 Days">Within 15 Days</option>
                    <option value="1st of Next Month">1st of Next Month</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Tenant Occupancy Target
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Any Bachelor', 'Male Bachelors', 'Female Bachelors'] as OccupancyType[]).map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setOccupancy(occ)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                        occupancy === occ
                          ? 'border-[#C01E4E] bg-rose-50 text-[#C01E4E]'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: POLICIES */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 font-medium">
                <strong>Now Ezy 0% Rejection Standard:</strong> Clear, upfront house rules prevent post-visit rejections and awkward gate disagreements.
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Non-Vegetarian Cooking Allowed</span>
                    <span className="text-[11px] text-slate-500">Tenants are allowed to cook / order non-veg food</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNonVegAllowed(!nonVegAllowed)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      nonVegAllowed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {nonVegAllowed ? 'Allowed' : 'Veg Only'}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Gate Curfew / Entry Rule
                  </label>
                  <select
                    value={curfew}
                    onChange={(e) => setCurfew(e.target.value as BachelorRules['curfew'])}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none bg-white"
                  >
                    <option value="No Curfew">No Curfew (24/7 Free Entry)</option>
                    <option value="Flexible (Entry with Key)">Flexible (Main gate key provided)</option>
                    <option value="11:00 PM">11:00 PM Gate Lock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Overnight Friends &amp; Guests
                  </label>
                  <select
                    value={overnightGuests}
                    onChange={(e) => setOvernightGuests(e.target.value as BachelorRules['overnightGuests'])}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none bg-white"
                  >
                    <option value="Allowed Anytime">Allowed Anytime</option>
                    <option value="With Prior Notice">Allowed with Prior Inform</option>
                    <option value="Daytime Only">Daytime Only (No Sleepovers)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Opposite-Gender Visitors
                  </label>
                  <select
                    value={oppositeGenderVisitors}
                    onChange={(e) => setOppositeGenderVisitors(e.target.value as BachelorRules['oppositeGenderVisitors'])}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none bg-white"
                  >
                    <option value="Allowed Anytime">Allowed Anytime</option>
                    <option value="Daytime Only">Daytime Visits Only</option>
                    <option value="Restricted">Restricted</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: AMENITIES & DESCRIPTION */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Select Available Amenities *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableAmenityOptions.map((am) => {
                    const active = selectedAmenities.includes(am);
                    return (
                      <button
                        key={am}
                        type="button"
                        onClick={() => toggleAmenity(am)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                          active
                            ? 'border-[#C01E4E] bg-rose-50 text-[#C01E4E]'
                            : 'border-slate-200 text-slate-700 bg-white'
                        }`}
                      >
                        <span>{am}</span>
                        {active && <Check className="w-3.5 h-3.5 text-[#C01E4E]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Property Description &amp; Highlights
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe proximity to tech parks, society vibe, quiet work hours, or special house highlights..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 focus:border-[#C01E4E] outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 6: PHOTOS & VIDEO */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Upload Property Photos (Bedrooms, Living Area, Kitchen, Washroom)
                </label>
                <div className="p-4 border-2 border-dashed border-slate-300 rounded-2xl text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-800">
                    Click or drag &amp; drop photos from your device
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    High quality real photos get 4x more verified bachelor visits
                  </p>
                </div>
              </div>

              {/* Photo Thumbnails Gallery */}
              {images.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-slate-600 block mb-2">
                    {images.length} Photos Attached (Click to delete):
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden aspect-16/10 border border-slate-200">
                        <img src={img} alt="Property" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 p-1 rounded-md bg-black/70 text-white hover:bg-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Walkthrough Video Option */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Video Walkthrough Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="e.g. YouTube unlisted or Drive walkthrough link"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 7: REVIEW & PUBLISH */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-emerald-900">
                    Ready for Instant Verification &amp; Publishing
                  </h4>
                  <p className="text-[11px] text-emerald-800">
                    Your listing will be live on the Now Ezy bachelor feed immediately.
                  </p>
                </div>
              </div>

              {/* Preview Card */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#C01E4E] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {propertyType}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 mt-1">
                      {title || `${bedrooms}BHK in ${locality || city}`}
                    </h3>
                    <p className="text-xs text-slate-500">{locality}, {city} · {distanceToHub || 'Near Tech Hub'}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-slate-900 font-mono">
                      ₹{Number(rent).toLocaleString()}/mo
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Deposit: ₹{Number(deposit).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-bold border border-slate-200">
                    {furnishing}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-bold border border-slate-200">
                    {occupancy}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white text-emerald-800 font-bold border border-emerald-200">
                    {nonVegAllowed ? 'Non-Veg Allowed' : 'Veg Only'}
                  </span>
                </div>
              </div>

              {/* Owner Contact Confirmation */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Your Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 outline-none"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToFairTerms}
                  onChange={(e) => setAgreedToFairTerms(e.target.checked)}
                  className="w-4 h-4 accent-[#C01E4E] rounded cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-medium">
                  I agree to Now Ezy&apos;s Zero Brokerage &amp; Fair Bachelor Deposit standards.
                </span>
              </label>
            </div>
          )}

        </div>

        {/* Wizard Footer Controls */}
        <div className="p-4 border-t border-slate-100 bg-white shrink-0 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s + 1)}
              className="px-6 py-2.5 bg-[#C01E4E] hover:bg-[#A11840] text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalPublish}
              className="px-6 py-3 bg-gradient-to-r from-[#C01E4E] to-[#E11D48] hover:brightness-105 text-white text-xs sm:text-sm font-black rounded-xl shadow-lg shadow-rose-900/20 transition-all active:scale-98 cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Listing Live</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
