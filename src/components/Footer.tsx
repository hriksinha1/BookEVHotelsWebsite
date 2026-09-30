import { Link } from "react-router-dom";
import { Mail, Zap } from "lucide-react";
import { Heading } from "./ui";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Explore EV Hotels", to: "/search" },
      { label: "Destinations", to: "/destinations" },
      { label: "Travel Guides", to: "/guides" },
      { label: "EV Hotel Report", to: "/india-ev-hotel-report" },
    ],
  },
  {
    title: "For travellers",
    links: [
      { label: "How verification works", to: "/about" },
      { label: "Frequently asked questions", to: "/faqs" },
      { label: "Saved hotels", to: "/account/saved" },
      { label: "My bookings", to: "/account/bookings" },
    ],
  },
  {
    title: "For hotels",
    links: [{ label: "List Your Hotel", to: "/list-your-hotel" }],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Cookies", to: "/cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to="/" className="mb-5 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700">
                <Zap size={17} className="fill-white text-white" />
              </span>
              <span className="font-bold">Book EV Hotels</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-300">
              Know your stay. Know your charger. Enjoy the drive.
            </p>
            <Link to="mailto:hello@bookevhotels.com" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-neutral-300 hover:text-brand-300">
              <Mail size={15} /> hello@bookevhotels.com
            </Link>
          </div>
          {footerGroups.map(group => (
            <div key={group.title}>
              <Heading level={3} className="mb-4 text-sm font-semibold text-white">{group.title}</Heading>
              <ul className="space-y-3">
                {group.links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm leading-relaxed text-neutral-300 transition-colors hover:text-brand-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-neutral-800 pt-8 text-xs leading-relaxed text-neutral-400 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Book EV Hotels. India.</p>
          <p className="max-w-xl">
            Charger verification is point-in-time and does not guarantee live availability. Confirm with the property on your travel day.
          </p>
        </div>
      </div>
    </footer>
  );
}
