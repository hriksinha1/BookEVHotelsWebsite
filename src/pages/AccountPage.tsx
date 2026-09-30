import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, X, Bookmark, ChevronRight, User } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HotelCard from "../components/HotelCard";
import { hotels, formatPrice } from "../data/hotels";
import { useSavedHotels } from "../hooks/useSavedHotels";
import { useBookings } from "../hooks/useBookings";
import SafeImage from "../components/SafeImage";
import { imageFromPhotoId } from "../data/images";

const statusConfig = {
  confirmed: { label: "Confirmed", bg: "bg-success-bg", text: "text-success-text", icon: CheckCircle2 },
  pending: { label: "Pending", bg: "bg-warning-bg", text: "text-warning-text", icon: Clock },
  cancelled: { label: "Cancelled", bg: "bg-neutral-100", text: "text-neutral-600", icon: X },
};

type AccountBooking = {
  id: string;
  hotel: typeof hotels[number];
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  total: number;
  status: "confirmed";
};

function BookingCard({ booking }: { booking: AccountBooking }) {
  const status = statusConfig[booking.status];
  const StatusIcon = status.icon;
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
          <SafeImage
            src={imageFromPhotoId(booking.hotel.images[0])}
            alt={booking.hotel.name}
            fallback="hotel"
            className="h-full w-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[16px] font-semibold text-neutral-950">{booking.hotel.name}</p>
              <p className="text-[13px] text-neutral-600 mt-0.5">{booking.hotel.city}, {booking.hotel.state}</p>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold ${status.bg} ${status.text}`}>
              <StatusIcon size={12} />
              {status.label}
            </span>
          </div>
          <div className="flex items-center gap-5 mt-2 text-[13px] text-neutral-600">
            <span>{booking.checkIn} → {booking.checkOut}</span>
            <span>{booking.nights} nights · {booking.guests} guests</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[16px] font-bold text-neutral-950 tabular-nums">{formatPrice(booking.total)}</span>
            <div className="flex gap-2">
              <Link
                to={`/account/bookings/${booking.id}`}
                className="px-3 py-1.5 border border-neutral-300 rounded-lg text-[13px] font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Tab = "overview" | "bookings" | "saved";

export default function AccountPage({ tab: initialTab = "overview" }: { tab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const { savedIds } = useSavedHotels();
  const { bookings } = useBookings();
  const savedHotels = hotels.filter(hotel => savedIds.includes(hotel.id));
  const accountBookings = bookings.flatMap(booking => {
    const hotel = hotels.find(item => item.slug === booking.hotelSlug);
    const room = hotel?.roomTypes.find(item => item.id === booking.roomId);
    if (!hotel || !room) return [];
    return [{
      id: booking.id,
      hotel,
      room: room.name,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      nights: Math.max(0, Math.round((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000)),
      guests: booking.adults + booking.children,
      total: booking.total,
      status: booking.status,
    }];
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        {/* Header */}
        <section className="bg-white border-b border-neutral-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-brand-100 rounded-full flex items-center justify-center">
                <User size={24} className="text-brand-700" />
              </div>
              <div>
                <h1 className="text-[24px] font-bold text-neutral-950">Aarav Singh</h1>
                <p className="text-[14px] text-neutral-600">aarav@example.com</p>
              </div>
            </div>
            <div className="flex gap-1 mt-6">
              {[
                { id: "overview" as Tab, label: "Overview" },
                { id: "bookings" as Tab, label: "My bookings" },
                { id: "saved" as Tab, label: "Saved hotels" },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${tab === t.id ? "bg-brand-50 text-brand-800 font-semibold" : "text-neutral-600 hover:bg-neutral-100"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {tab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-[20px] font-bold text-neutral-950 mb-4">Upcoming stay</h2>
                {accountBookings.length ? accountBookings.slice(0, 1).map(b => <BookingCard key={b.id} booking={b} />) : <p className="text-[14px] text-neutral-600">No upcoming stays.</p>}
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[20px] font-bold text-neutral-950">Saved hotels</h2>
                  <button onClick={() => setTab("saved")} className="text-[14px] text-brand-700 font-semibold hover:text-brand-800">View all</button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {savedHotels.map(h => <HotelCard key={h.id} hotel={h} />)}
                </div>
              </div>
            </div>
          )}

          {tab === "bookings" && (
            <div>
              <h2 className="text-[22px] font-bold text-neutral-950 mb-6">My bookings</h2>
              {accountBookings.length > 0 ? (
                <div className="space-y-4">
                  {accountBookings.map(b => <BookingCard key={b.id} booking={b} />)}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
                  <p className="text-[18px] font-semibold text-neutral-950 mb-3">No bookings yet</p>
                  <Link to="/search" className="text-brand-700 font-semibold text-[15px]">Browse EV hotels</Link>
                </div>
              )}
            </div>
          )}

          {tab === "saved" && (
            <div>
              <h2 className="text-[22px] font-bold text-neutral-950 mb-6">Saved hotels</h2>
              {savedHotels.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedHotels.map(h => <HotelCard key={h.id} hotel={h} />)}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
                  <Bookmark size={32} className="text-neutral-400 mx-auto mb-4" />
                  <p className="text-[18px] font-semibold text-neutral-950 mb-3">Your saved stays will appear here</p>
                  <p className="text-[15px] text-neutral-600 mb-6">Save hotels while browsing to plan your next EV road trip.</p>
                  <Link to="/search" className="bg-brand-700 text-white px-5 py-2.5 rounded-xl text-[14px] font-semibold hover:bg-brand-800 transition-colors">
                    Browse EV hotels
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
