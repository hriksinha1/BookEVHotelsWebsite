import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users, ChevronDown } from "lucide-react";

const suggestions = [
  { city: "Bengaluru", state: "Karnataka", count: 42 },
  { city: "Goa", state: "Goa", count: 31 },
  { city: "Jaipur", state: "Rajasthan", count: 24 },
  { city: "Mumbai", state: "Maharashtra", count: 29 },
  { city: "Udaipur", state: "Rajasthan", count: 18 },
  { city: "Coorg", state: "Karnataka", count: 14 },
  { city: "Shimla", state: "Himachal Pradesh", count: 11 },
  { city: "New Delhi", state: "Delhi", count: 38 },
];

export default function SearchBar({ compact = false, defaultDestination = "" }: { compact?: boolean; defaultDestination?: string }) {
  const [destination, setDestination] = useState(defaultDestination);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const navigate = useNavigate();

  const filtered = destination
    ? suggestions.filter(s =>
        s.city.toLowerCase().includes(destination.toLowerCase()) ||
        s.state.toLowerCase().includes(destination.toLowerCase())
      )
    : suggestions;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?destination=${encodeURIComponent(destination)}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`);
  };

  if (compact) {
    return (
      <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white rounded-full border border-neutral-200 shadow-sm px-4 py-2">
        <Search size={16} className="text-neutral-500 shrink-0" />
        <input
          value={destination}
          onChange={e => setDestination(e.target.value)}
          placeholder="Where to?"
          className="flex-1 text-[14px] text-neutral-900 placeholder:text-neutral-400 bg-transparent outline-none"
        />
        <span className="text-neutral-300 text-[13px]">|</span>
        <span className="text-[13px] text-neutral-600">{checkIn || "Check-in"}</span>
        <span className="text-neutral-300 text-[13px]">|</span>
        <span className="text-[13px] text-neutral-600">{checkOut || "Check-out"}</span>
        <button type="submit" className="bg-brand-700 text-white px-4 py-1.5 rounded-full text-[13px] font-semibold hover:bg-brand-800 transition-colors">
          Search
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          {/* Destination */}
          <div className="relative md:col-span-2">
            <div className="px-5 py-4">
              <label className="block text-[11px] font-semibold text-neutral-950 uppercase tracking-wider mb-1">Where to?</label>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-700 shrink-0" />
                <input
                  value={destination}
                  onChange={e => { setDestination(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="City, state or hotel"
                  className="w-full text-[15px] text-neutral-900 placeholder:text-neutral-400 bg-transparent outline-none"
                  autoComplete="off"
                />
              </div>
            </div>
            {showSuggestions && filtered.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-neutral-200 rounded-xl shadow-xl mt-1 overflow-hidden">
                <div className="px-4 pt-3 pb-1">
                  <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Popular EV road-trip stops</p>
                </div>
                {filtered.slice(0, 6).map(s => (
                  <button
                    key={s.city}
                    type="button"
                    onClick={() => { setDestination(`${s.city}, ${s.state}`); setShowSuggestions(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 text-left"
                  >
                    <MapPin size={14} className="text-brand-700 shrink-0" />
                    <div>
                      <p className="text-[14px] font-medium text-neutral-900">{s.city} · {s.state}</p>
                      <p className="text-[12px] text-neutral-500">{s.count} verified EV hotels</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Check-in */}
          <div className="px-5 py-4">
            <label className="block text-[11px] font-semibold text-neutral-950 uppercase tracking-wider mb-1">Check-in</label>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-neutral-400 shrink-0" />
              <input
                type="date"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                className="w-full text-[15px] text-neutral-700 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="px-5 py-4">
            <label className="block text-[11px] font-semibold text-neutral-950 uppercase tracking-wider mb-1">Check-out</label>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-neutral-400 shrink-0" />
              <input
                type="date"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                className="w-full text-[15px] text-neutral-700 bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100">
          <div className="flex items-center gap-3">
            <Users size={16} className="text-neutral-400" />
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-7 h-7 rounded-full border border-neutral-300 text-neutral-700 text-[14px] flex items-center justify-center hover:border-neutral-500">−</button>
              <span className="text-[14px] font-medium text-neutral-900 tabular-nums w-8 text-center">{guests} {guests === 1 ? "guest" : "guests"}</span>
              <button type="button" onClick={() => setGuests(guests + 1)} className="w-7 h-7 rounded-full border border-neutral-300 text-neutral-700 text-[14px] flex items-center justify-center hover:border-neutral-500">+</button>
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-brand-700 hover:bg-brand-800 active:bg-brand-900 text-white px-8 py-3 rounded-xl text-[15px] font-semibold transition-colors"
          >
            <Search size={16} />
            Search hotels
          </button>
        </div>
      </div>
    </form>
  );
}
