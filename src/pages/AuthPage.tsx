import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Mail, Phone, Eye, EyeOff } from "lucide-react";
import SafeImage from "../components/SafeImage";
import { imageRegistry } from "../data/images";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-950 flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="font-bold text-white text-[16px]">Book EV Hotels</span>
        </Link>
        <div>
          <blockquote className="text-[28px] font-bold text-white leading-[36px] mb-4">
            "Know the charger before you arrive."
          </blockquote>
          <p className="text-[15px] text-neutral-400">Find a hotel where your EV can charge while you sleep.</p>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden">
          <SafeImage
            src={imageRegistry.hero}
            alt="EV charging at a hotel"
            fallback="hero"
            className="h-full w-full"
            imageClassName="opacity-80"
          />
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-16">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-brand-700 rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-white fill-white" />
              </div>
              <span className="font-bold text-neutral-950 text-[15px]">Book EV Hotels</span>
            </Link>
          </div>

          <h1 className="text-[28px] font-bold text-neutral-950 mb-2">Sign in</h1>
          <p className="text-[15px] text-neutral-600 mb-8">Don't have an account? <Link to="/signup" className="text-brand-700 font-semibold underline">Sign up</Link></p>

          <form onSubmit={e => { e.preventDefault(); navigate("/account"); }} className="space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="aarav@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-neutral-500 rounded-xl text-[15px] bg-white outline-none focus:border-brand-700 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 py-3 border border-neutral-500 rounded-xl text-[15px] bg-white outline-none focus:border-brand-700 transition-colors"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-brand-700 hover:bg-brand-800 text-white py-3.5 rounded-xl text-[15px] font-semibold transition-colors">
              Sign in
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-[13px] text-neutral-400">or</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 border border-neutral-300 rounded-xl py-3 text-[14px] font-medium text-neutral-700 hover:bg-neutral-100 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-[12px] text-neutral-400 text-center mt-8">
            By signing in, you agree to our <Link to="/terms" className="underline">Terms of Use</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export function SignupPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-brand-700 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-white fill-white" />
          </div>
          <span className="font-bold text-neutral-950 text-[15px]">Book EV Hotels</span>
        </Link>
        <h1 className="text-[26px] font-bold text-neutral-950 mb-2">Create your account</h1>
        <p className="text-[14px] text-neutral-600 mb-7">Already have an account? <Link to="/login" className="text-brand-700 font-semibold underline">Sign in</Link></p>
        <form onSubmit={e => { e.preventDefault(); navigate("/account"); }} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">First name</label>
              <input placeholder="Aarav" className="w-full px-3 py-3 border border-neutral-500 rounded-xl text-[15px] bg-white outline-none focus:border-brand-700 transition-colors" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Last name</label>
              <input placeholder="Singh" className="w-full px-3 py-3 border border-neutral-500 rounded-xl text-[15px] bg-white outline-none focus:border-brand-700 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Email address</label>
            <input type="email" placeholder="aarav@example.com" className="w-full px-4 py-3 border border-neutral-500 rounded-xl text-[15px] bg-white outline-none focus:border-brand-700 transition-colors" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Mobile number</label>
            <input type="tel" placeholder="9876543210" className="w-full px-4 py-3 border border-neutral-500 rounded-xl text-[15px] bg-white outline-none focus:border-brand-700 transition-colors" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-neutral-800 mb-1.5">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-neutral-500 rounded-xl text-[15px] bg-white outline-none focus:border-brand-700 transition-colors" />
            <p className="text-[12px] text-neutral-500 mt-1">Minimum 8 characters</p>
          </div>
          <button type="submit" className="w-full bg-brand-700 hover:bg-brand-800 text-white py-3.5 rounded-xl text-[15px] font-semibold transition-colors mt-2">
            Create account
          </button>
        </form>
        <p className="text-[12px] text-neutral-400 text-center mt-6">
          By creating an account, you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
