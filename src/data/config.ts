export const siteConfig = {
  name: "Book EV Hotels",
  tagline: "Charge up your stay.",
  supportLine: "Verified EV-friendly hotels across India, with charger details you can trust.",
  brandStatement: "India's trusted directory of hotels with verified EV charging facilities. Drive sustainable, stay charged.",
  email: "hello@bookevhotels.com",
  supportEmail: "support@bookevhotels.com",
  stats: {
    verifiedHotels: "750+",
    cities: "250+",
    states: "30+",
    publicCharging: "600+",
  },
  verificationFee: {
    base: 5000,
    gst: 18,
    total: 5900,
    display: "₹5,000 + 18% GST (₹5,900 incl. GST)",
  },
  minChargerKw: 7.4,
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.bookevhotels",
};

export const popularDestinations = [
  { city: "Bengaluru", state: "Karnataka", hotelCount: 42, image: "photo-1596178060671-7a80dc8059ea" },
  { city: "Udaipur", state: "Rajasthan", hotelCount: 18, image: "photo-1549996168-1e8e3b1f8e8d" },
  { city: "Goa", state: "Goa", hotelCount: 31, image: "photo-1512343879784-a960bf40e7f2" },
  { city: "Jaipur", state: "Rajasthan", hotelCount: 24, image: "photo-1477587458883-47145ed31fd0" },
  { city: "Kochi", state: "Kerala", hotelCount: 19, image: "photo-1602215689574-d64f8cbc0b20" },
  { city: "Coorg", state: "Karnataka", hotelCount: 14, image: "photo-1606298855672-3efb63017be8" },
  { city: "New Delhi", state: "Delhi", hotelCount: 38, image: "photo-1587474260584-136574528ed5" },
  { city: "Mumbai", state: "Maharashtra", hotelCount: 29, image: "photo-1595658658481-d53d3f999875" },
];

export const roadTrips = [
  { route: "Delhi → Jaipur → Udaipur", km: "650 km", hotels: 12, image: "photo-1477587458883-47145ed31fd0" },
  { route: "Mumbai → Goa", km: "590 km", hotels: 8, image: "photo-1512343879784-a960bf40e7f2" },
  { route: "Bengaluru → Coorg", km: "270 km", hotels: 6, image: "photo-1606298855672-3efb63017be8" },
  { route: "Delhi → Manali", km: "540 km", hotels: 9, image: "photo-1506905925346-21bda4d32df4" },
];
