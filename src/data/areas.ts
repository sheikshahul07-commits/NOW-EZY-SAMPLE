import { AreaSuggestion } from '../types';

export const MAJOR_AREA_SUGGESTIONS: AreaSuggestion[] = [
  // Bengaluru
  {
    city: 'Bengaluru',
    locality: 'Koramangala 4th Block',
    street: '80 Feet Road (Near Sony World Signal)',
    pincode: '560034',
    lat: 12.9345,
    lng: 77.6265
  },
  {
    city: 'Bengaluru',
    locality: 'Kundanahalli',
    street: 'ITPL Main Road (Near Kundanahalli Gate)',
    pincode: '560037',
    lat: 12.9719,
    lng: 77.7196
  },
  {
    city: 'Bengaluru',
    locality: 'AECS Layout',
    street: '60 Feet Road, Kundanahalli',
    pincode: '560037',
    lat: 12.9680,
    lng: 77.7170
  },
  {
    city: 'Bengaluru',
    locality: 'HSR Layout Sector 1',
    street: '27th Main Road (BDA Complex)',
    pincode: '560102',
    lat: 12.9116,
    lng: 77.6389
  },
  {
    city: 'Bengaluru',
    locality: 'Indiranagar',
    street: '100 Feet Road (Near Metro Station)',
    pincode: '560038',
    lat: 12.9716,
    lng: 77.6412
  },
  {
    city: 'Bengaluru',
    locality: 'Whitefield',
    street: 'ITPB Main Road (Near Hope Farm)',
    pincode: '560066',
    lat: 12.9810,
    lng: 77.7280
  },
  {
    city: 'Bengaluru',
    locality: 'Bellandur',
    street: 'Outer Ring Road (Green Glen Layout)',
    pincode: '560103',
    lat: 12.9260,
    lng: 77.6762
  },
  {
    city: 'Bengaluru',
    locality: 'Marathahalli',
    street: 'Varthur Main Road (Near Bridge)',
    pincode: '560037',
    lat: 12.9550,
    lng: 77.7010
  },
  {
    city: 'Bengaluru',
    locality: 'BTM Layout 2nd Stage',
    street: '7th Cross Road (Bannerghatta Road)',
    pincode: '560076',
    lat: 12.9166,
    lng: 77.6101
  },
  {
    city: 'Bengaluru',
    locality: 'Electronic City Phase 1',
    street: 'Neeladri Road (Wipro Gate)',
    pincode: '560100',
    lat: 12.8452,
    lng: 77.6602
  },
  {
    city: 'Bengaluru',
    locality: 'Manyata Tech Park / Nagavara',
    street: 'Thanisandra Main Road',
    pincode: '560045',
    lat: 13.0475,
    lng: 77.6200
  },
  {
    city: 'Bengaluru',
    locality: 'Brookefield',
    street: 'Cosmos Mall Road, ITPL Extension',
    pincode: '560037',
    lat: 12.9645,
    lng: 77.7140
  },

  // Mumbai
  {
    city: 'Mumbai',
    locality: 'Andheri West',
    street: 'Link Road (Near Lokhandwala Complex)',
    pincode: '400053',
    lat: 19.1363,
    lng: 72.8277
  },
  {
    city: 'Mumbai',
    locality: 'Powai',
    street: 'Central Avenue (Hiranandani Gardens)',
    pincode: '400076',
    lat: 19.1245,
    lng: 72.9090
  },
  {
    city: 'Mumbai',
    locality: 'Bandra West',
    street: 'Hill Road (Near Bandstand)',
    pincode: '400050',
    lat: 19.0596,
    lng: 72.8295
  },

  // Gurgaon
  {
    city: 'Gurgaon',
    locality: 'DLF Phase 3',
    street: 'Cyber City Access Road',
    pincode: '122002',
    lat: 28.4947,
    lng: 77.0890
  },
  {
    city: 'Gurgaon',
    locality: 'Sector 43',
    street: 'Golf Course Road (Near Rapid Metro)',
    pincode: '122009',
    lat: 28.4600,
    lng: 77.0900
  },

  // Pune
  {
    city: 'Pune',
    locality: 'Hinjawadi Phase 1',
    street: 'Hinjawadi Main Road (Near Infosys Circle)',
    pincode: '411057',
    lat: 18.5913,
    lng: 73.7389
  },
  {
    city: 'Pune',
    locality: 'Viman Nagar',
    street: 'Symbiosis Campus Road',
    pincode: '411014',
    lat: 18.5679,
    lng: 73.9143
  },

  // Hyderabad
  {
    city: 'Hyderabad',
    locality: 'HITEC City',
    street: 'Madhapur Main Road (Near Cyber Towers)',
    pincode: '500081',
    lat: 17.4485,
    lng: 78.3748
  },
  {
    city: 'Hyderabad',
    locality: 'Gachibowli',
    street: 'Financial District Access Road',
    pincode: '500032',
    lat: 17.4401,
    lng: 78.3489
  }
];

export function getSuggestionsForQuery(query: string): AreaSuggestion[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();

  return MAJOR_AREA_SUGGESTIONS.filter((item) => {
    return (
      item.city.toLowerCase().includes(q) ||
      item.locality.toLowerCase().includes(q) ||
      item.street.toLowerCase().includes(q) ||
      item.pincode.includes(q)
    );
  }).slice(0, 7);
}
