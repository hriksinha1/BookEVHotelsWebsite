import { Link } from "react-router-dom";
import { CheckCircle2, Zap, MapPin, ArrowRight, Phone, Camera, Star, ChevronRight, Shield } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import HotelCard from "../components/HotelCard";
import { hotels } from "../data/hotels";
import { siteConfig, popularDestinations, roadTrips } from "../data/config";

const stats = [
  { value: "750+", label: "Verified hotels" },
  { value: "250+", label: "Cities covered" },
  { value: "30+", label: "States and UTs" },
  { value: "600+", label: "Public charging" },
];

const verificationSteps = [
  { icon: Phone, title: "We verify the charger", desc: "Our team calls the hotel and confirms the charger is installed and working before any listing goes live." },
  { icon: Camera, title: "We review the photos", desc: "The hotel submits exactly two photos of their charger setup for our review team." },
  { icon: CheckCircle2, title: "You see what you'll find", desc: "Every listing shows connector type, power output, access (Public or Guest Only), and fee information." },
  { icon: Star, title: "You book with confidence", desc: "Find your dates, select your room, and complete your stay knowing your EV can charge overnight." },
];

const chargerGuide = [
  { kw: "7.4 kW AC", label: "Standard overnight", desc: "Suits most EVs for a full overnight charge. A Tata Nexon EV charges from 20% to 100% in about 8 hours." },
  { kw: "22 kW AC", label: "Faster AC", desc: "Your onboard charger may limit AC speed — a 22 kW point charges a car with an 11 kW onboard charger at 11 kW." },
  { kw: "50+ kW DC", label: "DC fast charging", desc: "Direct current fast chargers can add 80–150 km of range per hour, bypassing the onboard charger." },
];

const testimonials = [
  { name: "Priya S.", city: "Bengaluru", text: "I drove Bengaluru to Coorg in my Nexon EV. Found a resort via Book EV Hotels — 22 kW charger confirmed before I arrived. No surprises." },
  { name: "Rahul M.", city: "Pune", text: "The Guest Only vs Public distinction is incredibly useful. I booked specifically for overnight guest charging and it worked exactly as listed." },
  { name: "Ananya K.", city: "Chennai", text: "I was EV-curious and nervous about a long drive. This site showed me every stop where I could charge. I'm now a confident EV road-tripper." },
];

export default function HomePage() {
  const featuredHotels = hotels.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header transparent />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&h=900&fit=crop&auto=format"
            alt="EV car charging at a hotel in India"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/50 to-neutral-950/80" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
          <div className="text-center mb-10">
            <p className="inline-block text-[11px] font-semibold uppercase tracking-[0.035em] text-brand-400 mb-5 border border-brand-400/40 rounded-full px-4 py-1.5">
              India's EV-Friendly Hotel Directory
            </p>
            <h1 className="text-[clamp(40px,5vw,64px)] font-bold text-white leading-[1.1] tracking-tight mb-5 max-w-3xl mx-auto">
              Charge up your stay.
            </h1>
            <p className="text-[18px] text-neutral-200 max-w-2xl mx-auto leading-[28px]">
              Verified EV-friendly hotels across India, with charger details you can trust and stays you can book for your dates.
            </p>
          </div>

          <SearchBar />

          <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
            {["Independently verified charging", "Charger specs before booking", "Public vs Guest Only clarity"].map(t => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-brand-400" />
                <span className="text-[13px] text-neutral-300">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-[48px] font-bold text-white leading-[52px] tabular-nums">{s.value}</p>
                <p className="text-[14px] font-semibold text-brand-200 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why a checkbox isn't enough */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[12px] font-semibold text-brand-700 uppercase tracking-[0.035em] mb-4">Our Verification Standard</p>
              <h2 className="text-[36px] font-bold text-neutral-950 leading-[44px] tracking-tight mb-6">
                A charger checkbox isn't enough.
              </h2>
              <p className="text-[17px] text-neutral-700 leading-[28px] mb-8">
                Any hotel can tick "EV charging available" on a listing portal. We go further. We call the hotel, confirm the charger exists and is working, review their photos, and record the exact type and power before a listing goes live.
              </p>
              <div className="space-y-6">
                {verificationSteps.map((step, i) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 bg-brand-50 rounded-xl flex items-center justify-center">
                      <step.icon size={18} className="text-brand-700" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-neutral-950 mb-1">{step.title}</h3>
                      <p className="text-[14px] text-neutral-600 leading-[22px]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 mt-8 text-brand-700 font-semibold text-[15px] hover:text-brand-800 transition-colors">
                How we verify <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=700&h=875&fit=crop&auto=format"
                  alt="Person plugging in an EV charger at a hotel"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating verification card */}
              <div className="absolute bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-[220px] border border-neutral-100">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-brand-700" />
                  <span className="text-[13px] font-semibold text-brand-800">Verified EV Charger</span>
                </div>
                <p className="text-[12px] font-semibold text-neutral-950">60 kW DC · CCS2</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Public · 2 chargers</p>
                <p className="text-[11px] text-neutral-500">Verified by phone · Mar 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[12px] font-semibold text-brand-700 uppercase tracking-[0.035em] mb-3">Popular Destinations</p>
              <h2 className="text-[32px] font-bold text-neutral-950 leading-[40px] tracking-tight">
                Find your next EV stop
              </h2>
            </div>
            <Link to="/destinations" className="hidden sm:flex items-center gap-1.5 text-brand-700 font-semibold text-[14px] hover:text-brand-800 transition-colors">
              All destinations <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Large featured card */}
            <Link
              to={`/destinations/karnataka/bengaluru`}
              className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-neutral-300 group aspect-square"
            >
              <img
                src={`https://images.unsplash.com/${popularDestinations[0].image}?w=800&h=800&fit=crop&auto=format`}
                alt={popularDestinations[0].city}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-[24px] font-bold text-white leading-[32px]">{popularDestinations[0].city}</p>
                <p className="text-[14px] text-white/80">{popularDestinations[0].state}</p>
                <p className="text-[13px] text-brand-300 font-semibold mt-1">{popularDestinations[0].hotelCount} verified hotels</p>
              </div>
            </Link>

            {/* Smaller cards */}
            {popularDestinations.slice(1, 7).map(dest => (
              <Link
                key={dest.city}
                to={`/destinations/${dest.state.toLowerCase().replace(/ /g, "-")}/${dest.city.toLowerCase().replace(/ /g, "-")}`}
                className="relative rounded-2xl overflow-hidden bg-neutral-300 group aspect-square"
              >
                <img
                  src={`https://images.unsplash.com/${dest.image}?w=400&h=400&fit=crop&auto=format`}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[16px] font-bold text-white">{dest.city}</p>
                  <p className="text-[12px] text-brand-300 font-semibold">{dest.hotelCount} hotels</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-[12px] font-semibold text-brand-700 uppercase tracking-[0.035em] mb-3">Simple journey</p>
            <h2 className="text-[32px] font-bold text-neutral-950 leading-[40px] tracking-tight">How it works</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Search", desc: "Enter your destination and travel dates. Instantly see verified EV hotels in that location." },
              { step: "02", title: "Verify", desc: "Check charger type, power, access type and fee details. Know what you'll find before you arrive." },
              { step: "03", title: "Choose", desc: "Filter by charger power, access type, star rating and price. Compare rooms and amenities." },
              { step: "04", title: "Book", desc: "Select your room and complete your booking. Receive confirmation with your charger summary." },
            ].map(item => (
              <div key={item.step} className="flex flex-col">
                <span className="text-[48px] font-bold text-brand-100 leading-none tabular-nums">{item.step}</span>
                <h3 className="text-[18px] font-semibold text-neutral-950 mt-3 mb-2">{item.title}</h3>
                <p className="text-[14px] text-neutral-600 leading-[22px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured hotels */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[12px] font-semibold text-brand-700 uppercase tracking-[0.035em] mb-3">Recently verified</p>
              <h2 className="text-[32px] font-bold text-neutral-950 leading-[40px] tracking-tight">Stays worth the drive</h2>
            </div>
            <Link to="/search" className="hidden sm:flex items-center gap-1.5 text-brand-700 font-semibold text-[14px] hover:text-brand-800 transition-colors">
              View all hotels <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* Charger education */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[12px] font-semibold text-brand-700 uppercase tracking-[0.035em] mb-3">Know your charger</p>
            <h2 className="text-[32px] font-bold text-neutral-950 leading-[40px] tracking-tight">Charger speed explained simply</h2>
            <p className="text-[16px] text-neutral-600 mt-3 max-w-xl mx-auto">Every verified hotel shows the charger type, power and access before you book.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {chargerGuide.map(c => (
              <div key={c.kw} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center">
                    <Zap size={20} className="text-brand-700" />
                  </div>
                  <div>
                    <p className="text-[20px] font-bold text-neutral-950 tabular-nums">{c.kw}</p>
                    <p className="text-[13px] text-brand-700 font-semibold">{c.label}</p>
                  </div>
                </div>
                <p className="text-[14px] text-neutral-600 leading-[22px]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Road trip inspiration */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-[12px] font-semibold text-brand-400 uppercase tracking-[0.035em] mb-3">Road-trip routes</p>
            <h2 className="text-[32px] font-bold text-white leading-[40px] tracking-tight">Plan your next route</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {roadTrips.map(trip => (
              <Link
                key={trip.route}
                to="/search"
                className="group relative rounded-2xl overflow-hidden bg-neutral-800 aspect-[3/4]"
              >
                <img
                  src={`https://images.unsplash.com/${trip.image}?w=400&h=533&fit=crop&auto=format`}
                  alt={trip.route}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[16px] font-bold text-white leading-[22px]">{trip.route}</p>
                  <p className="text-[13px] text-neutral-400 mt-1">{trip.km} · {trip.hotels} verified stays</p>
                  <div className="flex items-center gap-1 mt-3 text-brand-400 text-[13px] font-semibold group-hover:gap-2 transition-all">
                    Explore route <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[12px] font-semibold text-brand-700 uppercase tracking-[0.035em] mb-3">Traveller stories</p>
            <h2 className="text-[32px] font-bold text-neutral-950 leading-[40px] tracking-tight">Know before you arrive</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-rating text-rating" />)}
                </div>
                <p className="text-[15px] text-neutral-700 leading-[24px] italic mb-5">"{t.text}"</p>
                <div>
                  <p className="text-[14px] font-semibold text-neutral-950">{t.name}</p>
                  <p className="text-[13px] text-neutral-500">{t.city}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[12px] text-neutral-400 mt-6">Sample testimonials — for prototype purposes only.</p>
        </div>
      </section>

      {/* Hotel partner section */}
      <section className="py-20 bg-brand-50 border-y border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[12px] font-semibold text-brand-700 uppercase tracking-[0.035em] mb-4">For hotel owners</p>
              <h2 className="text-[32px] font-bold text-neutral-950 leading-[40px] tracking-tight mb-5">
                Reach EV travellers looking for a place to stay and charge.
              </h2>
              <p className="text-[16px] text-neutral-700 leading-[26px] mb-8">
                Get your hotel verified and listed on Book EV Hotels. We confirm your charger, create your listing, and connect you with India's growing EV-driver community. One-time verification. Lifetime listing.
              </p>
              <div className="space-y-3 mb-8">
                {["Reach EV road-trippers actively planning trips", "Get a verified badge that builds booking confidence", "Your charger details shown before hotel amenities", "Lifetime listing with a one-time verification fee"].map(b => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-brand-700 shrink-0" />
                    <p className="text-[14px] text-neutral-700">{b}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/list-your-hotel"
                className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white px-6 py-3 rounded-xl text-[15px] font-semibold transition-colors"
              >
                List your hotel <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c4fe1fa9?w=700&h=525&fit=crop&auto=format"
                alt="Hotel manager standing in front of their hotel"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-5 left-5 bg-white rounded-xl p-4 shadow-lg">
                <p className="text-[13px] font-semibold text-neutral-950">One-time verification fee</p>
                <p className="text-[20px] font-bold text-brand-700 tabular-nums">₹5,900</p>
                <p className="text-[12px] text-neutral-500">incl. 18% GST · Lifetime listing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-[40px] font-bold text-white leading-[48px] tracking-tight mb-5">
            Your next road trip starts with a hotel you can trust.
          </h2>
          <p className="text-[17px] text-neutral-300 leading-[28px] mb-10">
            Find a stay where your EV can charge while you sleep. Verified charging. Clear details. No surprises.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 bg-brand-400 hover:bg-brand-300 text-neutral-950 px-8 py-4 rounded-xl text-[16px] font-semibold transition-colors"
          >
            Explore EV hotels <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
