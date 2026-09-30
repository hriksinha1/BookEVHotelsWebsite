import { useEffect, useState } from "react";

const STORAGE_KEY = "book-ev-hotels-saved";
const EVENT_NAME = "book-ev-hotels-saved-change";

function readSaved() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value.filter(item => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function useSavedHotels() {
  const [savedIds, setSavedIds] = useState<string[]>(readSaved);

  useEffect(() => {
    const sync = () => setSavedIds(readSaved());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggleSaved = (hotelId: string) => {
    const next = savedIds.includes(hotelId)
      ? savedIds.filter(id => id !== hotelId)
      : [...savedIds, hotelId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSavedIds(next);
    window.dispatchEvent(new Event(EVENT_NAME));
  };

  return { savedIds, toggleSaved };
}
