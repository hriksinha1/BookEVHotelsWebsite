import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const faqs = {
  "About": [
    { q: "How are hotels verified?", a: "Our team calls the hotel directly and confirms that a qualifying EV charger is installed and working. The hotel then submits exactly two photos of the charger for our review. Only properties that pass this process are listed." },
    { q: "What does 'Verified EV Charger' mean?", a: "It means we spoke to someone at the hotel and they confirmed a working EV charger is available. It does not guarantee the charger will be available on your specific travel day — we recommend calling ahead if charging is critical." },
    { q: "What is the minimum charger standard?", a: "We require at least one charger rated at 7.4 kW AC or higher. A standard domestic 15A/16A socket does not qualify — it charges too slowly and isn't designed for vehicle use." },
    { q: "What does 'Public' mean?", a: "Public means the charger is available to non-guests as well as hotel guests. Public does not automatically mean free — the fee is shown separately as Free, Paid, or Not confirmed." },
    { q: "What does 'Guest Only' mean?", a: "Guest Only means the charger is reserved exclusively for hotel guests. If you are not staying at the hotel, you will not be able to use the charger." },
  ],
  "Charging": [
    { q: "What connector types are listed?", a: "We record Type 2 (AC) and CCS2 (DC) connectors, which are the most common types for passenger EVs in India today. Where the connector type hasn't been confirmed by the hotel, we say 'Connector not confirmed'." },
    { q: "What does 7.4 kW mean for me?", a: "A 7.4 kW AC charger is a standard overnight charger. Most popular EVs in India (Tata Nexon EV, MG ZS EV, Hyundai IONIQ 5) will charge from near-empty to near-full overnight using a 7.4 kW charger." },
    { q: "A hotel shows 22 kW AC — will I charge at 22 kW?", a: "Not necessarily. Your EV's onboard charger limits how fast it can accept AC power. A car with an 11 kW onboard charger will charge at 11 kW at a 22 kW point, not 22 kW." },
    { q: "What is DC fast charging?", a: "DC (direct current) fast chargers bypass the EV's onboard charger and deliver power directly to the battery. They are significantly faster than AC chargers — typically adding 80–150+ km of range per hour." },
    { q: "Do I need an app to use the charger?", a: "We record app requirements where the hotel has confirmed them. Where it's unknown, we say 'App requirement not confirmed'. Check the hotel detail page for the most recent information." },
    { q: "Is EV charging always free at hotels?", a: "No. Some hotels offer free charging as a guest amenity; others charge a fee. We record this as Free, Paid, or Not confirmed. Check the hotel page before assuming free access." },
  ],
  "Booking": [
    { q: "How do bookings work?", a: "Many hotels on Book EV Hotels support direct booking with date and room selection. Some properties are linked to our partner Agoda — for those, you'll complete the booking on Agoda's platform." },
    { q: "Can I choose my dates?", a: "Yes. Enter your check-in and check-out dates on the search page or hotel page. Availability and pricing will reflect your selected dates." },
    { q: "Can I cancel my booking?", a: "Cancellation policies vary by room and hotel. Each room listing shows whether Free cancellation is available. Read the policy before booking." },
    { q: "What if the charger is unavailable when I arrive?", a: "Verified means confirmed with the property — not a real-time uptime guarantee. Chargers can occasionally be out of service. We recommend calling the hotel on your travel day to confirm charger availability, especially for critical charging needs." },
  ],
  "Hotels": [
    { q: "How do I list my hotel?", a: "Visit the 'List Your Hotel' page and complete the 5-step application: property details, charger details, two charger photos, optional billing information, and payment reference. Our team will review and call to verify." },
    { q: "What does verification cost?", a: "₹5,000 + 18% GST = ₹5,900 inclusive of GST. This is a one-time fee for verification and a permanent listing on Book EV Hotels." },
    { q: "How long does verification take?", a: "We aim to review applications within 5–7 business days. This includes the verification call with the hotel." },
    { q: "What if verification fails?", a: "If we cannot verify your charger (for example, no working charger found on the verification call, or the charger does not meet our minimum standard), the full fee is refunded and we tell you exactly what needs to change to qualify." },
  ],
};

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

  const filtered: typeof faqs = search
    ? (Object.entries(faqs).reduce((acc, [cat, items]) => {
        const matched = items.filter(faq =>
          faq.q.toLowerCase().includes(search.toLowerCase()) ||
          faq.a.toLowerCase().includes(search.toLowerCase())
        );
        if (matched.length) (acc as Record<string, typeof items>)[cat] = matched;
        return acc;
      }, {} as typeof faqs))
    : faqs;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        {/* Hero */}
        <section className="bg-white border-b border-neutral-200 py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-[40px] font-bold text-neutral-950 leading-[48px] tracking-tight mb-5">Frequently asked questions</h1>
            <p className="text-[17px] text-neutral-600 leading-[28px] mb-8">Everything about EV hotel verification, charger details, booking and listing your hotel.</p>
            <div className="relative max-w-md mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-3 border border-neutral-500 rounded-xl text-[15px] bg-white outline-none focus:border-brand-700 transition-colors"
              />
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {Object.entries(filtered).map(([category, items]) => (
              <div key={category} className="mb-12">
                <h2 className="text-[24px] font-bold text-neutral-950 mb-5">{category}</h2>
                <div className="space-y-3">
                  {items.map(faq => {
                    const key = `${category}-${faq.q}`;
                    const isOpen = openItems[key];
                    return (
                      <div key={faq.q} className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                        >
                          <span className="text-[16px] font-semibold text-neutral-950 leading-[24px]">{faq.q}</span>
                          <ChevronRight size={16} className={`text-neutral-400 shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-[15px] text-neutral-700 leading-[26px] border-t border-neutral-100 pt-4">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {Object.keys(filtered).length === 0 && (
              <div className="text-center py-16">
                <p className="text-[18px] font-semibold text-neutral-950 mb-3">No questions found</p>
                <p className="text-[15px] text-neutral-600">Try a different search term, or <a href="mailto:hello@bookevhotels.com" className="text-brand-700 font-semibold">email us your question</a>.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
