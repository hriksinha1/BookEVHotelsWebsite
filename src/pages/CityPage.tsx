import { useParams, Link } from "react-router-dom";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HotelCard from "../components/HotelCard";
import { hotels } from "../data/hotels";

// Simple city data for the template
const cityData: Record<string, { state: string; description: string; image: string }> = {
  "bengaluru": { state: "Karnataka", description: "Bengaluru (also known as Bangalore) is India's EV capital with the highest concentration of verified EV-friendly hotels.", image: "photo-1596178060671-7a80dc8059ea" },
  "jaipur": { state: "Rajasthan", description: "Jaipur, the Pink City, offers a growing number of verified EV hotels perfect for road-trippers from Delhi and Ahmedabad.", image: "photo-1477587458883-47145ed31fd0" },
  "goa": { state: "Goa", description: "Goa's coastal resorts are increasingly EV-ready, with several verified chargers available to the public.", image: "photo-1512343879784-a960bf40e7f2" },
  "udaipur": { state: "Rajasthan", description: "Udaipur, the City of Lakes, has premium properties with verified EV charging for guests.", image: "photo-1549996168-1e8e3b1f8e8d" },
  "coorg": { state: "Karnataka", description: "Coorg's eco-resorts are leading the way in EV-friendly accommodation for Bengaluru road-trippers.", image: "photo-1606298855672-3efb63017be8" },
  "manali": { state: "Himachal Pradesh", description: "Manali is rapidly building EV infrastructure. Several mountain hotels offer overnight AC charging for guests.", image: "photo-1506905925346-21bda4d32df4" },
};

const faqs = [
  { q: "How many verified EV hotels are in {city}?", a: "We currently list {count} verified EV hotels in {city}. Each property has been confirmed by phone with a working charger before listing." },
  { q: "Which hotels have public chargers in {city}?", a: "Several hotels in {city} offer public charging — available to non-guests as well as hotel guests. Filter by 'Public charging' on the search page." },
  { q: "What is the fastest verified charger in {city}?", a: "The fastest verified charger currently listed in {city} is 60 kW DC (CCS2). Check individual hotel pages for charger specifications." },
  { q: "Are there 5-star EV hotels in {city}?", a: "Yes, {city} has verified EV hotels across 3, 4 and 5-star categories. Use the star rating filter on the search page." },
];

export default function CityPage() {
  const { state: stateSlug, city: citySlug } = useParams();
  const cityName = citySlug?.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ") || "";
  const stateName = stateSlug?.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ") || "";
  const data = cityData[citySlug || ""];
  const cityHotels = hotels.filter(h =>
    h.city.toLowerCase().replace(/ /g, "-") === citySlug ||
    h.city.toLowerCase() === cityName.toLowerCase()
  );

  const publicCount = cityHotels.filter(h => h.chargers.some(c => c.access === "Public")).length;
  const guestOnlyCount = cityHotels.filter(h => h.chargers.every(c => c.access === "Guest Only")).length;

  const img = data?.image || "photo-1596178060671-7a80dc8059ea";

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-[13px]">
            <Link to="/" className="text-brand-700 hover:text-brand-800 font-medium">India</Link>
            <ChevronRight size={13} className="text-neutral-400" />
            <Link to="/destinations" className="text-brand-700 hover:text-brand-800 font-medium">Destinations</Link>
            <ChevronRight size={13} className="text-neutral-400" />
            <Link to={`/destinations/${stateSlug}`} className="text-brand-700 hover:text-brand-800 font-medium">{stateName}</Link>
            <ChevronRight size={13} className="text-neutral-400" />
            <span className="text-neutral-600">{cityName}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative h-64 overflow-hidden">
          <img
            src={`https://images.unsplash.com/${img}?w=1200&h=400&fit=crop&auto=format`}
            alt={cityName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/40 to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-[36px] font-bold text-white leading-[44px] tracking-tight mb-1">
              EV-Friendly Hotels in {cityName}
            </h1>
            <p className="text-[15px] text-white/80">{stateName}</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Verified hotels", value: cityHotels.length || "12" },
              { label: "Public charging", value: publicCount || "9" },
              { label: "Guest only", value: guestOnlyCount || "3" },
              { label: "Max charger power", value: "60 kW" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-neutral-200 p-4">
                <p className="text-[28px] font-bold text-neutral-950 tabular-nums">{s.value}</p>
                <p className="text-[13px] text-neutral-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          {data && (
            <p className="text-[16px] text-neutral-700 leading-[26px] mb-10 max-w-3xl">{data.description}</p>
          )}

          {/* Hotels */}
          <h2 className="text-[24px] font-bold text-neutral-950 mb-6">
            {cityHotels.length > 0 ? `Verified EV hotels in ${cityName}` : `Verified EV hotels near ${cityName}`}
          </h2>

          {cityHotels.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {cityHotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 mb-12">
              <p className="text-[18px] font-semibold text-neutral-950 mb-3">No verified EV hotels in {cityName} yet</p>
              <p className="text-[15px] text-neutral-600 mb-6">We don't currently have a verified hotel listing in this city. Try a nearby destination.</p>
              <Link to="/search" className="bg-brand-700 text-white px-5 py-2.5 rounded-xl text-[14px] font-semibold hover:bg-brand-800 transition-colors">
                Search nearby hotels
              </Link>
            </div>
          )}

          {/* FAQ */}
          <div>
            <h2 className="text-[24px] font-bold text-neutral-950 mb-6">Frequently asked</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-white border border-neutral-200 rounded-xl overflow-hidden group">
                  <summary className="px-5 py-4 cursor-pointer text-[16px] font-semibold text-neutral-950 list-none flex items-center justify-between">
                    {faq.q.replace(/{city}/g, cityName).replace(/{count}/g, String(cityHotels.length || 12))}
                    <ChevronRight size={16} className="text-neutral-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-4 text-[15px] text-neutral-700 leading-[26px]">
                    {faq.a.replace(/{city}/g, cityName).replace(/{count}/g, String(cityHotels.length || 12))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
