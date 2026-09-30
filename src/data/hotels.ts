export type ChargerAccess = "Public" | "Guest Only";
export type ChargerAcDc = "AC" | "DC";
export type ConnectorType = "Type 2" | "CCS2" | "CHAdeMO" | "Bharat AC-001" | "Not confirmed";
export type FeeType = "Free" | "Paid" | "Not confirmed";
export type BookingType = "direct" | "partner";

export interface Charger {
  access: ChargerAccess;
  acDc: ChargerAcDc;
  powerKw: number | null;
  connector: ConnectorType;
  guns: number | null;
  fee: FeeType;
  appRequired: boolean | null;
  notes?: string;
}

export interface RoomType {
  id: string;
  name: string;
  image: string;
  bed: string;
  maxGuests: number;
  breakfast: boolean;
  cancellation: "Free" | "Non-refundable";
  pricePerNight: number;
  taxesPerNight: number;
  availability: "available" | "limited" | "sold-out";
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  address: string;
  coordinates: { lat: number; lng: number };
  starRating: 3 | 4 | 5;
  rating: number | null;
  reviewCount: number | null;
  images: string[];
  verified: boolean;
  verifiedAt: string | null;
  chargers: Charger[];
  amenities: string[];
  roomTypes: RoomType[];
  bookingType: BookingType;
  priceFrom: number;
  description: string;
}

export const hotels: Hotel[] = [
  {
    id: "h1",
    slug: "bengaluru-marriott-whitefield",
    name: "Bengaluru Marriott Hotel Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    address: "8, 8th Rd, Whitefield, Bengaluru, Karnataka 560066",
    coordinates: { lat: 12.9698, lng: 77.7500 },
    starRating: 5,
    rating: 4.6,
    reviewCount: 312,
    images: [
      "photo-1571003123894-1f0594d2b5d9",
      "photo-1520250497591-112f2f40a3f4",
      "photo-1563911302283-d2bc129e7570",
      "photo-1584132967334-10e028bd69f7",
    ],
    verified: true,
    verifiedAt: "2025-03-12",
    chargers: [
      { access: "Public", acDc: "DC", powerKw: 60, connector: "CCS2", guns: 2, fee: "Paid", appRequired: false },
      { access: "Public", acDc: "AC", powerKw: 7.4, connector: "Type 2", guns: 2, fee: "Free", appRequired: false },
    ],
    amenities: ["Wi-Fi", "Pool", "Spa", "Restaurant", "Gym", "Parking", "Airport Shuttle"],
    bookingType: "direct",
    priceFrom: 8500,
    description: "A luxury 5-star hotel in Whitefield, Bengaluru's tech corridor. Features verified EV charging available to all guests and the public.",
    roomTypes: [
      { id: "r1", name: "Deluxe Room", image: "photo-1631049307264-da0ec9d70304", bed: "King", maxGuests: 2, breakfast: false, cancellation: "Free", pricePerNight: 8500, taxesPerNight: 1530, availability: "available" },
      { id: "r2", name: "Premium Room", image: "photo-1582719478250-c89cae4dc85b", bed: "King", maxGuests: 2, breakfast: true, cancellation: "Free", pricePerNight: 10200, taxesPerNight: 1836, availability: "available" },
      { id: "r3", name: "Executive Suite", image: "photo-1631049021435-7abd08cc2ece", bed: "King", maxGuests: 3, breakfast: true, cancellation: "Non-refundable", pricePerNight: 15800, taxesPerNight: 2844, availability: "limited" },
    ],
  },
  {
    id: "h2",
    slug: "doubletree-bengaluru-outer-ring-road",
    name: "DoubleTree Suites by Hilton Bengaluru Outer Ring Road",
    city: "Bengaluru",
    state: "Karnataka",
    address: "Outer Ring Road, Devarabisanahalli, Bengaluru 560103",
    coordinates: { lat: 12.9352, lng: 77.6853 },
    starRating: 5,
    rating: 4.4,
    reviewCount: 228,
    images: [
      "photo-1566073771259-6a8506099945",
      "photo-1584132915807-fd1f5fbc078f",
      "photo-1521747116042-5a810fda9664",
    ],
    verified: true,
    verifiedAt: "2025-01-20",
    chargers: [
      { access: "Public", acDc: "DC", powerKw: 60, connector: "CCS2", guns: 2, fee: "Paid", appRequired: false },
      { access: "Public", acDc: "AC", powerKw: 7.4, connector: "Type 2", guns: 2, fee: "Free", appRequired: false },
    ],
    amenities: ["Wi-Fi", "Pool", "Restaurant", "Gym", "Parking", "Business Centre"],
    bookingType: "direct",
    priceFrom: 7200,
    description: "All-suite hotel on Bengaluru's Outer Ring Road with fast DC charging available to hotel guests and the public.",
    roomTypes: [
      { id: "r1", name: "One Bedroom Suite", image: "photo-1631049307264-da0ec9d70304", bed: "King", maxGuests: 2, breakfast: false, cancellation: "Free", pricePerNight: 7200, taxesPerNight: 1296, availability: "available" },
      { id: "r2", name: "Two Bedroom Suite", image: "photo-1582719478250-c89cae4dc85b", bed: "King + Twin", maxGuests: 4, breakfast: false, cancellation: "Free", pricePerNight: 11500, taxesPerNight: 2070, availability: "available" },
    ],
  },
  {
    id: "h3",
    slug: "fern-residency-jaipur",
    name: "The Fern Residency Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    address: "Hotel Colony, Bani Park, Jaipur, Rajasthan 302016",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    starRating: 5,
    rating: 4.3,
    reviewCount: 187,
    images: [
      "photo-1477587458883-47145ed31fd0",
      "photo-1603366615917-1fa6dad5c4fa",
      "photo-1551882547-ff40c4fe1fa9",
    ],
    verified: true,
    verifiedAt: "2025-02-08",
    chargers: [
      { access: "Public", acDc: "DC", powerKw: 60, connector: "CCS2", guns: 2, fee: "Paid", appRequired: false },
    ],
    amenities: ["Wi-Fi", "Pool", "Restaurant", "Parking", "Spa"],
    bookingType: "direct",
    priceFrom: 6200,
    description: "Eco-friendly 5-star hotel in Jaipur's Bani Park neighbourhood with fast DC charging open to the public.",
    roomTypes: [
      { id: "r1", name: "Deluxe Room", image: "photo-1631049307264-da0ec9d70304", bed: "King", maxGuests: 2, breakfast: false, cancellation: "Free", pricePerNight: 6200, taxesPerNight: 1116, availability: "available" },
      { id: "r2", name: "Premiere Room", image: "photo-1582719478250-c89cae4dc85b", bed: "King", maxGuests: 2, breakfast: true, cancellation: "Free", pricePerNight: 7800, taxesPerNight: 1404, availability: "limited" },
    ],
  },
  {
    id: "h4",
    slug: "wildflower-resort-manali",
    name: "Wildflower Boutique Resort Manali",
    city: "Manali",
    state: "Himachal Pradesh",
    address: "Old Manali Road, Manali, Himachal Pradesh 175131",
    coordinates: { lat: 32.2432, lng: 77.1892 },
    starRating: 4,
    rating: 4.5,
    reviewCount: 94,
    images: [
      "photo-1506905925346-21bda4d32df4",
      "photo-1464822759023-fed622ff2c3b",
      "photo-1542224566-6e85f2e6772f",
    ],
    verified: true,
    verifiedAt: "2024-11-15",
    chargers: [
      { access: "Guest Only", acDc: "AC", powerKw: 7.4, connector: "Type 2", guns: 1, fee: "Free", appRequired: false, notes: "Located in hotel basement parking" },
    ],
    amenities: ["Wi-Fi", "Restaurant", "Parking", "Mountain View", "Bonfire Area"],
    bookingType: "direct",
    priceFrom: 4800,
    description: "A scenic 4-star boutique resort in Old Manali with overnight AC charging for guests.",
    roomTypes: [
      { id: "r1", name: "Mountain View Room", image: "photo-1631049307264-da0ec9d70304", bed: "Queen", maxGuests: 2, breakfast: true, cancellation: "Free", pricePerNight: 4800, taxesPerNight: 864, availability: "available" },
      { id: "r2", name: "Deluxe Cottage", image: "photo-1582719478250-c89cae4dc85b", bed: "King", maxGuests: 3, breakfast: true, cancellation: "Non-refundable", pricePerNight: 6500, taxesPerNight: 1170, availability: "available" },
    ],
  },
  {
    id: "h5",
    slug: "goa-beach-resort",
    name: "Caravela Beach Resort Goa",
    city: "Goa",
    state: "Goa",
    address: "Varca Beach, Salcette, Goa 403721",
    coordinates: { lat: 15.2263, lng: 73.9425 },
    starRating: 5,
    rating: 4.7,
    reviewCount: 441,
    images: [
      "photo-1512343879784-a960bf40e7f2",
      "photo-1540541338287-41700207dee6",
      "photo-1571896349842-33c89424de2d",
    ],
    verified: true,
    verifiedAt: "2025-04-01",
    chargers: [
      { access: "Public", acDc: "AC", powerKw: 22, connector: "Type 2", guns: 2, fee: "Paid", appRequired: false },
    ],
    amenities: ["Wi-Fi", "Beach Access", "Pool", "Spa", "Restaurant", "Water Sports", "Parking"],
    bookingType: "partner",
    priceFrom: 9800,
    description: "5-star beachfront resort in Goa with 22 kW AC charging open to the public.",
    roomTypes: [
      { id: "r1", name: "Garden View Room", image: "photo-1631049307264-da0ec9d70304", bed: "King", maxGuests: 2, breakfast: true, cancellation: "Free", pricePerNight: 9800, taxesPerNight: 1764, availability: "available" },
      { id: "r2", name: "Sea View Room", image: "photo-1582719478250-c89cae4dc85b", bed: "King", maxGuests: 2, breakfast: true, cancellation: "Non-refundable", pricePerNight: 13500, taxesPerNight: 2430, availability: "sold-out" },
    ],
  },
  {
    id: "h6",
    slug: "coorg-nature-resort",
    name: "Tamara Coorg Resort",
    city: "Coorg",
    state: "Karnataka",
    address: "Yavakapadi Estate, Madikeri, Coorg, Karnataka 571201",
    coordinates: { lat: 12.4244, lng: 75.7382 },
    starRating: 5,
    rating: 4.8,
    reviewCount: 156,
    images: [
      "photo-1606298855672-3efb63017be8",
      "photo-1540541338287-41700207dee6",
      "photo-1445019980597-93fa8acb246c",
    ],
    verified: true,
    verifiedAt: "2025-03-28",
    chargers: [
      { access: "Public", acDc: "AC", powerKw: 22, connector: "Type 2", guns: 1, fee: "Free", appRequired: false },
    ],
    amenities: ["Wi-Fi", "Pool", "Spa", "Restaurant", "Coffee Plantation Tour", "Yoga"],
    bookingType: "direct",
    priceFrom: 12000,
    description: "Luxury eco-resort in the Coorg coffee country with 22 kW AC charging open to all.",
    roomTypes: [
      { id: "r1", name: "Wilderness Villa", image: "photo-1631049307264-da0ec9d70304", bed: "King", maxGuests: 2, breakfast: true, cancellation: "Free", pricePerNight: 12000, taxesPerNight: 2160, availability: "available" },
      { id: "r2", name: "Premium Treehouse", image: "photo-1582719478250-c89cae4dc85b", bed: "King", maxGuests: 2, breakfast: true, cancellation: "Non-refundable", pricePerNight: 18500, taxesPerNight: 3330, availability: "limited" },
    ],
  },
  {
    id: "h7",
    slug: "kabini-jungle-lodge",
    name: "Kabini Jungle Lodge",
    city: "Kabini",
    state: "Karnataka",
    address: "Murkal, Kabini, Karnataka 571114",
    coordinates: { lat: 11.9300, lng: 76.3400 },
    starRating: 4,
    rating: 4.5,
    reviewCount: 87,
    images: [
      "photo-1509316785289-025f5b846b35",
      "photo-1543512214-318c7553f230",
    ],
    verified: true,
    verifiedAt: "2024-12-10",
    chargers: [
      { access: "Guest Only", acDc: "AC", powerKw: null, connector: "Not confirmed", guns: null, fee: "Not confirmed", appRequired: null, notes: "Verified charger — detailed power information unavailable" },
    ],
    amenities: ["Restaurant", "Naturalist Guide", "Jeep Safari", "Parking"],
    bookingType: "direct",
    priceFrom: 7500,
    description: "Authentic jungle lodge near Kabini reservoir with a verified charger for guest use.",
    roomTypes: [
      { id: "r1", name: "Jungle Tent", image: "photo-1631049307264-da0ec9d70304", bed: "Twin", maxGuests: 2, breakfast: true, cancellation: "Non-refundable", pricePerNight: 7500, taxesPerNight: 1350, availability: "available" },
    ],
  },
  {
    id: "h8",
    slug: "leela-palace-udaipur",
    name: "The Leela Palace Udaipur",
    city: "Udaipur",
    state: "Rajasthan",
    address: "Lake Pichola, Udaipur, Rajasthan 313001",
    coordinates: { lat: 24.5754, lng: 73.6801 },
    starRating: 5,
    rating: 4.9,
    reviewCount: 503,
    images: [
      "photo-1549996168-1e8e3b1f8e8d",
      "photo-1571003123894-1f0594d2b5d9",
      "photo-1445019980597-93fa8acb246c",
    ],
    verified: true,
    verifiedAt: "2025-02-20",
    chargers: [
      { access: "Guest Only", acDc: "DC", powerKw: 50, connector: "CCS2", guns: 2, fee: "Free", appRequired: false },
      { access: "Guest Only", acDc: "AC", powerKw: 7.4, connector: "Type 2", guns: 2, fee: "Free", appRequired: false },
    ],
    amenities: ["Pool", "Spa", "Multiple Restaurants", "Lake View", "Heritage Architecture", "Parking", "Concierge"],
    bookingType: "direct",
    priceFrom: 22000,
    description: "A palace hotel on the shores of Lake Pichola, Udaipur. Verified EV charging for hotel guests.",
    roomTypes: [
      { id: "r1", name: "Royal Room", image: "photo-1631049307264-da0ec9d70304", bed: "King", maxGuests: 2, breakfast: true, cancellation: "Free", pricePerNight: 22000, taxesPerNight: 3960, availability: "available" },
      { id: "r2", name: "Lake View Suite", image: "photo-1582719478250-c89cae4dc85b", bed: "King", maxGuests: 2, breakfast: true, cancellation: "Free", pricePerNight: 38000, taxesPerNight: 6840, availability: "limited" },
    ],
  },
];

export function getHotelBySlug(slug: string): Hotel | undefined {
  return hotels.find(h => h.slug === slug);
}

export function getHotelsByCity(city: string): Hotel[] {
  return hotels.filter(h => h.city.toLowerCase() === city.toLowerCase());
}

export function getHotelsByState(state: string): Hotel[] {
  return hotels.filter(h => h.state.toLowerCase() === state.toLowerCase());
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getPrimaryCharger(hotel: Hotel): Charger | undefined {
  // Prefer public over guest only, DC over AC, higher power first
  return [...hotel.chargers].sort((a, b) => {
    if (a.access === "Public" && b.access !== "Public") return -1;
    if (b.access === "Public" && a.access !== "Public") return 1;
    if (a.acDc === "DC" && b.acDc !== "DC") return -1;
    if (b.acDc === "DC" && a.acDc !== "DC") return 1;
    return (b.powerKw ?? 0) - (a.powerKw ?? 0);
  })[0];
}
