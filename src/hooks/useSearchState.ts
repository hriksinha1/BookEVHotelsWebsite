import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface SearchState {
  destination: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
}

const STORAGE_KEY = "book-ev-hotels-search";

export const emptySearch: SearchState = {
  destination: "",
  checkIn: "",
  checkOut: "",
  rooms: 1,
  adults: 2,
  children: 0,
};

function positiveNumber(value: string | null, fallback: number, minimum = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(minimum, parsed) : fallback;
}

export function toSearchParams(state: SearchState) {
  const params = new URLSearchParams();
  if (state.destination) params.set("destination", state.destination);
  if (state.checkIn) params.set("checkin", state.checkIn);
  if (state.checkOut) params.set("checkout", state.checkOut);
  params.set("rooms", String(state.rooms));
  params.set("adults", String(state.adults));
  params.set("children", String(state.children));
  return params;
}

export function useSearchState(defaultDestination = "") {
  const [params] = useSearchParams();
  const [state, setState] = useState<SearchState>(() => {
    let stored: Partial<SearchState> = {};
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      stored = {};
    }
    return {
      ...emptySearch,
      ...stored,
      destination: params.get("destination") ?? defaultDestination ?? stored.destination ?? "",
      checkIn: params.get("checkin") ?? stored.checkIn ?? "",
      checkOut: params.get("checkout") ?? stored.checkOut ?? "",
      rooms: positiveNumber(params.get("rooms"), stored.rooms ?? 1, 1),
      adults: positiveNumber(params.get("adults") ?? params.get("guests"), stored.adults ?? 2, 1),
      children: positiveNumber(params.get("children"), stored.children ?? 0),
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return [state, setState] as const;
}
