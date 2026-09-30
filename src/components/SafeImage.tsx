import { useCallback, useRef, useState } from "react";
import { Building2, ImageOff, MapPinned } from "lucide-react";
import { imageFallbacks, type ImageFallback } from "../data/images";

const mergeClasses = (...classes: string[]) => classes.filter(Boolean).join(" ");

type ImageStatus = "loading" | "loaded" | "fallback" | "failed";

export default function SafeImage({ src, alt, fallback = "hotel", className = "", imageClassName = "", loading = "lazy", fetchPriority, sizes }: {
  src: string; alt: string; fallback?: ImageFallback; className?: string; imageClassName?: string;
  loading?: "eager" | "lazy"; fetchPriority?: "high" | "low" | "auto"; sizes?: string;
}) {
  const fallbackSrc = imageFallbacks[fallback];
  const stateRef = useRef({ src, status: "loading" as ImageStatus });
  if (stateRef.current.src !== src) {
    stateRef.current = { src, status: "loading" };
  }
  const [status, setStatus] = useState<ImageStatus>(stateRef.current.status);
  const [currentSrc, setCurrentSrc] = useState(src);
  if (currentSrc !== src && stateRef.current.src === src) {
    setCurrentSrc(src);
    setStatus("loading");
  }

  const handleLoad = useCallback(() => {
    stateRef.current.status = currentSrc === fallbackSrc ? "fallback" : "loaded";
    setStatus(stateRef.current.status);
  }, [currentSrc, fallbackSrc]);
  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setStatus("fallback");
    } else setStatus("failed");
  };
  const PlaceholderIcon = fallback === "destination" || fallback === "hero" ? MapPinned : fallback === "hotel" || fallback === "room" ? Building2 : ImageOff;

  return <span className={mergeClasses("block overflow-hidden bg-neutral-100", className)}>
    {status === "loading" && <span className="absolute inset-0 bg-neutral-200 motion-safe:animate-pulse" aria-hidden="true" />}
    {status === "failed" ? <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-neutral-100 text-neutral-500"><PlaceholderIcon size={24} /><span className="text-xs font-medium">Image unavailable</span></span> : <img key={currentSrc} src={currentSrc} alt={alt} loading={loading} decoding="async" fetchPriority={fetchPriority} sizes={sizes} onLoad={handleLoad} onError={handleError} ref={img => { if (img?.complete && img.naturalWidth > 0) handleLoad(); }} className={mergeClasses("h-full w-full object-cover transition-opacity duration-200", status === "loading" ? "opacity-0" : "opacity-100", imageClassName)} />}
  </span>;
}
