import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heading } from "../components/ui";
import GuideArticlePage from "./GuideArticlePage";
import SafeImage from "../components/SafeImage";
import { imageRegistry } from "../data/images";

const articles: Record<string, { category: string; title: string; intro: string; points: string[]; destination?: string }> = {
  "understanding-ev-charger-speeds": {
    category: "Charging basics",
    title: "Understanding EV charger speeds: 7.4 kW, 22 kW and DC fast charging",
    intro: "The charger rating is only one part of charge speed. Your vehicle, battery temperature and state of charge also affect the power it can accept.",
    points: [
      "7.4 kW AC is a practical baseline for an overnight hotel stay.",
      "A 22 kW AC charger may supply less if the car's onboard charger has a lower limit.",
      "DC charging bypasses the onboard AC charger, but charging speed still tapers as the battery fills.",
    ],
  },
  "delhi-jaipur-udaipur-ev-road-trip": {
    category: "EV road trips",
    title: "Delhi to Jaipur to Udaipur by EV",
    intro: "Plan this route around dependable charging alternatives rather than a single stop. Recheck charger access and operating conditions before each leg.",
    points: [
      "Start each intercity leg with enough reserve for a backup charging stop.",
      "Public hotel chargers may be used without a stay; Guest Only chargers require a booking.",
      "Confirm overnight charger availability directly with the hotel on arrival day.",
    ],
    destination: "Rajasthan",
  },
  "bengaluru-coorg-ev-road-trip": {
    category: "EV road trips",
    title: "Bengaluru to Coorg by EV",
    intro: "The climb into coffee country makes arrival range more important than the same distance on flatter roads. Choose a stay where overnight charging details are clear.",
    points: [
      "Allow additional energy margin for elevation, traffic and air-conditioning.",
      "Check whether your charging cable and the listed connector are compatible.",
      "Ask the property where the charging bay is and whether it can be reserved.",
    ],
    destination: "Karnataka",
  },
  "public-vs-guest-only-charging": {
    category: "Charging basics",
    title: "Public vs Guest Only hotel charging",
    intro: "Access type tells you whether a charger can support a route stop or only an overnight stay. It should be checked before power and price.",
    points: [
      "Public means non-guests may use the charger, subject to property rules.",
      "Guest Only means a room booking is required before charging.",
      "Neither access type guarantees that a bay will be available when you arrive.",
    ],
  },
  "best-ev-hotels-rajasthan": {
    category: "Destination guides",
    title: "Choosing an EV-friendly hotel in Rajasthan",
    intro: "Compare the charging setup before comparing hotel amenities. Power, access and connector details determine whether a stay fits the journey.",
    points: [
      "Use Public charging when the hotel is also a route stop.",
      "Use Guest Only charging for planned overnight top-ups.",
      "Keep a nearby public charger as a backup when charging is essential.",
    ],
    destination: "Rajasthan",
  },
};

export default function GuideArticleRouterPage() {
  const { slug = "" } = useParams();
  if (slug === "what-to-check-before-booking-ev-hotel") return <GuideArticlePage />;
  const article = articles[slug];
  if (!article) return <Navigate to="/guides" replace />;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="pt-16">
        <div className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-4xl items-center gap-2 px-4 py-3 text-sm sm:px-6">
            <Link to="/guides" className="font-medium text-brand-700">Travel guides</Link>
            <ChevronRight size={14} className="text-neutral-400" />
            <span className="truncate text-neutral-600">{article.title}</span>
          </div>
        </div>
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{article.category}</p>
          <Heading level={1} className="mt-3 text-4xl font-bold leading-tight tracking-tight text-neutral-950">{article.title}</Heading>
          <p className="mt-6 text-lg leading-relaxed text-neutral-700">{article.intro}</p>
          <SafeImage
            src={imageRegistry.guides[slug]}
            alt={`${article.title} guide`}
            fallback="guide"
            className="mt-8 aspect-video w-full rounded-2xl"
            loading="eager"
            fetchPriority="high"
          />
          <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <Heading level={2} className="text-lg font-semibold text-brand-800">What matters</Heading>
            <ul className="mt-4 space-y-3">
              {article.points.map(point => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-brand-800">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-brand-700" size={16} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to={article.destination ? `/search?destination=${encodeURIComponent(article.destination)}` : "/search"} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-800">
              Search verified stays <ArrowRight size={15} />
            </Link>
            <Link to="/guides" className="inline-flex min-h-11 items-center rounded-xl border border-neutral-300 px-5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100">All guides</Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
