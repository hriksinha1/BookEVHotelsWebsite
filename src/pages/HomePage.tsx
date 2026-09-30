import { Link } from "react-router-dom";
import {
  ArrowRight,
  BedDouble,
  Camera,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Phone,
  Route,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import HotelCard from "../components/HotelCard";
import EVChargingSummary from "../components/EVChargingSummary";
import { Heading } from "../components/ui";
import { hotels } from "../data/hotels";
import SafeImage from "../components/SafeImage";
import { imageRegistry } from "../data/images";

const destinations = Array.from(
  new Map(hotels.map(hotel => [hotel.city, { city: hotel.city, state: hotel.state }])).values(),
)
  .filter(destination => imageRegistry.destinations[destination.city])
  .slice(0, 6);

const verificationPrinciples = [
  {
    number: "01",
    icon: Phone,
    title: "Charger checked",
    copy: "We confirm the charging setup with the property by phone.",
  },
  {
    number: "02",
    icon: Camera,
    title: "Photos reviewed",
    copy: "The property submits two photos of the charger setup for review.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Specs recorded",
    copy: "Power, connector, access and fee are shown as supplied—or marked not confirmed.",
  },
  {
    number: "04",
    icon: BedDouble,
    title: "Stay matched",
    copy: "You compare the charging plan alongside dates, rooms and cancellation terms.",
  },
];

export default function HomePage() {
  const featuredHotels = hotels.filter(hotel => hotel.verified).slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header transparent />
      <main>
        <section className="relative flex min-h-screen items-center overflow-hidden bg-neutral-950">
          <div className="absolute inset-0">
            <SafeImage
              src={imageRegistry.hero}
              alt="Electric car ready for an Indian road trip"
              fallback="hero"
              className="h-full w-full"
              imageClassName="object-center"
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/35 via-neutral-950/25 to-neutral-950/75" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:pb-20">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-300">
                Verified EV stays across India
              </p>
              <Heading level={1} className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Charge your car.
                <span className="block text-brand-300">Then enjoy your stay.</span>
              </Heading>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-200 sm:text-lg">
                Find hotels where the EV charging setup is verified before you book—so your road trip does not end with a charging surprise.
              </p>
              <Link to="/about" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white hover:text-brand-300">
                How verification works <ArrowRight size={16} />
              </Link>
            </div>

            <SearchBar />

            <div className="mt-7 flex flex-col items-center justify-center gap-3 text-sm text-neutral-200 sm:flex-row sm:gap-7">
              {[
                "Charger details verified",
                "Charging access clearly explained",
                "Book around your travel dates",
              ].map(item => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-brand-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">Why this exists</p>
                <Heading level={2} className="mt-4 text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
                  A hotel can say it has a charger. We help you know what that actually means.
                </Heading>
                <p className="mt-6 text-base leading-relaxed text-neutral-700">
                  Charging is one of the easiest parts of an EV trip to get wrong. We make the useful details visible before you book—from charger power and connector to who can use it and whether there is a fee.
                </p>
                <div className="mt-8 max-w-md">
                  <EVChargingSummary chargers={hotels[0].chargers} />
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="border-t border-neutral-200">
                  {verificationPrinciples.map(item => (
                    <div key={item.number} className="grid grid-cols-[auto_1fr] gap-5 border-b border-neutral-200 py-6 sm:grid-cols-[3rem_3rem_1fr] sm:items-start">
                      <span className="text-sm font-semibold text-neutral-400">{item.number}</span>
                      <span className="hidden h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 sm:flex">
                        <item.icon size={19} />
                      </span>
                      <div>
                        <Heading level={3} className="text-lg font-semibold text-neutral-950">{item.title}</Heading>
                        <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-neutral-100 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">Plan the drive</p>
                <Heading level={2} className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                  Where will your next charge take you?
                </Heading>
                <p className="mt-3 max-w-2xl text-base text-neutral-600">
                  From weekend escapes to longer road trips, discover stays that make EV travel easier.
                </p>
              </div>
              <Link to="/destinations" className="hidden min-h-11 items-center gap-2 text-sm font-semibold text-brand-700 sm:flex">
                Explore destinations <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination, index) => (
                <Link
                  key={destination.city}
                  to={`/destinations/${destination.state.toLowerCase().replaceAll(" ", "-")}/${destination.city.toLowerCase().replaceAll(" ", "-")}`}
                  className={`group relative overflow-hidden rounded-2xl bg-neutral-900 ${index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <SafeImage
                    src={imageRegistry.destinations[destination.city]}
                    alt={`${destination.city}, ${destination.state}`}
                    fallback="destination"
                    className="aspect-[4/3] h-full w-full"
                    imageClassName="opacity-90 transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <Heading level={3} className="text-xl font-semibold text-white">{destination.city}</Heading>
                        <p className="mt-1 text-sm text-neutral-200">{destination.state}</p>
                      </div>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-700">
                        <MapPin size={17} />
                      </span>
                    </div>
                    <p className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-300">
                      <ShieldCheck size={14} /> Verified charging details
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">A clearer booking journey</p>
              <Heading level={2} className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">Know the stay. Know the charger.</Heading>
            </div>
            <div className="grid gap-8 border-y border-neutral-200 py-10 md:grid-cols-4">
              {[
                { icon: Search, title: "Search", copy: "Choose a destination, dates and who is travelling." },
                { icon: Zap, title: "Check the charger", copy: "Review access, power, connector and fee before the room." },
                { icon: BedDouble, title: "Choose your room", copy: "Compare real room terms and totals for your dates." },
                { icon: Route, title: "Book your stay", copy: "Carry the same dates and charging plan into confirmation." },
              ].map((item, index) => (
                <div key={item.title} className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-950 text-white"><item.icon size={18} /></span>
                    <span className="text-xs font-semibold text-neutral-400">0{index + 1}</span>
                  </div>
                  <Heading level={3} className="text-lg font-semibold text-neutral-950">{item.title}</Heading>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">Verified stays</p>
                <Heading level={2} className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">Stays worth the drive</Heading>
                <p className="mt-3 text-base text-neutral-600">Charging information comes before the swimming pool.</p>
              </div>
              <Link to="/search" className="hidden min-h-11 items-center gap-2 text-sm font-semibold text-brand-700 sm:flex">
                View all stays <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredHotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
            </div>
          </div>
        </section>

        <section className="bg-neutral-950 py-20 text-white lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">For hotel teams</p>
              <Heading level={2} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Bring EV travellers to your hotel.</Heading>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-300">
                Share your charging setup, complete the verification steps and help travellers understand whether your property fits their journey.
              </p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <Link to="/list-your-hotel" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-400 px-6 text-base font-semibold text-neutral-950 hover:bg-brand-300">
                List your hotel <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
