'use client';

import React, { useState } from 'react';
import { Property, PropertyType, FurnishingType, BachelorRules } from '../types';
import {
  X,
  Upload,
  CheckCircle2,
  Building,
  MapPin,
  IndianRupee,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Sparkles,
  Image as ImageIcon,
  Video
} from 'lucide-react';
import { CITIES } from '../data/mockData';

interface HouseListingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishListing: (property: Property) => void;
}

export default function HouseListingFlow({
  isOpen,
  onClose,
  onPublishListing
}: HouseListingFlowProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Basic & Location Info
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Private Room');
  const [rent, setRent] = useState<number>(18000);
  const [deposit, setDeposit] = useState<number>(36000);
  const [maintenance, setMaintenance] = useState<number>(1500);
  const [city, setCity] = useState('Bengaluru');
  const [locality, setLocality] = useState('');
  const [street, setStreet] = useState('');
  const [pincode, setPincode] = useState('');
  const [availableFrom, setAvailableFrom] = useState('Immediate');

  // Step 2: Photos, Optional Video & Crucial Bachelor Tick Boxes
  const [imageFiles, setImageFiles] = useState<string[]>([
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [videoFileUrl, setVideoFileUrl] = useState<string | null>(null);
  const [nonVegAllowed, setNonVegAllowed] = useState(true);
  const [curfew, setCurfew] = useState<BachelorRules['curfew']>('No Curfew');
  const [overnightGuests, setOvernightGuests] = useState<BachelorRules['overnightGuests']>('Allowed Anytime');
  const [oppositeGenderVisitors, setOppositeGenderVisitors] = useState<BachelorRules['oppositeGenderVisitors']>('Allowed Anytime');
  const [furnishing, setFurnishing] = useState<FurnishingType>('Fully Furnished');
  const [description, setDescription] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'High-Speed Wi-Fi',
    '100% Power Backup',
    'Washing Machine',
    'Dedicated Workstation'
  ]);

  if (!isOpen) return null;

  // Handle direct file upload from device
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newUrls: string[] = [];

      files.forEach((file) => {
        const objectUrl = URL.createObjectURL(file);
        newUrls.push(objectUrl);
      });

      setImageFiles((prev) => [...prev, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setVideoFileUrl(objectUrl);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Step 3: Complete and Publish
  const handleFinalPublish = () => {
    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      title: title || 'Bachelor-Friendly Apartment in ' + (locality || city),
      propertyType,
      rent: Number(rent),
      deposit: Number(deposit),
      maintenance: Number(maintenance),
      city,
      locality: locality || 'Koramangala',
      street: street || 'Main Access Road',
      pincode: pincode || '560034',
      distanceToHub: 'Close to tech parks & public transit',
      bedrooms: propertyType.includes('2BHK') ? 2 : propertyType.includes('3BHK') ? 3 : 1,
      bathrooms: 2,
      furnishing,
      occupancy: 'Any Bachelor',
      matchPercentage: 100,
      images: imageFiles.length > 0 ? imageFiles : [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'
      ],
      videoUrl: videoFileUrl || undefined,
      verifiedBachelorFriendly: true,
      verifiedOwner: {
        name: 'You (Verified Owner)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        responseRate: 'Under 10 mins',
        isDirectOwner: true,
        phone: '+91 98000 11223'
      },
      bachelorRules: {
        nonVegAllowed,
        curfew,
        overnightGuests,
        oppositeGenderVisitors,
        depositMonths: 2,
        brokerage: 'Zero Brokerage'
      },
      amenities: selectedAmenities,
      availableFrom,
      description: description || 'Verified bachelor-friendly space with 0% rejection and transparent terms.',
      rating: 5.0,
      reviewsCount: 1,
      lat: 12.9719 + (Math.random() - 0.5) * 0.02,
      lng: 77.7196 + (Math.random() - 0.5) * 0.02
    };

    onPublishListing(newProperty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-5 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border-t sm:border border-slate-200 flex flex-col max-h-[92vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />
        
        {/* Header with Step Progress (1-2, 3 Publish) */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-black tracking-widest text-[#C01E4E] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Step {currentStep} of 3
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {currentStep === 1 && 'Basic & Location Details'}
                {currentStep === 2 && 'Upload Photos & Bachelor Criteria'}
                {currentStep === 3 && 'Review & Publish Listing'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              List Your Property on Now Ezy
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body Based on Step */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* STEP 1: Basic & Location Fix */}
          {currentStep === 1 && (
            <div className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Listing Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spacious Master Bedroom with Balcony in 3BHK"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C01E4E]"
                />
              </div>

              {/* Property Type & Furnishing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
                  >
                    <option value="Private Room">Private Room in Flat</option>
                    <option value="1BHK Studio">1BHK Studio Apartment</option>
                    <option value="2BHK Apartment">2BHK Full Apartment</option>
                    <option value="3BHK Apartment">3BHK Full Apartment</option>
                    <option value="Co-Living / PG">Co-Living / Executive PG</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Furnishing
                  </label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value as FurnishingType)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
                  >
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>

              {/* City & Locality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
                  >
                    {CITIES.filter((c) => c !== 'All Cities').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Locality / Area *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kundanahalli, Koramangala, Indiranagar"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 font-semibold text-slate-900"
                  />
                </div>
              </div>

              {/* Street Name & Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Street Name / Landmark
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 60ft Main Road, Near Kundanahalli Gate"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Pincode
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 560037"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 font-semibold text-slate-900"
                  />
                </div>
              </div>

              {/* Monthly Rent & Security Deposit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Rent (₹/month) *
                  </label>
                  <input
                    type="number"
                    required
                    value={rent}
                    onChange={(e) => setRent(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 font-black text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Deposit (₹, Max 2 Mos)
                  </label>
                  <input
                    type="number"
                    required
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 font-black text-[#C01E4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Maintenance (₹/mo)
                  </label>
                  <input
                    type="number"
                    value={maintenance}
                    onChange={(e) => setMaintenance(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 font-semibold text-slate-800"
                  />
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Device Image Upload & Crucial Bachelor Criteria */}
          {currentStep === 2 && (
            <div className="space-y-5">
              
              {/* Direct Device Image Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Upload Photos from Your Device *
                </label>
                
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-5 text-center hover:border-[#C01E4E] transition-colors bg-slate-50 cursor-pointer relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    Click or Drag to Upload Photos Directly from Mobile / PC
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Upload clear photos of bedrooms, kitchen, and bathroom (PNG, JPG, WebP)
                  </p>
                </div>

                {/* Uploaded Thumbnails Preview */}
                {imageFiles.length > 0 && (
                  <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
                    {imageFiles.map((url, idx) => (
                      <div key={idx} className="relative w-20 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 group">
                        <img src={url} alt="upload" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-md hover:bg-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* OPTIONAL VIDEO WALKTHROUGH UPLOAD (Not Mandatory) */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Property Video Walkthrough
                  </label>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Optional · Not Mandatory
                  </span>
                </div>

                {!videoFileUrl ? (
                  <div className="border-2 border-dashed border-slate-200 hover:border-rose-400 rounded-2xl p-4 text-center bg-rose-50/20 transition-colors relative cursor-pointer group">
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime,video/*"
                      onChange={handleVideoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-rose-200 flex items-center justify-center text-[#C01E4E] group-hover:scale-105 transition-transform">
                        <Video className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                          Attach Room / Flat Video (Optional)
                        </p>
                        <p className="text-[11px] text-slate-500">
                          MP4, MOV, or WebM (up to 50MB) · Helps bachelors take faster rental decisions
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-black aspect-video max-h-56">
                    <video src={videoFileUrl} controls className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={() => setVideoFileUrl(null)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                      title="Remove video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* CRUCIAL BACHELOR CRITERIA TICK BOXES */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C01E4E]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Crucial Bachelor House Criteria
                  </h3>
                </div>

                {/* Non-Veg Allowed (Very Important) */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                  <div>
                    <p className="text-xs font-bold text-slate-900">Non-Veg Food & Cooking</p>
                    <p className="text-[11px] text-slate-500">Is non-vegetarian cooking and food delivery permitted?</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                      <input
                        type="radio"
                        name="nonveg"
                        checked={nonVegAllowed}
                        onChange={() => setNonVegAllowed(true)}
                        className="accent-[#C01E4E]"
                      />
                      <span>Allowed</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                      <input
                        type="radio"
                        name="nonveg"
                        checked={!nonVegAllowed}
                        onChange={() => setNonVegAllowed(false)}
                        className="accent-[#C01E4E]"
                      />
                      <span>Veg Only</span>
                    </label>
                  </div>
                </div>

                {/* Gate / Curfew Rule */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                  <div>
                    <p className="text-xs font-bold text-slate-900">Gate / Curfew Timing</p>
                    <p className="text-[11px] text-slate-500">Can bachelors return late after work or travel?</p>
                  </div>
                  <select
                    value={curfew}
                    onChange={(e) => setCurfew(e.target.value as any)}
                    className="p-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="No Curfew">No Curfew (Keys Provided)</option>
                    <option value="Flexible">Flexible with Security</option>
                    <option value="11:00 PM">11:00 PM Gate Closure</option>
                  </select>
                </div>

                {/* Overnight Guests */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                  <div>
                    <p className="text-xs font-bold text-slate-900">Overnight Guests</p>
                    <p className="text-[11px] text-slate-500">Can friends or family stay over occasionally?</p>
                  </div>
                  <select
                    value={overnightGuests}
                    onChange={(e) => setOvernightGuests(e.target.value as any)}
                    className="p-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Allowed Anytime">Allowed Anytime</option>
                    <option value="With Prior Notice">With Prior Notice</option>
                    <option value="Daytime Only">Daytime Only</option>
                  </select>
                </div>

                {/* Opposite Gender Visitors */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                  <div>
                    <p className="text-xs font-bold text-slate-900">Opposite-Gender Visitors</p>
                    <p className="text-[11px] text-slate-500">Are female/male colleagues and friends allowed to visit?</p>
                  </div>
                  <select
                    value={oppositeGenderVisitors}
                    onChange={(e) => setOppositeGenderVisitors(e.target.value as any)}
                    className="p-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Allowed">Allowed</option>
                    <option value="Daytime Only">Daytime Only</option>
                    <option value="Restricted">Restricted</option>
                  </select>
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  About the Home & Flatmates
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe proximity to metro/tech parks, flat vibe, and furnishing..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 font-medium"
                />
              </div>

            </div>
          )}

          {/* STEP 3: Review & Publish */}
          {currentStep === 3 && (
            <div className="space-y-4">
              
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-emerald-900">100% Bachelor Verified Quality Guarantee</p>
                  <p className="text-emerald-700">Your listing will be instantly activated and highlighted across the platform with 0% rejection guarantee.</p>
                </div>
              </div>

              {/* Summary Card Preview */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex gap-3">
                  <img
                    src={imageFiles[0]}
                    alt="preview"
                    className="w-24 h-24 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#C01E4E] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      100% Match
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{title || 'Bachelor Apartment'}</h4>
                    <p className="text-xs text-slate-500">{locality}, {city} ({pincode || '560037'})</p>
                    <p className="text-sm font-black text-slate-900 mt-1">
                      ₹{rent.toLocaleString()}/mo · <span className="text-xs text-slate-500 font-normal">Deposit: ₹{deposit.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-200 text-[11px] font-semibold text-slate-700">
                  <div>Non-Veg: <strong className="text-slate-900">{nonVegAllowed ? 'Allowed' : 'Veg Only'}</strong></div>
                  <div>Curfew: <strong className="text-slate-900">{curfew}</strong></div>
                  <div>Guests: <strong className="text-slate-900">{overnightGuests}</strong></div>
                  <div>Brokerage: <strong className="text-emerald-700">₹0 (Zero)</strong></div>
                </div>
              </div>

              {/* Bachelor Charter Agreement */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                <p className="font-bold text-slate-900 mb-1">Owner Commitment</p>
                <p className="leading-relaxed">
                  By clicking Publish, you confirm that you will treat bachelor tenants respectfully with no arbitrary curfew lockouts or unwarranted deposit deductions.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={() => {
                if (currentStep === 1 && !locality) {
                  alert('Please enter a locality/area name.');
                  return;
                }
                setCurrentStep((prev) => (prev + 1) as any);
              }}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#C01E4E] hover:bg-[#9F1239] text-white text-xs font-bold shadow-md shadow-rose-900/15 transition-all cursor-pointer"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalPublish}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#C01E4E] hover:bg-[#9F1239] text-white text-sm font-black shadow-lg shadow-rose-900/25 transition-all cursor-pointer active:scale-97"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Listing Now</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
