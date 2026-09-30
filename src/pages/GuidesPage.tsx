import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SafeImage from "../components/SafeImage";
import { imageRegistry } from "../data/images";
import { Button } from "../components/ui";

const guides = [
  {
    slug: "what-to-check-before-booking-ev-hotel",
    category: "Hotel selection",
    title: "What to check before booking a hotel with EV charging in India",
    description: "A charger checkbox on a booking portal isn't proof. Here's exactly what to look for — and what questions to ask — before you reserve a stay.",
    readTime: "8 min read",
    updated: "September 2025",
  },
  {
    slug: "understanding-ev-charger-speeds",
    category: "Charging basics",
    title: "Understanding EV charger speeds: 7.4 kW, 22 kW, and DC fast charging",
    description: "Not all chargers are equal. Learn what the numbers actually mean for your overnight stay and your car's onboard charger.",
    readTime: "6 min read",
    updated: "August 2025",
  },
  {
    slug: "delhi-jaipur-udaipur-ev-road-trip",
    category: "EV road trips",
    title: "Delhi to Jaipur to Udaipur by EV: planning your charging stops",
    description: "India's golden triangle is one of the most popular EV road-trip routes. Here's how to plan charging, where to stay, and what to expect.",
    readTime: "12 min read",
    updated: "July 2025",
  },
  {
    slug: "bengaluru-coorg-ev-road-trip",
    category: "EV road trips",
    title: "Bengaluru to Coorg by EV: the coffee country route",
    description: "A 270 km drive through Karnataka's coffee hills with verified EV charging at the destination. What to know before you go.",
    readTime: "10 min read",
    updated: "June 2025",
  },
  {
    slug: "public-vs-guest-only-charging",
    category: "Charging basics",
    title: "Public vs Guest Only hotel charging: what the difference means for you",
    description: "These two access types determine whether you can use a hotel's charger without staying there. Here's what each means and why it matters.",
    readTime: "5 min read",
    updated: "May 2025",
  },
  {
    slug: "best-ev-hotels-rajasthan",
    category: "Destination guides",
    title: "The best EV-friendly hotels in Rajasthan: Jaipur, Udaipur and Jodhpur",
    description: "Rajasthan has some of India's most spectacular heritage hotels — and more are getting verified EV chargers every month.",
    readTime: "9 min read",
    updated: "April 2025",
  },
];

const categories = ["All", "EV road trips", "Charging basics", "Hotel selection", "Destination guides", "Route planning"];

export default function GuidesPage() {
  const [category, setCategory] = useState("All");
  const visibleGuides = category === "All" ? guides : guides.filter(guide => guide.category === category);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        {/* Hero */}
        <section className="bg-white border-b border-neutral-200 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-[12px] font-semibold text-brand-700 uppercase tracking-[0.035em] mb-4">Travel guides</p>
            <h1 className="text-[40px] font-bold text-neutral-950 leading-[48px] tracking-tight mb-4">Know more. Drive further.</h1>
            <p className="text-[17px] text-neutral-600 leading-[28px] max-w-xl">
              Practical guides for EV road-trippers: how to verify chargers, plan routes, and find the right hotel for your car.
            </p>
          </div>
        </section>

        {/* Categories */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex gap-2 py-4 overflow-x-auto">
              {categories.filter(cat => cat === "All" || guides.some(guide => guide.category === cat)).map(cat => (
                <Button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                  className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                    category === cat ? "bg-brand-700 text-white" : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Guide grid */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {visibleGuides.map(guide => (
                <Link key={guide.slug} to={`/guides/${guide.slug}`} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-video bg-neutral-200 overflow-hidden">
                    <SafeImage
                      src={imageRegistry.guides[guide.slug]}
                      alt={guide.title}
                      fallback="guide"
                      className="h-full w-full"
                      imageClassName="transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-semibold text-brand-700 uppercase tracking-wider">{guide.category}</span>
                    <h2 className="text-[17px] font-semibold text-neutral-950 leading-[24px] mt-2 mb-2 line-clamp-2">{guide.title}</h2>
                    <p className="text-[13px] text-neutral-600 leading-[20px] line-clamp-3 mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between text-[12px] text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {guide.readTime}
                      </div>
                      <span>Updated {guide.updated}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
