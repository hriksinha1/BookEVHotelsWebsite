import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button, Input, Label } from "./ui";
import { toSearchParams, useSearchState } from "../hooks/useSearchState";

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
  const [searchState, setSearchState] = useSearchState(defaultDestination);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);

  const filtered = searchState.destination
    ? suggestions.filter(s =>
        s.city.toLowerCase().includes(searchState.destination.toLowerCase()) ||
        s.state.toLowerCase().includes(searchState.destination.toLowerCase())
      )
    : suggestions;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchState.checkIn && searchState.checkOut && searchState.checkOut <= searchState.checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }
    setError("");
    navigate(`/search?${toSearchParams(searchState).toString()}`);
  };

  if (compact) {
    return (
      <form onSubmit={handleSearch} className="grid gap-2 rounded-xl border border-neutral-200 bg-white p-2 shadow-sm md:grid-cols-[minmax(10rem,1fr)_auto_auto_auto]">
        <div className="flex min-h-11 items-center gap-2 px-3">
          <Search size={16} className="shrink-0 text-neutral-500" />
          <Input
          value={searchState.destination}
          onChange={e => setSearchState(current => ({ ...current, destination: e.target.value }))}
          placeholder="Where to?"
          aria-label="Destination"
          className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
        />
        </div>
        <Input
          type="date"
          min={today}
          value={searchState.checkIn}
          onChange={e => setSearchState(current => ({ ...current, checkIn: e.target.value }))}
          aria-label="Check-in"
          className="min-h-11 rounded-lg border border-neutral-200 px-3 text-sm text-neutral-700"
        />
        <Input
          type="date"
          min={searchState.checkIn || today}
          value={searchState.checkOut}
          onChange={e => setSearchState(current => ({ ...current, checkOut: e.target.value }))}
          aria-label="Check-out"
          className="min-h-11 rounded-lg border border-neutral-200 px-3 text-sm text-neutral-700"
        />
        <Button type="submit" className="min-h-11 rounded-lg bg-brand-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-800">
          Search
        </Button>
        {error && <p className="text-sm text-error-text md:col-span-4" role="alert">{error}</p>}
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
              <Label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-950">Where to?</Label>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-700 shrink-0" />
                <Input
                  value={searchState.destination}
                  onChange={e => { setSearchState(current => ({ ...current, destination: e.target.value })); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="City, state or hotel"
                  className="w-full bg-transparent text-base text-neutral-900 outline-none placeholder:text-neutral-400"
                  autoComplete="off"
                />
              </div>
            </div>
            {showSuggestions && filtered.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-neutral-200 rounded-xl shadow-xl mt-1 overflow-hidden">
                <div className="px-4 pt-3 pb-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Popular EV road-trip stops</p>
                </div>
                {filtered.slice(0, 6).map(s => (
                  <Button
                    key={s.city}
                    type="button"
                    onClick={() => { setSearchState(current => ({ ...current, destination: `${s.city}, ${s.state}` })); setShowSuggestions(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 text-left"
                  >
                    <MapPin size={14} className="text-brand-700 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{s.city} · {s.state}</p>
                      <p className="text-xs text-neutral-500">{s.count} verified EV hotels</p>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Check-in */}
          <div className="px-5 py-4">
            <Label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-950">Check-in</Label>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-neutral-400 shrink-0" />
              <Input
                type="date"
                min={today}
                value={searchState.checkIn}
                onChange={e => setSearchState(current => ({ ...current, checkIn: e.target.value }))}
                className="w-full bg-transparent text-base text-neutral-700 outline-none"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="px-5 py-4">
            <Label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-950">Check-out</Label>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-neutral-400 shrink-0" />
              <Input
                type="date"
                min={searchState.checkIn || today}
                value={searchState.checkOut}
                onChange={e => setSearchState(current => ({ ...current, checkOut: e.target.value }))}
                className="w-full bg-transparent text-base text-neutral-700 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100">
          <div className="grid flex-1 grid-cols-3 gap-3">
            <Users size={16} className="text-neutral-400" />
            <div>
              <Label htmlFor="rooms" className="block text-xs font-semibold text-neutral-600">Rooms</Label>
              <Input id="rooms" type="number" min={1} max={8} value={searchState.rooms} onChange={e => setSearchState(current => ({ ...current, rooms: Math.max(1, Number(e.target.value)) }))} className="mt-1 w-full rounded-lg border border-neutral-300 px-2 py-1 text-sm" />
            </div>
            <div>
              <Label htmlFor="adults" className="block text-xs font-semibold text-neutral-600">Adults</Label>
              <Input id="adults" type="number" min={1} max={16} value={searchState.adults} onChange={e => setSearchState(current => ({ ...current, adults: Math.max(1, Number(e.target.value)) }))} className="mt-1 w-full rounded-lg border border-neutral-300 px-2 py-1 text-sm" />
            </div>
            <div>
              <Label htmlFor="children" className="block text-xs font-semibold text-neutral-600">Children</Label>
              <Input id="children" type="number" min={0} max={8} value={searchState.children} onChange={e => setSearchState(current => ({ ...current, children: Math.max(0, Number(e.target.value)) }))} className="mt-1 w-full rounded-lg border border-neutral-300 px-2 py-1 text-sm" />
            </div>
          </div>
          <Button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-brand-700 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-800 active:bg-brand-900"
          >
            <Search size={16} />
            Search hotels
          </Button>
        </div>
        {error && <p className="px-5 pb-4 text-sm text-error-text" role="alert">{error}</p>}
      </div>
    </form>
  );
}
