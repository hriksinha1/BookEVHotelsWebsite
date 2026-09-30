import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function LegalLayout({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-16">
        <section className="bg-white border-b border-neutral-200 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h1 className="text-[36px] font-bold text-neutral-950 leading-[44px] tracking-tight mb-3">{title}</h1>
            <p className="text-[14px] text-neutral-500">Last updated: {updated}</p>
          </div>
        </section>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 prose-like">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const bodyClass = "text-[16px] text-neutral-700 leading-[26px] mb-5";
const headingClass = "text-[22px] font-bold text-neutral-950 mt-8 mb-4";

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="1 September 2025">
      <p className={bodyClass}>Book EV Hotels is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights.</p>
      <h2 className={headingClass}>Information we collect</h2>
      <p className={bodyClass}>We collect information you provide directly: account details (name, email, mobile number), booking information (dates, guests, payment references), hotel listing submissions (property details, charger information, location, photos, contact details), and communications with us.</p>
      <h2 className={headingClass}>How we use information</h2>
      <p className={bodyClass}>We use collected information to: provide and improve the Book EV Hotels service, verify hotel listings, process bookings, communicate with users and hotel partners, and maintain accurate listing information.</p>
      <h2 className={headingClass}>Third-party services</h2>
      <p className={bodyClass}>When you click through to a partner booking platform (such as Agoda), that platform's own privacy policy applies to your booking. We recommend reviewing the partner's policy before completing any transaction.</p>
      <h2 className={headingClass}>Data retention</h2>
      <p className={bodyClass}>We retain your data for as long as your account is active or as required to provide our services. You may request deletion of your account and associated data by contacting us.</p>
      <h2 className={headingClass}>Contact</h2>
      <p className={bodyClass}>For privacy questions or requests, email <a href="mailto:hello@bookevhotels.com" className="text-brand-700 underline">hello@bookevhotels.com</a>.</p>
      <p className="text-[13px] text-neutral-400 mt-8 italic">This is placeholder legal text for prototype purposes. Consult qualified legal counsel for your jurisdiction before publishing.</p>
    </LegalLayout>
  );
}

export function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" updated="1 September 2025">
      <p className={bodyClass}>By using Book EV Hotels you agree to these terms. Please read them carefully.</p>
      <h2 className={headingClass}>Use of the service</h2>
      <p className={bodyClass}>Book EV Hotels provides a directory of hotels with verified EV charging facilities. Information is provided in good faith based on our verification process. We do not guarantee charger availability, condition, or compatibility with your specific vehicle at any given time.</p>
      <h2 className={headingClass}>Bookings</h2>
      <p className={bodyClass}>Hotel bookings made directly through Book EV Hotels are subject to the hotel's own terms and cancellation policy, shown at time of booking. Bookings facilitated via partner affiliate links (such as Agoda) are governed by the partner's terms and conditions.</p>
      <h2 className={headingClass}>Hotel listings</h2>
      <p className={bodyClass}>Hotels listed on Book EV Hotels have been verified by our team. Verification confirms a working charger at time of verification — it is not a guarantee of future availability. Hotels are responsible for maintaining accurate information about their charging facilities.</p>
      <h2 className={headingClass}>Limitation of liability</h2>
      <p className={bodyClass}>Book EV Hotels is not liable for losses arising from charger unavailability, booking errors, or third-party services. Our liability is limited to the fullest extent permitted by law.</p>
      <p className="text-[13px] text-neutral-400 mt-8 italic">This is placeholder legal text for prototype purposes. Consult qualified legal counsel for your jurisdiction before publishing.</p>
    </LegalLayout>
  );
}

export function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="1 September 2025">
      <p className={bodyClass}>Book EV Hotels uses cookies and similar technologies to provide and improve our service.</p>
      <h2 className={headingClass}>What are cookies?</h2>
      <p className={bodyClass}>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and understand how you use the site.</p>
      <h2 className={headingClass}>Types of cookies we use</h2>
      <ul className="list-disc pl-6 space-y-2 mb-5">
        {[
          "Essential cookies: required for the site to function (session management, search state)",
          "Analytics cookies: help us understand usage patterns (anonymised)",
          "Preference cookies: remember your search preferences and saved hotels",
        ].map(item => <li key={item} className="text-[15px] text-neutral-700 leading-[24px]">{item}</li>)}
      </ul>
      <h2 className={headingClass}>Managing cookies</h2>
      <p className={bodyClass}>You can control cookies through your browser settings. Disabling essential cookies may affect site functionality.</p>
      <p className="text-[13px] text-neutral-400 mt-8 italic">This is placeholder legal text for prototype purposes.</p>
    </LegalLayout>
  );
}

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="pt-32 pb-16 text-center max-w-lg mx-auto px-4">
        <p className="text-[80px] font-bold text-neutral-200 tabular-nums leading-none mb-4">404</p>
        <h1 className="text-[24px] font-semibold text-neutral-950 mb-3">Page not found</h1>
        <p className="text-[15px] text-neutral-600 mb-8">The page you're looking for doesn't exist or has moved.</p>
        <div className="flex justify-center gap-3">
          <Link to="/" className="bg-brand-700 text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] hover:bg-brand-800 transition-colors">Go home</Link>
          <Link to="/search" className="border border-neutral-300 text-neutral-700 px-5 py-2.5 rounded-xl font-semibold text-[14px] hover:bg-neutral-100 transition-colors">Search hotels</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
