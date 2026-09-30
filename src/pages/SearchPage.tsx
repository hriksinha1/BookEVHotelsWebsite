import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, List, Map as MapIcon, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";
import { Button, Heading, Input, Label, Select } from "../components/ui";
import { hotels, type Hotel } from "../data/hotels";

const filterGroups = [
  {
    label: "Verification & access",
    options: [
      { key: "verified", label: "Verified" },
      { key: "public", label: "Public charging" },
      { key: "guest-only", label: "Guest Only" },
    ],
  },
  {
    label: "Charger",
    options: [
      { key: "ac", label: "AC" },
      { key: "dc", label: "DC fast charging" },
      { key: "type-2", label: "Type 2" },
      { key: "ccs2", label: "CCS2" },
    ],
  },
  {
    label: "Power",
    options: [
      { key: "7.4kw", label: "7.4 kW+" },
      { key: "22kw", label: "22 kW+" },
      { key: "50kw", label: "50 kW+" },
    ],
  },
  {
    label: "Charging terms",
    options: [
      { key: "free", label: "Free charging" },
      { key: "paid", label: "Paid charging" },
      { key: "app", label: "App required" },
    ],
  },
  {
    label: "Hotel",
    options: [
      { key: "5-star", label: "5 star" },
      { key: "4-star", label: "4 star" },
      { key: "under-7500", label: "Under ₹7,500" },
      { key: "under-12500", label: "Under ₹12,500" },
      { key: "parking", label: "Parking" },
      { key: "pool", label: "Pool" },
      { key: "spa", label: "Spa" },
    ],
  },
] as const;

const filterLabels = new Map(
  filterGroups.flatMap(group => group.options.map(option => [option.key, option.label])),
);

function normalized(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function matchesDestination(hotel: Hotel, destination: string) {
  if (!destination.trim()) return true;
  const haystack = normalized(`${hotel.name} ${hotel.city} ${hotel.state}`);
  return normalized(destination).split(" ").filter(Boolean).every(term => haystack.includes(term));
}

function matchesFilter(hotel: Hotel, filter: string) {
  const chargers = hotel.chargers;
  switch (filter) {
    case "verified": return hotel.verified;
    case "public": return chargers.some(charger => charger.access === "Public");
    case "guest-only": return chargers.some(charger => charger.access === "Guest Only");
    case "ac": return chargers.some(charger => charger.acDc === "AC");
    case "dc": return chargers.some(charger => charger.acDc === "DC");
    case "type-2": return chargers.some(charger => charger.connector === "Type 2");
    case "ccs2": return chargers.some(charger => charger.connector === "CCS2");
    case "7.4kw": return chargers.some(charger => (charger.powerKw ?? 0) >= 7.4);
    case "22kw": return chargers.some(charger => (charger.powerKw ?? 0) >= 22);
    case "50kw": return chargers.some(charger => (charger.powerKw ?? 0) >= 50);
    case "free": return chargers.some(charger => charger.fee === "Free");
    case "paid": return chargers.some(charger => charger.fee === "Paid");
    case "app": return chargers.some(charger => charger.appRequired === true);
    case "5-star": return hotel.starRating === 5;
    case "4-star": return hotel.starRating === 4;
    case "under-7500": return hotel.roomTypes.some(room => room.availability !== "sold-out" && room.pricePerNight < 7500);
    case "under-12500": return hotel.roomTypes.some(room => room.availability !== "sold-out" && room.pricePerNight < 12500);
    case "parking": return hotel.amenities.includes("Parking");
    case "pool": return hotel.amenities.includes("Pool");
    case "spa": return hotel.amenities.includes("Spa");
    default: return true;
  }
}

function sortHotels(items: Hotel[], sort: string) {
  return [...items].sort((first, second) => {
    if (sort === "price-asc") return first.priceFrom - second.priceFrom;
    if (sort === "price-desc") return second.priceFrom - first.priceFrom;
    if (sort === "rating") return (second.rating ?? 0) - (first.rating ?? 0);
    if (sort === "power") {
      const maxPower = (hotel: Hotel) => Math.max(0, ...hotel.chargers.map(charger => charger.powerKw ?? 0));
      return maxPower(second) - maxPower(first);
    }
    return Number(second.verified) - Number(first.verified);
  });
}

function ResultsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading hotels">
      {[1, 2, 3, 4, 5, 6].map(item => (
        <div key={item} className="animate-pulse overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="aspect-[4/3] bg-neutral-200" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-3/4 rounded bg-neutral-200" />
            <div className="h-3 w-1/2 rounded bg-neutral-200" />
            <div className="h-3 w-2/3 rounded bg-neutral-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const destination = params.get("destination") || "";
  const activeFilters = (params.get("filters") || "").split(",").filter(Boolean);
  const sort = params.get("sort") || "recommended";
  const view = params.get("view") === "map" ? "map" : "list";
  const checkIn = params.get("checkin") || "";
  const checkOut = params.get("checkout") || "";
  const adults = Number(params.get("adults") || 2);
  const rooms = Number(params.get("rooms") || 1);
  const queryKey = params.toString();

  useEffect(() => {
    setLoading(true);
    const timeout = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timeout);
  }, [queryKey]);

  const displayHotels = useMemo(() => {
    const matches = hotels.filter(hotel =>
      matchesDestination(hotel, destination) &&
      activeFilters.every(filter => matchesFilter(hotel, filter)),
    );
    return sortHotels(matches, sort);
  }, [activeFilters.join(","), destination, sort]);

  const updateParam = (key: string, value?: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  const toggleFilter = (filter: string) => {
    const next = activeFilters.includes(filter)
      ? activeFilters.filter(item => item !== filter)
      : [...activeFilters, filter];
    updateParam("filters", next.join(","));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="pt-16">
        <div className="sticky top-16 z-30 border-b border-neutral-200 bg-white px-4 py-3 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <SearchBar compact defaultDestination={destination} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-7">
            <Heading level={1} className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
              {displayHotels.length} verified EV {displayHotels.length === 1 ? "stay" : "stays"}
              {destination ? ` matching ${destination}` : ""}
            </Heading>
            <p className="mt-2 text-sm text-neutral-600">
              {checkIn && checkOut
                ? `${new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(new Date(`${checkIn}T12:00:00`))} – ${new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(new Date(`${checkOut}T12:00:00`))} · `
                : "Add dates · "}
              {adults} {adults === 1 ? "guest" : "guests"} · {rooms} {rooms === 1 ? "room" : "rooms"}
            </p>
          </div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setShowFilters(current => !current)}
              className="flex min-h-11 items-center gap-2 rounded-lg border border-neutral-500 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
              aria-expanded={showFilters}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilters.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-xs font-semibold text-white">
                  {activeFilters.length}
                </span>
              )}
            </Button>

            {["public", "dc", "free", "22kw"].map(filter => (
              <Button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`min-h-11 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  activeFilters.includes(filter)
                    ? "border-brand-700 bg-brand-50 text-brand-800"
                    : "border-neutral-400 bg-white text-neutral-800 hover:bg-neutral-100"
                }`}
              >
                {activeFilters.includes(filter) && <X size={13} className="mr-1 inline" />}
                {filterLabels.get(filter)}
              </Button>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <Select
                  value={sort}
                  onChange={event => updateParam("sort", event.target.value === "recommended" ? undefined : event.target.value)}
                  aria-label="Sort hotels"
                  className="min-h-11 appearance-none rounded-lg border border-neutral-400 bg-white py-2 pl-3 pr-9 text-sm font-medium text-neutral-800"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price low to high</option>
                  <option value="price-desc">Price high to low</option>
                  <option value="rating">Guest rating</option>
                  <option value="power">Charger power</option>
                </Select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              </div>
              <div className="hidden overflow-hidden rounded-lg border border-neutral-300 md:flex">
                <Button onClick={() => updateParam("view")} className={`flex min-h-11 items-center gap-2 px-3 text-sm font-medium ${view === "list" ? "bg-neutral-950 text-white" : "bg-white text-neutral-600"}`}>
                  <List size={15} /> List
                </Button>
                <Button onClick={() => updateParam("view", "map")} className={`flex min-h-11 items-center gap-2 px-3 text-sm font-medium ${view === "map" ? "bg-neutral-950 text-white" : "bg-white text-neutral-600"}`}>
                  <MapIcon size={15} /> Map
                </Button>
              </div>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2" aria-label="Active filters">
              {activeFilters.map(filter => (
                <Button key={filter} onClick={() => toggleFilter(filter)} className="flex min-h-11 items-center gap-2 rounded-full bg-brand-50 px-4 text-sm font-medium text-brand-800">
                  {filterLabels.get(filter) ?? filter}
                  <X size={14} />
                </Button>
              ))}
              <Button onClick={() => updateParam("filters")} className="min-h-11 px-3 text-sm font-semibold text-brand-700">
                Clear all
              </Button>
            </div>
          )}

          {showFilters && (
            <aside className="fixed inset-0 z-50 overflow-y-auto bg-white p-5 md:static md:mb-6 md:rounded-2xl md:border md:border-neutral-200" aria-label="Hotel filters">
              <div className="mb-5 flex items-center justify-between md:hidden">
                <Heading level={2} className="text-xl font-semibold text-neutral-950">Filters</Heading>
                <Button onClick={() => setShowFilters(false)} className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100" aria-label="Close filters">
                  <X size={18} />
                </Button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {filterGroups.map(group => (
                  <fieldset key={group.label}>
                    <legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">{group.label}</legend>
                    <div className="space-y-2">
                      {group.options.map(option => (
                        <Label key={option.key} className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-neutral-700">
                          <Input
                            type="checkbox"
                            checked={activeFilters.includes(option.key)}
                            onChange={() => toggleFilter(option.key)}
                            className="h-4 w-4 accent-brand-700"
                          />
                          {option.label}
                        </Label>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
              <div className="sticky bottom-0 mt-6 flex gap-3 border-t border-neutral-200 bg-white py-4 md:hidden">
                <Button onClick={() => updateParam("filters")} className="min-h-12 flex-1 rounded-xl border border-neutral-300 text-sm font-semibold text-neutral-700">Clear all</Button>
                <Button onClick={() => setShowFilters(false)} className="min-h-12 flex-1 rounded-xl bg-brand-700 text-sm font-semibold text-white">Show {displayHotels.length} stays</Button>
              </div>
            </aside>
          )}

          {!loading && (
            <p className="mb-6 text-sm text-neutral-600" aria-live="polite">
              <strong className="text-neutral-950">{displayHotels.length}</strong> verified EV {displayHotels.length === 1 ? "hotel" : "hotels"}
              {destination && <> matching <strong className="text-neutral-950">{destination}</strong></>}
            </p>
          )}

          {loading ? (
            <ResultsSkeleton />
          ) : displayHotels.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-16 text-center">
              <Search size={28} className="mx-auto mb-4 text-neutral-400" />
              <Heading level={2} className="text-xl font-semibold text-neutral-950">No verified EV stays match</Heading>
              <p className="mx-auto mt-2 max-w-lg text-sm text-neutral-600">
                Remove a filter, search the state instead of the city, or try a nearby destination.
              </p>
              <Button onClick={() => updateParam("filters")} className="mt-6 min-h-11 rounded-xl bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-800">
                Clear filters
              </Button>
            </div>
          ) : view === "map" ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                {displayHotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} compact />)}
              </div>
              <section className="rounded-2xl bg-neutral-950 p-6 text-white">
                <div className="mb-6 flex items-start gap-3">
                  <MapPin className="mt-1 text-brand-400" size={20} />
                  <div>
                    <Heading level={2} className="text-xl font-semibold">Map results</Heading>
                    <p className="mt-1 text-sm text-neutral-300">Coordinates from the listing data, mirrored in the hotel list.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {displayHotels.map((hotel, index) => (
                    <div key={hotel.id} className="flex items-start gap-3 rounded-xl bg-neutral-900 p-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-bold">{index + 1}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{hotel.name}</p>
                        <p className="mt-1 text-xs text-neutral-400">{hotel.coordinates.lat}, {hotel.coordinates.lng}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayHotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
