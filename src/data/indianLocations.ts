export interface LocationItem {
  id: string;
  name: string;
  secondaryText: string;
  type: 'LOCALITY' | 'CITY' | 'DISTRICT' | 'PROJECT';
  cityOrDistrict: string;
  state: string;
}

export const ALL_INDIAN_LOCATIONS: LocationItem[] = [
  // Dharmapuri & Tamil Nadu (Explicitly requested by user)
  { id: 'dp-1', name: 'Dharmapuri, Tamil Nadu', secondaryText: 'DISTRICT HEADQUARTERS', type: 'CITY', cityOrDistrict: 'Dharmapuri', state: 'Tamil Nadu' },
  { id: 'dp-2', name: 'Krishna Nagar, Pennagaram', secondaryText: 'PROJECT | DHARMAPURI', type: 'PROJECT', cityOrDistrict: 'Dharmapuri', state: 'Tamil Nadu' },
  { id: 'dp-3', name: 'Dharmapuri Town, Pennagaram Road', secondaryText: 'LOCALITY | DHARMAPURI', type: 'LOCALITY', cityOrDistrict: 'Dharmapuri', state: 'Tamil Nadu' },
  { id: 'dp-4', name: 'Harur Main Road, Dharmapuri', secondaryText: 'LOCALITY | DHARMAPURI', type: 'LOCALITY', cityOrDistrict: 'Dharmapuri', state: 'Tamil Nadu' },
  { id: 'dp-5', name: 'Palacode, Dharmapuri', secondaryText: 'LOCALITY | DHARMAPURI', type: 'LOCALITY', cityOrDistrict: 'Dharmapuri', state: 'Tamil Nadu' },
  { id: 'dp-6', name: 'Morappur, Dharmapuri', secondaryText: 'LOCALITY | DHARMAPURI', type: 'LOCALITY', cityOrDistrict: 'Dharmapuri', state: 'Tamil Nadu' },
  { id: 'dp-7', name: 'Dharmapuri Colony, Uppal', secondaryText: 'LOCALITY | HYDERABAD', type: 'LOCALITY', cityOrDistrict: 'Hyderabad', state: 'Telangana' },
  { id: 'dp-8', name: 'Dharmapuri, Vizianagaram', secondaryText: 'LOCALITY | VIZIANAGARAM', type: 'LOCALITY', cityOrDistrict: 'Vizianagaram', state: 'Andhra Pradesh' },
  { id: 'dp-9', name: 'Vasanth Vihar Padmavathi Nagar, Dharmapuri', secondaryText: 'PROJECT | VIZIANAGARAM', type: 'PROJECT', cityOrDistrict: 'Vizianagaram', state: 'Andhra Pradesh' },
  { id: 'dp-10', name: 'Dharmapuri Area, Pedathadivada', secondaryText: 'LOCALITY | VIZIANAGARAM', type: 'LOCALITY', cityOrDistrict: 'Vizianagaram', state: 'Andhra Pradesh' },

  // Salem, Hosur, Krishnagiri & Tamil Nadu
  { id: 'tn-salem', name: 'Salem, Tamil Nadu', secondaryText: 'MAJOR CITY | WEST TN', type: 'CITY', cityOrDistrict: 'Salem', state: 'Tamil Nadu' },
  { id: 'tn-hosur', name: 'Hosur, Tamil Nadu', secondaryText: 'ELECTRONICS & AUTO CORRIDOR', type: 'CITY', cityOrDistrict: 'Hosur', state: 'Tamil Nadu' },
  { id: 'tn-kg', name: 'Krishnagiri, Tamil Nadu', secondaryText: 'DISTRICT HEADQUARTERS', type: 'DISTRICT', cityOrDistrict: 'Krishnagiri', state: 'Tamil Nadu' },
  { id: 'tn-cbe', name: 'Coimbatore, Tamil Nadu', secondaryText: 'TEXTILE & IT CORRIDOR', type: 'CITY', cityOrDistrict: 'Coimbatore', state: 'Tamil Nadu' },
  { id: 'tn-erd', name: 'Erode, Tamil Nadu', secondaryText: 'COMMERCIAL HUB', type: 'CITY', cityOrDistrict: 'Erode', state: 'Tamil Nadu' },
  { id: 'tn-mdu', name: 'Madurai, Tamil Nadu', secondaryText: 'CULTURAL CAPITAL', type: 'CITY', cityOrDistrict: 'Madurai', state: 'Tamil Nadu' },
  { id: 'tn-try', name: 'Tiruchirappalli (Trichy)', secondaryText: 'CENTRAL HUB', type: 'CITY', cityOrDistrict: 'Tiruchirappalli', state: 'Tamil Nadu' },
  { id: 'tn-tpr', name: 'Tiruppur, Tamil Nadu', secondaryText: 'TEXTILE CITY', type: 'CITY', cityOrDistrict: 'Tiruppur', state: 'Tamil Nadu' },
  { id: 'tn-vel', name: 'Vellore, Tamil Nadu', secondaryText: 'INSTITUTIONAL HUB', type: 'CITY', cityOrDistrict: 'Vellore', state: 'Tamil Nadu' },
  { id: 'tn-chn', name: 'Chennai, Tamil Nadu', secondaryText: 'METROPOLIS & TECH HUB', type: 'CITY', cityOrDistrict: 'Chennai', state: 'Tamil Nadu' },
  { id: 'tn-omr', name: 'OMR Road (Old Mahabalipuram)', secondaryText: 'IT EXPRESSWAY | CHENNAI', type: 'LOCALITY', cityOrDistrict: 'Chennai', state: 'Tamil Nadu' },
  { id: 'tn-shol', name: 'Sholinganallur, Chennai', secondaryText: 'MAJOR TECH PARK HUB', type: 'LOCALITY', cityOrDistrict: 'Chennai', state: 'Tamil Nadu' },

  // Bengaluru Major Corridors & Tech Hubs
  { id: 'blr-city', name: 'Bengaluru, Karnataka', secondaryText: 'SILICON VALLEY OF INDIA', type: 'CITY', cityOrDistrict: 'Bengaluru', state: 'Karnataka' },
  { id: 'blr-kund', name: 'Kundanahalli Gate, ITPL Road', secondaryText: 'LOCALITY | BENGALURU EAST', type: 'LOCALITY', cityOrDistrict: 'Bengaluru', state: 'Karnataka' },
  { id: 'blr-kor', name: 'Koramangala (1st-8th Block)', secondaryText: 'STARTUP CAPITAL | BENGALURU', type: 'LOCALITY', cityOrDistrict: 'Bengaluru', state: 'Karnataka' },
  { id: 'blr-ind', name: 'Indiranagar 100ft & 12th Main', secondaryText: 'LOCALITY | BENGALURU EAST', type: 'LOCALITY', cityOrDistrict: 'Bengaluru', state: 'Karnataka' },
  { id: 'blr-hsr', name: 'HSR Layout (Sector 1-7)', secondaryText: 'STARTUP & TECH HUB', type: 'LOCALITY', cityOrDistrict: 'Bengaluru', state: 'Karnataka' },
  { id: 'blr-wfd', name: 'Whitefield (ITPL / EPIP Zone)', secondaryText: 'TECH CORRIDOR | BENGALURU', type: 'LOCALITY', cityOrDistrict: 'Bengaluru', state: 'Karnataka' },
  { id: 'blr-bel', name: 'Bellandur (Ecospace & EcoWorld)', secondaryText: 'OUTER RING ROAD TECH HUB', type: 'LOCALITY', cityOrDistrict: 'Bengaluru', state: 'Karnataka' },
  { id: 'blr-mar', name: 'Marathahalli Bridge & Ring Road', secondaryText: 'LOCALITY | BENGALURU', type: 'LOCALITY', cityOrDistrict: 'Bengaluru', state: 'Karnataka' },
  { id: 'blr-ec', name: 'Electronic City Phase 1 & 2', secondaryText: 'TECH COMMUTE CORRIDOR', type: 'LOCALITY', cityOrDistrict: 'Bengaluru', state: 'Karnataka' },
  { id: 'blr-btm', name: 'BTM Layout 1st & 2nd Stage', secondaryText: 'LOCALITY | BENGALURU SOUTH', type: 'LOCALITY', cityOrDistrict: 'Bengaluru', state: 'Karnataka' },
  { id: 'blr-sar', name: 'Sarjapur Road, Doddakannelli', secondaryText: 'TECH PARK HUB', type: 'LOCALITY', cityOrDistrict: 'Bengaluru', state: 'Karnataka' },
  { id: 'blr-manyata', name: 'Manyata Tech Park, Hebbal', secondaryText: 'NORTH TECH HUB | BENGALURU', type: 'LOCALITY', cityOrDistrict: 'Bengaluru', state: 'Karnataka' },

  // Karnataka Other Districts & Cities
  { id: 'ka-mys', name: 'Mysuru (Mysore), Karnataka', secondaryText: 'HERITAGE & TECH CITY', type: 'CITY', cityOrDistrict: 'Mysuru', state: 'Karnataka' },
  { id: 'ka-mng', name: 'Mangaluru (Mangalore), Karnataka', secondaryText: 'COASTAL COMMERCIAL HUB', type: 'CITY', cityOrDistrict: 'Mangaluru', state: 'Karnataka' },
  { id: 'ka-hub', name: 'Hubballi-Dharwad, Karnataka', secondaryText: 'COMMERCIAL TWIN CITIES', type: 'CITY', cityOrDistrict: 'Hubballi', state: 'Karnataka' },
  { id: 'ka-bel', name: 'Belagavi (Belgaum), Karnataka', secondaryText: 'MAJOR CITY | NORTH KA', type: 'CITY', cityOrDistrict: 'Belagavi', state: 'Karnataka' },
  { id: 'ka-shm', name: 'Shivamogga (Shimoga), Karnataka', secondaryText: 'DISTRICT HEADQUARTERS', type: 'DISTRICT', cityOrDistrict: 'Shivamogga', state: 'Karnataka' },

  // Hyderabad & Telangana
  { id: 'hyd-city', name: 'Hyderabad, Telangana', secondaryText: 'MAJOR TECH CAPITAL', type: 'CITY', cityOrDistrict: 'Hyderabad', state: 'Telangana' },
  { id: 'hyd-hitec', name: 'Hitec City, Madhapur', secondaryText: 'TECH & CYBER CORRIDOR', type: 'LOCALITY', cityOrDistrict: 'Hyderabad', state: 'Telangana' },
  { id: 'hyd-gach', name: 'Gachibowli, Financial District', secondaryText: 'IT CORRIDOR | HYDERABAD', type: 'LOCALITY', cityOrDistrict: 'Hyderabad', state: 'Telangana' },
  { id: 'hyd-kphb', name: 'KPHB Colony, Kukatpally', secondaryText: 'LOCALITY | HYDERABAD', type: 'LOCALITY', cityOrDistrict: 'Hyderabad', state: 'Telangana' },
  { id: 'hyd-kond', name: 'Kondapur, Whitefields', secondaryText: 'LOCALITY | HYDERABAD', type: 'LOCALITY', cityOrDistrict: 'Hyderabad', state: 'Telangana' },
  { id: 'tg-wgl', name: 'Warangal, Telangana', secondaryText: 'HERITAGE & URBAN HUB', type: 'CITY', cityOrDistrict: 'Warangal', state: 'Telangana' },

  // Andhra Pradesh Major Cities
  { id: 'ap-vizag', name: 'Visakhapatnam (Vizag)', secondaryText: 'PORT & IT HUB', type: 'CITY', cityOrDistrict: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { id: 'ap-vzm', name: 'Vizianagaram, Andhra Pradesh', secondaryText: 'DISTRICT HEADQUARTERS', type: 'DISTRICT', cityOrDistrict: 'Vizianagaram', state: 'Andhra Pradesh' },
  { id: 'ap-vja', name: 'Vijayawada, Andhra Pradesh', secondaryText: 'COMMERCIAL CAPITAL', type: 'CITY', cityOrDistrict: 'Vijayawada', state: 'Andhra Pradesh' },
  { id: 'ap-gtr', name: 'Guntur, Andhra Pradesh', secondaryText: 'MAJOR URBAN HUB', type: 'CITY', cityOrDistrict: 'Guntur', state: 'Andhra Pradesh' },
  { id: 'ap-tpt', name: 'Tirupati, Andhra Pradesh', secondaryText: 'EDUCATIONAL & PILGRIM HUB', type: 'CITY', cityOrDistrict: 'Tirupati', state: 'Andhra Pradesh' },

  // Kerala
  { id: 'kl-kochi', name: 'Kochi (Cochin), Kerala', secondaryText: 'INFOPARK & COMMERCIAL HUB', type: 'CITY', cityOrDistrict: 'Kochi', state: 'Kerala' },
  { id: 'kl-tvm', name: 'Thiruvananthapuram (Trivandrum)', secondaryText: 'TECHNOPARK CAPITAL', type: 'CITY', cityOrDistrict: 'Thiruvananthapuram', state: 'Kerala' },
  { id: 'kl-clt', name: 'Kozhikode (Calicut), Kerala', secondaryText: 'MAJOR CITY | MALABAR', type: 'CITY', cityOrDistrict: 'Kozhikode', state: 'Kerala' },

  // Maharashtra
  { id: 'mh-mum', name: 'Mumbai, Maharashtra', secondaryText: 'FINANCIAL CAPITAL OF INDIA', type: 'CITY', cityOrDistrict: 'Mumbai', state: 'Maharashtra' },
  { id: 'mh-pune', name: 'Pune, Maharashtra', secondaryText: 'OXFORD OF THE EAST & IT HUB', type: 'CITY', cityOrDistrict: 'Pune', state: 'Maharashtra' },
  { id: 'mh-hinj', name: 'Hinjawadi IT Park, Pune', secondaryText: 'PHASE 1-3 TECH CLUSTER', type: 'LOCALITY', cityOrDistrict: 'Pune', state: 'Maharashtra' },
  { id: 'mh-vim', name: 'Viman Nagar, Pune', secondaryText: 'STUDENT & TECH HUB', type: 'LOCALITY', cityOrDistrict: 'Pune', state: 'Maharashtra' },
  { id: 'mh-powai', name: 'Powai (Hiranandani), Mumbai', secondaryText: 'STARTUP & IIT CORRIDOR', type: 'LOCALITY', cityOrDistrict: 'Mumbai', state: 'Maharashtra' },
  { id: 'mh-thane', name: 'Thane, Maharashtra', secondaryText: 'METROPOLITAN REGION', type: 'CITY', cityOrDistrict: 'Thane', state: 'Maharashtra' },
  { id: 'mh-navi', name: 'Navi Mumbai, Maharashtra', secondaryText: 'PLANNED IT SATELLITE CITY', type: 'CITY', cityOrDistrict: 'Navi Mumbai', state: 'Maharashtra' },
  { id: 'mh-nag', name: 'Nagpur, Maharashtra', secondaryText: 'ORANGE CITY & MIHAN SEZ', type: 'CITY', cityOrDistrict: 'Nagpur', state: 'Maharashtra' },

  // Delhi NCR
  { id: 'ncr-del', name: 'Delhi, Delhi NCR', secondaryText: 'NATIONAL CAPITAL', type: 'CITY', cityOrDistrict: 'Delhi', state: 'Delhi NCR' },
  { id: 'ncr-ggn', name: 'Gurgaon (Gurugram), Haryana', secondaryText: 'CYBER CITY & FORTUNE 500 HUB', type: 'CITY', cityOrDistrict: 'Gurgaon', state: 'Haryana' },
  { id: 'ncr-noida', name: 'Noida, Uttar Pradesh', secondaryText: 'SECTOR 62 / EXPRESSWAY IT HUB', type: 'CITY', cityOrDistrict: 'Noida', state: 'Uttar Pradesh' },
  { id: 'ncr-gnoida', name: 'Greater Noida, Uttar Pradesh', secondaryText: 'EDUCATIONAL & AUTO HUB', type: 'CITY', cityOrDistrict: 'Greater Noida', state: 'Uttar Pradesh' },

  // Gujarat
  { id: 'gj-ahd', name: 'Ahmedabad, Gujarat', secondaryText: 'COMMERCIAL CAPITAL & GIFT CITY', type: 'CITY', cityOrDistrict: 'Ahmedabad', state: 'Gujarat' },
  { id: 'gj-srt', name: 'Surat, Gujarat', secondaryText: 'DIAMOND & TEXTILE CITY', type: 'CITY', cityOrDistrict: 'Surat', state: 'Gujarat' },
  { id: 'gj-vad', name: 'Vadodara (Baroda), Gujarat', secondaryText: 'CULTURAL CAPITAL', type: 'CITY', cityOrDistrict: 'Vadodara', state: 'Gujarat' },

  // North, Central & East India
  { id: 'rj-jpr', name: 'Jaipur, Rajasthan', secondaryText: 'PINK CITY & IT HUB', type: 'CITY', cityOrDistrict: 'Jaipur', state: 'Rajasthan' },
  { id: 'mp-ind', name: 'Indore, Madhya Pradesh', secondaryText: 'CLEANEST CITY & TECH HUB', type: 'CITY', cityOrDistrict: 'Indore', state: 'Madhya Pradesh' },
  { id: 'mp-bpl', name: 'Bhopal, Madhya Pradesh', secondaryText: 'CITY OF LAKES', type: 'CITY', cityOrDistrict: 'Bhopal', state: 'Madhya Pradesh' },
  { id: 'up-lko', name: 'Lucknow, Uttar Pradesh', secondaryText: 'STATE CAPITAL & TECH PARK', type: 'CITY', cityOrDistrict: 'Lucknow', state: 'Uttar Pradesh' },
  { id: 'up-kan', name: 'Kanpur, Uttar Pradesh', secondaryText: 'INDUSTRIAL & ACADEMIC HUB', type: 'CITY', cityOrDistrict: 'Kanpur', state: 'Uttar Pradesh' },
  { id: 'wb-kol', name: 'Kolkata, West Bengal', secondaryText: 'SALT LAKE SECTOR V TECH HUB', type: 'CITY', cityOrDistrict: 'Kolkata', state: 'West Bengal' },
  { id: 'br-pat', name: 'Patna, Bihar', secondaryText: 'STATE CAPITAL', type: 'CITY', cityOrDistrict: 'Patna', state: 'Bihar' },
  { id: 'jh-rnc', name: 'Ranchi, Jharkhand', secondaryText: 'STATE CAPITAL & INDUSTRIAL HUB', type: 'CITY', cityOrDistrict: 'Ranchi', state: 'Jharkhand' },
  { id: 'od-bbsr', name: 'Bhubaneswar, Odisha', secondaryText: 'SMART CITY & INFOCITY HUB', type: 'CITY', cityOrDistrict: 'Bhubaneswar', state: 'Odisha' },
  { id: 'pb-chd', name: 'Chandigarh, Tricity', secondaryText: 'IT PARK & PLANNED CITY', type: 'CITY', cityOrDistrict: 'Chandigarh', state: 'Punjab / Haryana' },
  { id: 'uk-ddn', name: 'Dehradun, Uttarakhand', secondaryText: 'INSTITUTIONAL CAPITAL', type: 'CITY', cityOrDistrict: 'Dehradun', state: 'Uttarakhand' },
  { id: 'as-ghy', name: 'Guwahati, Assam', secondaryText: 'GATEWAY TO NORTHEAST', type: 'CITY', cityOrDistrict: 'Guwahati', state: 'Assam' }
];

export const POPULAR_CITIES = [
  { name: 'Bengaluru', state: 'Karnataka' },
  { name: 'Mumbai', state: 'Maharashtra' },
  { name: 'Pune', state: 'Maharashtra' },
  { name: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Hyderabad', state: 'Telangana' },
  { name: 'Gurgaon', state: 'Haryana' },
  { name: 'Noida', state: 'Uttar Pradesh' },
  { name: 'Delhi', state: 'Delhi NCR' },
  { name: 'Kolkata', state: 'West Bengal' },
  { name: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Dharmapuri', state: 'Tamil Nadu' },
  { name: 'Kochi', state: 'Kerala' },
  { name: 'Thane', state: 'Maharashtra' },
  { name: 'Navi Mumbai', state: 'Maharashtra' },
  { name: 'Coimbatore', state: 'Tamil Nadu' }
];
