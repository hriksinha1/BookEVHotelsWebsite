import { Link } from "react-router-dom";
import { Star, Bookmark, MapPin } from "lucide-react";
import { useState } from "react";
import { VerifiedBadge, AccessChip, ChargerSpecLine } from "./EVBadge";
import type { Hotel } from "../data/hotels";
import { formatPrice, getPrimaryCharger } from "../data/hotels";

export default function HotelCard({ hotel, compact = false }: { hotel: Hotel; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  const primaryCharger = getPrimaryCharger(hotel);
  const img = hotel.images[0];
  const imgUrl = `https://images.unsplash.com/${img}?w=600&h=400&fit=crop&auto=format`;

  if (compact) {
    return (
      <Link to={`/hotels/${hotel.slug}`} className="flex gap-3 bg-white rounded-xl border border-neutral-200 p-3 hover:shadow-md transition-shadow group">
        <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-neutral-200">
          <img src={imgUrl} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[14px] font-semibold text-neutral-950 line-clamp-2 leading-[20px]">{hotel.name}</h3>
          </div>
          <p className="text-[12px] text-neutral-600 mt-0.5">{hotel.city}, {hotel.state}</p>
          {primaryCharger && (
            <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
              <VerifiedBadge compact />
              <AccessChip access={primaryCharger.access} compact />
            </div>
          )}
          <p className="text-[14px] font-bold text-neutral-950 mt-1 tabular-nums">{formatPrice(hotel.priceFrom)}<span className="text-[11px] font-normal text-neutral-600"> / night</span></p>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative img-zoom aspect-[4/3]">
        <img
          src={imgUrl}
          alt={hotel.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <button
          onClick={e => { e.preventDefault(); setSaved(!saved); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${saved ? "bg-brand-700 text-white" : "bg-white/90 text-neutral-600 hover:bg-white"}`}
          aria-label={saved ? "Remove from saved" : "Save hotel"}
        >
          <Bookmark size={16} className={saved ? "fill-white" : ""} />
        </button>
        {hotel.bookingType === "partner" && (
          <span className="absolute bottom-3 left-3 bg-white/90 text-neutral-700 text-[11px] font-semibold px-2 py-1 rounded-full">
            Via Agoda
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Verified badge first */}
        {hotel.verified && <VerifiedBadge />}

        {/* Hotel name */}
        <h3 className="mt-2.5 text-[18px] font-semibold leading-[26px] text-neutral-950 line-clamp-2">{hotel.name}</h3>

        {/* Stars + rating */}
        <div className="flex items-center gap-2 mt-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: hotel.starRating }).map((_, i) => (
              <Star key={i} size={12} className="fill-rating text-rating" />
            ))}
          </div>
          {hotel.rating && (
            <span className="text-[13px] font-semibold text-neutral-800 tabular-nums">{hotel.rating}</span>
          )}
          {hotel.reviewCount && (
            <span className="text-[13px] text-neutral-500">({hotel.reviewCount})</span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mt-1.5 text-neutral-600">
          <MapPin size={13} />
          <span className="text-[13px]">{hotel.city}, {hotel.state}</span>
        </div>

        {/* EV info */}
        {primaryCharger && (
          <div className="mt-3 pt-3 border-t border-neutral-100 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <AccessChip access={primaryCharger.access} />
              {hotel.chargers.length > 1 && (
                <span className="text-[12px] text-neutral-500">+{hotel.chargers.length - 1} more</span>
              )}
            </div>
            <ChargerSpecLine
              acDc={primaryCharger.acDc}
              powerKw={primaryCharger.powerKw}
              connector={primaryCharger.connector}
              guns={primaryCharger.guns}
            />
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + CTA */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <span className="text-[22px] font-bold text-neutral-950 tabular-nums">{formatPrice(hotel.priceFrom)}</span>
            <span className="text-[13px] text-neutral-500 ml-1">/ night</span>
            <p className="text-[12px] text-success-text mt-0.5">Free cancellation available</p>
          </div>
          <Link
            to={`/hotels/${hotel.slug}`}
            className="shrink-0 bg-brand-700 hover:bg-brand-800 text-white px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-colors whitespace-nowrap"
          >
            View hotel
          </Link>
        </div>
      </div>
    </div>
  );
}
