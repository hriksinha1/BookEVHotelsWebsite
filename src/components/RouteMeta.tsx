import { useLocation, matchPath } from "react-router-dom";
import { getHotelBySlug, hotels } from "../data/hotels";
import { usePageMeta } from "../hooks/usePageMeta";

const DEFAULT_DESCRIPTION =
  "Find hotels in India with verified EV charging details, including access, power and connector type.";

function titleCaseSlug(value: string) {
  return value
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function RouteMeta() {
  const { pathname } = useLocation();
  const hotelMatch = matchPath("/hotels/:slug", pathname);
  const cityMatch = matchPath("/destinations/:state/:city", pathname);
  const stateMatch = matchPath("/destinations/:state", pathname);

  let title = "Book EV Hotels | Verified EV-Friendly Hotels in India";
  let description = DEFAULT_DESCRIPTION;

  if (hotelMatch?.params.slug) {
    const hotel = getHotelBySlug(hotelMatch.params.slug);
    if (hotel) {
      title = `${hotel.name}, ${hotel.city} | EV Charging Details`;
      description = `Review verified charger access, power, connector and room options at ${hotel.name} in ${hotel.city}.`;
    }
  } else if (cityMatch?.params.city) {
    const city = titleCaseSlug(cityMatch.params.city);
    const count = hotels.filter(hotel => hotel.city.toLowerCase().replaceAll(" ", "-") === cityMatch.params.city).length;
    title = `${count} EV Hotels in ${city} | Verified EV Charging Hotels`;
    description = `Browse ${count} mock-data hotel ${count === 1 ? "listing" : "listings"} in ${city} with verified EV charger details.`;
  } else if (stateMatch?.params.state) {
    const state = titleCaseSlug(stateMatch.params.state);
    title = `EV-Friendly Hotels in ${state} | Book EV Hotels`;
    description = `Explore hotel listings in ${state} with verified EV charger access, power and connector information.`;
  } else {
    const titles: Record<string, string> = {
      "/": "Book EV Hotels | Verified EV-Friendly Hotels in India",
      "/search": "Search Verified EV Hotels in India | Book EV Hotels",
      "/destinations": "EV Hotel Destinations in India | Book EV Hotels",
      "/guides": "EV Travel Guides for India | Book EV Hotels",
      "/india-ev-hotel-report": "India EV Hotel Report | Book EV Hotels",
      "/faqs": "EV Hotel Booking FAQs | Book EV Hotels",
      "/about": "About Our EV Charger Verification | Book EV Hotels",
      "/list-your-hotel": "List and Verify Your EV Hotel | Book EV Hotels",
      "/login": "Sign In | Book EV Hotels",
      "/signup": "Create an Account | Book EV Hotels",
      "/privacy": "Privacy Policy | Book EV Hotels",
      "/terms": "Terms of Use | Book EV Hotels",
      "/cookies": "Cookie Policy | Book EV Hotels",
    };
    title = titles[pathname] ?? title;
  }

  usePageMeta(title, description);
  return null;
}
