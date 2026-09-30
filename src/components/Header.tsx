import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Bookmark, User, ChevronDown, Zap } from "lucide-react";
import { Button } from "./ui";

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const bg = transparent && !scrolled && !mobileOpen ? "bg-transparent" : "bg-white border-b border-neutral-200";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <span className={`text-sm font-bold leading-tight tracking-tight ${transparent && !scrolled ? "text-white" : "text-neutral-950"}`}>
              Book EV Hotels
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { label: "Explore EV Hotels", to: "/search" },
              { label: "Destinations", to: "/destinations" },
              { label: "Travel Guides", to: "/guides" },
              { label: "EV Hotel Report", to: "/india-ev-hotel-report" },
              { label: "About", to: "/about" },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-brand-700 bg-brand-50"
                    : transparent && !scrolled
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-neutral-700 hover:text-brand-800 hover:bg-neutral-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/list-your-hotel"
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                transparent && !scrolled
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-brand-700 text-brand-700 hover:bg-brand-50"
              }`}
            >
              List Your Hotel
            </Link>
            <Link
              to="/account/saved"
              className={`p-2 rounded-lg transition-colors ${
                transparent && !scrolled ? "text-white/80 hover:bg-white/10" : "text-neutral-600 hover:bg-neutral-100"
              }`}
              aria-label="Saved hotels"
            >
              <Bookmark size={18} />
            </Link>
            <Link
              to="/login"
              className={`p-2 rounded-lg transition-colors ${
                transparent && !scrolled ? "text-white/80 hover:bg-white/10" : "text-neutral-600 hover:bg-neutral-100"
              }`}
              aria-label="Account"
            >
              <User size={18} />
            </Link>
            <Link
              to="/search"
              className="flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              <Search size={14} />
              Search Hotels
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-2">
            <Link to="/search" className={transparent && !scrolled ? "text-white" : "text-neutral-600"} aria-label="Search">
              <Search size={20} />
            </Link>
            <Button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={transparent && !scrolled ? "text-white" : "text-neutral-600"}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 px-4 py-4 space-y-1">
          {[
            { label: "Find EV Hotels", to: "/search" },
            { label: "Destinations", to: "/destinations" },
            { label: "Travel Guides", to: "/guides" },
            { label: "EV Hotel Report", to: "/india-ev-hotel-report" },
            { label: "FAQs", to: "/faqs" },
            { label: "About", to: "/about" },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium text-neutral-800 hover:bg-neutral-100"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-neutral-200 mt-2 space-y-2">
            <Link
              to="/list-your-hotel"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg border border-brand-700 px-4 py-3 text-base font-semibold text-brand-700"
            >
              List Your Hotel
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-100"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
