export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export type CommuteMode = 'scooter' | 'walking' | 'auto' | 'metro';

export interface CommuteEstimate {
  distanceKm: number;
  minutes: number;
  formattedTime: string; // e.g. "03 min"
  mode: CommuteMode;
  zone: 'inner' | 'mid' | 'outer' | 'far'; // 5m, 10m, 15m, 15m+
}

export function estimateCommute(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
  mode: CommuteMode = 'scooter'
): CommuteEstimate {
  const distanceKm = calculateDistanceKm(fromLat, fromLng, toLat, toLng);

  // Speed assumptions in urban traffic:
  // Scooter/Bike: ~24 km/h (0.4 km/min) + 1 min buffer
  // Walking: ~4.5 km/h (0.075 km/min)
  // Auto/Cab: ~18 km/h
  let minutes = 0;
  if (mode === 'walking') {
    minutes = Math.max(1, Math.round((distanceKm / 4.5) * 60));
  } else if (mode === 'scooter') {
    minutes = Math.max(2, Math.round((distanceKm / 24) * 60 + 1));
  } else if (mode === 'auto') {
    minutes = Math.max(3, Math.round((distanceKm / 18) * 60 + 2));
  } else {
    minutes = Math.max(4, Math.round((distanceKm / 22) * 60 + 3));
  }

  const formattedTime = minutes < 10 ? `0${minutes} min` : `${minutes} min`;

  let zone: CommuteEstimate['zone'] = 'far';
  if (minutes <= 5) zone = 'inner';
  else if (minutes <= 10) zone = 'mid';
  else if (minutes <= 15) zone = 'outer';

  return {
    distanceKm: Number(distanceKm.toFixed(1)),
    minutes,
    formattedTime,
    mode,
    zone
  };
}
