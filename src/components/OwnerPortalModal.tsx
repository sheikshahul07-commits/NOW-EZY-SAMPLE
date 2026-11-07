'use client';

import React, { useState } from 'react';
import {
  X,
  Building,
  Edit3,
  Power,
  Users,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Plus,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Property } from '../types';
import OwnerFullEditListingModal from './OwnerFullEditListingModal';

interface OwnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onUpdateProperty: (updated: Property) => void;
  onOpenListingFlow: () => void;
}

export default function OwnerPortalModal({
  isOpen,
  onClose,
  properties,
  onUpdateProperty,
  onOpenListingFlow
}: OwnerPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'listings' | 'inquiries'>('listings');
  const [selectedPropToFullEdit, setSelectedPropToFullEdit] = useState<Property | null>(null);

  if (!isOpen) return null;

  // Mock list of tenant inquiries received for owner's flats
  const mockInquiries = [
    {
      id: 'inq-1',
      tenantName: 'Aditya Verma',
      company: 'Software Engineer @ Infosys',
      phone: '+91 98451 22334',
      propertyTitle: 'Spacious 1BHK / Studio near ITPL Main Road',
      moveIn: 'Immediate (Within 3 Days)',
      date: 'Today, 10:45 AM',
      status: 'New Inquiry'
    },
    {
      id: 'inq-2',
      tenantName: 'Sneha Kulkarni',
      company: 'UI/UX Designer @ Swiggy',
      phone: '+91 97412 88990',
      propertyTitle: 'Sunny Master Bedroom in 3BHK Apartment',
      moveIn: '1st of next month',
      date: 'Yesterday, 4:20 PM',
      status: 'Responded'
    },
    {
      id: 'inq-3',
      tenantName: 'Karthik Raja',
      company: 'Backend Dev @ Razorpay',
      phone: '+91 96112 34567',
      propertyTitle: 'Spacious 1BHK / Studio near ITPL Main Road',
      moveIn: 'Immediate',
      date: '2 days ago',
      status: 'Responded'
    }
  ];

  const handleToggleDeactivate = (prop: Property) => {
    const updated: Property = {
      ...prop,
      status: prop.status === 'deactivated' ? 'active' : 'deactivated'
    };
    onUpdateProperty(updated);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
        <div
          className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C01E4E] text-white flex items-center justify-center shadow-md shadow-rose-900/20">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-900">
                    Landlord Property Portal
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Verified Owner
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Manage, edit on a full page, or deactivate your bachelor home listings.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenListingFlow();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C01E4E] hover:bg-[#A11840] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Post New Property</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Portal Tabs Strip */}
          <div className="flex items-center gap-4 px-6 pt-3 border-b border-slate-200 bg-white">
            <button
              onClick={() => setActiveTab('listings')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'listings'
                  ? 'border-[#C01E4E] text-[#C01E4E]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              My Listed Properties ({properties.slice(0, 4).length})
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'inquiries'
                  ? 'border-[#C01E4E] text-[#C01E4E]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>Tenant Inquiries Received</span>
              <span className="px-1.5 py-0.2 bg-[#C01E4E] text-white text-[10px] font-black rounded-full">
                {mockInquiries.length}
              </span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {activeTab === 'listings' ? (
              <div className="space-y-4">
                {properties.slice(0, 4).map((prop) => {
                  const isDeactivated = prop.status === 'deactivated';

                  return (
                    <div
                      key={prop.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isDeactivated
                          ? 'bg-slate-50/80 border-slate-300 opacity-80'
                          : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={prop.images[0]}
                            alt={prop.title}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                  isDeactivated
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                }`}
                              >
                                {isDeactivated ? 'Deactivated (Paused)' : 'Active · Live on Platform'}
                              </span>
                              <span className="text-xs font-semibold text-slate-400">
                                {prop.propertyType}
                              </span>
                            </div>
                            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 line-clamp-1">
                              {prop.title}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {prop.locality}, {prop.city} · Deposit: ₹{prop.deposit.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Dedicated Full Page Editor Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedPropToFullEdit(prop)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-rose-300" />
                            <span>Edit Listing (Full Page)</span>
                          </button>

                          {/* Deactivate / Reactivate Toggle */}
                          <button
                            type="button"
                            onClick={() => handleToggleDeactivate(prop)}
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isDeactivated
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-[#C01E4E] border border-slate-200'
                            }`}
                          >
                            <Power className="w-3.5 h-3.5" />
                            <span>{isDeactivated ? 'Reactivate' : 'Deactivate'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Summary Badges */}
                      <div className="pt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
                        <span className="px-2 py-0.5 bg-slate-100 rounded-md">
                          Rent: <strong>₹{prop.rent.toLocaleString()}/mo</strong>
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded-md">
                          Deposit: <strong>₹{prop.deposit.toLocaleString()}</strong>
                        </span>
                        <span className="px-2 py-0.5 bg-rose-50 text-[#C01E4E] rounded-md font-bold">
                          {prop.bachelorRules.nonVegAllowed ? 'Non-Veg Allowed' : 'Veg Only'}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded-md">
                          Curfew: {prop.bachelorRules.curfew}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded-md">
                          {prop.images.length} Photos Attached
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Inquiries Tab */
              <div className="space-y-3">
                {mockInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-slate-900">{inq.tenantName}</span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {inq.company}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">
                        Inquiry for: <strong className="text-slate-800">{inq.propertyTitle}</strong>
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Target Move-in: <strong className="text-slate-600">{inq.moveIn}</strong> · {inq.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`tel:${inq.phone}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#C01E4E]" />
                        <span>{inq.phone}</span>
                      </a>
                      <a
                        href={`https://wa.me/919845122334?text=Hi%20${encodeURIComponent(inq.tenantName)},%20regarding%20your%20inquiry%20on%20Now%20Ezy`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>0% Brokerage Landlord Guarantee · Verified Bachelor Tenancy</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors cursor-pointer"
            >
              Close Portal
            </button>
          </div>
        </div>
      </div>

      {/* FULL-PAGE LISTING EDITOR MODAL */}
      <OwnerFullEditListingModal
        isOpen={Boolean(selectedPropToFullEdit)}
        onClose={() => setSelectedPropToFullEdit(null)}
        property={selectedPropToFullEdit}
        onSave={(updated) => {
          onUpdateProperty(updated);
          setSelectedPropToFullEdit(null);
        }}
      />
    </>
  );
}
