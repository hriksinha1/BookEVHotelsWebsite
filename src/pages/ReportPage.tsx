import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const topStates = [
  { rank: 1, state: "Karnataka", hotels: 68, publicPct: 85, avgPower: "22 kW" },
  { rank: 2, state: "Maharashtra", hotels: 54, publicPct: 78, avgPower: "22 kW" },
  { rank: 3, state: "Rajasthan", hotels: 48, publicPct: 71, avgPower: "11 kW" },
  { rank: 4, state: "Delhi (NCT)", hotels: 45, publicPct: 89, avgPower: "22 kW" },
  { rank: 5, state: "Tamil Nadu", hotels: 42, publicPct: 74, avgPower: "11 kW" },
  { rank: 6, state: "Telangana", hotels: 38, publicPct: 82, avgPower: "22 kW" },
  { rank: 7, state: "Kerala", hotels: 34, publicPct: 68, avgPower: "7.4 kW" },
  { rank: 8, state: "Goa", hotels: 31, publicPct: 77, avgPower: "22 kW" },
];

const topCities = [
  { rank: 1, city: "Bengaluru", state: "Karnataka", hotels: 42 },
  { rank: 2, city: "New Delhi", state: "Delhi", hotels: 38 },
  { rank: 3, city: "Hyderabad", state: "Telangana", hotels: 28 },
  { rank: 4, city: "Mumbai", state: "Maharashtra", hotels: 29 },
  { rank: 5, city: "Chennai", state: "Tamil Nadu", hotels: 22 },
  { rank: 6, city: "Gurugram", state: "Haryana", hotels: 22 },
  { rank: 7, city: "Jaipur", state: "Rajasthan", hotels: 24 },
  { rank: 8, city: "Pune", state: "Maharashtra", hotels: 18 },
];

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        {/* Header */}
        <section className="bg-white border-b border-neutral-200 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-[12px] font-semibold text-brand-700 uppercase tracking-[0.035em] mb-4">Industry data</p>
            <h1 className="text-[40px] font-bold text-neutral-950 leading-[48px] tracking-tight mb-4">
              EV-Friendly Hotels in India, by the numbers
            </h1>
            <p className="text-[16px] text-neutral-600 leading-[26px] max-w-2xl mb-4">
              A live overview of India's verified EV hotel landscape, based on our directory of phone-confirmed properties.
            </p>
            <p className="text-[13px] text-neutral-400">Last updated: September 2025 · Data from Book EV Hotels verified listings only</p>
          </div>
        </section>

        {/* KPI cards */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { label: "Verified hotels", value: "750+", sub: "Across India" },
                { label: "States & UTs", value: "30+", sub: "With verified listings" },
                { label: "Cities covered", value: "250+", sub: "Across India" },
                { label: "Public charging hotels", value: "600+", sub: "Available to non-guests" },
              ].map(kpi => (
                <div key={kpi.label} className="bg-white rounded-2xl border border-neutral-200 p-6">
                  <p className="text-[48px] font-bold text-neutral-950 leading-[52px] tabular-nums">{kpi.value}</p>
                  <p className="text-[14px] font-semibold text-neutral-800 mt-2">{kpi.label}</p>
                  <p className="text-[12px] text-neutral-500 mt-0.5">{kpi.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Access type split */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-[20px] font-bold text-neutral-950 mb-5">Access type split</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[14px] font-medium text-neutral-700">Public charging</span>
                      <span className="text-[14px] font-semibold text-neutral-950 tabular-nums">80% · 600+</span>
                    </div>
                    <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-700 rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[14px] font-medium text-neutral-700">Guest only</span>
                      <span className="text-[14px] font-semibold text-neutral-950 tabular-nums">20% · 150+</span>
                    </div>
                    <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-info-fill rounded-full" style={{ width: "20%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-[20px] font-bold text-neutral-950 mb-5">Star rating distribution</h2>
                <div className="space-y-4">
                  {[
                    { label: "5-star", pct: 45, color: "bg-brand-700" },
                    { label: "4-star", pct: 30, color: "bg-brand-500" },
                    { label: "3-star", pct: 25, color: "bg-brand-300" },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[14px] font-medium text-neutral-700">{s.label}</span>
                        <span className="text-[14px] font-semibold text-neutral-950 tabular-nums">~{s.pct}%</span>
                      </div>
                      <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                        <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top states table */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-[24px] font-bold text-neutral-950 mb-6">States ranked by verified hotels</h2>
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="text-left text-[12px] font-semibold text-neutral-500 uppercase tracking-wider px-5 py-3">#</th>
                      <th className="text-left text-[12px] font-semibold text-neutral-500 uppercase tracking-wider px-5 py-3">State</th>
                      <th className="text-right text-[12px] font-semibold text-neutral-500 uppercase tracking-wider px-5 py-3">Hotels</th>
                      <th className="text-right text-[12px] font-semibold text-neutral-500 uppercase tracking-wider px-5 py-3">Public %</th>
                      <th className="text-right text-[12px] font-semibold text-neutral-500 uppercase tracking-wider px-5 py-3">Avg power</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topStates.map((row, i) => (
                      <tr key={row.state} className={`border-b border-neutral-100 ${i % 2 === 0 ? "" : "bg-neutral-50/50"}`}>
                        <td className="px-5 py-3.5 text-[14px] text-neutral-500 tabular-nums">{row.rank}</td>
                        <td className="px-5 py-3.5 text-[15px] font-medium text-neutral-950">{row.state}</td>
                        <td className="px-5 py-3.5 text-[15px] font-semibold text-neutral-950 text-right tabular-nums">{row.hotels}</td>
                        <td className="px-5 py-3.5 text-[14px] text-neutral-700 text-right tabular-nums">{row.publicPct}%</td>
                        <td className="px-5 py-3.5 text-[14px] text-neutral-700 text-right">{row.avgPower}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Top cities */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-[24px] font-bold text-neutral-950 mb-6">Top cities by verified hotels</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {topCities.map(city => (
                <Link
                  key={city.city}
                  to={`/destinations/${city.state.toLowerCase().replace(/ /g, "-")}/${city.city.toLowerCase().replace(/ /g, "-")}`}
                  className="bg-white rounded-xl border border-neutral-200 p-4 hover:border-brand-700 hover:shadow-sm transition-all"
                >
                  <span className="text-[11px] font-semibold text-neutral-400 tabular-nums">#{city.rank}</span>
                  <p className="text-[17px] font-semibold text-neutral-950 mt-1">{city.city}</p>
                  <p className="text-[13px] text-neutral-500">{city.state}</p>
                  <p className="text-[20px] font-bold text-brand-700 tabular-nums mt-2">{city.hotels}</p>
                  <p className="text-[12px] text-neutral-500">verified hotels</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-neutral-100 rounded-2xl p-8 max-w-3xl">
              <h2 className="text-[22px] font-bold text-neutral-950 mb-5">Methodology</h2>
              <div className="space-y-4 text-[15px] text-neutral-700 leading-[26px]">
                <p>All figures are based on live, active listings on Book EV Hotels at time of reporting. Only verified properties are counted.</p>
                <p>Verification process: our team calls the property and confirms that a qualifying EV charger (minimum 7.4 kW AC) is installed and working. The property submits two charger photos for review. Unconfirmed or below-standard properties are not listed.</p>
                <p>Listings may change as new hotels are added or removed. "Not confirmed" fields are excluded from power averages. No external endorsement or government certification is implied.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="py-10 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-4">
            <Link to="/search" className="flex items-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-xl font-semibold text-[14px] hover:bg-brand-800 transition-colors">
              Browse verified hotels <ArrowRight size={15} />
            </Link>
            <Link to="/list-your-hotel" className="flex items-center gap-2 border border-brand-700 text-brand-700 px-6 py-3 rounded-xl font-semibold text-[14px] hover:bg-brand-50 transition-colors">
              List your hotel
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
