import { useState } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle2, ChevronRight, Zap, Phone, Mail, User, FileText, CreditCard, Smartphone, Building } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getHotelBySlug, formatPrice } from "../data/hotels";

function StepIndicator({ step }: { step: number }) {
  const steps = ["Room", "Guest details", "Review", "Payment", "Confirmed"];
  return (
    <div className="flex items-center justify-center gap-2 py-5 border-b border-neutral-200 bg-white">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors ${
              i + 1 < step ? "bg-brand-700 text-white" :
              i + 1 === step ? "bg-brand-700 text-white ring-4 ring-brand-100" :
              "bg-neutral-200 text-neutral-500"
            }`}>
              {i + 1 < step ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span className={`text-[13px] font-medium hidden sm:block ${i + 1 === step ? "text-neutral-950" : "text-neutral-400"}`}>
              {s}
            </span>
          </div>
          {i < steps.length - 1 && <ChevronRight size={14} className="text-neutral-300" />}
        </div>
      ))}
    </div>
  );
}

function BookingRooms({ hotel, onNext }: { hotel: any; onNext: (roomId: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-[24px] font-bold text-neutral-950 mb-6">Select your room</h2>
      {hotel.roomTypes.map((room: any) => {
        const isAvail = room.availability !== "sold-out";
        return (
          <div key={room.id} className={`bg-white rounded-xl border-2 p-5 transition-colors ${selected === room.id ? "border-brand-700" : "border-neutral-200"} ${!isAvail ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[17px] font-semibold text-neutral-950 mb-1">{room.name}</h3>
                <p className="text-[13px] text-neutral-600">{room.bed} · Up to {room.maxGuests} guests</p>
                <div className="flex gap-4 mt-2 text-[13px]">
                  <span className={room.breakfast ? "text-success-text font-medium" : "text-neutral-500"}>{room.breakfast ? "✓ Breakfast" : "No breakfast"}</span>
                  <span className={room.cancellation === "Free" ? "text-success-text font-medium" : "text-warning-text"}>{room.cancellation === "Free" ? "✓ Free cancellation" : "Non-refundable"}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[22px] font-bold text-neutral-950 tabular-nums">{formatPrice(room.pricePerNight)}</p>
                <p className="text-[12px] text-neutral-500">/ night + {formatPrice(room.taxesPerNight)} taxes</p>
                {isAvail ? (
                  <button
                    onClick={() => setSelected(room.id)}
                    className={`mt-3 px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors ${selected === room.id ? "bg-brand-700 text-white" : "border border-brand-700 text-brand-700 hover:bg-brand-50"}`}
                  >
                    {selected === room.id ? "✓ Selected" : "Select"}
                  </button>
                ) : (
                  <span className="inline-block mt-3 text-[12px] text-neutral-500">Sold out</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <button
        onClick={() => selected && onNext(selected)}
        disabled={!selected}
        className="w-full mt-4 bg-brand-700 disabled:bg-neutral-200 disabled:text-neutral-500 text-white py-3.5 rounded-xl text-[15px] font-semibold transition-colors hover:bg-brand-800"
      >
        Continue to guest details
      </button>
    </div>
  );
}

function GuestDetails({ onNext }: { onNext: (data: any) => void }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", requests: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = "First name is required";
    if (!form.lastName) e.lastName = "Last name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Valid 10-digit Indian mobile number required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext(form);
  };

  const field = (id: string, label: string, placeholder: string, type = "text", icon?: React.ReactNode) => (
    <div>
      <label htmlFor={id} className="block text-[13px] font-semibold text-neutral-800 mb-1.5">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">{icon}</div>}
        <input
          id={id}
          type={type}
          value={(form as any)[id]}
          onChange={e => setForm(prev => ({ ...prev, [id]: e.target.value }))}
          placeholder={placeholder}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-3 border rounded-xl text-[15px] bg-white outline-none transition-colors ${
            errors[id] ? "border-error-fill focus:border-error-fill bg-error-bg" : "border-neutral-500 focus:border-brand-700"
          }`}
        />
      </div>
      {errors[id] && <p className="text-[12px] text-error-text mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-[24px] font-bold text-neutral-950 mb-6">Guest details</h2>
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          {field("firstName", "First name", "Aarav", "text", <User size={15} />)}
          {field("lastName", "Last name", "Singh", "text")}
        </div>
        {field("email", "Email address", "aarav@example.com", "email", <Mail size={15} />)}
        {field("phone", "Mobile number (India)", "9876543210", "tel", <Phone size={15} />)}
        <div>
          <label htmlFor="requests" className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Special requests <span className="font-normal text-neutral-500">(optional)</span></label>
          <textarea
            id="requests"
            value={form.requests}
            onChange={e => setForm(prev => ({ ...prev, requests: e.target.value }))}
            placeholder="Any special requests for the hotel..."
            rows={3}
            className="w-full px-4 py-3 border border-neutral-500 rounded-xl text-[15px] bg-white outline-none focus:border-brand-700 transition-colors resize-none"
          />
          <p className="text-[12px] text-neutral-500 mt-1">Requests are not guaranteed and subject to availability.</p>
        </div>
      </div>
      <button type="submit" className="w-full bg-brand-700 hover:bg-brand-800 text-white py-3.5 rounded-xl text-[15px] font-semibold transition-colors">
        Continue to review
      </button>
    </form>
  );
}

function ReviewBooking({ hotel, room, guest, onNext }: { hotel: any; room: any; guest: any; onNext: () => void }) {
  const nights = 2;
  const roomTotal = room.pricePerNight * nights;
  const taxTotal = room.taxesPerNight * nights;
  const total = roomTotal + taxTotal;

  return (
    <div>
      <h2 className="text-[24px] font-bold text-neutral-950 mb-6">Review your booking</h2>
      <div className="space-y-4">
        {/* Hotel */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <h3 className="text-[14px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">Hotel</h3>
          <p className="text-[17px] font-semibold text-neutral-950">{hotel.name}</p>
          <p className="text-[14px] text-neutral-600 mt-1">{hotel.city}, {hotel.state} · {hotel.starRating} star</p>
          <div className="flex gap-6 mt-3 text-[13px] text-neutral-600">
            <span>Check-in: <strong className="text-neutral-900">15 Oct 2025</strong></span>
            <span>Check-out: <strong className="text-neutral-900">17 Oct 2025</strong></span>
            <span>2 nights · 2 guests</span>
          </div>
        </div>

        {/* Room */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <h3 className="text-[14px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">Room</h3>
          <p className="text-[16px] font-semibold text-neutral-950">{room.name}</p>
          <p className="text-[13px] text-neutral-600 mt-1">{room.bed} · {room.breakfast ? "Breakfast included" : "No breakfast"} · {room.cancellation} cancellation</p>
        </div>

        {/* EV Charger summary */}
        <div className="bg-brand-50 rounded-2xl border border-brand-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={16} className="text-brand-700" />
            <h3 className="text-[14px] font-semibold text-brand-800">Verified EV Charger</h3>
          </div>
          {hotel.chargers.map((c: any, i: number) => (
            <p key={i} className="text-[13px] text-brand-700 mb-1">
              {c.access} · {c.powerKw ? `${c.powerKw} kW ` : "Power not confirmed · "}{c.acDc} · {c.connector !== "Not confirmed" ? c.connector : "Connector not confirmed"}{c.guns ? ` · ${c.guns} chargers` : ""}
            </p>
          ))}
        </div>

        {/* Guest */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <h3 className="text-[14px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">Guest</h3>
          <p className="text-[15px] font-semibold text-neutral-950">{guest.firstName} {guest.lastName}</p>
          <p className="text-[13px] text-neutral-600 mt-1">{guest.email} · {guest.phone}</p>
        </div>

        {/* Price breakdown */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <h3 className="text-[14px] font-semibold text-neutral-500 uppercase tracking-wider mb-4">Price breakdown</h3>
          <div className="space-y-2.5">
            <div className="flex justify-between text-[14px]">
              <span className="text-neutral-600">{formatPrice(room.pricePerNight)} × {nights} nights</span>
              <span className="font-medium text-neutral-950 tabular-nums">{formatPrice(roomTotal)}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-neutral-600">Taxes & fees</span>
              <span className="font-medium text-neutral-950 tabular-nums">{formatPrice(taxTotal)}</span>
            </div>
          </div>
          <div className="flex justify-between pt-4 mt-4 border-t border-neutral-200">
            <span className="text-[16px] font-bold text-neutral-950">Total</span>
            <span className="text-[20px] font-bold text-neutral-950 tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
      <button onClick={onNext} className="w-full mt-6 bg-brand-700 hover:bg-brand-800 text-white py-3.5 rounded-xl text-[15px] font-semibold transition-colors">
        Continue to payment
      </button>
    </div>
  );
}

function Payment({ hotel, room, onConfirm }: { hotel: any; room: any; onConfirm: () => void }) {
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const nights = 2;
  const total = (room.pricePerNight + room.taxesPerNight) * nights;

  const methods = [
    { id: "upi", label: "UPI", icon: <Smartphone size={16} /> },
    { id: "card", label: "Credit / Debit card", icon: <CreditCard size={16} /> },
    { id: "netbanking", label: "Net banking", icon: <Building size={16} /> },
  ];

  const handlePay = () => {
    setProcessing(true);
    setError(false);
    setTimeout(() => {
      setProcessing(false);
      onConfirm();
    }, 2000);
  };

  return (
    <div>
      <h2 className="text-[24px] font-bold text-neutral-950 mb-6">Payment</h2>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <p className="text-[12px] font-semibold text-amber-700">Developer note: This is a prototype payment screen. No real payment is processed.</p>
      </div>
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 mb-5">
        <h3 className="text-[14px] font-semibold text-neutral-500 uppercase tracking-wider mb-4">Payment method</h3>
        <div className="space-y-2">
          {methods.map(m => (
            <label key={m.id} className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${method === m.id ? "border-brand-700 bg-brand-50" : "border-neutral-200 hover:border-neutral-400"}`}>
              <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} className="accent-brand-700" />
              <span className="text-brand-700">{m.icon}</span>
              <span className="text-[14px] font-medium text-neutral-900">{m.label}</span>
            </label>
          ))}
        </div>
      </div>
      {error && (
        <div className="bg-error-bg border border-error-fill rounded-xl p-4 mb-5">
          <p className="text-[14px] font-semibold text-error-text">Payment failed. Please try a different method.</p>
        </div>
      )}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 mb-5">
        <div className="flex justify-between">
          <span className="text-[15px] font-semibold text-neutral-950">Total to pay</span>
          <span className="text-[20px] font-bold text-neutral-950 tabular-nums">{formatPrice(total)}</span>
        </div>
      </div>
      <button
        onClick={handlePay}
        disabled={processing}
        className="w-full bg-brand-700 disabled:bg-neutral-200 disabled:text-neutral-500 hover:bg-brand-800 text-white py-4 rounded-xl text-[15px] font-semibold transition-colors"
      >
        {processing ? "Processing..." : `Pay ${formatPrice(total)}`}
      </button>
      <p className="text-center text-[12px] text-neutral-500 mt-3">Your payment is secure and encrypted.</p>
    </div>
  );
}

function Confirmation({ hotel, room, guest }: { hotel: any; room: any; guest: any }) {
  const bookingId = `BEVH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const nights = 2;
  const total = (room.pricePerNight + room.taxesPerNight) * nights;

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-success-bg rounded-full flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 size={32} className="text-success-fill" />
      </div>
      <h2 className="text-[28px] font-bold text-neutral-950 mb-2">Booking confirmed!</h2>
      <p className="text-[16px] text-neutral-600 mb-1">Your stay is booked. Here's your confirmation.</p>
      <p className="text-[13px] font-mono text-neutral-500 mb-8">Booking ID: {bookingId}</p>

      <div className="text-left space-y-4 mb-8">
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[16px] font-bold text-neutral-950">{hotel.name}</p>
              <p className="text-[13px] text-neutral-600 mt-1">{hotel.city}, {hotel.state}</p>
              <p className="text-[13px] text-neutral-700 mt-2">{room.name} · Check-in 15 Oct · Check-out 17 Oct</p>
              <p className="text-[13px] text-neutral-700">{guest.firstName} {guest.lastName}</p>
            </div>
            <div className="text-right">
              <p className="text-[18px] font-bold text-neutral-950 tabular-nums">{formatPrice(total)}</p>
              <p className="text-[12px] text-success-text font-semibold mt-1">✓ Paid</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-50 rounded-2xl border border-brand-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={16} className="text-brand-700" />
            <h3 className="text-[14px] font-semibold text-brand-800">Your EV Charger Summary</h3>
          </div>
          {hotel.chargers.map((c: any, i: number) => (
            <p key={i} className="text-[13px] text-brand-700 mb-1">
              {c.access} · {c.powerKw ? `${c.powerKw} kW ` : "Power not confirmed · "}{c.acDc} · {c.connector !== "Not confirmed" ? c.connector : "Connector not confirmed"}
              {c.fee !== "Not confirmed" && ` · ${c.fee} to charge`}
            </p>
          ))}
          <p className="text-[12px] text-brand-600 mt-2 italic">Call the hotel on arrival day to confirm charger availability.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to={`/account/bookings`} className="px-6 py-3 bg-brand-700 text-white rounded-xl font-semibold text-[14px] hover:bg-brand-800 transition-colors">
          View booking
        </Link>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(hotel.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-xl font-semibold text-[14px] hover:bg-neutral-100 transition-colors"
        >
          Get directions
        </a>
        <Link to="/search" className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-xl font-semibold text-[14px] hover:bg-neutral-100 transition-colors">
          Find more hotels
        </Link>
      </div>
    </div>
  );
}

export default function BookingPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hotel = getHotelBySlug(slug || "");
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [guest, setGuest] = useState<any>(null);

  if (!hotel) return <div>Hotel not found.</div>;

  const handleRoomNext = (roomId: string) => {
    setSelectedRoom(hotel.roomTypes.find(r => r.id === roomId));
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        <StepIndicator step={step} />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          {/* Hotel summary always visible */}
          {step < 5 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-4 mb-6 flex items-center gap-3">
              <div className="w-14 h-14 rounded-lg bg-neutral-200 overflow-hidden shrink-0">
                <img
                  src={`https://images.unsplash.com/${hotel.images[0]}?w=120&h=120&fit=crop&auto=format`}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-neutral-950 truncate">{hotel.name}</p>
                <p className="text-[12px] text-neutral-600">{hotel.city} · Check-in 15 Oct · 2 nights</p>
              </div>
              {selectedRoom && (
                <p className="text-[14px] font-bold text-neutral-950 tabular-nums shrink-0">{formatPrice(selectedRoom.pricePerNight)}/nt</p>
              )}
            </div>
          )}

          {step === 1 && <BookingRooms hotel={hotel} onNext={handleRoomNext} />}
          {step === 2 && <GuestDetails onNext={data => { setGuest(data); setStep(3); }} />}
          {step === 3 && <ReviewBooking hotel={hotel} room={selectedRoom} guest={guest} onNext={() => setStep(4)} />}
          {step === 4 && <Payment hotel={hotel} room={selectedRoom} onConfirm={() => setStep(5)} />}
          {step === 5 && <Confirmation hotel={hotel} room={selectedRoom} guest={guest} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
