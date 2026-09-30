import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heading } from "../components/ui";

export default function ListHotelSuccessPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="px-4 pb-16 pt-28">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-bg">
            <CheckCircle2 size={32} className="text-success-fill" />
          </div>
          <Heading level={1} className="text-3xl font-bold text-neutral-950">Application received</Heading>
          <p className="mt-3 text-base text-neutral-600">We will email the property contact after the charger details and two required photos have been reviewed.</p>
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 text-left">
            <Heading level={2} className="text-lg font-semibold text-neutral-950">What happens next</Heading>
            <ol className="mt-4 space-y-4">
              {[
                "We review the submitted property and charger details.",
                "Our team calls the property to confirm the charger.",
                "The listing is published only after verification succeeds.",
              ].map((item, index) => (
                <li key={item} className="flex gap-3 text-sm text-neutral-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <Link to="/" className="mt-8 inline-flex min-h-11 items-center rounded-xl bg-brand-700 px-6 text-sm font-semibold text-white hover:bg-brand-800">Back to home</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
