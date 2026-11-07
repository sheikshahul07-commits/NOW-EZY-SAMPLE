'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { INITIAL_PROPERTIES } from '../../../../data/mockData';
import { Property } from '../../../../types';
import OwnerFullEditListingModal from '../../../../components/OwnerFullEditListingModal';
import { ArrowLeft } from 'lucide-react';

function EditListingContent() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const found = INITIAL_PROPERTIES.find((p) => p.id === id) || INITIAL_PROPERTIES[0];
    setProperty(found);
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#C01E4E] border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-sm font-bold text-slate-600">Loading Listing Editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <a href="/" className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <img src="/brand/logo.png" alt="now ezy" className="h-7 w-auto object-contain" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">Editing Listing:</span>
          <span className="text-xs font-black text-slate-900 max-w-[180px] sm:max-w-xs truncate">
            {property.title}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
            Active
          </span>
        </div>
      </header>

      {/* Editor Modal opened as Full View */}
      <div className="flex-1">
        <OwnerFullEditListingModal
          isOpen={true}
          property={property}
          onClose={() => router.push('/')}
          onSave={(updated) => {
            setProperty(updated);
            alert('Listing successfully updated and active on Now Ezy!');
            router.push('/');
          }}
        />
      </div>
    </div>
  );
}

export default function StandaloneOwnerEditListingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#C01E4E] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-slate-600">Loading Listing Editor...</p>
        </div>
      }
    >
      <EditListingContent />
    </Suspense>
  );
}
