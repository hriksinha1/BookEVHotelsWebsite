import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star, MapPin, CheckCircle2, ExternalLink, Bookmark,
  Share2, ChevronRight, Phone, Info, ArrowRight,
  Building2, Zap, BadgeCheck, Calendar, X, Images, ChevronLeft, ChevronRight as ChevronRightIcon
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { VerifiedBadge, AccessChip, ChargerSpecLine } from "../components/EVBadge";
import HotelCard from "../components/HotelCard";
import { hotels, getHotelBySlug, formatPrice } from "../data/hotels";
import type { Charger, RoomType } from "../data/hotels";
import SearchBar from "../components/SearchBar";
import { useSearchState } from "../hooks/useSearchState";
import SafeImage from "../components/SafeImage";
import { imageFromPhotoId } from "../data/images";
import { Button } from "../components/ui";

function ChargerRow({ charger }: { charger: Charger }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-neutral-100 last:border-0">
      <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Zap size={14} className="text-brand-700" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <AccessChip access={charger.access} compact />
          <span className="text-[13px] font-semibold text-neutral-950 tabular-nums">
            {charger.powerKw ? `${charger.powerKw} kW` : "Power not confirmed"}
          </span>
          <span className="text-[13px] text-neutral-600">{charger.acDc}</span>
          {charger.connector !== "Not confirmed" && (
            <span className="text-[13px] text-neutral-600">· {charger.connector}</span>
          )}
          {charger.guns && (
            <span className="text-[13px] text-neutral-600">· {charger.guns} {charger.guns === 1 ? "charger" : "chargers"}</span>
          )}
        </div>
        <div className="flex items-center gap-4 text-[12px] text-neutral-500 flex-wrap">
          <span>Fee: {charger.fee}</span>
          <span>App: {charger.appRequired === null ? "Not confirmed" : charger.appRequired ? "Required" : "Not required"}</span>
        </div>
        {charger.notes && <p className="text-[12px] text-neutral-500 mt-1 italic">{charger.notes}</p>}
      </div>
    </div>
  );
}

function RoomCard({ room, selected, onSelect }: { room: RoomType; selected: boolean; onSelect: () => void }) {
  const imgUrl = imageFromPhotoId(room.image);
  const isAvailable = room.availability !== "sold-out";

  return (
    <div className={`rounded-xl border-2 transition-colors overflow-hidden ${selected ? "border-brand-700" : "border-neutral-200"} ${!isAvailable ? "opacity-60" : ""}`}>
      <div className="aspect-[16/9] bg-neutral-200 overflow-hidden">
        <SafeImage src={imgUrl} alt={`${room.name} interior`} fallback="room" className="h-full w-full" sizes="(min-width: 1024px) 40vw, 100vw" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h4 className="text-[16px] font-semibold text-neutral-950">{room.name}</h4>
            <p className="text-[13px] text-neutral-600 mt-0.5">{room.bed} · Up to {room.maxGuests} guests</p>
          </div>
          {room.availability === "limited" && (
            <span className="bg-warning-bg text-warning-text text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0">
              Limited availability
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-[13px] text-neutral-600 mb-4">
          <span className={room.breakfast ? "text-success-text font-medium" : ""}>{room.breakfast ? "✓ Breakfast" : "No breakfast"}</span>
          <span className={room.cancellation === "Free" ? "text-success-text font-medium" : "text-warning-text"}>
            {room.cancellation === "Free" ? "✓ Free cancellation" : "Non-refundable"}
          </span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="text-[22px] font-bold text-neutral-950 tabular-nums">{formatPrice(room.pricePerNight)}</span>
            <span className="text-[13px] text-neutral-500 ml-1">/ night</span>
            <p className="text-[12px] text-neutral-500">+{formatPrice(room.taxesPerNight)} taxes</p>
          </div>
          {isAvailable ? (
            <button
              onClick={onSelect}
              className={`px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-colors ${
                selected
                  ? "bg-brand-700 text-white"
                  : "border border-brand-700 text-brand-700 hover:bg-brand-50"
              }`}
            >
              {selected ? "✓ Selected" : "Select room"}
            </button>
          ) : (
            <span className="text-[13px] text-neutral-500 font-medium">Sold out</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HotelDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const hotel = getHotelBySlug(slug || "");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [searchState] = useSearchState(`${hotel?.city || ""}, ${hotel?.state || ""}`);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="pt-32 text-center">
          <h1 className="text-[28px] font-bold text-neutral-950 mb-4">Hotel not found</h1>
          <Link to="/search" className="text-brand-700 font-semibold">Browse hotels</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const nearbyHotels = hotels.filter(h => h.city === hotel.city && h.id !== hotel.id).slice(0, 3);
  const nights = searchState.checkIn && searchState.checkOut
    ? Math.max(0, Math.round((new Date(searchState.checkOut).getTime() - new Date(searchState.checkIn).getTime()) / 86400000))
    : 0;

  const handleBook = () => {
    if (!selectedRoom) return;
    const bookingParams = new URLSearchParams({
      room: selectedRoom,
      ...(searchState.checkIn ? { checkin: searchState.checkIn } : {}),
      ...(searchState.checkOut ? { checkout: searchState.checkOut } : {}),
    });
    navigate(`/booking/${hotel.slug}/${nights > 0 ? "guest" : "rooms"}?${bookingParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-[13px]">
            <Link to="/" className="text-brand-700 hover:text-brand-800 font-medium">India</Link>
            <ChevronRight size={13} className="text-neutral-400" />
            <Link to="/destinations" className="text-brand-700 hover:text-brand-800 font-medium">Destinations</Link>
            <ChevronRight size={13} className="text-neutral-400" />
            <Link to={`/destinations/${hotel.state.toLowerCase()}`} className="text-brand-700 hover:text-brand-800 font-medium">{hotel.state}</Link>
            <ChevronRight size={13} className="text-neutral-400" />
            <Link to={`/destinations/${hotel.state.toLowerCase()}/${hotel.city.toLowerCase()}`} className="text-brand-700 hover:text-brand-800 font-medium">{hotel.city}</Link>
            <ChevronRight size={13} className="text-neutral-400" />
            <span className="text-neutral-600 truncate max-w-[180px]">{hotel.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-[36px] font-bold text-neutral-950 leading-[44px] tracking-tight mb-3">{hotel.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex gap-0.5">
                  {Array.from({ length: hotel.starRating }).map((_, i) => <Star key={i} size={14} className="fill-rating text-rating" />)}
                </div>
                {hotel.rating && (
                  <span className="text-[14px] font-semibold text-neutral-800 tabular-nums">{hotel.rating} / 5</span>
                )}
                {hotel.reviewCount && (
                  <span className="text-[14px] text-neutral-500">{hotel.reviewCount} reviews</span>
                )}
                <div className="flex items-center gap-1 text-neutral-600">
                  <MapPin size={14} />
                  <span className="text-[14px]">{hotel.city}, {hotel.state}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[14px] font-semibold transition-colors ${saved ? "bg-brand-700 text-white border-brand-700" : "border-neutral-300 text-neutral-700 hover:bg-neutral-100"}`}
              >
                <Bookmark size={15} className={saved ? "fill-white" : ""} />
                {saved ? "Saved" : "Save"}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 text-[14px] font-semibold hover:bg-neutral-100 transition-colors">
                <Share2 size={15} />
                Share
              </button>
            </div>
          </div>

          {/* Photo gallery */}
          <div className="relative mb-8 grid aspect-[4/3] grid-cols-4 gap-2 overflow-hidden rounded-2xl sm:aspect-[16/7]">
            <Button onClick={() => { setActivePhoto(0); setGalleryOpen(true); }} className="col-span-4 row-span-2 overflow-hidden bg-neutral-200 sm:col-span-2" aria-label={`Open photos for ${hotel.name}`}>
              <SafeImage src={imageFromPhotoId(hotel.images[0])} alt={`${hotel.name} main view`} fallback="hotel" className="h-full w-full" imageClassName="transition-transform duration-500 hover:scale-105" loading="eager" fetchPriority="high" />
            </Button>
            {hotel.images.slice(1, 5).map((img, i) => (
              <Button key={img} onClick={() => { setActivePhoto(i + 1); setGalleryOpen(true); }} className="hidden overflow-hidden bg-neutral-200 sm:block" aria-label={`Open photo ${i + 2} of ${hotel.name}`}>
                <SafeImage src={imageFromPhotoId(img)} alt={`${hotel.name} view ${i + 2}`} fallback="hotel" className="h-full w-full" imageClassName="transition-transform duration-500 hover:scale-105" />
              </Button>
            ))}
            <Button onClick={() => setGalleryOpen(true)} className="absolute bottom-4 right-4 flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-neutral-950 shadow-lg">
              <Images size={16} /> View all photos
            </Button>
          </div>

          {galleryOpen && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-neutral-950/95 p-4" role="dialog" aria-modal="true" aria-label={`${hotel.name} photo gallery`}>
              <Button onClick={() => setGalleryOpen(false)} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-950" aria-label="Close photo gallery">
                <X size={20} />
              </Button>
              <Button onClick={() => setActivePhoto(current => (current - 1 + hotel.images.length) % hotel.images.length)} className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-950" aria-label="Previous photo">
                <ChevronLeft size={20} />
              </Button>
              <SafeImage src={imageFromPhotoId(hotel.images[activePhoto])} alt={`${hotel.name} photo ${activePhoto + 1}`} fallback="hotel" className="aspect-[4/3] max-h-[80vh] w-full max-w-5xl rounded-xl" imageClassName="object-contain" loading="eager" />
              <Button onClick={() => setActivePhoto(current => (current + 1) % hotel.images.length)} className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-950" aria-label="Next photo">
                <ChevronRightIcon size={20} />
              </Button>
              <p className="absolute bottom-5 text-sm text-white">{activePhoto + 1} of {hotel.images.length}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* EV Charging — most prominent block */}
              <div className="bg-white rounded-2xl border-2 border-brand-200 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-700 rounded-xl flex items-center justify-center">
                      <Zap size={18} className="text-white fill-white" />
                    </div>
                    <div>
                      <VerifiedBadge />
                    </div>
                  </div>
                  {hotel.verifiedAt && (
                    <span className="text-[12px] text-neutral-500">
                      Verified {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${hotel.verifiedAt}T12:00:00`))}
                    </span>
                  )}
                </div>

                <div className="space-y-0 mb-5">
                  {hotel.chargers.map((charger, i) => (
                    <ChargerRow key={i} charger={charger} />
                  ))}
                </div>

                {/* Verification explainer */}
                <button
                  onClick={() => setShowVerification(!showVerification)}
                  className="flex items-center gap-2 text-[13px] text-brand-700 font-semibold hover:text-brand-800 transition-colors"
                >
                  <Info size={14} />
                  How we verify chargers
                </button>
                {showVerification && (
                  <div className="mt-4 bg-brand-50 rounded-xl p-4 text-[13px] text-neutral-700 leading-[22px] space-y-2">
                    <p>We call the hotel and confirm the charger is installed and working before any listing goes live. The hotel submits two photos of their charger setup for review.</p>
                    <p>Verified means confirmed with the property — not a real-time uptime guarantee. If charging is critical, call the hotel on the day of travel to confirm availability.</p>
                    <p className="text-neutral-500">Minimum qualifying charger: 7.4 kW AC. Hotels with only a domestic 15A/16A socket do not qualify.</p>
                  </div>
                )}
              </div>

              {/* Room selection */}
              <div>
                <div className="mb-6">
                  <SearchBar compact defaultDestination={`${hotel.city}, ${hotel.state}`} />
                </div>
                <h2 className="text-[24px] font-bold text-neutral-950 mb-5">Select your room</h2>
                <div className="space-y-4">
                  {hotel.roomTypes.map(room => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      selected={selectedRoom === room.id}
                      onSelect={() => setSelectedRoom(room.id === selectedRoom ? null : room.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Hotel info */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-[20px] font-bold text-neutral-950 mb-4">About this hotel</h2>
                <p className="text-[15px] text-neutral-700 leading-[26px] mb-5">{hotel.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {hotel.amenities.map(a => (
                    <div key={a} className="flex items-center gap-2 text-[13px] text-neutral-700">
                      <CheckCircle2 size={14} className="text-brand-700 shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-[20px] font-bold text-neutral-950 mb-4">Location</h2>
                <div className="flex items-start gap-2 mb-4">
                  <MapPin size={15} className="text-neutral-500 shrink-0 mt-0.5" />
                  <p className="text-[14px] text-neutral-700">{hotel.address}</p>
                </div>
                <div className="aspect-[16/7] bg-neutral-950 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={24} className="text-brand-400 mx-auto mb-2" />
                    <p className="text-white text-[14px] font-semibold">{hotel.city}, {hotel.state}</p>
                    <p className="text-neutral-400 text-[12px] mt-1">{hotel.coordinates.lat}, {hotel.coordinates.lng}</p>
                  </div>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(hotel.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-info-fill font-semibold text-[14px] hover:text-info-text transition-colors"
                >
                  <ExternalLink size={14} />
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Sticky booking panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl border border-neutral-200 shadow-lg p-5">
                  {hotel.bookingType === "partner" ? (
                    <div>
                      <p className="text-[13px] text-neutral-500 mb-2">Check live rates</p>
                      <a
                        href="https://www.agoda.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-brand-700 hover:bg-brand-800 text-white py-3 rounded-xl text-[15px] font-semibold transition-colors"
                      >
                        Check rates on Agoda ↗
                      </a>
                      <p className="text-[11px] text-neutral-500 mt-2 text-center">You'll complete the room booking on Agoda.</p>
                    </div>
                  ) : (
                    <>
                      {selectedRoom ? (
                        (() => {
                          const room = hotel.roomTypes.find(r => r.id === selectedRoom)!;
                          return (
                            <div>
                              <div className="mb-4">
                                <p className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">Selected room</p>
                                <p className="text-[15px] font-semibold text-neutral-950">{room.name}</p>
                              </div>
                              <div className="space-y-2 mb-4 pb-4 border-b border-neutral-100">
                                <div className="flex justify-between text-[14px]">
                                  <span className="text-neutral-600">{nights > 0 ? `${formatPrice(room.pricePerNight)} × ${nights} nights` : "Room price per night"}</span>
                                  <span className="font-medium text-neutral-950 tabular-nums">{formatPrice(room.pricePerNight * Math.max(1, nights))}</span>
                                </div>
                                <div className="flex justify-between text-[14px]">
                                  <span className="text-neutral-600">Taxes & fees</span>
                                  <span className="font-medium text-neutral-950 tabular-nums">{formatPrice(room.taxesPerNight * Math.max(1, nights))}</span>
                                </div>
                              </div>
                              <div className="flex justify-between mb-5">
                                <span className="text-[15px] font-semibold text-neutral-950">Total</span>
                                <span className="text-[18px] font-bold text-neutral-950 tabular-nums">{formatPrice((room.pricePerNight + room.taxesPerNight) * Math.max(1, nights))}</span>
                              </div>
                              {/* EV summary */}
                              <div className="bg-brand-50 rounded-xl p-3 mb-5">
                                <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle2 size={13} className="text-brand-700" />
                                  <span className="text-[12px] font-semibold text-brand-800">EV charging available</span>
                                </div>
                                {hotel.chargers[0] && (
                                  <p className="text-[12px] text-brand-700">
                                    {hotel.chargers[0].access} · {hotel.chargers[0].powerKw ? `${hotel.chargers[0].powerKw} kW ` : ""}
                                    {hotel.chargers[0].acDc} · {hotel.chargers[0].connector}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={handleBook}
                                className="w-full bg-brand-700 hover:bg-brand-800 text-white py-3.5 rounded-xl text-[15px] font-semibold transition-colors"
                              >
                                {nights > 0 ? "Continue with this room" : "Choose dates"}
                              </button>
                              <p className="text-[12px] text-neutral-500 text-center mt-2">
                                {hotel.roomTypes.find(r => r.id === selectedRoom)?.cancellation === "Free" ? "✓ Free cancellation" : "Non-refundable"}
                              </p>
                            </div>
                          );
                        })()
                      ) : (
                        <div>
                          <p className="text-[28px] font-bold text-neutral-950 tabular-nums mb-1">
                            From {formatPrice(hotel.priceFrom)}
                          </p>
                          <p className="text-[13px] text-neutral-500 mb-5">/ night · taxes not included</p>
                          <p className="text-[14px] text-neutral-600 mb-5">Select a room above to see the full price breakdown and complete your booking.</p>
                          <div className="bg-brand-50 rounded-xl p-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={14} className="text-brand-700" />
                              <span className="text-[13px] font-semibold text-brand-800">Verified EV Charger</span>
                            </div>
                            <p className="text-[12px] text-brand-700 mt-1">
                              {hotel.chargers[0]?.access} · {hotel.chargers[0]?.powerKw ? `${hotel.chargers[0].powerKw} kW` : "Power not confirmed"}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Contact hotel */}
                <div className="mt-4 p-4 bg-neutral-100 rounded-xl flex items-center gap-3">
                  <Phone size={15} className="text-neutral-600 shrink-0" />
                  <div>
                    <p className="text-[12px] text-neutral-600">Planning to charge on arrival?</p>
                    <p className="text-[12px] font-medium text-neutral-800">Call the hotel to confirm charger availability on your travel day.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby hotels */}
          {nearbyHotels.length > 0 && (
            <div className="mt-16">
              <h2 className="text-[24px] font-bold text-neutral-950 mb-6">Other verified EV hotels in {hotel.city}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyHotels.map(h => <HotelCard key={h.id} hotel={h} />)}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
