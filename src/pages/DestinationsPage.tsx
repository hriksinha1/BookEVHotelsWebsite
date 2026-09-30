import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Route, ShieldCheck } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heading } from "../components/ui";
import { hotels } from "../data/hotels";
import SafeImage from "../components/SafeImage";
import { imageFromPhotoId, imageRegistry } from "../data/images";

const toSlug = (value: string) => value.toLowerCase().replaceAll(" ", "-");

export default function DestinationsPage() {
  const states = Array.from(new Set(hotels.map(hotel => hotel.state))).sort();
  const cities = Array.from(
    new Map(hotels.map(hotel => [hotel.city, { city: hotel.city, state: hotel.state }])).values(),
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="pt-16">
        <section className="bg-neutral-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">Explore India by EV</p>
            <Heading level={1} className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Go farther. Stay charged.</Heading>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-300">
              Browse the destinations represented in our current verified hotel listings, then compare the charging setup before choosing a room.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">Destination ideas</p>
              <Heading level={2} className="mt-3 text-3xl font-bold tracking-tight text-neutral-950">Choose the next stop</Heading>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map(destination => (
                <Link
                  key={destination.city}
                  to={`/destinations/${toSlug(destination.state)}/${toSlug(destination.city)}`}
                  className="group relative overflow-hidden rounded-2xl bg-neutral-950"
                >
                  <SafeImage
                    src={imageRegistry.destinations[destination.city] ?? imageFromPhotoId(hotels.find(hotel => hotel.city === destination.city)?.images[0] ?? "")}
                    alt={`${destination.city}, ${destination.state}`}
                    fallback="destination"
                    className="aspect-[4/3] w-full"
                    imageClassName="opacity-90 transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <Heading level={3} className="text-xl font-semibold text-white">{destination.city}</Heading>
                    <p className="mt-1 text-sm text-neutral-200">{destination.state}</p>
                    <p className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-300">
                      <ShieldCheck size={14} /> Verified charger information
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-neutral-200 bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Route size={24} className="text-brand-700" />
              <Heading level={2} className="mt-4 text-3xl font-bold tracking-tight text-neutral-950">Browse by state</Heading>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">Start broad, then narrow the trip to a city and a verified stay.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {states.map(state => {
                const stateCities = cities.filter(city => city.state === state);
                return (
                  <div key={state} className="rounded-2xl border border-neutral-200 p-5">
                    <Link to={`/destinations/${toSlug(state)}`} className="flex min-h-11 items-center justify-between text-lg font-semibold text-neutral-950 hover:text-brand-700">
                      {state} <ArrowRight size={16} />
                    </Link>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {stateCities.map(city => (
                        <Link key={city.city} to={`/destinations/${toSlug(state)}/${toSlug(city.city)}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-neutral-100 px-3 text-sm text-neutral-700 hover:bg-brand-50 hover:text-brand-800">
                          <MapPin size={13} /> {city.city}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
