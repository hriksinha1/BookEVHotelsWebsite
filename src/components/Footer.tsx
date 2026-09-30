import { Link } from "react-router-dom";
import { Zap, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white fill-white" />
              </div>
              <span className="font-bold text-[15px]">Book EV Hotels</span>
            </Link>
            <p className="text-neutral-300 text-[14px] leading-[22px] max-w-xs mb-6">
              India's trusted directory of hotels with verified EV charging facilities. Drive sustainable, stay charged.
            </p>
            <div className="flex items-center gap-3">
              <a href="mailto:hello@bookevhotels.com" className="flex items-center gap-2 text-neutral-400 hover:text-brand-400 text-[14px] transition-colors">
                <Mail size={14} />
                hello@bookevhotels.com
              </a>
            </div>
            <div className="mt-4 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-brand-400 transition-colors text-[13px] font-medium" aria-label="Instagram">
                Instagram
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-brand-400 text-[12px] font-medium transition-colors">
                Google Play
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[14px] font-semibold mb-4 text-white">Explore</h3>
            <ul className="space-y-3">
              {[
                { label: "Search EV Hotels", to: "/search" },
                { label: "Destinations", to: "/destinations" },
                { label: "Travel Guides", to: "/guides" },
                { label: "India EV Hotel Report", to: "/india-ev-hotel-report" },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-neutral-300 hover:text-brand-400 text-[14px] leading-[22px] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[14px] font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {[
                { label: "About us", to: "/about" },
                { label: "FAQs", to: "/faqs" },
                { label: "List Your Hotel", to: "/list-your-hotel" },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-neutral-300 hover:text-brand-400 text-[14px] leading-[22px] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[14px] font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms of Use", to: "/terms" },
                { label: "Cookie Policy", to: "/cookies" },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-neutral-300 hover:text-brand-400 text-[14px] leading-[22px] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-neutral-500 text-[12px] leading-[18px]">
            © {year} Book EV Hotels. India, all rights reserved.
          </p>
          <p className="text-neutral-600 text-[12px] leading-[18px] max-w-md">
            Hotel bookings are facilitated via partner affiliate links. Book EV Hotels is not liable for third-party booking outcomes.
          </p>
        </div>
      </div>
    </footer>
  );
}
