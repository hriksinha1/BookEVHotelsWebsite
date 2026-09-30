import { Link } from "react-router-dom";
import { ArrowRight, Database, Info } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heading } from "../components/ui";
import { hotels } from "../data/hotels";

export default function ReportPage() {
  const stateRows = Array.from(new Set(hotels.map(hotel => hotel.state)))
    .map(state => {
      const stateHotels = hotels.filter(hotel => hotel.state === state);
      return {
        state,
        hotels: stateHotels.length,
        publicHotels: stateHotels.filter(hotel => hotel.chargers.some(charger => charger.access === "Public")).length,
        confirmedPowers: stateHotels.flatMap(hotel => hotel.chargers.map(charger => charger.powerKw).filter((power): power is number => power !== null)),
      };
    })
    .sort((first, second) => second.hotels - first.hotels);
  const chargers = hotels.flatMap(hotel => hotel.chargers);
  const publicHotels = hotels.filter(hotel => hotel.chargers.some(charger => charger.access === "Public")).length;
  const knownPower = chargers.filter(charger => charger.powerKw !== null).length;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="pt-16">
        <section className="border-b border-neutral-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">Current directory snapshot</p>
            <Heading level={1} className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
              What the current EV hotel listings show
            </Heading>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600">
              A transparent view of the small mock dataset used in this frontend. These figures describe the records shown on this site, not India’s hotel market.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: hotels.length, label: "Hotel records" },
                { value: new Set(hotels.map(hotel => hotel.city)).size, label: "Cities represented" },
                { value: publicHotels, label: "Hotels with public access" },
                { value: `${knownPower}/${chargers.length}`, label: "Chargers with confirmed power" },
              ].map(item => (
                <div key={item.label} className="rounded-2xl border border-neutral-200 bg-white p-6">
                  <p className="text-4xl font-bold text-neutral-950">{item.value}</p>
                  <p className="mt-2 text-sm text-neutral-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Heading level={2} className="mb-6 text-2xl font-bold text-neutral-950">Listings by state</Heading>
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-neutral-200 bg-neutral-100">
                      <tr>
                        {["State", "Hotels", "Public access", "Highest confirmed power"].map(label => (
                          <th key={label} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600">{label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stateRows.map(row => (
                        <tr key={row.state} className="border-b border-neutral-100 last:border-0">
                          <td className="px-5 py-4 text-sm font-semibold text-neutral-950">{row.state}</td>
                          <td className="px-5 py-4 text-sm text-neutral-700">{row.hotels}</td>
                          <td className="px-5 py-4 text-sm text-neutral-700">{row.publicHotels}</td>
                          <td className="px-5 py-4 text-sm text-neutral-700">
                            {row.confirmedPowers.length ? `${Math.max(...row.confirmedPowers)} kW` : "Not confirmed"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <aside className="lg:col-span-4">
              <div className="rounded-2xl bg-neutral-950 p-6 text-white">
                <Database size={22} className="text-brand-300" />
                <Heading level={2} className="mt-4 text-xl font-semibold">Methodology</Heading>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-300">
                  <p>Every figure is calculated directly from the hotel records bundled with this application.</p>
                  <p>A hotel can have more than one charger. Unknown power, fee or app requirements remain unknown and are not inferred.</p>
                  <p>Verification means confirmed with the property by phone after charger details and two photos were submitted. It is not live uptime data.</p>
                </div>
                <div className="mt-6 flex items-start gap-2 border-t border-neutral-800 pt-5 text-xs text-neutral-400">
                  <Info size={14} className="mt-0.5 shrink-0" />
                  This snapshot is illustrative and should not be treated as national research.
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white py-12">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 sm:flex-row sm:items-center sm:px-6">
            <div>
              <Heading level={2} className="text-2xl font-bold text-neutral-950">See the records behind the snapshot</Heading>
              <p className="mt-2 text-sm text-neutral-600">Compare each hotel’s charger access, power, connector and fee.</p>
            </div>
            <Link to="/search" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-700 px-6 text-sm font-semibold text-white hover:bg-brand-800">
              Browse verified stays <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
