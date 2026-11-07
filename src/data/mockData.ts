import { Property, FlatmateProfile } from '../types';

export interface HubLocation {
  id: string;
  name: string;
  city: string;
  street: string;
  pincode: string;
  lat: number;
  lng: number;
}

export const POPULAR_HUBS: HubLocation[] = [
  { id: 'hub-1', name: 'ITPL Road Kundanahalli', city: 'Bengaluru', street: 'ITPL Main Road', pincode: '560037', lat: 12.9719, lng: 77.7196 },
  { id: 'hub-2', name: 'EcoSpace Business Park', city: 'Bengaluru', street: 'Outer Ring Road, Bellandur', pincode: '560103', lat: 12.9260, lng: 77.6830 },
  { id: 'hub-3', name: 'Koramangala 4th Block', city: 'Bengaluru', street: '80 Feet Road', pincode: '560034', lat: 12.9345, lng: 77.6265 },
  { id: 'hub-4', name: 'Indiranagar 100ft Road', city: 'Bengaluru', street: '100 Feet Road', pincode: '560038', lat: 12.9716, lng: 77.6412 },
  { id: 'hub-5', name: 'HSR Layout Sector 1', city: 'Bengaluru', street: '27th Main Road', pincode: '560102', lat: 12.9116, lng: 77.6389 },
  { id: 'hub-6', name: 'Manyata Tech Park', city: 'Bengaluru', street: 'Thanisandra Main Rd', pincode: '560045', lat: 13.0475, lng: 77.6225 }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-itpl-1',
    title: 'Sunny Master Bedroom in 3BHK Gated Apartment',
    propertyType: 'Private Room',
    rent: 16500,
    deposit: 33000,
    maintenance: 1200,
    city: 'Bengaluru',
    locality: 'AECS Layout, Kundanahalli',
    street: '60 Feet Main Road',
    pincode: '560037',
    distanceToHub: '4 mins to ITPL Road & Kundanahalli Gate',
    bedrooms: 3,
    bathrooms: 3,
    furnishing: 'Fully Furnished',
    occupancy: 'Any Bachelor',
    carpetAreaSqft: 450,
    floor: '3rd of 5 floors',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85'
    ],
    verification: {
      idVerified: true,
      ownershipConfirmed: true,
      physicallyInspected: true,
      lastAvailabilityCheck: 'Verified today at 10:15 AM'
    },
    bachelorRules: {
      nonVegAllowed: true,
      curfew: 'No Curfew',
      overnightGuests: 'Allowed Anytime',
      oppositeGenderVisitors: 'Allowed Anytime',
      depositMonths: 2,
      brokerage: 'Zero Brokerage'
    },
    amenities: [
      'High-Speed Wi-Fi (300 Mbps)',
      '100% Power Backup',
      'Split AC',
      'Washing Machine',
      'Private Attached Balcony',
      'Dedicated Workstation',
      'Lift & Covered Parking'
    ],
    availableFrom: 'Immediate',
    description: 'Looking for a bachelor flatmate for our master bedroom with attached washroom in AECS Layout. Walking distance to restaurants and Kundanahalli bus stop. Quiet work hours maintained during weekdays. Zero landlord interference guaranteed.',
    lat: 12.9680,
    lng: 77.7170,
    status: 'active',
    verifiedOwner: {
      name: 'Karthik Raja',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      responseRate: 'Under 10 mins',
      isDirectOwner: true,
      phone: '+91 98451 99001',
      registeredSince: 'June 2024',
      totalListings: 2
    }
  },
  {
    id: 'prop-itpl-2',
    title: 'Designer 1BHK Studio near Brookefield Mall',
    propertyType: 'Entire Flat',
    rent: 19500,
    deposit: 38000,
    maintenance: 1500,
    city: 'Bengaluru',
    locality: 'Brookefield',
    street: 'Cosmos Mall Road, ITPL Extension',
    pincode: '560037',
    distanceToHub: '6 mins to ITPL Road & Cosmos Mall',
    bedrooms: 1,
    bathrooms: 1,
    furnishing: 'Fully Furnished',
    occupancy: 'Any Bachelor',
    carpetAreaSqft: 650,
    floor: '2nd of 4 floors',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=85'
    ],
    verification: {
      idVerified: true,
      ownershipConfirmed: true,
      physicallyInspected: true,
      lastAvailabilityCheck: 'Verified 2 hrs ago'
    },
    bachelorRules: {
      nonVegAllowed: true,
      curfew: 'No Curfew',
      overnightGuests: 'Allowed Anytime',
      oppositeGenderVisitors: 'Allowed Anytime',
      depositMonths: 2,
      brokerage: 'Zero Brokerage'
    },
    amenities: [
      'High-Speed Wi-Fi',
      'Modular Kitchen with Chimney',
      'Refrigerator & Microwave',
      'Automatic Washing Machine',
      'Dedicated Work Desk',
      '24/7 Security & CCTV'
    ],
    availableFrom: 'Immediate',
    description: 'Fully furnished independent 1BHK studio exclusively for IT/fintech professionals. Modern Scandinavian interior, private balcony, silent surroundings, and 0% landlord interference.',
    lat: 12.9645,
    lng: 77.7145,
    status: 'active',
    verifiedOwner: {
      name: 'Venkatesh Rao',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      responseRate: '15 mins',
      isDirectOwner: true,
      phone: '+91 98452 33445',
      registeredSince: 'Jan 2024',
      totalListings: 3
    }
  },
  {
    id: 'prop-itpl-3',
    title: 'Executive Twin Sharing Bed with Daily Meals & Wi-Fi',
    propertyType: 'Shared Room',
    rent: 11000,
    deposit: 11000,
    maintenance: 0,
    city: 'Bengaluru',
    locality: 'Kundanahalli Gate',
    street: 'ITPL Main Road',
    pincode: '560037',
    distanceToHub: '2 mins walking to Kundanahalli Gate',
    bedrooms: 1,
    bathrooms: 1,
    furnishing: 'Fully Furnished',
    occupancy: 'Male Bachelors',
    carpetAreaSqft: 350,
    floor: '1st of 4 floors',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85'
    ],
    verification: {
      idVerified: true,
      ownershipConfirmed: true,
      physicallyInspected: true,
      lastAvailabilityCheck: 'Verified today at 9:00 AM'
    },
    bachelorRules: {
      nonVegAllowed: false,
      curfew: 'Flexible (Entry with Key)',
      overnightGuests: 'With Prior Notice',
      oppositeGenderVisitors: 'Daytime Only',
      depositMonths: 1,
      brokerage: 'Zero Brokerage'
    },
    amenities: [
      '3 Nutritious Meals Included (7 Days)',
      'High-Speed Wi-Fi',
      'Daily Housekeeping',
      'RO Water Purifier',
      'Individual Lockers',
      'Laundry Service'
    ],
    availableFrom: 'Immediate',
    description: 'Managed executive room in Kundanahalli Gate for working professionals. Zero maintenance, 1 month refundable deposit, clean home-cooked food, high-speed fiber internet.',
    lat: 12.9730,
    lng: 77.7210,
    status: 'active',
    verifiedOwner: {
      name: 'Ramesh Reddy',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      responseRate: 'Under 5 mins',
      isDirectOwner: true,
      phone: '+91 98860 11223',
      registeredSince: 'March 2023',
      totalListings: 4
    }
  },
  {
    id: 'prop-itpl-4',
    title: 'Spacious 2BHK High-Rise in Gated Community',
    propertyType: 'Entire Flat',
    rent: 28000,
    deposit: 50000,
    maintenance: 2500,
    city: 'Bengaluru',
    locality: 'Whitefield',
    street: 'Near Brigade Tech Gardens',
    pincode: '560066',
    distanceToHub: '8 mins to ITPL Tech Park',
    bedrooms: 2,
    bathrooms: 2,
    furnishing: 'Semi-Furnished',
    occupancy: 'Any Bachelor',
    carpetAreaSqft: 1050,
    floor: '8th of 14 floors',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
    ],
    verification: {
      idVerified: true,
      ownershipConfirmed: true,
      physicallyInspected: true,
      lastAvailabilityCheck: 'Verified yesterday'
    },
    bachelorRules: {
      nonVegAllowed: true,
      curfew: 'No Curfew',
      overnightGuests: 'Allowed Anytime',
      oppositeGenderVisitors: 'Allowed Anytime',
      depositMonths: 2,
      brokerage: 'Zero Brokerage'
    },
    amenities: [
      'Clubhouse & Gym',
      'Swimming Pool',
      '24/7 Power Backup',
      'Covered Car Parking',
      'Jogging Track & Tennis Court',
      'Intercom & Gated Security'
    ],
    availableFrom: '1st of Next Month',
    description: 'Looking for 2-3 working bachelors for our 2BHK in a premium gated society near Brigade Tech Gardens. Semi-furnished with modular kitchen, wardrobes, geysers, and 2 balconies. Fair deposit of 2 months only.',
    lat: 12.9850,
    lng: 77.7450,
    status: 'active',
    verifiedOwner: {
      name: 'Ananya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      responseRate: '10 mins',
      isDirectOwner: true,
      phone: '+91 97410 77889',
      registeredSince: 'August 2024',
      totalListings: 1
    }
  },
  {
    id: 'prop-kor-1',
    title: 'Private AC Room in Gated 3BHK Flat in Koramangala 4th Block',
    propertyType: 'Private Room',
    rent: 18500,
    deposit: 35000,
    maintenance: 1500,
    city: 'Bengaluru',
    locality: 'Koramangala 4th Block',
    street: 'Near Sony World Signal, 80 Feet Road',
    pincode: '560034',
    distanceToHub: 'Walking distance to Sony World Signal',
    bedrooms: 3,
    bathrooms: 3,
    furnishing: 'Fully Furnished',
    occupancy: 'Any Bachelor',
    carpetAreaSqft: 450,
    floor: '2nd of 4 floors',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=85'
    ],
    verification: {
      idVerified: true,
      ownershipConfirmed: true,
      physicallyInspected: true,
      lastAvailabilityCheck: 'Verified 1 hr ago'
    },
    bachelorRules: {
      nonVegAllowed: true,
      curfew: 'No Curfew',
      overnightGuests: 'Allowed Anytime',
      oppositeGenderVisitors: 'Allowed Anytime',
      depositMonths: 2,
      brokerage: 'Zero Brokerage'
    },
    amenities: [
      'High-Speed Wi-Fi',
      'Split AC & Smart TV',
      'Fully Equipped Kitchen',
      'Washing Machine',
      'Cook & Maid Service Setup',
      'Covered Bike Parking'
    ],
    availableFrom: 'Immediate',
    description: 'Private bedroom with attached washroom in Koramangala 4th Block. Walking distance to cafes, restaurants, and transit. Existing flatmates are tech professionals at startup unicorns.',
    lat: 12.9345,
    lng: 77.6265,
    status: 'active',
    verifiedOwner: {
      name: 'Aditya Verma',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      responseRate: 'Under 10 mins',
      isDirectOwner: false,
      phone: '+91 98866 54321',
      registeredSince: 'April 2024',
      totalListings: 1
    }
  },
  {
    id: 'prop-bell-1',
    title: 'Studio Loft Suite near EcoSpace Business Park',
    propertyType: 'Co-Living Studio',
    rent: 22000,
    deposit: 44000,
    maintenance: 1800,
    city: 'Bengaluru',
    locality: 'Bellandur',
    street: 'Outer Ring Road, opposite EcoSpace',
    pincode: '560103',
    distanceToHub: '3 mins walking to EcoSpace Tech Gate',
    bedrooms: 1,
    bathrooms: 1,
    furnishing: 'Fully Furnished',
    occupancy: 'Any Bachelor',
    carpetAreaSqft: 550,
    floor: '4th of 6 floors',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85'
    ],
    verification: {
      idVerified: true,
      ownershipConfirmed: true,
      physicallyInspected: true,
      lastAvailabilityCheck: 'Verified today at 12:00 PM'
    },
    bachelorRules: {
      nonVegAllowed: true,
      curfew: 'No Curfew',
      overnightGuests: 'Allowed Anytime',
      oppositeGenderVisitors: 'Allowed Anytime',
      depositMonths: 2,
      brokerage: 'Zero Brokerage'
    },
    amenities: [
      'Gigabit Wi-Fi',
      'Central AC',
      'In-Unit Washer-Dryer',
      'Gym & Co-Working Lounge',
      'Keyless Digital Door Lock',
      '100% DG Power Backup'
    ],
    availableFrom: 'Immediate',
    description: 'Premium executive studio loft right across EcoSpace Bellandur. High ceilings, panoramic floor-to-ceiling windows, digital smart access, and gym amenities included.',
    lat: 12.9260,
    lng: 77.6830,
    status: 'active',
    verifiedOwner: {
      name: 'Sunil Menon',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      responseRate: '10 mins',
      isDirectOwner: true,
      phone: '+91 99011 22334',
      registeredSince: 'May 2023',
      totalListings: 2
    }
  },
  {
    id: 'prop-ind-1',
    title: 'Modern 2BHK Apartment near 100ft Road Indiranagar',
    propertyType: 'Entire Flat',
    rent: 32000,
    deposit: 64000,
    maintenance: 2000,
    city: 'Bengaluru',
    locality: 'Indiranagar',
    street: '12th Main Road, near 100ft Rd',
    pincode: '560038',
    distanceToHub: '2 mins to Indiranagar Metro & 100ft Road',
    bedrooms: 2,
    bathrooms: 2,
    furnishing: 'Fully Furnished',
    occupancy: 'Any Bachelor',
    carpetAreaSqft: 980,
    floor: '2nd of 4 floors',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85'
    ],
    verification: {
      idVerified: true,
      ownershipConfirmed: true,
      physicallyInspected: true,
      lastAvailabilityCheck: 'Verified today at 1:45 PM'
    },
    bachelorRules: {
      nonVegAllowed: true,
      curfew: 'No Curfew',
      overnightGuests: 'Allowed Anytime',
      oppositeGenderVisitors: 'Allowed Anytime',
      depositMonths: 2,
      brokerage: 'Zero Brokerage'
    },
    amenities: [
      'Private Terrace Balcony',
      'High-Speed Wi-Fi',
      'Washing Machine & Fridge',
      'Covered Parking',
      'Water Supply 24/7',
      'CCTV & Security'
    ],
    availableFrom: 'Immediate',
    description: 'Designer 2BHK flat in prime Indiranagar. Walkable to metro, restaurants, and tech hubs. Fully furnished with sofa, smart TV, beds, and modular kitchen. Zero restrictions for working professionals.',
    lat: 12.9716,
    lng: 77.6412,
    status: 'active',
    verifiedOwner: {
      name: 'Priya Sundaram',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      responseRate: '5 mins',
      isDirectOwner: true,
      phone: '+91 98860 99887',
      registeredSince: 'November 2023',
      totalListings: 1
    }
  },
  {
    id: 'prop-hsr-1',
    title: 'Single Bed in Premium AC PG for Tech Professionals',
    propertyType: 'Single Bed in PG',
    rent: 12500,
    deposit: 12500,
    maintenance: 0,
    city: 'Bengaluru',
    locality: 'HSR Layout Sector 1',
    street: '27th Main Road, near HSR Metro Station',
    pincode: '560102',
    distanceToHub: '3 mins to 27th Main Hub & Metro',
    bedrooms: 1,
    bathrooms: 1,
    furnishing: 'Fully Furnished',
    occupancy: 'Male Bachelors',
    carpetAreaSqft: 250,
    floor: '1st of 5 floors',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85'
    ],
    verification: {
      idVerified: true,
      ownershipConfirmed: true,
      physicallyInspected: true,
      lastAvailabilityCheck: 'Verified today at 8:30 AM'
    },
    bachelorRules: {
      nonVegAllowed: true,
      curfew: 'Flexible (Entry with Key)',
      overnightGuests: 'With Prior Notice',
      oppositeGenderVisitors: 'Daytime Only',
      depositMonths: 1,
      brokerage: 'Zero Brokerage'
    },
    amenities: [
      'Breakfast, Lunch & Dinner Included',
      'Split AC',
      'High-Speed Wi-Fi',
      'Daily Housekeeping',
      'Power Backup',
      'Lift & Parking'
    ],
    availableFrom: 'Immediate',
    description: 'Premium PG accommodation in HSR Layout Sector 1. Includes 3 healthy meals, high-speed fiber internet, and daily housekeeping. Walking distance to tech company shuttles and cafes.',
    lat: 12.9116,
    lng: 77.6389,
    status: 'active',
    verifiedOwner: {
      name: 'Naveen Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      responseRate: 'Under 10 mins',
      isDirectOwner: true,
      phone: '+91 99450 33221',
      registeredSince: 'February 2024',
      totalListings: 3
    }
  }
];

export const INITIAL_FLATMATES: FlatmateProfile[] = [
  {
    id: 'mate-1',
    name: 'Rahul Sharma',
    age: 25,
    gender: 'Male',
    occupation: 'Backend Engineer (Go/Kubernetes)',
    companyOrCollege: 'Razorpay',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    budgetMin: 15000,
    budgetMax: 22000,
    city: 'Bengaluru',
    preferredLocalities: ['Koramangala', 'HSR Layout', 'Indiranagar'],
    targetMoveIn: 'Immediate (Within 10 Days)',
    habits: {
      sleepSchedule: 'Night Owl',
      diet: 'Non-Vegetarian',
      workStyle: 'Hybrid',
      cleanliness: 4
    },
    bio: 'Software engineer at Razorpay. Looking for a private room in a 2BHK/3BHK with chill working professionals. Friendly, clean, and respect work hours.',
    journeyType: 'team_up_to_rent',
    verifiedIdentity: true,
    contactPhone: '+91 98765 43210'
  },
  {
    id: 'mate-2',
    name: 'Pooja Iyer',
    age: 24,
    gender: 'Female',
    occupation: 'Product Designer (UI/UX)',
    companyOrCollege: 'Swiggy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    budgetMin: 18000,
    budgetMax: 26000,
    city: 'Bengaluru',
    preferredLocalities: ['Indiranagar', 'Domlur', 'Koramangala'],
    targetMoveIn: '1st of Next Month',
    habits: {
      sleepSchedule: 'Flexible',
      diet: 'Eggetarian',
      workStyle: 'Remote (WFH)',
      cleanliness: 5
    },
    bio: 'Designer seeking bright apartment with natural sunlight. High focus on cleanliness, cooking together, and mutual respect.',
    journeyType: 'has_room_in_flat',
    flatDetails: {
      flatTitle: 'Sunny 3BHK Apartment in Domlur near EGL',
      locality: 'Domlur, Bengaluru',
      roomType: 'Private Room',
      rentPerPerson: 18500,
      roomPhoto: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    },
    verifiedIdentity: true,
    contactPhone: '+91 97711 22334'
  },
  {
    id: 'mate-3',
    name: 'Kabir Mehta',
    age: 26,
    gender: 'Male',
    occupation: 'Financial Analyst',
    companyOrCollege: 'Morgan Stanley',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    budgetMin: 20000,
    budgetMax: 30000,
    city: 'Bengaluru',
    preferredLocalities: ['Bellandur', 'HSR Layout', 'Outer Ring Road'],
    targetMoveIn: 'Immediate',
    habits: {
      sleepSchedule: 'Early Bird',
      diet: 'Non-Vegetarian',
      workStyle: 'In-Office',
      cleanliness: 4
    },
    bio: 'Early riser, finance background. Have a spare master bedroom in our 2BHK near EcoSpace Bellandur. High-speed internet and cook setup ready.',
    journeyType: 'has_room_in_flat',
    flatDetails: {
      flatTitle: 'Master Bedroom in 2BHK Gated Society',
      locality: 'Bellandur, Bengaluru',
      roomType: 'Private Room',
      rentPerPerson: 17000,
      roomPhoto: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    },
    verifiedIdentity: true,
    contactPhone: '+91 98212 99001'
  },
  {
    id: 'mate-4',
    name: 'Sneha Patel',
    age: 23,
    gender: 'Female',
    occupation: 'Data Scientist',
    companyOrCollege: 'Zomato',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    budgetMin: 16000,
    budgetMax: 24000,
    city: 'Bengaluru',
    preferredLocalities: ['Whitefield', 'Kundanahalli', 'AECS Layout'],
    targetMoveIn: 'Within 2 Weeks',
    habits: {
      sleepSchedule: 'Night Owl',
      diet: 'Pure Vegetarian',
      workStyle: 'Hybrid',
      cleanliness: 5
    },
    bio: 'Data Scientist at Zomato. Looking to team up with 1-2 female professionals to rent a modern 2BHK/3BHK apartment in Whitefield or Kundanahalli.',
    journeyType: 'team_up_to_rent',
    verifiedIdentity: true,
    contactPhone: '+91 99100 55443'
  }
];

export const CITIES = [
  'All Cities',
  'Bengaluru',
  'Mumbai',
  'Gurgaon',
  'Pune',
  'Hyderabad'
];
