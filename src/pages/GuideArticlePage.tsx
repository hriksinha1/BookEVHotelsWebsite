import { Link } from "react-router-dom";
import { ChevronRight, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SafeImage from "../components/SafeImage";
import { imageRegistry } from "../data/images";

export default function GuideArticlePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-[13px]">
            <Link to="/" className="text-brand-700 hover:text-brand-800 font-medium">Home</Link>
            <ChevronRight size={13} className="text-neutral-400" />
            <Link to="/guides" className="text-brand-700 hover:text-brand-800 font-medium">Travel Guides</Link>
            <ChevronRight size={13} className="text-neutral-400" />
            <span className="text-neutral-600 truncate">What to check before booking</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Article */}
            <article className="lg:col-span-3">
              <div className="mb-8">
                <span className="text-[12px] font-semibold text-brand-700 uppercase tracking-wider">Hotel selection</span>
                <h1 className="text-[44px] font-bold text-neutral-950 leading-[52px] tracking-tight mt-3 mb-5">
                  What to check before booking a hotel with EV charging in India
                </h1>
                <div className="flex items-center gap-5 text-[14px] text-neutral-500 mb-8">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    8 min read
                  </div>
                  <span>By Book EV Hotels team</span>
                  <span>Updated September 2025</span>
                </div>
                <div className="aspect-[16/7] bg-neutral-200 rounded-2xl overflow-hidden">
                  <SafeImage
                    src={imageRegistry.hero}
                    alt="Person connecting an EV charger at a hotel"
                    fallback="guide"
                    className="h-full w-full"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>

              {/* Intro */}
              <p className="text-[20px] text-neutral-700 leading-[32px] mb-8">
                An "EV charging available" checkbox on a booking portal tells you almost nothing useful. It doesn't tell you what connector, what power level, whether it's free, or whether a non-guest can even use it. Here's exactly what to check.
              </p>

              {/* Key takeaways */}
              <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 mb-10">
                <h2 className="text-[18px] font-semibold text-brand-800 mb-4">Key takeaways</h2>
                <ul className="space-y-3">
                  {[
                    "Check the connector type — Type 2 for AC, CCS2 for DC. Not all cars support all connectors.",
                    "Check the power output — 7.4 kW AC is sufficient for most overnight stays.",
                    "Check whether it's Public or Guest Only — this affects whether you can access it.",
                    "Check whether charging is free or paid.",
                    "Confirm on the travel day — verified chargers can occasionally be out of service.",
                  ].map(item => (
                    <li key={item} className="flex gap-3 text-[14px] text-brand-800 leading-[22px]">
                      <CheckCircle2 size={15} className="text-brand-700 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <h2 id="verification" className="scroll-mt-24 text-[28px] font-bold text-neutral-950 leading-[36px] mb-5">1. A checkbox isn't verification</h2>
              <p className="text-[17px] text-neutral-700 leading-[30px] mb-6">
                Mainstream hotel booking platforms let any hotel tick "EV charging available" as an amenity — no confirmation required. The checkbox might mean a single 15A socket in the basement car park, a charger that hasn't worked in months, or an actual 22 kW AC charger in a dedicated bay. The checkbox doesn't tell you.
              </p>
              <p className="text-[17px] text-neutral-700 leading-[30px] mb-10">
                Book EV Hotels only lists hotels where we've confirmed a working EV charger by phone. But even when reading any listing — ours or elsewhere — here's what to actually check.
              </p>

              <h2 id="connector" className="scroll-mt-24 text-[28px] font-bold text-neutral-950 leading-[36px] mb-5">2. Connector type</h2>
              <p className="text-[17px] text-neutral-700 leading-[30px] mb-6">
                In India today, the two main connector types for passenger EVs are:
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  { type: "Type 2 (AC)", desc: "The standard AC connector. Compatible with most passenger EVs sold in India including Tata Nexon EV, MG ZS EV, Hyundai IONIQ 5, Kia EV6, and others." },
                  { type: "CCS2 (DC)", desc: "The standard DC fast-charging connector. Used for fast charging. Compatible with most DC-capable EVs." },
                ].map(c => (
                  <li key={c.type} className="bg-white border border-neutral-200 rounded-xl p-5">
                    <p className="text-[16px] font-semibold text-neutral-950 mb-1">{c.type}</p>
                    <p className="text-[15px] text-neutral-600 leading-[24px]">{c.desc}</p>
                  </li>
                ))}
              </ul>

              <h2 id="power" className="scroll-mt-24 text-[28px] font-bold text-neutral-950 leading-[36px] mb-5">3. Charger power (kW)</h2>
              <p className="text-[17px] text-neutral-700 leading-[30px] mb-6">
                The power rating tells you how fast the charger can supply electricity — not necessarily how fast your car will charge.
              </p>
              <div className="space-y-4 mb-6">
                {[
                  { kw: "7.4 kW AC", label: "Standard overnight", detail: "Suitable for most EVs for a full overnight charge. A Tata Nexon EV charges from 20% to 100% in about 8 hours at 7.4 kW." },
                  { kw: "22 kW AC", label: "Faster AC (limited by your car)", detail: "A 22 kW point cannot always charge at 22 kW. Your car's onboard charger limits AC speed — a vehicle with an 11 kW onboard charger will accept 11 kW at a 22 kW point, not 22 kW." },
                  { kw: "50+ kW DC", label: "DC fast charging", detail: "Bypasses the onboard charger and charges the battery directly. Significantly faster. Most DC chargers add 100–200 km of range per hour." },
                ].map(c => (
                  <div key={c.kw} className="bg-neutral-50 border border-neutral-200 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[18px] font-bold text-neutral-950 tabular-nums">{c.kw}</span>
                      <span className="text-[13px] font-semibold text-brand-700">{c.label}</span>
                    </div>
                    <p className="text-[15px] text-neutral-600 leading-[24px]">{c.detail}</p>
                  </div>
                ))}
              </div>

              <h2 id="access" className="scroll-mt-24 text-[28px] font-bold text-neutral-950 leading-[36px] mb-5 mt-10">4. Public or Guest Only</h2>
              <p className="text-[17px] text-neutral-700 leading-[30px] mb-8">
                This is critical. Public chargers are available to non-guests as well as hotel guests. Guest Only chargers are reserved for staying guests — you cannot use them without a room booking. Know which type you're booking around.
              </p>

              <h2 id="confirm" className="scroll-mt-24 text-[28px] font-bold text-neutral-950 leading-[36px] mb-5">5. Confirm on the day</h2>
              <p className="text-[17px] text-neutral-700 leading-[30px] mb-8">
                Even a verified listing is a point-in-time confirmation, not a real-time guarantee. Chargers can occasionally be out of service — equipment failures happen. If charging is critical to your journey, call the hotel on your travel day to confirm the charger is available and working.
              </p>

              {/* CTA */}
              <div className="bg-brand-700 rounded-2xl p-8 text-center mt-12">
                <h3 className="text-[22px] font-bold text-white mb-3">Find a hotel where you know you can charge</h3>
                <p className="text-[15px] text-brand-100 mb-6">Browse verified EV hotels across India — every listing confirmed by phone before it goes live.</p>
                <Link to="/search" className="inline-flex items-center gap-2 bg-white text-brand-700 px-6 py-3 rounded-xl font-semibold text-[14px] hover:bg-brand-50 transition-colors">
                  Search EV hotels <ArrowRight size={15} />
                </Link>
              </div>
            </article>

            {/* Sidebar TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl border border-neutral-200 p-5">
                  <h3 className="text-[13px] font-semibold text-neutral-500 uppercase tracking-wider mb-4">In this guide</h3>
                  <ul className="space-y-2">
                    {[
                      { label: "1. A checkbox isn't verification", href: "#verification" },
                      { label: "2. Connector type", href: "#connector" },
                      { label: "3. Charger power (kW)", href: "#power" },
                      { label: "4. Public or Guest Only", href: "#access" },
                      { label: "5. Confirm on the day", href: "#confirm" },
                    ].map(item => (
                      <li key={item.href}>
                        <a href={item.href} className="text-[13px] text-neutral-600 hover:text-brand-700 leading-[20px] transition-colors">{item.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
