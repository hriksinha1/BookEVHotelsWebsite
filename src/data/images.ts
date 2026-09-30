const replacements: Record<string, string> = {
  "photo-1477587458883-47145ed31fd0": "photo-1477587458883-47145ed94245",
  "photo-1549996168-1e8e3b1f8e8d": "photo-1615836245337-f5b9b2303f10",
  "photo-1551882547-ff40c4fe1fa9": "photo-1632398414290-15262b0ec12d",
  "photo-1631049021435-7abd08cc2ece": "photo-1582719478250-c89cae4dc85b",
};

export const imageFallbacks = {
  hero: "/images/fallbacks/destination.svg",
  hotel: "/images/fallbacks/hotel.svg",
  room: "/images/fallbacks/room.svg",
  destination: "/images/fallbacks/destination.svg",
  guide: "/images/fallbacks/editorial.svg",
  editorial: "/images/fallbacks/editorial.svg",
} as const;

export type ImageFallback = keyof typeof imageFallbacks;

export function imageFromPhotoId(photoId: string) {
  const resolved = replacements[photoId] ?? photoId;
  return `/images/photos/${resolved}.jpg`;
}

export const imageRegistry = {
  hero: imageFromPhotoId("photo-1593941707874-ef25b8b4a92b"),
  about: imageFromPhotoId("photo-1593941707874-ef25b8b4a92b"),
  destinations: {
    Bengaluru: imageFromPhotoId("photo-1596178060671-7a80dc8059ea"),
    Udaipur: imageFromPhotoId("photo-1549996168-1e8e3b1f8e8d"),
    Goa: imageFromPhotoId("photo-1512343879784-a960bf40e7f2"),
    Jaipur: imageFromPhotoId("photo-1477587458883-47145ed31fd0"),
    Coorg: imageFromPhotoId("photo-1606298855672-3efb63017be8"),
    Manali: imageFromPhotoId("photo-1506905925346-21bda4d32df4"),
    Kabini: imageFromPhotoId("photo-1509316785289-025f5b846b35"),
  } as Record<string, string>,
};
