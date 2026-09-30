import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CheckCircle2, ChevronRight, CreditCard, Zap } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Heading, Input, Label, Textarea } from "../components/ui";
import { formatPrice, getHotelBySlug } from "../data/hotels";
import type { RoomType } from "../data/hotels";
import { useBookings } from "../hooks/useBookings";
import SafeImage from "../components/SafeImage";
import { imageFromPhotoId } from "../data/images";

interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  requests: string;
}

interface BookingState {
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  guest: GuestDetails;
}

const emptyGuest: GuestDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  requests: "",
};

function readSearchDates() {
  try {
    const search = JSON.parse(localStorage.getItem("book-ev-hotels-search") || "{}");
    return {
      checkIn: typeof search.checkIn === "string" ? search.checkIn : "",
      checkOut: typeof search.checkOut === "string" ? search.checkOut : "",
      adults: Number(search.adults) || 2,
      children: Number(search.children) || 0,
    };
  } catch {
    return { checkIn: "", checkOut: "", adults: 2, children: 0 };
  }
}

function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  return Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000));
}

function BookingSteps({ current }: { current: number }) {
  return (
    <div className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 overflow-x-auto px-4 py-5">
        {["Room", "Guest", "Review", "Payment", "Confirmed"].map((label, index) => (
          <div key={label} className="flex shrink-0 items-center gap-2">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
              index + 1 <= current ? "bg-brand-700 text-white" : "bg-neutral-200 text-neutral-500"
            }`}>
              {index + 1 < current ? <CheckCircle2 size={14} /> : index + 1}
            </span>
            <span className={`hidden text-xs font-medium sm:block ${index + 1 === current ? "text-neutral-950" : "text-neutral-500"}`}>{label}</span>
            {index < 4 && <ChevronRight size={14} className="text-neutral-300" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoomSelection({
  rooms,
  state,
  onChange,
  onContinue,
}: {
  rooms: RoomType[];
  state: BookingState;
  onChange: (next: BookingState) => void;
  onContinue: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const validDates = nightsBetween(state.checkIn, state.checkOut) > 0;

  return (
    <div className="space-y-5">
      <Heading level={1} className="text-2xl font-bold text-neutral-950">Choose dates and a room</Heading>
      <div className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="booking-checkin" className="mb-2 block text-sm font-semibold text-neutral-800">Check-in</Label>
          <Input id="booking-checkin" type="date" min={today} value={state.checkIn} onChange={event => onChange({ ...state, checkIn: event.target.value })} className="min-h-11 w-full rounded-xl border border-neutral-400 px-3 text-sm" />
        </div>
        <div>
          <Label htmlFor="booking-checkout" className="mb-2 block text-sm font-semibold text-neutral-800">Check-out</Label>
          <Input id="booking-checkout" type="date" min={state.checkIn || today} value={state.checkOut} onChange={event => onChange({ ...state, checkOut: event.target.value })} className="min-h-11 w-full rounded-xl border border-neutral-400 px-3 text-sm" />
        </div>
        {!validDates && state.checkIn && state.checkOut && <p className="text-sm text-error-text sm:col-span-2" role="alert">Check-out must be after check-in.</p>}
      </div>
      {rooms.map(room => {
        const available = room.availability !== "sold-out";
        const selected = state.roomId === room.id;
        return (
          <div key={room.id} className={`rounded-2xl border-2 bg-white p-5 ${selected ? "border-brand-700" : "border-neutral-200"} ${available ? "" : "opacity-60"}`}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <Heading level={2} className="text-lg font-semibold text-neutral-950">{room.name}</Heading>
                <p className="mt-1 text-sm text-neutral-600">{room.bed} · Up to {room.maxGuests} guests</p>
                <p className={`mt-2 text-sm ${room.cancellation === "Free" ? "text-success-text" : "text-warning-text"}`}>
                  {room.cancellation === "Free" ? "Free cancellation" : "Non-refundable"} · {room.breakfast ? "Breakfast included" : "No breakfast"}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-xl font-bold text-neutral-950">{formatPrice(room.pricePerNight)} <span className="text-sm font-normal text-neutral-500">/ night</span></p>
                <p className="mt-1 text-xs text-neutral-500">+ {formatPrice(room.taxesPerNight)} taxes per night</p>
                <Button disabled={!available} onClick={() => onChange({ ...state, roomId: room.id })} className={`mt-3 min-h-11 rounded-xl px-4 text-sm font-semibold ${selected ? "bg-brand-700 text-white" : "border border-brand-700 text-brand-700"} disabled:border-neutral-200 disabled:text-neutral-500`}>
                  {!available ? "Sold out" : selected ? "Selected" : "Select room"}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
      <Button disabled={!state.roomId || !validDates} onClick={onContinue} className="min-h-12 w-full rounded-xl bg-brand-700 px-5 text-base font-semibold text-white hover:bg-brand-800 disabled:bg-neutral-200 disabled:text-neutral-500">
        Continue to guest details
      </Button>
    </div>
  );
}

function GuestForm({
  guest,
  onChange,
  onContinue,
}: {
  guest: GuestDetails;
  onChange: (guest: GuestDetails) => void;
  onContinue: () => void;
}) {
  const [showErrors, setShowErrors] = useState(false);
  const valid = Boolean(guest.firstName && guest.lastName && /\S+@\S+\.\S+/.test(guest.email) && /^[6-9]\d{9}$/.test(guest.phone));
  const fieldClass = "min-h-11 w-full rounded-xl border border-neutral-400 bg-white px-4 text-base outline-none focus:border-brand-700";

  return (
    <form onSubmit={event => { event.preventDefault(); setShowErrors(true); if (valid) onContinue(); }} className="space-y-5">
      <Heading level={1} className="text-2xl font-bold text-neutral-950">Who is checking in?</Heading>
      <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="first-name" className="mb-2 block text-sm font-semibold text-neutral-800">First name</Label>
            <Input id="first-name" value={guest.firstName} onChange={event => onChange({ ...guest, firstName: event.target.value })} className={fieldClass} autoComplete="given-name" />
          </div>
          <div>
            <Label htmlFor="last-name" className="mb-2 block text-sm font-semibold text-neutral-800">Last name</Label>
            <Input id="last-name" value={guest.lastName} onChange={event => onChange({ ...guest, lastName: event.target.value })} className={fieldClass} autoComplete="family-name" />
          </div>
        </div>
        <div>
          <Label htmlFor="guest-email" className="mb-2 block text-sm font-semibold text-neutral-800">Email</Label>
          <Input id="guest-email" type="email" value={guest.email} onChange={event => onChange({ ...guest, email: event.target.value })} className={fieldClass} autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="guest-phone" className="mb-2 block text-sm font-semibold text-neutral-800">Indian mobile number</Label>
          <Input id="guest-phone" type="tel" value={guest.phone} onChange={event => onChange({ ...guest, phone: event.target.value })} className={fieldClass} autoComplete="tel" />
        </div>
        <div>
          <Label htmlFor="guest-requests" className="mb-2 block text-sm font-semibold text-neutral-800">Special requests <span className="font-normal text-neutral-500">(optional)</span></Label>
          <Textarea id="guest-requests" value={guest.requests} onChange={event => onChange({ ...guest, requests: event.target.value })} className="min-h-24 w-full rounded-xl border border-neutral-400 p-4 text-base outline-none focus:border-brand-700" />
          <p className="mt-1 text-xs text-neutral-500">Requests are subject to hotel availability.</p>
        </div>
        {showErrors && !valid && <p className="text-sm text-error-text" role="alert">Enter a name, valid email and 10-digit Indian mobile number.</p>}
      </div>
      <Button type="submit" className="min-h-12 w-full rounded-xl bg-brand-700 text-base font-semibold text-white hover:bg-brand-800">Continue to review</Button>
    </form>
  );
}

export default function BookingFlowPage() {
  const { slug = "" } = useParams();
  const hotel = getHotelBySlug(slug);
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const pathStep = location.pathname.split("/").at(-1) || "rooms";
  const storageKey = `book-ev-hotels-booking-${slug}`;
  const searchDates = readSearchDates();
  const [state, setState] = useState<BookingState>(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem(storageKey) || "{}");
      return {
        roomId: params.get("room") || stored.roomId || "",
        checkIn: params.get("checkin") || stored.checkIn || searchDates.checkIn,
        checkOut: params.get("checkout") || stored.checkOut || searchDates.checkOut,
        adults: stored.adults || searchDates.adults,
        children: stored.children ?? searchDates.children,
        guest: { ...emptyGuest, ...stored.guest },
      };
    } catch {
      return { roomId: params.get("room") || "", ...searchDates, guest: emptyGuest };
    }
  });
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const { createBooking } = useBookings();

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const room = hotel?.roomTypes.find(item => item.id === state.roomId);
  const nights = nightsBetween(state.checkIn, state.checkOut);
  const total = room ? (room.pricePerNight + room.taxesPerNight) * nights : 0;
  const stepNumber = { rooms: 1, guest: 2, review: 3, payment: 4, confirmation: 5 }[pathStep] ?? 1;
  const hasGuest = Boolean(state.guest.firstName && state.guest.email);
  const confirmationReference = params.get("id") || "";

  if (!hotel) return <Navigate to="/search" replace />;
  if (hotel.bookingType === "partner") return <Navigate to={`/hotels/${hotel.slug}`} replace />;
  if (pathStep !== "rooms" && !room) return <Navigate to={`/booking/${slug}/rooms`} replace />;
  if (["review", "payment", "confirmation"].includes(pathStep) && !hasGuest) return <Navigate to={`/booking/${slug}/guest`} replace />;

  const pay = () => {
    setProcessing(true);
    setPaymentError(false);
    window.setTimeout(() => {
      setProcessing(false);
      if (params.get("failure") === "true") setPaymentError(true);
      else {
        const booking = createBooking({
          hotelSlug: hotel.slug,
          roomId: room?.id || "",
          checkIn: state.checkIn,
          checkOut: state.checkOut,
          adults: state.adults,
          children: state.children,
          total,
        });
        navigate(`/booking/${slug}/confirmation?id=${booking.id}`);
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="pt-16">
        <BookingSteps current={stepNumber} />
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4">
            <SafeImage src={imageFromPhotoId(hotel.images[0])} alt="" fallback="hotel" className="h-14 w-14 shrink-0 rounded-lg" />
            <div>
              <p className="text-sm font-semibold text-neutral-950">{hotel.name}</p>
              <p className="mt-1 text-xs text-neutral-600">{hotel.city}, {hotel.state}{nights > 0 ? ` · ${nights} ${nights === 1 ? "night" : "nights"}` : ""}</p>
            </div>
          </div>

          {pathStep === "rooms" && <RoomSelection rooms={hotel.roomTypes} state={state} onChange={setState} onContinue={() => navigate(`/booking/${slug}/guest`)} />}
          {pathStep === "guest" && <GuestForm guest={state.guest} onChange={guest => setState(current => ({ ...current, guest }))} onContinue={() => navigate(`/booking/${slug}/review`)} />}

          {pathStep === "review" && room && (
            <div className="space-y-5">
              <Heading level={1} className="text-2xl font-bold text-neutral-950">Review your stay</Heading>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <Heading level={2} className="text-lg font-semibold text-neutral-950">{room.name}</Heading>
                <p className="mt-2 text-sm text-neutral-600">{state.checkIn} to {state.checkOut} · {nights} nights · {state.adults} adults{state.children ? ` · ${state.children} children` : ""}</p>
                <p className="mt-2 text-sm text-neutral-600">Guest: {state.guest.firstName} {state.guest.lastName}</p>
              </div>
              <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5">
                <div className="flex items-center gap-2 font-semibold text-brand-800"><CheckCircle2 size={16} /> Verified EV charger</div>
                {hotel.chargers.map((charger, index) => (
                  <p key={index} className="mt-2 text-sm text-brand-800">{charger.access} · {charger.powerKw ? `${charger.powerKw} kW` : "Power not confirmed"} · {charger.acDc} · {charger.connector}</p>
                ))}
                <p className="mt-3 text-xs text-brand-700">Verification is point-in-time, not a guarantee of availability. Confirm with the hotel on your travel day.</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="flex justify-between text-sm text-neutral-600"><span>Room and taxes · {nights} nights</span><span>{formatPrice(total)}</span></div>
                <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 font-bold text-neutral-950"><span>Total</span><span className="text-xl">{formatPrice(total)}</span></div>
              </div>
              <Button onClick={() => navigate(`/booking/${slug}/payment`)} className="min-h-12 w-full rounded-xl bg-brand-700 text-base font-semibold text-white hover:bg-brand-800">Continue to payment</Button>
            </div>
          )}

          {pathStep === "payment" && room && (
            <div className="space-y-5">
              <Heading level={1} className="text-2xl font-bold text-neutral-950">Payment</Heading>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center gap-3"><CreditCard className="text-brand-700" size={20} /><p className="font-semibold text-neutral-950">Payment method</p></div>
                <p className="mt-3 text-sm text-neutral-600">Choose a payment method in the next step. No charge is made in this demonstration flow.</p>
                <div className="mt-5 flex justify-between border-t border-neutral-200 pt-5"><span className="font-semibold">Total</span><span className="text-xl font-bold">{formatPrice(total)}</span></div>
              </div>
              {paymentError && <div className="rounded-xl border border-error-fill bg-error-bg p-4 text-sm font-semibold text-error-text" role="alert">Payment could not be completed. Remove the failure parameter or retry another method.</div>}
              <Button disabled={processing} onClick={pay} className="min-h-12 w-full rounded-xl bg-brand-700 text-base font-semibold text-white hover:bg-brand-800 disabled:bg-neutral-300">
                {processing ? "Processing payment…" : `Pay ${formatPrice(total)}`}
              </Button>
            </div>
          )}

          {pathStep === "confirmation" && room && (
            <div className="text-center">
              <CheckCircle2 size={48} className="mx-auto mb-5 text-success-fill" />
              <Heading level={1} className="text-3xl font-bold text-neutral-950">You're booked.</Heading>
              <p className="mt-2 text-base text-neutral-600">Your stay details and charging plan are saved on this device.</p>
              <p className="mt-2 text-sm text-neutral-500">Reference: {confirmationReference}</p>
              <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 text-left">
                <Heading level={2} className="text-lg font-semibold text-neutral-950">{hotel.name}</Heading>
                <p className="mt-2 text-sm text-neutral-600">{room.name} · {state.checkIn} to {state.checkOut}</p>
                <div className="mt-5 rounded-xl bg-brand-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand-800"><Zap size={15} /> EV charger summary</div>
                  <p className="mt-2 text-sm text-brand-700">{hotel.chargers[0].access} · {hotel.chargers[0].powerKw ? `${hotel.chargers[0].powerKw} kW` : "Power not confirmed"} · {hotel.chargers[0].connector}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/account/bookings" className="rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800">View bookings</Link>
                <Link to="/search" className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100">Find another stay</Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
