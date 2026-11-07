'use client';

import React, { useState, useMemo } from 'react';
import { FlatmateProfile, HabitPreferences, RoommateJourney, RoommateRequest } from '../types';
import { calculateCompatibility } from '../utils/compatibility';
import {
  Sparkles,
  MapPin,
  Briefcase,
  MessageSquare,
  Check,
  Clock,
  Utensils,
  Laptop,
  Users,
  Home,
  Plus,
  Send,
  X,
  CheckCircle2,
  Phone
} from 'lucide-react';

interface FlatmateMatcherProps {
  flatmates: FlatmateProfile[];
  selectedCity: string;
  currentUser: { name: string; phone?: string; email?: string } | null;
  onOpenLogin: () => void;
  onAddNewProfile?: (profile: FlatmateProfile) => void;
}

export default function FlatmateMatcher({
  flatmates,
  selectedCity,
  currentUser,
  onOpenLogin,
  onAddNewProfile
}: FlatmateMatcherProps) {
  // Active Journey Tab:
  // Journey 1: 'has_room_in_flat' (Find a room in an existing flat)
  // Journey 2: 'team_up_to_rent' (Find compatible bachelors to jointly rent an entire flat)
  const [activeJourney, setActiveJourney] = useState<RoommateJourney>('has_room_in_flat');

  // Lifestyle Filter Preferences
  const [myHabits, setMyHabits] = useState<HabitPreferences>({
    sleepSchedule: 'Night Owl',
    diet: 'Non-Vegetarian',
    workStyle: 'Hybrid',
    cleanliness: 4
  });

  const [genderFilter, setGenderFilter] = useState<'All' | 'Male' | 'Female'>('All');

  // Modals & Request state
  const [isCreateProfileOpen, setIsCreateProfileOpen] = useState(false);
  const [selectedTargetProfile, setSelectedTargetProfile] = useState<FlatmateProfile | null>(null);
  const [requestNote, setRequestNote] = useState('');
  const [sentRequests, setSentRequests] = useState<RoommateRequest[]>([]);
  const [activeChatProfile, setActiveChatProfile] = useState<FlatmateProfile | null>(null);

  // New Profile Form State
  const [newName, setNewName] = useState(currentUser?.name || '');
  const [newAge, setNewAge] = useState(24);
  const [newGender, setNewGender] = useState<'Male' | 'Female'>('Male');
  const [newOccupation, setNewOccupation] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newBudgetMin, setNewBudgetMin] = useState(15000);
  const [newBudgetMax, setNewBudgetMax] = useState(22000);
  const [newCity, setNewCity] = useState(selectedCity === 'All Cities' ? 'Bengaluru' : selectedCity);
  const [newLocalities, setNewLocalities] = useState('Koramangala, HSR Layout');
  const [newBio, setNewBio] = useState('');
  const [newSleep, setNewSleep] = useState<HabitPreferences['sleepSchedule']>('Night Owl');
  const [newDiet, setNewDiet] = useState<HabitPreferences['diet']>('Non-Vegetarian');
  const [newWork, setNewWork] = useState<HabitPreferences['workStyle']>('Hybrid');
  const [newCleanliness, setNewCleanliness] = useState(4);

  // Filter profiles based on active journey, city, gender, and calculate compatibility
  const filteredProfiles = useMemo(() => {
    return flatmates
      .filter((mate) => {
        if (mate.journeyType !== activeJourney) return false;
        if (selectedCity !== 'All Cities' && mate.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }
        if (genderFilter !== 'All' && mate.gender !== genderFilter) {
          return false;
        }
        return true;
      })
      .map((mate) => {
        const compatibility = calculateCompatibility(myHabits, mate.habits);
        return {
          ...mate,
          compatibility
        };
      })
      .sort((a, b) => b.compatibility.score - a.compatibility.score);
  }, [flatmates, activeJourney, selectedCity, genderFilter, myHabits]);

  const handleOpenRequestModal = (mate: FlatmateProfile) => {
    if (!currentUser) {
      onOpenLogin();
      return;
    }
    setSelectedTargetProfile(mate);
    setRequestNote(
      activeJourney === 'has_room_in_flat'
        ? `Hi ${mate.name.split(' ')[0]}, I'm interested in the vacant room at your flat in ${mate.flatDetails?.locality || mate.city}. Would love to schedule a visit!`
        : `Hi ${mate.name.split(' ')[0]}, our work routines and budget match closely. Let's team up to check out 2BHK/3BHK flats together!`
    );
  };

  const handleSendRequest = () => {
    if (!selectedTargetProfile) return;
    const req: RoommateRequest = {
      id: `req-${Date.now()}`,
      senderId: 'user-current',
      senderName: currentUser?.name || 'Rahul Sharma',
      senderPhone: currentUser?.phone || '+91 98765 43210',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      targetProfileId: selectedTargetProfile.id,
      targetProfileName: selectedTargetProfile.name,
      message: requestNote,
      status: 'accepted', // For high-conversion instant demo connect
      sentAt: 'Just now'
    };

    setSentRequests((prev) => [req, ...prev]);
    const target = selectedTargetProfile;
    setSelectedTargetProfile(null);
    setActiveChatProfile(target);
  };

  const handleCreateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProfile: FlatmateProfile = {
      id: `mate-${Date.now()}`,
      name: newName || 'You',
      age: Number(newAge),
      gender: newGender,
      occupation: newOccupation || 'Software Professional',
      companyOrCollege: newCompany || 'Tech Startup',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      budgetMin: Number(newBudgetMin),
      budgetMax: Number(newBudgetMax),
      city: newCity,
      preferredLocalities: newLocalities.split(',').map((s) => s.trim()),
      targetMoveIn: 'Immediate',
      habits: {
        sleepSchedule: newSleep,
        diet: newDiet,
        workStyle: newWork,
        cleanliness: newCleanliness
      },
      bio: newBio || 'Working professional looking for verified flatmates with mutual respect and cleanliness.',
      journeyType: activeJourney,
      verifiedIdentity: true,
      contactPhone: currentUser?.phone || '+91 98765 43210'
    };

    if (onAddNewProfile) {
      onAddNewProfile(newProfile);
    }
    setIsCreateProfileOpen(false);
    alert('Your roommate profile is live on Now Ezy!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-900 text-left">
      
      {/* Network Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[#C01E4E] text-xs font-black uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Dedicated Bachelor Roommate Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Find Your Ideal Flatmate by Routine &amp; Budget
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Connect with verified working professionals and students. No brokerage.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!currentUser) onOpenLogin();
            else setIsCreateProfileOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C01E4E] hover:bg-[#A11840] text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition-all active:scale-98 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Roommate Profile</span>
        </button>
      </div>

      {/* 2 DISTINCT JOURNEY TABS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setActiveJourney('has_room_in_flat')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
            activeJourney === 'has_room_in_flat'
              ? 'border-[#C01E4E] bg-rose-50/60 shadow-xs'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            activeJourney === 'has_room_in_flat' ? 'bg-[#C01E4E] text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            <Home className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900">
                1. Find a Room in an Existing Flat
              </span>
              {activeJourney === 'has_room_in_flat' && (
                <span className="text-[10px] font-black uppercase text-[#C01E4E] bg-white px-2 py-0.5 rounded border border-rose-200">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Explore vacant rooms in flats already leased by bachelors. Ready to move in.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveJourney('team_up_to_rent')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
            activeJourney === 'team_up_to_rent'
              ? 'border-[#C01E4E] bg-rose-50/60 shadow-xs'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            activeJourney === 'team_up_to_rent' ? 'bg-[#C01E4E] text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900">
                2. Team Up to Rent a New Flat
              </span>
              {activeJourney === 'team_up_to_rent' && (
                <span className="text-[10px] font-black uppercase text-[#C01E4E] bg-white px-2 py-0.5 rounded border border-rose-200">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Find compatible bachelors with similar work and sleep routines to jointly rent a 2BHK/3BHK.
            </p>
          </div>
        </button>
      </div>

      {/* Routine & Lifestyle Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <Clock className="w-4 h-4 text-[#C01E4E]" />
            <span>My Sleep:</span>
            {(['Night Owl', 'Early Bird', 'Flexible'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setMyHabits({ ...myHabits, sleepSchedule: s })}
                className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  myHabits.sleepSchedule === s
                    ? 'bg-[#C01E4E] text-white border-[#C01E4E]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 font-bold text-slate-700">
            <Utensils className="w-4 h-4 text-emerald-600" />
            <span>Diet:</span>
            {(['Non-Vegetarian', 'Pure Vegetarian', 'Eggetarian'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setMyHabits({ ...myHabits, diet: d })}
                className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  myHabits.diet === d
                    ? 'bg-[#C01E4E] text-white border-[#C01E4E]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {d === 'Non-Vegetarian' ? 'Non-Veg' : d === 'Pure Vegetarian' ? 'Veg' : 'Egg'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 font-bold text-slate-700">
            <span>Gender:</span>
            {(['All', 'Male', 'Female'] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGenderFilter(g)}
                className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  genderFilter === g
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredProfiles.map((mate) => {
          const comp = mate.compatibility;
          const hasRequested = sentRequests.some((r) => r.targetProfileId === mate.id);

          return (
            <div
              key={mate.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header: Photo, Name, Company, Match Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={mate.avatar}
                      alt={mate.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-black text-slate-900 text-base">
                          {mate.name}, {mate.age}
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          ID Verified
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {mate.occupation} @ <strong className="text-slate-700">{mate.companyOrCollege}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Compatibility Badge */}
                  <span className="text-xs font-black text-[#C01E4E] bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200 shrink-0">
                    {comp.score}% Match
                  </span>
                </div>

                {/* Journey 1 Specifics: Existing Flat Preview */}
                {mate.journeyType === 'has_room_in_flat' && mate.flatDetails && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-3 text-xs space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                      Available Room in Existing Flat
                    </span>
                    <strong className="text-slate-900 block text-xs">
                      {mate.flatDetails.flatTitle}
                    </strong>
                    <div className="flex items-center justify-between text-slate-600 font-medium pt-1">
                      <span>{mate.flatDetails.roomType} in {mate.flatDetails.locality}</span>
                      <strong className="text-slate-900 font-mono">₹{mate.flatDetails.rentPerPerson.toLocaleString()} / mo</strong>
                    </div>
                  </div>
                )}

                {/* Journey 2 Specifics: Budget & Preferred Localities */}
                {mate.journeyType === 'team_up_to_rent' && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-3 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase text-slate-500">
                        Targeting to Lease 2BHK/3BHK:
                      </span>
                      <strong className="text-slate-900 font-mono">
                        Budget: ₹{(mate.budgetMin / 1000).toFixed(0)}k–₹{(mate.budgetMax / 1000).toFixed(0)}k/mo
                      </strong>
                    </div>
                    <p className="text-slate-600">
                      Localities: <strong className="text-slate-800">{mate.preferredLocalities.join(', ')}</strong> ({mate.city})
                    </p>
                  </div>
                )}

                {/* Bio */}
                <p className="text-xs text-slate-600 italic mb-3">
                  &ldquo;{mate.bio}&rdquo;
                </p>

                {/* Matched Traits */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {comp.matchedTraits.map((trait, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{trait}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  Move-in: <strong>{mate.targetMoveIn}</strong>
                </span>

                {hasRequested ? (
                  <button
                    type="button"
                    onClick={() => setActiveChatProfile(mate)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Chat</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleOpenRequestModal(mate)}
                    className="px-4 py-2 bg-[#C01E4E] hover:bg-[#A11840] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Connect with {mate.name.split(' ')[0]}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: Send Roommate Request */}
      {selectedTargetProfile && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-slate-200 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-base text-slate-900">
                Connect with {selectedTargetProfile.name}
              </h3>
              <button
                onClick={() => setSelectedTargetProfile(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Send a personalized message introducing yourself. Once connected, you can coordinate apartment visits together.
            </p>

            <textarea
              rows={4}
              value={requestNote}
              onChange={(e) => setRequestNote(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold outline-none focus:border-[#C01E4E] mb-4"
            />

            <button
              type="button"
              onClick={handleSendRequest}
              className="w-full py-3 bg-[#C01E4E] hover:bg-[#A11840] text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Roommate Introduction</span>
            </button>
          </div>
        </div>
      )}

      {/* DRAWER: Active Roommate Chat & Direct Connect */}
      {activeChatProfile && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-slate-200 text-left space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={activeChatProfile.avatar}
                  alt={activeChatProfile.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-black text-sm text-slate-900">{activeChatProfile.name}</h3>
                  <span className="text-[11px] text-emerald-700 font-bold">Mutual Connection Active</span>
                </div>
              </div>
              <button
                onClick={() => setActiveChatProfile(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <span className="font-black block">Connection Request Sent!</span>
              <p>You can call or message {activeChatProfile.name.split(' ')[0]} directly to arrange a flat visit or coffee meetup.</p>
            </div>

            <div className="space-y-2">
              <a
                href={`https://wa.me/${activeChatProfile.contactPhone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(activeChatProfile.name)},%20I%20saw%20your%20roommate%20profile%20on%20Now%20Ezy!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${activeChatProfile.contactPhone}`}
                className="w-full py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call ({activeChatProfile.contactPhone})</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Post Roommate Profile */}
      {isCreateProfileOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-slate-200 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-base sm:text-lg text-slate-900">
                Create Your Bachelor Roommate Profile
              </h3>
              <button
                onClick={() => setIsCreateProfileOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Age &amp; Gender</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={newAge}
                      onChange={(e) => setNewAge(Number(e.target.value))}
                      className="w-16 p-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
                    />
                    <select
                      value={newGender}
                      onChange={(e) => setNewGender(e.target.value as 'Male' | 'Female')}
                      className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Occupation</label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend Developer"
                    value={newOccupation}
                    onChange={(e) => setNewOccupation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Company / College</label>
                  <input
                    type="text"
                    placeholder="e.g. Infosys / Christ Univ"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Target Monthly Budget (₹)</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={newBudgetMin}
                    onChange={(e) => setNewBudgetMin(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={newBudgetMax}
                    onChange={(e) => setNewBudgetMax(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Preferred Localities</label>
                <input
                  type="text"
                  placeholder="e.g. Koramangala, HSR Layout, Indiranagar"
                  value={newLocalities}
                  onChange={(e) => setNewLocalities(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Sleep Schedule</label>
                  <select
                    value={newSleep}
                    onChange={(e) => setNewSleep(e.target.value as HabitPreferences['sleepSchedule'])}
                    className="w-full p-2 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                  >
                    <option value="Night Owl">Night Owl</option>
                    <option value="Early Bird">Early Bird</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Diet Routine</label>
                  <select
                    value={newDiet}
                    onChange={(e) => setNewDiet(e.target.value as HabitPreferences['diet'])}
                    className="w-full p-2 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                  >
                    <option value="Non-Vegetarian">Non-Veg</option>
                    <option value="Pure Vegetarian">Veg</option>
                    <option value="Eggetarian">Eggetarian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Work Style</label>
                  <select
                    value={newWork}
                    onChange={(e) => setNewWork(e.target.value as HabitPreferences['workStyle'])}
                    className="w-full p-2 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote (WFH)">WFH</option>
                    <option value="In-Office">Office</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">About Yourself &amp; Expectations</label>
                <textarea
                  rows={3}
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  placeholder="Share your hobbies, work timings, and what you expect in a shared living space..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C01E4E] hover:bg-[#A11840] text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                Publish Roommate Profile
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
