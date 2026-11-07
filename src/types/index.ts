export type PropertyType = 
  | 'Entire Flat'
  | 'Independent House'
  | 'Private Room'
  | 'Shared Room'
  | 'Single Bed in PG'
  | 'Co-Living Studio';

export type FurnishingType = 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';

export type OccupancyType = 'Any Bachelor' | 'Male Bachelors' | 'Female Bachelors';

export interface VerificationBadges {
  idVerified: boolean; // Owner Govt ID verified
  ownershipConfirmed: boolean; // Electricity bill / Title deed validated
  physicallyInspected: boolean; // Inspected by Now Ezy field team
  lastAvailabilityCheck: string; // e.g. "Verified 4 hrs ago"
}

export interface BachelorRules {
  nonVegAllowed: boolean;
  curfew: 'No Curfew' | 'Flexible (Entry with Key)' | '11:00 PM';
  overnightGuests: 'Allowed Anytime' | 'With Prior Notice' | 'Daytime Only';
  oppositeGenderVisitors: 'Allowed Anytime' | 'Daytime Only' | 'Restricted';
  depositMonths: number;
  brokerage: 'Zero Brokerage';
}

export interface Property {
  id: string;
  title: string;
  propertyType: PropertyType;
  rent: number;
  deposit: number;
  maintenance: number;
  city: string;
  locality: string;
  street: string;
  pincode: string;
  distanceToHub: string;
  bedrooms: number;
  bathrooms: number;
  furnishing: FurnishingType;
  occupancy?: OccupancyType;
  carpetAreaSqft?: number;
  floor?: string; // e.g. "3rd of 5 floors"
  images: string[];
  videoUrl?: string; // Optional Property Walkthrough Video
  verification?: VerificationBadges;
  bachelorRules: BachelorRules;
  amenities: string[];
  availableFrom: string;
  description: string;
  lat: number;
  lng: number;
  status?: 'active' | 'rented' | 'deactivated';
  ownerId?: string;
  matchPercentage?: number;
  verifiedBachelorFriendly?: boolean;
  rating?: number;
  reviewsCount?: number;
  verifiedOwner: {
    name: string;
    avatar: string;
    responseRate: string;
    isDirectOwner: boolean;
    phone: string;
    registeredSince?: string;
    totalListings?: number;
  };
}

export type UserRole = 'tenant' | 'owner';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  isSubscribed: boolean;
  subscriptionPlan?: string;
  subscriptionExpiry?: string;
  receiptId?: string;
  requestsSentCount: number;
  savedPropertyIds: string[];
}

export interface TenantRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocality: string;
  ownerName: string;
  ownerPhone: string;
  requestedAt: string;
  visitDate?: string;
  visitSlot?: string;
  status: 'Visit Scheduled' | 'Owner Contacted' | 'Inquiry Sent';
  notes?: string;
}

export interface OwnerInquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantName: string;
  tenantPhone: string;
  tenantCompany: string;
  tenantMoveIn: string;
  receivedAt: string;
  status: 'New Inquiry' | 'Visit Scheduled' | 'Closed';
}

export interface HabitPreferences {
  sleepSchedule: 'Night Owl' | 'Early Bird' | 'Flexible';
  diet: 'Non-Vegetarian' | 'Pure Vegetarian' | 'Eggetarian';
  workStyle: 'Remote (WFH)' | 'Hybrid' | 'In-Office';
  cleanliness: number; // 1 to 5
}

export type RoommateJourney = 'has_room_in_flat' | 'team_up_to_rent';

export interface FlatmateProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  occupation: string;
  companyOrCollege: string;
  avatar: string;
  budgetMin: number;
  budgetMax: number;
  city: string;
  preferredLocalities: string[];
  targetMoveIn: string;
  habits: HabitPreferences;
  bio: string;
  journeyType: RoommateJourney; // Journey 1 (has flat) vs Journey 2 (team up)
  flatDetails?: {
    flatTitle: string;
    locality: string;
    roomType: 'Private Room' | 'Shared Room';
    rentPerPerson: number;
    roomPhoto?: string;
  };
  verifiedIdentity: boolean;
  contactPhone: string;
  contact?: string;
}

export interface Inquiry {
  id: string;
  propertyId?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  createdAt?: string;
  status?: string;
  [key: string]: any;
}

export interface RoommateRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderPhone: string;
  senderAvatar: string;
  targetProfileId: string;
  targetProfileName: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  sentAt: string;
}

export interface PaymentReceipt {
  receiptId: string;
  planName: string;
  planType: 'TENANT_PASS' | 'LANDLORD_PACK';
  amount: number;
  gstAmount: number;
  totalPaid: number;
  paymentMethod: string;
  transactionRef: string;
  paidAt: string;
  validUntil: string;
  status: 'SUCCESS';
  customerName: string;
  customerPhone: string;
}

export interface AreaSuggestion {
  city: string;
  locality: string;
  street: string;
  pincode: string;
  lat: number;
  lng: number;
}
