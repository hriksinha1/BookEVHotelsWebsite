import { Link, Navigate, useParams } from "react-router-dom";
import { CheckCircle2, ChevronLeft, MapPin, Zap } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heading } from "../components/ui";
import { formatPrice, hotels } from "../data/hotels";

const bookings = [
  {
    id: "BEVH-K7P2M1",
    hotel: hotels[2],
    room: "Deluxe Room",
    checkIn: "15 Oct 2025",
    checkOut: "17 Oct 2025",
    guests: 2,
    total: 14632,
    status: "Confirmed",
  },
  {
    id: "BEVH-A3X9QR",
    hotel: hotels[3],
    room: "Deluxe Cottage",
    checkIn: "22 Nov 2025",
    checkOut: "25 Nov 2025",
    guests: 2,
    total: 22800,
    status: "Pending",
  },
];

export default function BookingDetailPage() {
  const { id } = useParams();
  const booking = bookings.find(item => item.id === id);
  if (!booking) return <Navigate to="/account/bookings" replace />;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="pt-16">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <Link to="/account/bookings" className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-700">
            <ChevronLeft size={16} /> My bookings
          </Link>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-6 sm:flex-row">
              <div>
                <p className="text-sm font-semibold text-success-text">{booking.status}</p>
                <Heading level={1} className="mt-2 text-2xl font-bold text-neutral-950">{booking.hotel.name}</Heading>
                <p className="mt-2 flex items-center gap-2 text-sm text-neutral-600"><MapPin size={14} /> {booking.hotel.city}, {booking.hotel.state}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs uppercase tracking-wide text-neutral-500">Booking reference</p>
                <p className="mt-1 text-sm font-semibold text-neutral-950">{booking.id}</p>
              </div>
            </div>

            <div className="grid gap-6 py-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Stay</p>
                <p className="mt-2 text-sm font-semibold text-neutral-950">{booking.room}</p>
                <p className="mt-1 text-sm text-neutral-600">{booking.checkIn} to {booking.checkOut}</p>
                <p className="mt-1 text-sm text-neutral-600">{booking.guests} guests</p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Total</p>
                <p className="mt-2 text-2xl font-bold text-neutral-950">{formatPrice(booking.total)}</p>
              </div>
            </div>

            <div className="rounded-xl border border-brand-200 bg-brand-50 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-800">
                <CheckCircle2 size={16} /> Verified EV charging
              </div>
              {booking.hotel.chargers.map((charger, index) => (
                <p key={index} className="mt-2 text-sm text-brand-800">
                  {charger.access} · {charger.powerKw ? `${charger.powerKw} kW` : "Power not confirmed"} · {charger.acDc} · {charger.connector}
                </p>
              ))}
              <p className="mt-3 flex items-start gap-2 text-xs text-brand-700">
                <Zap className="mt-0.5 shrink-0" size={13} />
                Confirm charger availability with the property on your travel day.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
