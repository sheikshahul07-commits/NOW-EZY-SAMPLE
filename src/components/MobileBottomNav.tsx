'use client';

import React from 'react';
import { Search, Navigation, Plus, Users, User } from 'lucide-react';
import { UserRole } from '@/types';

interface MobileBottomNavProps {
  currentRole: UserRole | null;
  currentUser: { name: string; phone?: string; email?: string } | null;
  activeTab?: 'homes' | 'map' | 'flatmates';
  onOpenLogin: () => void;
  onOpenManageAccount: () => void;
  onOpenRadar: () => void;
  onOpenListFlow: () => void;
  onScrollToFeed?: () => void;
  onScrollToFlatmates?: () => void;
}

export default function MobileBottomNav({
  currentRole,
  currentUser,
  activeTab = 'homes',
  onOpenLogin,
  onOpenManageAccount,
  onOpenRadar,
  onOpenListFlow,
  onScrollToFeed,
  onScrollToFlatmates
}: MobileBottomNavProps) {
  const handleFeedClick = () => {
    if (onScrollToFeed) {
      onScrollToFeed();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFlatmateClick = () => {
    if (onScrollToFlatmates) {
      onScrollToFlatmates();
    }
  };

  const isHomesActive = activeTab === 'homes';
  const isRadarActive = activeTab === 'map';
  const isFlatmatesActive = activeTab === 'flatmates';

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 shadow-[0_-2px_15px_rgba(0,0,0,0.06)] px-2 pt-1"
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        
        {/* 1. Homes */}
        <button
          type="button"
          onClick={handleFeedClick}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
            isHomesActive ? 'text-[#C01E4E]' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Homes"
        >
          <Search className={`w-5 h-5 ${isHomesActive ? 'text-[#C01E4E] stroke-[2.5]' : 'text-slate-400'}`} />
          <span className={`text-[10px] mt-1 tracking-tight ${isHomesActive ? 'font-black text-[#C01E4E]' : 'font-semibold text-slate-600'}`}>
            Homes
          </span>
        </button>

        {/* 2. EZY Radar */}
        <button
          type="button"
          onClick={onOpenRadar}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer relative ${
            isRadarActive ? 'text-[#C01E4E]' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="EZY Radar"
        >
          <div className="relative">
            <Navigation className={`w-5 h-5 ${isRadarActive ? 'text-[#C01E4E] stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C01E4E]" />
          </div>
          <span className={`text-[10px] mt-1 tracking-tight ${isRadarActive ? 'font-black text-[#C01E4E]' : 'font-semibold text-slate-600'}`}>
            EZY Radar
          </span>
        </button>

        {/* 3. Central Post (+) Button (Slightly elevated, clean border, does not obscure content) */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-4">
          <button
            type="button"
            onClick={onOpenListFlow}
            className="w-11 h-11 rounded-full bg-[#C01E4E] active:bg-[#A11840] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer border-2 border-white ring-1 ring-slate-100"
            aria-label="Post Property FREE"
          >
            <Plus className="w-5 h-5 stroke-[2.8]" />
          </button>
          <span className="text-[9px] font-bold text-slate-600 mt-0.5 tracking-tight">Post</span>
        </div>

        {/* 4. Roommates */}
        <button
          type="button"
          onClick={handleFlatmateClick}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
            isFlatmatesActive ? 'text-[#C01E4E]' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Roommates"
        >
          <Users className={`w-5 h-5 ${isFlatmatesActive ? 'text-[#C01E4E] stroke-[2.5]' : 'text-slate-400'}`} />
          <span className={`text-[10px] mt-1 tracking-tight ${isFlatmatesActive ? 'font-black text-[#C01E4E]' : 'font-semibold text-slate-600'}`}>
            Roommates
          </span>
        </button>

        {/* 5. Profile */}
        <button
          type="button"
          onClick={() => {
            if (currentUser) {
              onOpenManageAccount();
            } else {
              onOpenLogin();
            }
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          aria-label={currentUser ? 'Manage Account' : 'Login'}
        >
          {currentUser ? (
            <div className="w-5 h-5 rounded-full bg-rose-100 text-[#C01E4E] font-black text-[10px] flex items-center justify-center border border-rose-300">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <User className="w-5 h-5 text-slate-400" />
          )}
          <span className="text-[10px] font-semibold text-slate-600 mt-1 tracking-tight">
            Profile
          </span>
        </button>

      </div>
    </nav>
  );
}
