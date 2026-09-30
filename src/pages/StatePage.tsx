import { Link, useParams } from "react-router-dom";
import { ChevronRight, MapPin, Zap } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HotelCard from "../components/HotelCard";
import { hotels } from "../data/hotels";
import { Heading } from "../components/ui";

function fromSlug(value = "") {
  return value
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toSlug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

export default function StatePage() {
  const { state: stateSlug } = useParams();
  const requestedState = fromSlug(stateSlug);
  const stateName = hotels.find(hotel => toSlug(hotel.state) === stateSlug)?.state ?? requestedState;
  const stateHotels = hotels.filter(hotel => toSlug(hotel.state) === stateSlug);
  const cities = [...new Set(stateHotels.map(hotel => hotel.city))].sort();
  const publicCount = stateHotels.filter(hotel => hotel.chargers.some(charger => charger.access === "Public")).length;
  const maxPower = Math.max(0, ...stateHotels.flatMap(hotel => hotel.chargers.map(charger => charger.powerKw ?? 0)));

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="pt-16">
        <div className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm sm:px-6">
            <Link to="/destinations" className="font-medium text-brand-700 hover:text-brand-800">Destinations</Link>
            <ChevronRight className="text-neutral-400" size={14} />
            <span className="text-neutral-600">{stateName}</span>
          </div>
        </div>

        <section className="bg-neutral-950 py-14 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-300">State guide</p>
            <Heading level={1} className="max-w-3xl text-4xl font-bold tracking-tight">EV-friendly hotels in {stateName}</Heading>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300">
              Compare charger access, output and connector details before choosing where to stay.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          {stateHotels.length > 0 ? (
            <>
              <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { label: "Verified hotels", value: stateHotels.length },
                  { label: "Cities listed", value: cities.length },
                  { label: "Public charging", value: publicCount },
                  { label: "Highest listed output", value: maxPower ? `${maxPower} kW` : "Not confirmed" },
                ].map(item => (
                  <div key={item.label} className="rounded-xl border border-neutral-200 bg-white p-4">
                    <p className="text-2xl font-bold text-neutral-950">{item.value}</p>
                    <p className="mt-1 text-sm text-neutral-600">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mb-10">
                <Heading level={2} className="mb-4 text-2xl font-bold text-neutral-950">Browse cities</Heading>
                <div className="flex flex-wrap gap-3">
                  {cities.map(city => (
                    <Link
                      key={city}
                      to={`/destinations/${stateSlug}/${toSlug(city)}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 hover:border-brand-700 hover:text-brand-700"
                    >
                      <MapPin size={15} />
                      {city}
                    </Link>
                  ))}
                </div>
              </div>

              <Heading level={2} className="mb-6 text-2xl font-bold text-neutral-950">Verified stays in {stateName}</Heading>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stateHotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-16 text-center">
              <Zap className="mx-auto mb-4 text-neutral-400" size={28} />
              <Heading level={2} className="text-xl font-semibold text-neutral-950">No verified listings in {stateName} yet</Heading>
              <p className="mx-auto mt-2 max-w-lg text-sm text-neutral-600">
                Our current mock dataset does not include a verified hotel in this state. Try another destination.
              </p>
              <Link to="/destinations" className="mt-6 inline-flex rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800">
                Browse destinations
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
