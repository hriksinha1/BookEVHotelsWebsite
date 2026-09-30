import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin, Minus, Plus, Search, Users, X } from "lucide-react";
import { hotels } from "../data/hotels";
import { toSearchParams, useSearchState, type SearchState } from "../hooks/useSearchState";
import { Button, Input, Label } from "./ui";

const destinationOptions = Array.from(
  new Map(
    hotels.map(hotel => [
      `${hotel.city}-${hotel.state}`,
      { city: hotel.city, state: hotel.state },
    ]),
  ).values(),
);

function formatDate(value: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(
    new Date(`${value}T12:00:00`),
  );
}

function toIso(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function DestinationAutocomplete({
  value,
  onChange,
  open,
  onOpen,
  onClose,
}: {
  value: string;
  onChange: (value: string) => void;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const matches = useMemo(() => {
    const query = value.toLowerCase().trim();
    const destinations = destinationOptions.filter(option =>
      `${option.city} ${option.state}`.toLowerCase().includes(query),
    );
    const hotelMatches = hotels
      .filter(hotel => query && hotel.name.toLowerCase().includes(query))
      .map(hotel => ({ city: hotel.name, state: `${hotel.city}, ${hotel.state}` }));
    return [...hotelMatches, ...destinations].slice(0, 7);
  }, [value]);

  return (
    <div className="relative min-w-0 flex-1">
      <Label htmlFor="search-destination" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
        Where are you going?
      </Label>
      <div className="flex items-center gap-2">
        <MapPin size={18} className="shrink-0 text-brand-700" />
        <Input
          id="search-destination"
          value={value}
          onChange={event => {
            onChange(event.target.value);
            onOpen();
          }}
          onFocus={onOpen}
          placeholder="Search city, hotel or destination"
          autoComplete="off"
          className="min-h-7 min-w-0 flex-1 bg-transparent text-base font-medium text-neutral-950 outline-none placeholder:font-normal placeholder:text-neutral-500"
          aria-expanded={open}
          aria-controls="destination-options"
        />
        {value && (
          <Button onClick={() => onChange("")} className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100" aria-label="Clear destination">
            <X size={16} />
          </Button>
        )}
      </div>
      {open && (
        <div id="destination-options" className="fixed inset-x-4 bottom-4 z-50 max-h-96 overflow-auto rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl md:absolute md:inset-x-auto md:bottom-auto md:left-0 md:top-full md:mt-4 md:w-96">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {value ? "Matching destinations" : "Popular EV destinations"}
            </p>
            <Button onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 md:hidden" aria-label="Close destinations">
              <X size={18} />
            </Button>
          </div>
          {matches.length ? matches.map(option => (
            <Button
              key={`${option.city}-${option.state}`}
              onClick={() => {
                onChange(`${option.city}, ${option.state}`);
                onClose();
              }}
              className="flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left hover:bg-neutral-100"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <MapPin size={16} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-neutral-950">{option.city}</span>
                <span className="block text-xs text-neutral-600">{option.state}</span>
              </span>
            </Button>
          )) : (
            <p className="px-3 py-6 text-sm text-neutral-600">No matching city, state or hotel in the current listings.</p>
          )}
        </div>
      )}
    </div>
  );
}

function MonthCalendar({
  month,
  checkIn,
  checkOut,
  onSelect,
}: {
  month: Date;
  checkIn: string;
  checkOut: string;
  onSelect: (date: string) => void;
}) {
  const today = toIso(new Date());
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const blanks = Array.from({ length: first.getDay() });

  return (
    <div className="min-w-0 flex-1">
      <p className="mb-3 text-center text-sm font-semibold text-neutral-950">
        {new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(month)}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
          <span key={day} className="py-1 text-xs font-medium text-neutral-500">{day}</span>
        ))}
        {blanks.map((_, index) => <span key={`blank-${index}`} />)}
        {Array.from({ length: total }, (_, index) => {
          const iso = toIso(new Date(month.getFullYear(), month.getMonth(), index + 1));
          const disabled = iso < today;
          const selected = iso === checkIn || iso === checkOut;
          const inRange = Boolean(checkIn && checkOut && iso > checkIn && iso < checkOut);
          return (
            <Button
              key={iso}
              disabled={disabled}
              onClick={() => onSelect(iso)}
              aria-label={new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(`${iso}T12:00:00`))}
              className={`flex h-11 min-w-11 items-center justify-center rounded-lg text-sm transition-colors disabled:cursor-not-allowed disabled:text-neutral-300 ${
                selected
                  ? "bg-brand-700 font-semibold text-white"
                  : inRange
                    ? "bg-brand-50 text-brand-900"
                    : "text-neutral-800 hover:bg-neutral-100"
              }`}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

function DateRangePicker({
  state,
  onChange,
  open,
  onToggle,
  onClose,
}: {
  state: SearchState;
  onChange: (next: SearchState) => void;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const selectDate = (date: string) => {
    if (!state.checkIn || state.checkOut || date <= state.checkIn) {
      onChange({ ...state, checkIn: date, checkOut: "" });
      return;
    }
    onChange({ ...state, checkOut: date });
    onClose();
  };

  const summary = state.checkIn
    ? `${formatDate(state.checkIn)}${state.checkOut ? ` — ${formatDate(state.checkOut)}` : " — Check-out"}`
    : "Add travel dates";

  return (
    <div className="relative flex-1">
      <Button onClick={onToggle} className="w-full text-left" aria-expanded={open}>
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">Dates</span>
        <span className="flex min-h-7 items-center gap-2 text-base font-medium text-neutral-950">
          <CalendarDays size={18} className="shrink-0 text-brand-700" />
          {summary}
        </span>
      </Button>
      {open && (
        <div className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xl md:absolute md:inset-x-auto md:bottom-auto md:left-1/2 md:top-full md:mt-4 md:w-[42rem] md:-translate-x-1/2">
          <div className="mb-3 flex items-center justify-between">
            <Button onClick={() => setVisibleMonth(current => new Date(current.getFullYear(), current.getMonth() - 1, 1))} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-neutral-100" aria-label="Previous month">
              <ChevronLeft size={18} />
            </Button>
            <p className="text-sm text-neutral-600">Choose check-in, then check-out</p>
            <Button onClick={() => setVisibleMonth(current => new Date(current.getFullYear(), current.getMonth() + 1, 1))} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-neutral-100" aria-label="Next month">
              <ChevronRight size={18} />
            </Button>
          </div>
          <div className="flex gap-6">
            <MonthCalendar month={visibleMonth} checkIn={state.checkIn} checkOut={state.checkOut} onSelect={selectDate} />
            <div className="hidden flex-1 md:block">
              <MonthCalendar month={new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1)} checkIn={state.checkIn} checkOut={state.checkOut} onSelect={selectDate} />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-3">
            <Button onClick={() => onChange({ ...state, checkIn: "", checkOut: "" })} className="min-h-11 px-3 text-sm font-semibold text-neutral-600">Clear dates</Button>
            <Button onClick={onClose} className="min-h-11 rounded-xl bg-neutral-950 px-5 text-sm font-semibold text-white">Done</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Counter({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-5">
      <span className="text-sm font-medium text-neutral-800">{label}</span>
      <span className="flex items-center gap-3">
        <Button disabled={value <= min} onClick={() => onChange(value - 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 disabled:text-neutral-300" aria-label={`Decrease ${label.toLowerCase()}`}>
          <Minus size={16} />
        </Button>
        <span className="w-5 text-center text-sm font-semibold text-neutral-950">{value}</span>
        <Button onClick={() => onChange(value + 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-700" aria-label={`Increase ${label.toLowerCase()}`}>
          <Plus size={16} />
        </Button>
      </span>
    </div>
  );
}

function GuestSelector({
  state,
  onChange,
  open,
  onToggle,
  onClose,
}: {
  state: SearchState;
  onChange: (next: SearchState) => void;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const guestSummary = state.children
    ? `${state.adults} ${state.adults === 1 ? "adult" : "adults"} · ${state.children} ${state.children === 1 ? "child" : "children"} · ${state.rooms} ${state.rooms === 1 ? "room" : "rooms"}`
    : `${state.adults} ${state.adults === 1 ? "guest" : "guests"} · ${state.rooms} ${state.rooms === 1 ? "room" : "rooms"}`;

  return (
    <div className="relative flex-1">
      <Button onClick={onToggle} className="w-full text-left" aria-expanded={open}>
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">Guests</span>
        <span className="flex min-h-7 items-center gap-2 text-base font-medium text-neutral-950">
          <Users size={18} className="shrink-0 text-brand-700" />
          {guestSummary}
        </span>
      </Button>
      {open && (
        <div className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl md:absolute md:inset-x-auto md:bottom-auto md:right-0 md:top-full md:mt-4 md:w-80">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-base font-semibold text-neutral-950">Guests</p>
            <Button onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 md:hidden" aria-label="Close guest selector">
              <X size={18} />
            </Button>
          </div>
          <Counter label="Adults" value={state.adults} min={1} onChange={adults => onChange({ ...state, adults })} />
          <Counter label="Children" value={state.children} min={0} onChange={children => onChange({ ...state, children })} />
          <Counter label="Rooms" value={state.rooms} min={1} onChange={rooms => onChange({ ...state, rooms })} />
          <Button onClick={onClose} className="mt-3 min-h-11 w-full rounded-xl bg-brand-700 text-sm font-semibold text-white hover:bg-brand-800">Apply</Button>
        </div>
      )}
    </div>
  );
}

export default function SearchBar({
  compact = false,
  defaultDestination = "",
}: {
  compact?: boolean;
  defaultDestination?: string;
}) {
  const [state, setState] = useSearchState(defaultDestination);
  const [activePanel, setActivePanel] = useState<"destination" | "dates" | "guests" | null>(null);
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!state.destination.trim()) {
      setError("Where are you heading?");
      setActivePanel("destination");
      return;
    }
    if ((state.checkIn && !state.checkOut) || (state.checkIn && state.checkOut <= state.checkIn)) {
      setError("Choose a check-out date after check-in.");
      setActivePanel("dates");
      return;
    }
    setError("");
    setSearching(true);
    window.setTimeout(() => navigate(`/search?${toSearchParams(state).toString()}`), 300);
  };

  return (
    <form onSubmit={submit} className={`mx-auto w-full ${compact ? "max-w-7xl" : "max-w-6xl"}`}>
      <div className={`grid gap-0 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl ${
        compact
          ? "md:grid-cols-[minmax(14rem,1.4fr)_minmax(14rem,1fr)_minmax(13rem,1fr)_auto]"
          : "md:grid-cols-[minmax(16rem,1.5fr)_minmax(16rem,1fr)_minmax(14rem,1fr)_auto]"
      }`}>
        <div className="flex min-h-20 items-center px-4">
          <DestinationAutocomplete
            value={state.destination}
            onChange={destination => setState(current => ({ ...current, destination }))}
            open={activePanel === "destination"}
            onOpen={() => setActivePanel("destination")}
            onClose={() => setActivePanel(null)}
          />
        </div>
        <div className="flex min-h-20 items-center border-t border-neutral-200 px-4 md:border-l md:border-t-0">
          <DateRangePicker
            state={state}
            onChange={setState}
            open={activePanel === "dates"}
            onToggle={() => setActivePanel(activePanel === "dates" ? null : "dates")}
            onClose={() => setActivePanel(null)}
          />
        </div>
        <div className="flex min-h-20 items-center border-t border-neutral-200 px-4 md:border-l md:border-t-0">
          <GuestSelector
            state={state}
            onChange={setState}
            open={activePanel === "guests"}
            onToggle={() => setActivePanel(activePanel === "guests" ? null : "guests")}
            onClose={() => setActivePanel(null)}
          />
        </div>
        <div className="flex items-center pt-2 md:pl-2 md:pt-0">
          <Button
            type="submit"
            disabled={searching}
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 text-base font-semibold text-white transition-colors hover:bg-brand-800 active:bg-brand-900 disabled:bg-brand-600 md:w-auto"
          >
            <Search size={18} />
            {searching ? "Searching verified EV stays..." : "Search hotels"}
          </Button>
        </div>
      </div>
      {error && <p className={`mt-2 text-sm font-medium ${compact ? "text-error-text" : "text-error-bg"}`} role="alert">{error}</p>}
    </form>
  );
}
