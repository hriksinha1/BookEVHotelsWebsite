import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, Map, List, X, ChevronDown, Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";
import { hotels } from "../data/hotels";

const filterOptions = {
  access: ["Public charging", "Guest only"],
  chargerType: ["AC", "DC fast charging"],
  connector: ["Type 2", "CCS2"],
  power: ["7.4 kW+", "22 kW+", "50 kW+"],
  stars: ["5 star", "4 star", "3 star"],
};

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium border transition-colors ${
        active
          ? "bg-brand-50 text-brand-800 border-brand-700"
          : "bg-white text-neutral-800 border-neutral-500 hover:bg-neutral-100"
      }`}
    >
      {active && <X size={12} />}
      {label}
    </button>
  );
}

export default function SearchPage() {
  const [params] = useSearchParams();
  const destination = params.get("destination") || "";
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("Recommended");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "map">("list");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const toggleFilter = (f: string) =>
    setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const displayHotels = loading ? [] : hotels;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        {/* Sticky compact search */}
        <div className="bg-white border-b border-neutral-200 py-3 px-4 sm:px-6 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto">
            <SearchBar compact defaultDestination={destination} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Filters row */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-500 rounded-lg text-[14px] font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFilters.length > 0 && (
                <span className="bg-brand-700 text-white text-[11px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>

            {/* Quick filter chips */}
            {["Public charging", "DC fast charging", "Free charging", "5 star", "22 kW+"].map(f => (
              <FilterChip key={f} label={f} active={activeFilters.includes(f)} onClick={() => toggleFilter(f)} />
            ))}

            <div className="ml-auto flex items-center gap-3">
              {activeFilters.length > 0 && (
                <button onClick={() => setActiveFilters([])} className="text-[13px] text-brand-700 font-semibold hover:text-brand-800">
                  Clear all
                </button>
              )}

              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 bg-white border border-neutral-500 rounded-lg text-[13px] font-medium text-neutral-800 cursor-pointer"
                >
                  {["Recommended", "Price low to high", "Price high to low", "Rating", "Charger power"].map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              </div>

              {/* View toggle */}
              <div className="hidden md:flex items-center border border-neutral-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setView("list")}
                  className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium transition-colors ${view === "list" ? "bg-neutral-950 text-white" : "text-neutral-600 hover:bg-neutral-100"}`}
                >
                  <List size={14} /> List
                </button>
                <button
                  onClick={() => setView("map")}
                  className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium transition-colors ${view === "map" ? "bg-neutral-950 text-white" : "text-neutral-600 hover:bg-neutral-100"}`}
                >
                  <Map size={14} /> Map
                </button>
              </div>
            </div>
          </div>

          {/* Filter expanded panel */}
          {showFilters && (
            <div className="bg-white border border-neutral-200 rounded-xl p-5 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {Object.entries(filterOptions).map(([category, opts]) => (
                  <div key={category}>
                    <h4 className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider mb-3 capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <div className="space-y-2">
                      {opts.map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={activeFilters.includes(opt)}
                            onChange={() => toggleFilter(opt)}
                            className="accent-brand-700 w-4 h-4"
                          />
                          <span className="text-[13px] text-neutral-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results count */}
          {!loading && (
            <p className="text-[14px] text-neutral-600 mb-6">
              Showing <span className="font-semibold text-neutral-950">{displayHotels.length}</span> verified EV hotels
              {destination && <> in <span className="font-semibold text-neutral-950">{destination}</span></>}
            </p>
          )}

          {/* Results */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-neutral-200 animate-pulse">
                  <div className="aspect-[4/3] bg-neutral-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-neutral-200 rounded w-3/4" />
                    <div className="h-3 bg-neutral-200 rounded w-1/2" />
                    <div className="h-3 bg-neutral-200 rounded w-2/3" />
                    <div className="h-8 bg-neutral-200 rounded w-1/3 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayHotels.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-neutral-400" />
              </div>
              <h3 className="text-[20px] font-semibold text-neutral-950 mb-2">No verified EV stays found</h3>
              <p className="text-[15px] text-neutral-600 mb-6">Try changing your dates, expanding your area, or removing a filter.</p>
              <button onClick={() => setActiveFilters([])} className="bg-brand-700 text-white px-5 py-2.5 rounded-xl text-[14px] font-semibold hover:bg-brand-800 transition-colors">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
