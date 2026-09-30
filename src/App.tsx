import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import HotelDetailPage from "./pages/HotelDetailPage";
import BookingPage from "./pages/BookingPage";
import DestinationsPage from "./pages/DestinationsPage";
import CityPage from "./pages/CityPage";
import GuidesPage from "./pages/GuidesPage";
import GuideArticlePage from "./pages/GuideArticlePage";
import ReportPage from "./pages/ReportPage";
import FAQPage from "./pages/FAQPage";
import AboutPage from "./pages/AboutPage";
import ListHotelPage from "./pages/ListHotelPage";
import AccountPage from "./pages/AccountPage";
import { LoginPage, SignupPage } from "./pages/AuthPage";
import { PrivacyPage, TermsPage, CookiesPage, NotFoundPage } from "./pages/LegalPages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* Hotels */}
        <Route path="/hotels/:slug" element={<HotelDetailPage />} />
        <Route path="/booking/:slug/rooms" element={<BookingPage />} />
        <Route path="/booking/:slug/review" element={<BookingPage />} />
        <Route path="/booking/:slug/confirmation" element={<BookingPage />} />

        {/* Destinations */}
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:state" element={<CityPage />} />
        <Route path="/destinations/:state/:city" element={<CityPage />} />

        {/* Content */}
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:slug" element={<GuideArticlePage />} />
        <Route path="/india-ev-hotel-report" element={<ReportPage />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Partners */}
        <Route path="/list-your-hotel" element={<ListHotelPage />} />
        <Route path="/list-your-hotel/success" element={<ListHotelPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Account */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/bookings" element={<AccountPage tab="bookings" />} />
        <Route path="/account/saved" element={<AccountPage tab="saved" />} />

        {/* Legal */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
