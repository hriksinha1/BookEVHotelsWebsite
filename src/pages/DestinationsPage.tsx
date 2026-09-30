import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const states = [
  { name: "Andhra Pradesh", cities: [{ name: "Visakhapatnam", count: 8 }, { name: "Vijayawada", count: 5 }] },
  { name: "Bihar", cities: [{ name: "Patna", count: 4 }] },
  { name: "Goa", cities: [{ name: "Goa", count: 31 }] },
  { name: "Gujarat", cities: [{ name: "Ahmedabad", count: 12 }, { name: "Surat", count: 7 }, { name: "Vadodara", count: 5 }] },
  { name: "Himachal Pradesh", cities: [{ name: "Shimla", count: 11 }, { name: "Manali", count: 9 }, { name: "Dharamsala", count: 6 }] },
  { name: "Karnataka", cities: [{ name: "Bengaluru", count: 42 }, { name: "Coorg", count: 14 }, { name: "Mysuru", count: 9 }] },
  { name: "Kerala", cities: [{ name: "Kochi", count: 19 }, { name: "Thiruvananthapuram", count: 8 }, { name: "Munnar", count: 6 }] },
  { name: "Maharashtra", cities: [{ name: "Mumbai", count: 29 }, { name: "Pune", count: 18 }, { name: "Nashik", count: 5 }] },
  { name: "Rajasthan", cities: [{ name: "Jaipur", count: 24 }, { name: "Udaipur", count: 18 }, { name: "Jodhpur", count: 11 }] },
  { name: "Tamil Nadu", cities: [{ name: "Chennai", count: 22 }, { name: "Coimbatore", count: 14 }, { name: "Madurai", count: 7 }] },
  { name: "Telangana", cities: [{ name: "Hyderabad", count: 28 }] },
  { name: "Uttarakhand", cities: [{ name: "Dehradun", count: 13 }, { name: "Rishikesh", count: 9 }] },
  { name: "West Bengal", cities: [{ name: "Kolkata", count: 17 }] },
  { name: "Delhi", cities: [{ name: "New Delhi", count: 38 }, { name: "Gurugram", count: 22 }] },
];

const zeroInventoryStates = [
  "Arunachal Pradesh", "Manipur", "Mizoram", "Nagaland",
  "Andaman and Nicobar Islands", "Ladakh", "Lakshadweep"
];

export default function DestinationsPage() {
  const toSlug = (s: string) => s.toLowerCase().replace(/ /g, "-");

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        {/* Hero */}
        <section className="bg-brand-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-[12px] font-semibold text-brand-400 uppercase tracking-[0.035em] mb-4">250+ cities</p>
            <h1 className="text-[40px] font-bold text-white leading-[48px] tracking-tight mb-4">
              Find EV-friendly stays across India.
            </h1>
            <p className="text-[17px] text-neutral-300 max-w-xl leading-[28px]">
              750+ verified hotels across 30+ states and Union Territories. Every listing confirmed by phone.
            </p>
          </div>
        </section>

        {/* Coverage stats */}
        <section className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "750+", label: "Verified hotels" },
                { value: "250+", label: "Cities" },
                { value: "30+", label: "States & UTs" },
                { value: "600+", label: "Public charging hotels" },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-[32px] font-bold text-brand-700 tabular-nums">{s.value}</p>
                  <p className="text-[14px] text-neutral-600 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* State directory */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-[28px] font-bold text-neutral-950 mb-8">Browse by state</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {states.map(state => (
                <div key={state.name} className="bg-white rounded-2xl border border-neutral-200 p-5">
                  <Link
                    to={`/destinations/${toSlug(state.name)}`}
                    className="block text-[20px] font-semibold text-neutral-950 hover:text-brand-700 transition-colors mb-3"
                  >
                    {state.name}
                  </Link>
                  <div className="space-y-2">
                    {state.cities.map(city => (
                      <div key={city.name} className="flex items-center justify-between">
                        <Link
                          to={`/destinations/${toSlug(state.name)}/${toSlug(city.name)}`}
                          className="flex items-center gap-2 text-[14px] text-neutral-700 hover:text-brand-700 transition-colors"
                        >
                          <MapPin size={13} className="text-neutral-400 shrink-0" />
                          {city.name}
                        </Link>
                        <span className="text-[13px] text-neutral-500">{city.count} hotels</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/destinations/${toSlug(state.name)}`}
                    className="flex items-center gap-1 mt-4 text-[13px] text-brand-700 font-semibold hover:text-brand-800 transition-colors"
                  >
                    View all in {state.name} <ChevronRight size={13} />
                  </Link>
                </div>
              ))}
            </div>

            {/* Zero inventory states */}
            <div className="mt-12 bg-neutral-100 rounded-2xl p-6">
              <h3 className="text-[18px] font-semibold text-neutral-800 mb-3">States with no verified listings yet</h3>
              <p className="text-[14px] text-neutral-600 mb-4 leading-[22px]">
                We don't currently have verified EV hotel listings for the following states. If you're travelling to these areas, check neighbouring states for alternatives.
              </p>
              <div className="flex flex-wrap gap-2">
                {zeroInventoryStates.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-neutral-200 text-neutral-700 text-[13px] rounded-lg">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
