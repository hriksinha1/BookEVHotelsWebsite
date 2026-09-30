import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Phone, Camera, BadgeCheck } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        {/* Hero */}
        <section className="relative h-80 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=1400&h=500&fit=crop&auto=format"
            alt="EV travellers arriving at a hotel with an EV charger"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-950/60" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h1 className="text-[40px] font-bold text-white leading-[48px] tracking-tight mb-3">
                We make electric road trips<br />across India easier to plan.
              </h1>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <p className="text-[12px] font-semibold text-brand-700 uppercase tracking-[0.035em] mb-4">Our mission</p>
              <h2 className="text-[28px] font-bold text-neutral-950 leading-[36px] tracking-tight mb-5">
                End range anxiety for EV travellers by making charging-aware hotel discovery simple and trustworthy.
              </h2>
              <p className="text-[16px] text-neutral-700 leading-[26px]">
                EV adoption in India is accelerating. But finding a hotel where you can actually charge your car — and knowing exactly what charger you'll find when you arrive — has always been harder than it should be. We built Book EV Hotels to fix that.
              </p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-brand-700 uppercase tracking-[0.035em] mb-4">The problem we solve</p>
              <p className="text-[16px] text-neutral-700 leading-[26px] mb-4">
                Generic hotel booking platforms let any property claim "EV charging available" by ticking a checkbox. There's no verification, no charger specifications, no clarity on whether it's available to non-guests.
              </p>
              <p className="text-[16px] text-neutral-700 leading-[26px]">
                Book EV Hotels only lists hotels where we've confirmed a working charger by phone. We record the type, power, connector, access, and fee — so you know before you book, and you can travel without range anxiety.
              </p>
            </div>
          </div>

          {/* Three pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Phone,
                title: "Real verification",
                desc: "We call every hotel before listing. A human speaks to the property, confirms the charger is working, and reviews the photos they submit. No checkbox, no assumption.",
              },
              {
                icon: BadgeCheck,
                title: "Clear charging information",
                desc: "Connector type, output in kW, AC or DC, access type, fee status. If we don't know something, we say so — never shown as zero or assumed.",
              },
              {
                icon: CheckCircle2,
                title: "Simple booking",
                desc: "Find your hotel, check the charger details, pick your room and dates, and book. The EV information is front and centre — not buried in a generic amenities list.",
              },
            ].map(pillar => (
              <div key={pillar.title} className="bg-white rounded-2xl border border-neutral-200 p-6">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                  <pillar.icon size={22} className="text-brand-700" />
                </div>
                <h3 className="text-[18px] font-semibold text-neutral-950 mb-3">{pillar.title}</h3>
                <p className="text-[14px] text-neutral-600 leading-[22px]">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* What we record */}
          <div className="mb-20">
            <h2 className="text-[28px] font-bold text-neutral-950 mb-6">What we record for each charger</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Charger access (Public or Guest Only)",
                "AC or DC power type",
                "Output in kilowatts (kW)",
                "Connector type (Type 2, CCS2)",
                "Number of chargers / guns",
                "Charging fee (Free, Paid, or Not confirmed)",
                "App requirement",
                "Charger location notes",
                "Verification date",
                "Two charger photos",
                "GPS coordinates",
                "Reception phone number",
              ].map(item => (
                <div key={item} className="flex items-center gap-2 bg-white rounded-xl border border-neutral-200 px-4 py-3">
                  <CheckCircle2 size={14} className="text-brand-700 shrink-0" />
                  <span className="text-[14px] text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-brand-700 rounded-2xl p-8 text-white">
              <h3 className="text-[22px] font-bold mb-3">Find a verified stay</h3>
              <p className="text-[15px] text-brand-100 mb-6 leading-[24px]">Browse the current verified listings, with charger access and specifications shown before you choose a room.</p>
              <Link to="/search" className="inline-flex items-center gap-2 bg-white text-brand-700 px-5 py-3 rounded-xl text-[14px] font-semibold hover:bg-brand-50 transition-colors">
                Explore hotels <ArrowRight size={15} />
              </Link>
            </div>
            <div className="bg-neutral-950 rounded-2xl p-8 text-white">
              <h3 className="text-[22px] font-bold mb-3">List your hotel</h3>
              <p className="text-[15px] text-neutral-300 mb-6 leading-[24px]">Get your hotel verified and listed. Reach EV travellers across India planning their next road trip.</p>
              <Link to="/list-your-hotel" className="inline-flex items-center gap-2 bg-brand-400 text-neutral-950 px-5 py-3 rounded-xl text-[14px] font-semibold hover:bg-brand-300 transition-colors">
                Start verification <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
