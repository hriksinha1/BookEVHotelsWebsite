import { useEffect, useState } from "react";

export interface BookingRecord {
  id: string;
  hotelSlug: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  total: number;
  status: "confirmed";
  createdAt: string;
}

const STORAGE_KEY = "book-ev-hotels-bookings";
const EVENT_NAME = "book-ev-hotels-bookings-change";

function readBookings(): BookingRecord[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function useBookings() {
  const [bookings, setBookings] = useState<BookingRecord[]>(readBookings);

  useEffect(() => {
    const sync = () => setBookings(readBookings());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const createBooking = (booking: Omit<BookingRecord, "id" | "createdAt" | "status">) => {
    const id = `BEVH-${Date.now().toString(36).toUpperCase()}`;
    const record: BookingRecord = {
      ...booking,
      id,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    const next = [record, ...readBookings()];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setBookings(next);
    window.dispatchEvent(new Event(EVENT_NAME));
    return record;
  };

  return { bookings, createBooking };
}
