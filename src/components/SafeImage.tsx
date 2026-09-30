import { useEffect, useState } from "react";
import { Building2, ImageOff, MapPinned } from "lucide-react";
import { imageFallbacks, type ImageFallback } from "../data/images";

export default function SafeImage({
  src,
  alt,
  fallback = "hotel",
  className = "",
  imageClassName = "",
  loading = "lazy",
  fetchPriority,
  sizes,
}: {
  src: string;
  alt: string;
  fallback?: ImageFallback;
  className?: string;
  imageClassName?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
}) {
  const fallbackSrc = imageFallbacks[fallback];
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
    setFailed(false);
  }, [src]);

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setLoaded(false);
    } else {
      setFailed(true);
    }
  };

  const PlaceholderIcon = fallback === "destination" || fallback === "hero" ? MapPinned : fallback === "hotel" || fallback === "room" ? Building2 : ImageOff;

  return (
    <span className={`relative block overflow-hidden bg-neutral-100 ${className}`}>
      {!loaded && !failed && <span className="absolute inset-0 animate-pulse bg-neutral-200" aria-hidden="true" />}
      {failed ? (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-neutral-100 text-neutral-500">
          <PlaceholderIcon size={24} />
          <span className="text-xs font-medium">Image unavailable</span>
        </span>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={handleError}
          className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${imageClassName}`}
        />
      )}
    </span>
  );
}
