import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronRight, Upload, X, Phone, Camera, BadgeCheck, Zap } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SafeImage from "../components/SafeImage";

const steps = ["Property", "Charger", "Photos", "Billing", "Payment"];

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2 shrink-0">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold ${
            i + 1 < step ? "bg-brand-700 text-white" :
            i + 1 === step ? "bg-brand-700 text-white ring-4 ring-brand-100" :
            "bg-neutral-200 text-neutral-500"
          }`}>
            {i + 1 < step ? <CheckCircle2 size={14} /> : i + 1}
          </div>
          <span className={`text-[12px] font-medium ${i + 1 === step ? "text-neutral-950" : "text-neutral-400"}`}>{s}</span>
          {i < steps.length - 1 && <ChevronRight size={13} className="text-neutral-300" />}
        </div>
      ))}
    </div>
  );
}

export default function ListHotelPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [property, setProperty] = useState({ name: "", state: "", city: "", phone: "", agodaId: "" });
  const [charger, setCharger] = useState({ access: "Public", powerKw: "", connector: "Type 2", acDc: "AC" });
  const [photos, setPhotos] = useState<File[]>([]);
  const [billing, setBilling] = useState({ legalName: "", gst: "", address: "" });
  const [txRef, setTxRef] = useState("");

  const appRef = `BEVH-APP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
            <div className="w-16 h-16 bg-success-bg rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={32} className="text-success-fill" />
            </div>
            <h1 className="text-[28px] font-bold text-neutral-950 mb-3">Application received!</h1>
            <p className="text-[16px] text-neutral-600 mb-2">You're in the verification queue.</p>
            <p className="font-mono text-[13px] text-neutral-500 mb-8">Reference: {appRef}</p>
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 text-left mb-8 space-y-4">
              <h3 className="text-[16px] font-semibold text-neutral-950">What happens next</h3>
              {[
                "Our team will review your application within 5–7 business days.",
                "We will call the hotel to verify the charger is installed and working.",
                "If verification is successful, your listing goes live.",
                "If verification is unsuccessful, the full fee is refunded and we tell you what's needed.",
              ].map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 bg-brand-50 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold text-brand-700">{i + 1}</div>
                  <p className="text-[14px] text-neutral-700">{step}</p>
                </div>
              ))}
            </div>
            <p className="text-[14px] text-neutral-600 mb-6">
              Questions? Email <a href="mailto:support@bookevhotels.com" className="text-brand-700 font-semibold">support@bookevhotels.com</a>
            </p>
            <Link to="/" className="bg-brand-700 text-white px-6 py-3 rounded-xl font-semibold text-[14px] hover:bg-brand-800 transition-colors">
              Back to home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const fieldClass = "w-full px-4 py-3 border border-neutral-500 rounded-xl text-[15px] bg-white outline-none focus:border-brand-700 transition-colors";

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        {/* Hero */}
        <section className="bg-brand-950 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[12px] font-semibold text-brand-400 uppercase tracking-[0.035em] mb-4">For hotels</p>
                <h1 className="text-[36px] font-bold text-white leading-[44px] tracking-tight mb-5">
                  Get your hotel verified & listed on Book EV Hotels
                </h1>
                <p className="text-[17px] text-neutral-300 leading-[28px]">
                  Reach EV road-trippers looking for a place to stay and charge. One-time verification. Lifetime listing.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: BadgeCheck, label: "Verified badge", desc: "Your charger is confirmed before listing" },
                  { icon: Zap, label: "EV travellers", desc: "Reach guests actively planning EV trips" },
                  { icon: CheckCircle2, label: "Lifetime listing", desc: "One-time fee, permanent directory presence" },
                  { icon: Phone, label: "Your details shown", desc: "Charger specs featured before amenities" },
                ].map(item => (
                  <div key={item.label} className="bg-brand-900 rounded-xl p-4">
                    <item.icon size={20} className="text-brand-400 mb-2" />
                    <p className="text-[14px] font-semibold text-white">{item.label}</p>
                    <p className="text-[12px] text-neutral-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Criteria */}
        <section className="bg-white border-b border-neutral-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-brand-700" />
                <span className="text-[14px] text-neutral-700">Minimum charger: 7.4 kW AC</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-brand-700" />
                <span className="text-[14px] text-neutral-700">Two charger photos required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-brand-700" />
                <span className="text-[14px] text-neutral-700">Verification call with our team</span>
              </div>
              <div className="flex items-center gap-2">
                <X size={15} className="text-neutral-400" />
                <span className="text-[14px] text-neutral-500">Domestic 15A/16A socket does not qualify</span>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-2xl border border-neutral-200 p-8">
              <StepIndicator step={step} />

              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-[22px] font-bold text-neutral-950 mb-6">Property details</h2>
                  <div>
                    <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Hotel name *</label>
                    <input value={property.name} onChange={e => setProperty(p => ({ ...p, name: e.target.value }))} placeholder="The Grand Hotel" className={fieldClass} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">State *</label>
                      <input value={property.state} onChange={e => setProperty(p => ({ ...p, state: e.target.value }))} placeholder="Karnataka" className={fieldClass} />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">City *</label>
                      <input value={property.city} onChange={e => setProperty(p => ({ ...p, city: e.target.value }))} placeholder="Bengaluru" className={fieldClass} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Reception phone *</label>
                    <input value={property.phone} onChange={e => setProperty(p => ({ ...p, phone: e.target.value }))} placeholder="+91 98765 43210" className={fieldClass} type="tel" />
                    <p className="text-[12px] text-neutral-500 mt-1">Our team will call this number to verify your charger.</p>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Agoda hotel ID <span className="font-normal text-neutral-500">(optional)</span></label>
                    <input value={property.agodaId} onChange={e => setProperty(p => ({ ...p, agodaId: e.target.value }))} placeholder="12345678" className={fieldClass} />
                  </div>
                  <button onClick={() => property.name && property.state && property.city && property.phone ? setStep(2) : null} className="w-full bg-brand-700 hover:bg-brand-800 text-white py-3.5 rounded-xl text-[15px] font-semibold transition-colors">
                    Continue
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-[22px] font-bold text-neutral-950 mb-2">Charger details</h2>
                  <div className="bg-brand-50 rounded-xl p-4 mb-5">
                    <p className="text-[13px] font-semibold text-brand-800 mb-1">Minimum standard</p>
                    <p className="text-[13px] text-brand-700">We require at least one charger rated at 7.4 kW AC or above. Hotels with only a domestic 15A/16A socket do not qualify.</p>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Charger access *</label>
                    <div className="flex gap-3">
                      {["Public", "Guest Only"].map(a => (
                        <label key={a} className={`flex-1 flex items-center gap-2 p-3.5 rounded-xl border-2 cursor-pointer ${charger.access === a ? "border-brand-700 bg-brand-50" : "border-neutral-200"}`}>
                          <input type="radio" name="access" value={a} checked={charger.access === a} onChange={() => setCharger(c => ({ ...c, access: a })) } className="accent-brand-700" />
                          <span className="text-[14px] font-medium text-neutral-900">{a}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-[12px] text-neutral-500 mt-1">Public = available to non-guests. Guest Only = reserved for hotel guests.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Output (kW) *</label>
                      <input value={charger.powerKw} onChange={e => setCharger(c => ({ ...c, powerKw: e.target.value }))} placeholder="7.4" type="number" className={fieldClass} />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">AC / DC *</label>
                      <select value={charger.acDc} onChange={e => setCharger(c => ({ ...c, acDc: e.target.value }))} className={fieldClass}>
                        <option>AC</option>
                        <option>DC</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Connector type *</label>
                    <select value={charger.connector} onChange={e => setCharger(c => ({ ...c, connector: e.target.value }))} className={fieldClass}>
                      <option>Type 2</option>
                      <option>CCS2</option>
                      <option>CHAdeMO</option>
                      <option>Bharat AC-001</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 border border-neutral-300 text-neutral-700 py-3 rounded-xl text-[14px] font-semibold hover:bg-neutral-100 transition-colors">Back</button>
                    <button onClick={() => charger.powerKw ? setStep(3) : null} className="flex-1 bg-brand-700 hover:bg-brand-800 text-white py-3 rounded-xl text-[14px] font-semibold transition-colors">Continue</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-[22px] font-bold text-neutral-950 mb-2">Charger photos</h2>
                  <p className="text-[14px] text-neutral-600 mb-5">Upload exactly two photos of your charger setup. JPG or PNG, max 5 MB each.</p>
                  <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-brand-400 transition-colors">
                    <Camera size={28} className="text-neutral-400 mx-auto mb-3" />
                    <p className="text-[14px] font-medium text-neutral-700 mb-2">Drag photos here or click to upload</p>
                    <p className="text-[12px] text-neutral-500 mb-4">2 photos required · JPG or PNG · Max 5 MB each</p>
                    <label className="cursor-pointer bg-brand-700 text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-brand-800 transition-colors">
                      Choose photos
                      <input type="file" accept="image/*" multiple className="hidden" onChange={e => setPhotos(Array.from(e.target.files || []).slice(0, 2))} />
                    </label>
                  </div>
                  {photos.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {photos.map((f, i) => (
                        <div key={i} className="relative bg-neutral-100 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                          <SafeImage src={URL.createObjectURL(f)} alt={`Charger upload ${i + 1}`} fallback="editorial" className="h-full w-full" />
                          <button onClick={() => setPhotos(photos.filter((_, j) => j !== i))} className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex-1 border border-neutral-300 text-neutral-700 py-3 rounded-xl text-[14px] font-semibold hover:bg-neutral-100 transition-colors">Back</button>
                    <button onClick={() => setStep(4)} className="flex-1 bg-brand-700 hover:bg-brand-800 text-white py-3 rounded-xl text-[14px] font-semibold transition-colors">
                      Continue {photos.length < 2 && <span className="opacity-70 text-[12px]">(skip for now)</span>}
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="text-[22px] font-bold text-neutral-950 mb-2">Billing details <span className="text-[16px] font-normal text-neutral-500">(optional)</span></h2>
                  <p className="text-[14px] text-neutral-600 mb-5">Required only if you need a GST invoice. Skip if not needed.</p>
                  <div>
                    <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Legal entity name</label>
                    <input value={billing.legalName} onChange={e => setBilling(b => ({ ...b, legalName: e.target.value }))} placeholder="Hotel Pvt. Ltd." className={fieldClass} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">GST number</label>
                    <input value={billing.gst} onChange={e => setBilling(b => ({ ...b, gst: e.target.value }))} placeholder="22AAAAA0000A1Z5" className={fieldClass} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Registered address</label>
                    <textarea value={billing.address} onChange={e => setBilling(b => ({ ...b, address: e.target.value }))} placeholder="1234, MG Road, Bengaluru, Karnataka 560001" rows={3} className={`${fieldClass} resize-none`} />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(3)} className="flex-1 border border-neutral-300 text-neutral-700 py-3 rounded-xl text-[14px] font-semibold hover:bg-neutral-100 transition-colors">Back</button>
                    <button onClick={() => setStep(5)} className="flex-1 bg-brand-700 hover:bg-brand-800 text-white py-3 rounded-xl text-[14px] font-semibold transition-colors">Continue to payment</button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-5">
                  <h2 className="text-[22px] font-bold text-neutral-950 mb-2">Payment</h2>
                  <div className="bg-brand-50 border border-brand-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[15px] font-semibold text-neutral-950">Verification & Listing fee</p>
                      <p className="text-[20px] font-bold text-brand-700 tabular-nums">₹5,900</p>
                    </div>
                    <p className="text-[13px] text-neutral-600">₹5,000 + 18% GST · One-time fee · Lifetime listing</p>
                  </div>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5">
                    <p className="text-[14px] font-semibold text-neutral-800 mb-3">Payment via UPI or bank transfer</p>
                    <p className="text-[13px] text-neutral-600 mb-3">Complete the payment using UPI or bank transfer and enter your transaction reference below. Our team will confirm receipt and begin verification.</p>
                    <div className="bg-neutral-200 rounded-lg p-4 text-center mb-4">
                      <p className="text-[13px] text-neutral-600">UPI / bank details provided via email after submission</p>
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Transaction reference *</label>
                      <input value={txRef} onChange={e => setTxRef(e.target.value)} placeholder="UPI or bank transfer reference number" className={fieldClass} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(4)} className="flex-1 border border-neutral-300 text-neutral-700 py-3 rounded-xl text-[14px] font-semibold hover:bg-neutral-100 transition-colors">Back</button>
                    <button onClick={() => txRef ? setSubmitted(true) : null} className="flex-1 bg-brand-700 hover:bg-brand-800 text-white py-3 rounded-xl text-[14px] font-semibold transition-colors">Submit application</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
