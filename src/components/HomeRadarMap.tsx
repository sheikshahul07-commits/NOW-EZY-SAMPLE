'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Property, AreaSuggestion } from '../types';
import { POPULAR_HUBS, HubLocation } from '../data/mockData';
import { estimateCommute, CommuteMode } from '../utils/geo';
import { getSuggestionsForQuery, MAJOR_AREA_SUGGESTIONS } from '../data/areas';
import {
  MapPin,
  Navigation,
  Clock,
  Search,
  Crosshair,
  ShieldCheck,
  Building,
  Check,
  ArrowRight,
  AlertCircle,
  ExternalLink,
  Phone
} from 'lucide-react';

interface HomeRadarMapProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onDirectConnect: (property: Property) => void;
}

export default function HomeRadarMap({
  properties,
  onSelectProperty,
  onDirectConnect
}: HomeRadarMapProps) {
  // Current hub anchor (default: Kundanahalli ITPL Road)
  const [currentStay, setCurrentStay] = useState<HubLocation>(POPULAR_HUBS[0]);
  const [searchStayInput, setSearchStayInput] = useState(POPULAR_HUBS[0].name);
  const [selectedMaxMinutes, setSelectedMaxMinutes] = useState<number>(15);
  const [commuteMode, setCommuteMode] = useState<CommuteMode>('scooter');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Map DOM reference & Leaflet refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);

  // Autocomplete for locations
  const suggestions = useMemo(() => {
    if (!searchStayInput.trim()) return MAJOR_AREA_SUGGESTIONS.slice(0, 5);
    return getSuggestionsForQuery(searchStayInput);
  }, [searchStayInput]);

  // Only consider active, verified listings
  const activePublishedListings = useMemo(() => {
    return properties.filter((p) => p.status === 'active');
  }, [properties]);

  // Calculate realistic commute estimates using road network factor
  const propertiesWithCommute = useMemo(() => {
    return activePublishedListings.map((prop) => {
      const commute = estimateCommute(
        currentStay.lat,
        currentStay.lng,
        prop.lat,
        prop.lng,
        commuteMode
      );
      return {
        ...prop,
        commute
      };
    });
  }, [activePublishedListings, currentStay, commuteMode]);

  // Filter within max minutes (5, 10, 15 mins)
  const nearbyProperties = useMemo(() => {
    return propertiesWithCommute
      .filter((p) => p.commute.minutes <= selectedMaxMinutes)
      .sort((a, b) => a.commute.minutes - b.commute.minutes);
  }, [propertiesWithCommute, selectedMaxMinutes]);

  const activeProperty = useMemo(() => {
    if (selectedPropertyId) {
      return propertiesWithCommute.find((p) => p.id === selectedPropertyId) || null;
    }
    return nearbyProperties[0] || null;
  }, [propertiesWithCommute, selectedPropertyId, nearbyProperties]);

  // Initialize and update Leaflet Map cleanly with proper unmount cleanup
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isMounted = true;

    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if container changed
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: [currentStay.lat, currentStay.lng],
        zoom: 14,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      leafletMapRef.current = map;
      layerGroupRef.current = layerGroup;

      // 1. Concentric Travel-Time Commute Rings in Brand Crimson
      const radius5m = commuteMode === 'walking' ? 400 : 1200;
      const radius10m = commuteMode === 'walking' ? 800 : 2500;
      const radius15m = commuteMode === 'walking' ? 1200 : 4000;

      // 15 Min Outer Ring
      L.circle([currentStay.lat, currentStay.lng], {
        radius: radius15m,
        color: '#C01E4E',
        weight: 1.5,
        opacity: 0.45,
        fillColor: '#C01E4E',
        fillOpacity: 0.04,
        dashArray: '4, 4'
      }).addTo(layerGroup);

      // 10 Min Mid Ring
      L.circle([currentStay.lat, currentStay.lng], {
        radius: radius10m,
        color: '#C01E4E',
        weight: 1.5,
        opacity: 0.65,
        fillColor: '#C01E4E',
        fillOpacity: 0.08
      }).addTo(layerGroup);

      // 5 Min Inner Ring
      L.circle([currentStay.lat, currentStay.lng], {
        radius: radius5m,
        color: '#9F1239',
        weight: 2,
        opacity: 0.85,
        fillColor: '#C01E4E',
        fillOpacity: 0.14
      }).addTo(layerGroup);

      // 2. Center Stay Beacon (User's Work / Study Hub)
      const centerHtml = `
        <div class="relative flex items-center justify-center w-7 h-7 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div class="w-5 h-5 rounded-full bg-[#C01E4E] border-2 border-white shadow-md flex items-center justify-center">
            <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>
        </div>
      `;
      const centerIcon = L.divIcon({
        html: centerHtml,
        className: 'center-radar-pin',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      L.marker([currentStay.lat, currentStay.lng], { icon: centerIcon }).addTo(layerGroup);

      // 3. Render Real Matching Property Pins
      nearbyProperties.forEach((prop) => {
        const isSelected = prop.id === (selectedPropertyId || activeProperty?.id);

        const pinHtml = `
          <div class="cursor-pointer select-none transition-transform duration-150 ${
            isSelected ? 'scale-110 z-50' : 'hover:scale-105 z-10'
          }" style="transform-origin: bottom center;">
            <div class="flex items-center shadow-md rounded-full bg-white border ${
              isSelected ? 'border-[#C01E4E] ring-2 ring-[#C01E4E]/30' : 'border-slate-300'
            } pl-1 pr-2.5 py-0.5 max-w-[200px] whitespace-nowrap overflow-hidden">
              <span class="w-5 h-5 rounded-full bg-[#C01E4E] text-white font-black text-[9px] flex items-center justify-center shrink-0 mr-1.5">
                ${prop.commute.formattedTime.split(' ')[0]}m
              </span>
              <div class="truncate text-left leading-tight">
                <span class="font-bold text-[10px] text-slate-900 block truncate">
                  ${prop.title.split(' in ')[0].slice(0, 18)}
                </span>
                <span class="text-[10px] font-black text-[#C01E4E]">
                  ₹${(prop.rent / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
            <div class="w-2.5 h-2.5 bg-[#C01E4E] rotate-45 mx-auto -mt-1 rounded-xs border border-white"></div>
          </div>
        `;

        const propertyIcon = L.divIcon({
          html: pinHtml,
          className: 'property-commute-pin',
          iconSize: [160, 36],
          iconAnchor: [80, 34]
        });

        const marker = L.marker([prop.lat, prop.lng], { icon: propertyIcon }).addTo(layerGroup);
        marker.on('click', () => {
          setSelectedPropertyId(prop.id);
        });
      });
    });

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [currentStay, nearbyProperties, selectedPropertyId, activeProperty, commuteMode]);

  // Handle GPS location with graceful denial fallback
  const handleUseGps = () => {
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }
    setIsDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingGps(false);
        const userLoc: HubLocation = {
          id: `gps-${Date.now()}`,
          name: 'My Current Location (GPS)',
          city: 'Bengaluru',
          street: 'Detected via device GPS',
          pincode: '',
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        setCurrentStay(userLoc);
        setSearchStayInput('My Current Location (GPS)');
        setShowSuggestions(false);
      },
      (err) => {
        setIsDetectingGps(false);
        if (err.code === 1) {
          setGpsError('Location access was denied. Please select your tech park or area manually below.');
        } else {
          setGpsError('Unable to detect GPS position. Please select your area manually.');
        }
      },
      { timeout: 8000 }
    );
  };

  const handleSelectAreaSuggestion = (area: AreaSuggestion) => {
    const newHub: HubLocation = {
      id: `area-${area.locality}`,
      name: `${area.locality}, ${area.city}`,
      city: area.city,
      street: area.street,
      pincode: area.pincode,
      lat: area.lat,
      lng: area.lng
    };
    setCurrentStay(newHub);
    setSearchStayInput(`${area.locality}, ${area.city}`);
    setShowSuggestions(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-slate-900">
      
      {/* Header & Functional Search Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-5 mb-5 text-left">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[#C01E4E] text-[11px] font-black uppercase tracking-wider mb-1.5">
              <Navigation className="w-3.5 h-3.5" />
              <span>Location-Based Bachelor Home Radar</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Commute Radar: Find Vacant Flats by Travel Time
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Calculates real travel minutes to your office or college. No fake pins.
            </p>
          </div>

          {/* Quick Hub Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {POPULAR_HUBS.map((hub) => (
              <button
                key={hub.id}
                type="button"
                onClick={() => {
                  setCurrentStay(hub);
                  setSearchStayInput(hub.name);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  currentStay.id === hub.id
                    ? 'bg-[#C01E4E] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {hub.name.split(' ')[0]}
              </button>
            ))}
          </div>

        </div>

        {/* Search Bar & Mode Selector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-4 pt-4 border-t border-slate-100 items-center">
          
          {/* Location Input */}
          <div className="md:col-span-6 relative">
            <div className="flex items-center rounded-xl border border-slate-300 focus-within:border-[#C01E4E] bg-white px-3 py-2 shadow-2xs">
              <MapPin className="w-4 h-4 text-[#C01E4E] shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Enter work hub, tech park, or college..."
                value={searchStayInput}
                onChange={(e) => {
                  setSearchStayInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full text-xs sm:text-sm font-semibold outline-none text-slate-900"
              />
              <button
                type="button"
                onClick={handleUseGps}
                disabled={isDetectingGps}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 shrink-0 cursor-pointer transition-colors"
                title="Use Current Device Location"
              >
                <Crosshair className={`w-3.5 h-3.5 text-[#C01E4E] ${isDetectingGps ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">GPS</span>
              </button>
            </div>

            {/* Location Autocomplete Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-200 z-50 max-h-60 overflow-y-auto">
                <div className="p-2 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                  Select Hub or Locality
                </div>
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectAreaSuggestion(item)}
                    className="w-full p-2.5 hover:bg-rose-50 text-left flex items-center justify-between text-xs cursor-pointer border-b border-slate-50 last:border-0"
                  >
                    <div>
                      <strong className="text-slate-900 block font-bold">{item.locality}</strong>
                      <span className="text-[11px] text-slate-500">{item.street}, {item.city}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#C01E4E] bg-rose-50 px-2 py-0.5 rounded">
                      Select
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Commute Mode (Scooter / Walking / Auto) */}
          <div className="md:col-span-3 flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['scooter', 'walking', 'auto'] as CommuteMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setCommuteMode(mode)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer ${
                  commuteMode === mode
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {mode === 'scooter' ? 'Bike' : mode === 'auto' ? 'Cab/Auto' : mode}
              </button>
            ))}
          </div>

          {/* Travel Time Threshold (5m, 10m, 15m) */}
          <div className="md:col-span-3 flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {[5, 10, 15].map((min) => (
              <button
                key={min}
                type="button"
                onClick={() => setSelectedMaxMinutes(min)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedMaxMinutes === min
                    ? 'bg-[#C01E4E] text-white shadow-2xs font-black'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                &le; {min} mins
              </button>
            ))}
          </div>

        </div>

        {/* GPS Error Alert */}
        {gpsError && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{gpsError}</span>
          </div>
        )}

      </div>

      {/* Main Map & Live Matching Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left: Functional Leaflet Map Canvas */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs relative">
          <div 
            ref={mapContainerRef} 
            className="w-full h-[400px] sm:h-[480px] lg:h-[540px] z-10"
          />

          {/* Legend Badge Overlay */}
          <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-md text-[11px] font-bold text-slate-700 flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C01E4E]/30 border border-[#C01E4E]" />
              <span>Concentric Travel Rings (5m, 10m, 15m)</span>
            </div>
            <div className="text-[10px] text-slate-500">
              Showing {nearbyProperties.length} verified flats within {selectedMaxMinutes} mins
            </div>
          </div>
        </div>

        {/* Right: Selected Property Card & Scrollable List of Matching Homes */}
        <div className="lg:col-span-5 space-y-4 text-left">
          
          {/* Active Highlighted Property Preview */}
          {activeProperty ? (
            <div className="bg-white rounded-2xl border-2 border-[#C01E4E] p-4 shadow-md space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#C01E4E] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {activeProperty.propertyType}
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1 line-clamp-1">
                    {activeProperty.title}
                  </h3>
                  <p className="text-xs text-slate-500">{activeProperty.locality}, {activeProperty.city}</p>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-slate-900 font-mono">
                    ₹{activeProperty.rent.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block">/ month</span>
                </div>
              </div>

              {/* Commute Duration Badge */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-emerald-800">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>{activeProperty.commute.formattedTime} from your location</span>
                </span>
                <span className="text-slate-500 text-[11px]">
                  {activeProperty.commute.distanceKm} km ({commuteMode})
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onDirectConnect(activeProperty)}
                  className="flex-1 py-2.5 bg-[#C01E4E] hover:bg-[#A11840] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact Owner</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.open(`/listing/${activeProperty.id}`, '_blank')}
                  className="py-2.5 px-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Full View</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
              <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold">No properties within {selectedMaxMinutes} mins</p>
              <p className="text-[11px] text-slate-400 mt-1">Try expanding the travel time to 15 mins or switching to bike mode.</p>
            </div>
          )}

          {/* List of Other Nearby Homes */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 block px-1">
              All {nearbyProperties.length} Listings Matching Travel Time:
            </span>

            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
              {nearbyProperties.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => setSelectedPropertyId(prop.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    prop.id === (activeProperty?.id)
                      ? 'border-[#C01E4E] bg-rose-50/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="truncate pr-2">
                    <strong className="text-slate-900 block font-bold truncate">{prop.title}</strong>
                    <span className="text-slate-500 text-[11px]">{prop.locality} · ₹{prop.rent.toLocaleString()}/mo</span>
                  </div>
                  <span className="text-[11px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                    {prop.commute.formattedTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
