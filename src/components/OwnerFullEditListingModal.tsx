'use client';

import React, { useState } from 'react';
import {
  X,
  Upload,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  ShieldCheck,
  Building,
  Video,
  Star,
  MapPin,
  Save,
  CheckSquare,
  Square
} from 'lucide-react';
import { Property, PropertyType, FurnishingType, BachelorRules } from '../types';

interface OwnerFullEditListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  onSave: (updated: Property) => void;
}

export const ALL_AMENITIES = [
  'High-Speed Wi-Fi',
  '100% Power Backup',
  'Washing Machine',
  'Air Conditioner',
  'Dedicated Workstation',
  'Covered Bike Parking',
  'Car Parking',
  '24/7 Security Guard',
  'RO Water Purifier',
  'Refrigerator',
  'Modular Kitchen',
  'Geyser / Hot Water',
  'Balcony / Terrace',
  'Elevator (Lift)'
];

export default function OwnerFullEditListingModal({
  isOpen,
  onClose,
  property,
  onSave
}: OwnerFullEditListingModalProps) {
  if (!isOpen || !property) return null;

  return (
    <FullEditForm
      key={property.id}
      property={property}
      onClose={onClose}
      onSave={onSave}
    />
  );
}

function FullEditForm({
  property,
  onClose,
  onSave
}: {
  property: Property;
  onClose: () => void;
  onSave: (updated: Property) => void;
}) {
  const [title, setTitle] = useState(property.title);
  const [propertyType, setPropertyType] = useState<PropertyType>(property.propertyType);
  const [furnishing, setFurnishing] = useState<FurnishingType>(property.furnishing);
  const [city, setCity] = useState(property.city);
  const [locality, setLocality] = useState(property.locality);
  const [street, setStreet] = useState(property.street || '');
  const [pincode, setPincode] = useState(property.pincode || '');

  const [rent, setRent] = useState<number>(property.rent);
  const [deposit, setDeposit] = useState<number>(property.deposit);
  const [maintenance, setMaintenance] = useState<number>(property.maintenance);

  const [photos, setPhotos] = useState<string[]>(property.images || []);
  const [videoUrl, setVideoUrl] = useState<string | null>(property.videoUrl || null);
  const [description, setDescription] = useState(property.description || '');

  const [amenities, setAmenities] = useState<string[]>(property.amenities || []);
  const [nonVegAllowed, setNonVegAllowed] = useState(property.bachelorRules.nonVegAllowed);
  const [curfew, setCurfew] = useState<BachelorRules['curfew']>(property.bachelorRules.curfew);
  const [overnightGuests, setOvernightGuests] = useState<BachelorRules['overnightGuests']>(property.bachelorRules.overnightGuests);
  const [oppositeGenderVisitors, setOppositeGenderVisitors] = useState<BachelorRules['oppositeGenderVisitors']>(property.bachelorRules.oppositeGenderVisitors);

  const [isSavedBanner, setIsSavedBanner] = useState(false);

  // Add photos from device
  const handleAddPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrls = Array.from(e.target.files).map((f) => URL.createObjectURL(f));
      setPhotos((prev) => [...prev, ...newUrls]);
    }
  };

  // Remove photo
  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Make 1st (Cover) photo
  const handleMakeCoverPhoto = (index: number) => {
    if (index === 0) return;
    setPhotos((prev) => {
      const copy = [...prev];
      const [selected] = copy.splice(index, 1);
      copy.unshift(selected);
      return copy;
    });
  };

  // Move photo left/right
  const handleMovePhoto = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= photos.length) return;
    setPhotos((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  // Toggle amenity
  const toggleAmenity = (item: string) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  // Save changes
  const handleSaveAndActivate = () => {
    if (!title.trim()) {
      alert('Please enter a listing title.');
      return;
    }
    if (!locality.trim()) {
      alert('Please enter locality.');
      return;
    }
    if (photos.length === 0) {
      alert('Please include at least 1 photo of the flat.');
      return;
    }

    const updated: Property = {
      ...property,
      title: title.trim(),
      propertyType,
      furnishing,
      city: city.trim(),
      locality: locality.trim(),
      street: street.trim(),
      pincode: pincode.trim(),
      rent: Number(rent),
      deposit: Number(deposit),
      maintenance: Number(maintenance),
      images: photos,
      videoUrl: videoUrl || undefined,
      description: description.trim(),
      amenities,
      status: 'active', // Ensure active status
      bachelorRules: {
        ...property.bachelorRules,
        nonVegAllowed,
        curfew,
        overnightGuests,
        oppositeGenderVisitors
      }
    };

    onSave(updated);
    setIsSavedBanner(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  Full Listing Editor
                </h2>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  All Options in One Page
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Edit title, photos, order, description, amenities, and bachelor house rules.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* SECTION 1: TITLE & BASIC DETAILS */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C01E4E]" />
                <span>1. Property Title &amp; Configuration</span>
              </h3>
            </div>

            {/* Title / Heading */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Listing Heading / Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Spacious 1BHK / Studio for Tech Professionals"
                className="w-full px-4 py-3 text-sm font-bold text-slate-900 rounded-xl border border-slate-300 focus:border-[#C01E4E] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl border border-slate-300 bg-white"
                >
                  <option value="Private Room">Private Room in Flat</option>
                  <option value="1BHK Studio">1BHK Studio Apartment</option>
                  <option value="2BHK Apartment">2BHK Apartment</option>
                  <option value="3BHK Apartment">3BHK Apartment</option>
                  <option value="Co-Living / PG">Co-Living / PG</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Furnishing Status
                </label>
                <select
                  value={furnishing}
                  onChange={(e) => setFurnishing(e.target.value as FurnishingType)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl border border-slate-300 bg-white"
                >
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
            </div>

            {/* Location Details */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Locality / Area *
                </label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Street / Landmark
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300"
                />
              </div>
            </div>

            {/* Financial Terms */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Monthly Rent (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={rent}
                  onChange={(e) => setRent(Number(e.target.value))}
                  className="w-full px-3 py-2 text-base font-black text-slate-900 rounded-lg border border-slate-300"
                />
              </div>

              <div className="p-3.5 bg-rose-50/60 rounded-2xl border border-rose-200">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Security Deposit (₹)
                  </label>
                  <span className="text-[10px] font-bold text-[#C01E4E]">Max 2 Mos</span>
                </div>
                <input
                  type="number"
                  required
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-full px-3 py-2 text-base font-black text-[#C01E4E] rounded-lg border border-rose-300"
                />
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Maintenance (₹/mo)
                </label>
                <input
                  type="number"
                  value={maintenance}
                  onChange={(e) => setMaintenance(Number(e.target.value))}
                  className="w-full px-3 py-2 text-base font-bold text-slate-800 rounded-lg border border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: PHOTOS MANAGEMENT & REORDERING (DRAG / SET 1ST, 2ND, REMOVE, ADD) */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C01E4E]" />
                <span>2. Photos &amp; Video Media ({photos.length} Photos)</span>
              </h3>
              <label className="px-3.5 py-1.5 rounded-xl bg-[#C01E4E] hover:bg-[#A11840] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs">
                <Upload className="w-3.5 h-3.5" />
                <span>Add More Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleAddPhotos}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-xs text-slate-500">
              The 1st photo is used as the primary cover image across search results. Tap <strong>&quot;Set as 1st Cover&quot;</strong> or reorder using arrows.
            </p>

            {/* Photo Grid with Interactive Controls */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {photos.map((img, idx) => (
                <div
                  key={idx}
                  className={`group relative rounded-2xl overflow-hidden border-2 transition-all bg-slate-100 aspect-4/3 flex flex-col justify-between p-2 ${
                    idx === 0
                      ? 'border-[#C01E4E] ring-2 ring-rose-200 shadow-md'
                      : 'border-slate-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Photo ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover -z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                      idx === 0
                        ? 'bg-[#C01E4E] text-white'
                        : 'bg-black/60 text-white'
                    }`}>
                      {idx === 0 ? '★ 1st (Cover)' : `#${idx + 1}`}
                    </span>

                    {/* Delete Photo Button */}
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Controls: Reorder Left / Right & Set Cover */}
                  <div className="relative z-10 flex items-center justify-between gap-1">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMovePhoto(idx, idx - 1)}
                        className="p-1 rounded bg-black/60 disabled:opacity-30 text-white hover:bg-black text-[10px] cursor-pointer"
                        title="Move Left"
                      >
                        ◀
                      </button>
                      <button
                        type="button"
                        disabled={idx === photos.length - 1}
                        onClick={() => handleMovePhoto(idx, idx + 1)}
                        className="p-1 rounded bg-black/60 disabled:opacity-30 text-white hover:bg-black text-[10px] cursor-pointer"
                        title="Move Right"
                      >
                        ▶
                      </button>
                    </div>

                    {idx !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleMakeCoverPhoto(idx)}
                        className="px-2 py-0.5 rounded bg-white text-slate-900 text-[10px] font-black hover:bg-[#C01E4E] hover:text-white transition-colors cursor-pointer"
                      >
                        Make 1st
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Optional Video Walkthrough */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C01E4E] flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">
                    Property Video Walkthrough (Optional)
                  </strong>
                  <span className="text-[11px] text-slate-500 block">
                    {videoUrl ? 'Video attached to listing' : 'No video attached'}
                  </span>
                </div>
              </div>

              {videoUrl ? (
                <button
                  type="button"
                  onClick={() => setVideoUrl(null)}
                  className="px-3 py-1.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-100 text-xs font-bold cursor-pointer"
                >
                  Remove Video
                </button>
              ) : (
                <label className="px-3.5 py-1.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Attach Video (.mp4 / .mov)</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setVideoUrl(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* SECTION 3: DESCRIPTION */}
          <div className="space-y-2">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C01E4E]" />
              <span>3. Property Description &amp; Society Rules</span>
            </h3>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your flat, proximity to tech parks, metro stations, cooking facilities, and any society guidelines..."
              className="w-full p-4 text-xs sm:text-sm font-medium text-slate-800 rounded-2xl border border-slate-300 focus:border-[#C01E4E] outline-none leading-relaxed"
            />
          </div>

          {/* SECTION 4: HOUSE AMENITIES */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C01E4E]" />
              <span>4. House Amenities ({amenities.length} Selected)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {ALL_AMENITIES.map((item) => {
                const selected = amenities.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleAmenity(item)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      selected
                        ? 'border-[#C01E4E] bg-rose-50/80 text-[#C01E4E] shadow-2xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {selected ? (
                      <CheckSquare className="w-4 h-4 text-[#C01E4E] shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                    <span className="truncate">{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 5: CRUCIAL BACHELOR RULES */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C01E4E]" />
              <span>5. Transparent Bachelor Rules &amp; Respect Charter</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Non-Veg Allowed */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Non-Veg Cooking &amp; Food Delivery *
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNonVegAllowed(true)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      nonVegAllowed
                        ? 'bg-[#C01E4E] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    Allowed
                  </button>
                  <button
                    type="button"
                    onClick={() => setNonVegAllowed(false)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      !nonVegAllowed
                        ? 'bg-[#C01E4E] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    Pure Veg Only
                  </button>
                </div>
              </div>

              {/* Curfew */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Gate / Curfew Timing
                </label>
                <select
                  value={curfew}
                  onChange={(e) => setCurfew(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white"
                >
                  <option value="No Curfew">No Curfew (Keys Provided)</option>
                  <option value="Flexible">Flexible (Inform Security)</option>
                  <option value="11:00 PM">11:00 PM Gate Closure</option>
                </select>
              </div>

              {/* Overnight Guests */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Overnight Guests
                </label>
                <select
                  value={overnightGuests}
                  onChange={(e) => setOvernightGuests(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white"
                >
                  <option value="Allowed Anytime">Allowed Anytime</option>
                  <option value="With Prior Notice">With Prior Notice</option>
                  <option value="Daytime Only">Daytime Only</option>
                </select>
              </div>

              {/* Opposite Gender Visitors */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Opposite-Gender Visitors
                </label>
                <select
                  value={oppositeGenderVisitors}
                  onChange={(e) => setOppositeGenderVisitors(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white"
                >
                  <option value="Allowed">Allowed</option>
                  <option value="Daytime Only">Daytime Only (Until 9 PM)</option>
                  <option value="Restricted">Restricted</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Sticky Bottom Bar with Save & Active Listing Button */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white sticky bottom-0 z-20 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Saving will activate listing on platform feed immediately.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveAndActivate}
              className="px-7 py-2.5 rounded-xl bg-[#C01E4E] hover:bg-[#A11840] text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg shadow-rose-900/20 transition-all active:scale-97 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save &amp; Active Listing</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
