import { Link } from "react-router-dom";
import { Star, Bookmark, MapPin } from "lucide-react";
import { VerifiedBadge, AccessChip, ChargerSpecLine } from "./EVBadge";
import type { Hotel } from "../data/hotels";
import { formatPrice, getLowestAvailablePrice, getPrimaryCharger, hasFreeCancellation } from "../data/hotels";
import { Button, Heading } from "./ui";
import { useSavedHotels } from "../hooks/useSavedHotels";
import SafeImage from "./SafeImage";
import { imageFromPhotoId } from "../data/images";

export default function HotelCard({ hotel, compact = false }: { hotel: Hotel; compact?: boolean }) {
  const { savedIds, toggleSaved } = useSavedHotels();
  const saved = savedIds.includes(hotel.id);
  const primaryCharger = getPrimaryCharger(hotel);
  const availablePrice = getLowestAvailablePrice(hotel);
  const img = hotel.images[0];
  const imgUrl = imageFromPhotoId(img);

  if (compact) {
    return (
      <Link to={`/hotels/${hotel.slug}`} className="flex gap-3 bg-white rounded-xl border border-neutral-200 p-3 hover:shadow-md transition-shadow group">
        <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-neutral-200">
          <SafeImage src={imgUrl} alt={hotel.name} fallback="hotel" className="h-full w-full" imageClassName="transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Heading level={3} className="line-clamp-2 text-sm font-semibold leading-5 text-neutral-950">{hotel.name}</Heading>
          </div>
          <p className="mt-0.5 text-xs text-neutral-600">{hotel.city}, {hotel.state}</p>
          {primaryCharger && (
            <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
              <VerifiedBadge compact />
              <AccessChip access={primaryCharger.access} compact />
            </div>
          )}
          <p className="mt-1 text-sm font-bold text-neutral-950 tabular-nums">
            {availablePrice === null ? "Sold out" : formatPrice(availablePrice)}
            {availablePrice !== null && <span className="text-xs font-normal text-neutral-600"> / night</span>}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative img-zoom aspect-[4/3]">
        <SafeImage src={imgUrl} alt={`${hotel.name} exterior`} fallback="hotel" className="h-full w-full" imageClassName="transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
        <Button
          onClick={e => { e.preventDefault(); toggleSaved(hotel.id); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${saved ? "bg-brand-700 text-white" : "bg-white/90 text-neutral-600 hover:bg-white"}`}
          aria-label={saved ? "Remove from saved" : "Save hotel"}
        >
          <Bookmark size={16} className={saved ? "fill-white" : ""} />
        </Button>
        {hotel.bookingType === "partner" && (
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-neutral-700">
            Partner booking
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Verified badge first */}
        {hotel.verified && <VerifiedBadge />}

        {/* Hotel name */}
        <Heading level={3} className="mt-2.5 line-clamp-2 text-lg font-semibold leading-7 text-neutral-950">{hotel.name}</Heading>

        {/* Stars + rating */}
        <div className="flex items-center gap-2 mt-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: hotel.starRating }).map((_, i) => (
              <Star key={i} size={12} className="fill-rating text-rating" />
            ))}
          </div>
          {hotel.rating && (
            <span className="text-sm font-semibold text-neutral-800 tabular-nums">{hotel.rating}</span>
          )}
          {hotel.reviewCount && (
            <span className="text-sm text-neutral-500">({hotel.reviewCount})</span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mt-1.5 text-neutral-600">
          <MapPin size={13} />
          <span className="text-sm">{hotel.city}, {hotel.state}</span>
        </div>

        {/* EV info */}
        {primaryCharger && (
          <div className="mt-3 pt-3 border-t border-neutral-100 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <AccessChip access={primaryCharger.access} />
              {hotel.chargers.length > 1 && (
                <span className="text-xs text-neutral-500">+{hotel.chargers.length - 1} more</span>
              )}
            </div>
            <ChargerSpecLine
              acDc={primaryCharger.acDc}
              powerKw={primaryCharger.powerKw}
              connector={primaryCharger.connector}
              guns={primaryCharger.guns}
            />
            <p className="text-xs font-medium text-neutral-600">
              {primaryCharger.access} · Fee: {primaryCharger.fee}
            </p>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + CTA */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <span className="text-2xl font-bold text-neutral-950 tabular-nums">
              {availablePrice === null ? "Sold out" : formatPrice(availablePrice)}
            </span>
            {availablePrice !== null && <span className="ml-1 text-sm text-neutral-500">/ night</span>}
            <p className={`mt-0.5 text-xs ${hasFreeCancellation(hotel) ? "text-success-text" : "text-neutral-500"}`}>
              {hasFreeCancellation(hotel) ? "Free cancellation available" : "Non-refundable rates"}
            </p>
          </div>
          <Link
            to={`/hotels/${hotel.slug}`}
            className="shrink-0 whitespace-nowrap rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            {hotel.bookingType === "partner" ? "View partner stay" : "View hotel"}
          </Link>
        </div>
      </div>
    </div>
  );
}
