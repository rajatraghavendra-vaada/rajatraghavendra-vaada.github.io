import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Film,
  Camera,
  Compass,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  Video,
  ChevronRight,
  Sliders,
  DollarSign,
  Send,
  X,
  Volume2,
  Zap,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Calendar,
  Info,
  BookOpen,
  ChefHat,
  Clapperboard,
  Crosshair,
  Maximize2
} from "lucide-react";

// --- Mock Data: Portfolio Showcase ---
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "The Architecture of Ambition",
    client: "NeuroFlow AI",
    category: "Founder Stories",
    tag: "AI & DeepTech",
    duration: "2m 14s",
    metrics: "140K+ Organic Views",
    aspect: "16:9",
    thumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    description: "An intimate, raw founder narrative tracking 18 months of building a sovereign neuro-model in Koramangala. Shot entirely with dynamic handheld gimbal runs and vintage anamorphic glass.",
    gearUsed: "Full-Frame 4K Cinema + 3-Axis Balanced Gimbal + Macro Probe",
    deliverables: "1x Full Docu-Film, 4x Kinetic Vertical Hooks"
  },
  {
    id: 2,
    title: "Zero to Ignition in 60 Seconds",
    client: "VoltPulse D2C",
    category: "Product Drops",
    tag: "Hardware / D2C",
    duration: "0m 58s",
    metrics: "4.8x ROAS on Launch",
    aspect: "16:9",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    description: "High-cadence mechanical product drop. Highlighting CNC aluminum finishes, fluid splash-resistance macro captures, and thunderous custom sound design.",
    gearUsed: "High-Speed 120fps Capture, Precision Turntable, RGB Tube Array",
    deliverables: "Launch Commercial (16:9 & 9:16), Sound Mastered Stems"
  },
  {
    id: 3,
    title: "Behind the Ledger: 36 Hours to Series A",
    client: "KuberStack",
    category: "Behind the Build",
    tag: "Fintech",
    duration: "3m 40s",
    metrics: "$12M Round Closed",
    aspect: "16:9",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    description: "Venture pitch cinematic proof. We embedded in the command room to capture authentic, high-stakes decision making, team chemistry, and operational velocity.",
    gearUsed: "Dual Camera Rig, Low-Profile Cine Gimbal, Wireless Lavalier Matrix",
    deliverables: "Investor Keynote Video, Private LP Reel, 6x Social Cuts"
  },
  {
    id: 4,
    title: "Tactile Intelligence: Hardware Reveal",
    client: "Kavach Robotics",
    category: "Product Drops",
    tag: "Robotics / IoT",
    duration: "1m 15s",
    metrics: "2.1M Impressions",
    aspect: "16:9",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    description: "A symphony of laser-cut precision, industrial actuators, and cinematic grade warmth that elevated an early hardware prototype into an undeniable market leader.",
    gearUsed: "Motorized Slider + 3-Axis Gimbal, Probe Macro Lens, Tungsten Key",
    deliverables: "Global Keynote Reveal, 9:16 Teaser Reel Pack"
  },
  {
    id: 5,
    title: "The 8-Reel Organic Sprint",
    client: "SupraHealth",
    category: "Reels / Shorts",
    tag: "Consumer Tech",
    duration: "Vertical Pack",
    metrics: "320K Avg Reel Views",
    aspect: "9:16",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    description: "Rapid-fire, punchy vertical storytelling engineered for first-3-second retention. Hook testing, pacing optimization, and charismatic founder delivery coaching.",
    gearUsed: "Vertical Rig, Dual Bi-Color Key Lights, Shotgun Hyper-Cardioid Mic",
    deliverables: "8x Cut & Color-Graded Reels, Hook Variations, Custom Captions"
  },
  {
    id: 6,
    title: "The Code & The Crucible",
    client: "Synthetix Labs",
    category: "Founder Stories",
    tag: "Developer Tools",
    duration: "1m 45s",
    metrics: "95% Video Completion Rate",
    aspect: "16:9",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    description: "Translating abstract distributed infrastructure into human, visceral visual metaphors. Designed to draw top 1% engineering talent to an uncompromising vision.",
    gearUsed: "Canon 4K Sensor + DJI RS 3 Mini Orbit + Directional Audio",
    deliverables: "Recruiting Manifesto Video, LinkedIn Spotlight Snippets"
  }
];

// --- BTS / Production Stills Showcase (Actual Field Photos) ---
const BTS_GALLERY = [
  {
    id: "bts-1",
    title: "Commercial Lighting & Barista Workflow",
    location: "Artisanal Specialty Roastery Shoot",
    tag: "Studio Softbox & Run-and-Gun",
    caption: "Capturing authentic craftsmanship under controlled diffused lighting with dynamic handheld tracking.",
    aspect: "tall",
    image: "/bts/barista-workflow.jpeg"
  },
  {
    id: "bts-2",
    title: "DJI Ronin 3-Axis Gimbal Coastal Balance",
    location: "Outdoor & Coastal Location Set",
    tag: "Ronin Mechanical Calibration",
    caption: "Balanced for ultra-fluid, zero-micro-jitter kinetic tracking shots on outdoor terrain.",
    aspect: "wide",
    image: "/bts/ronin-gimbal.jpeg"
  },
  {
    id: "bts-3",
    title: "Audio Rig & Outdoor Street Setup",
    location: "Street-Side Location Filming",
    tag: "Directional Mic & Fluid Head",
    caption: "Dialed-in directional audio and articulated screen monitoring for rapid on-location interviews and B-roll.",
    aspect: "tall",
    image: "/bts/audio-rig.jpeg"
  },
  {
    id: "bts-4",
    title: "Precision Monitor & Framing Check",
    location: "Product Tabletop Set",
    tag: "Dual Pixel Focus Check",
    caption: "Calibrating macro framing, depth of field, and composition through the flip-out articulated display.",
    aspect: "tall",
    image: "/bts/monitor-check.jpeg"
  },
  {
    id: "bts-5",
    title: "Macro Crema Extraction Pull",
    location: "Espresso Bar Macro Capture",
    tag: "Macro Fluid Detail",
    caption: "High-speed macro capture highlighting textural crema pour, viscosity, and metallic reflection.",
    aspect: "wide",
    image: "/bts/crema-macro.jpeg"
  },
  {
    id: "bts-6",
    title: "Steam Wand Purge & Atmospheric Lighting",
    location: "Commercial Kitchen / Cafe",
    tag: "Steam & Sensory Optics",
    caption: "Harnessing steam velocity and focused rim lighting to evoke pure sensory impact.",
    aspect: "tall",
    image: "/bts/steam-wand.jpeg"
  },
  {
    id: "bts-7",
    title: "Beverage Styling & Hero Framing",
    location: "Cafe Counter Set",
    tag: "Beverage Hero Shot",
    caption: "Styled pours and fine detail, lit to make every drink look irresistible on camera.",
    aspect: "tall",
    image: "/bts/beverage-hero.jpeg"
  },
  {
    id: "bts-8",
    title: "Burger Build & Texture Close-Up",
    location: "Restaurant Kitchen Set",
    tag: "Food Styling & Macro",
    caption: "Layered textures and melt detail under soft directional light for scroll-stopping food reels.",
    aspect: "tall",
    image: "/bts/burger-build.jpeg"
  },
  {
    id: "bts-9",
    title: "Plated Dish Hero Frame",
    location: "Hospitality Table Set",
    tag: "Plating & Composition",
    caption: "Clean plating and composition for menu launches and hospitality brand content.",
    aspect: "tall",
    image: "/bts/plated-dish.jpeg"
  }
];

// --- 3 Core Startup Packages ---
const PACKAGES = [
  {
    id: "pkg-1",
    name: "Founder Brand Sprint",
    tagline: "Organic Authority & Founder Voice",
    badge: "Founder Essential",
    priceDisplay: "₹50,000",
    pricePeriod: "/ month",
    pricingNote: "4 High-Impact Vertical Reels / Month",
    idealFor: "Cafes, specialty bakehouses, and hospitality spots looking for high-impact, short-format content to establish an undeniable local brand presence and drive footfall.",
    features: [
      "4x High-Retention Reels per month",
      "Concept Direction & End-to-End Script Ideation",
      "Dynamic 3-Axis Gimbal Kinetic Movement & Framing",
      "Custom Kinetic Captions, Sound Design & Editing",
      "Engineered First-3-Second Thumb-Stop Hooks"
    ]
  },
  {
    id: "pkg-2",
    name: "Product Launch Cut",
    tagline: "High-Cadence Launch Drops & Events",
    badge: "Milestone & Demo Days",
    priceDisplay: "Demand Based",
    pricePeriod: "custom quote",
    pricingNote: "Tailored to event scale & launch complexity",
    idealFor: "Special product launches, exclusive drops, experiential pop-ups, and live brand events that require end-to-end coverage.",
    features: [
      "Launch Showcase Reel (4K, 16:9 or 9:16)",
      "Dedicated On-Site Event & Product Filming",
      "Macro Detailing, Product Textures & Dynamic B-Roll",
      "Event/Product Theme-Based Editing",
      "First-3-Second Thumb-Stop Hook"
    ]
  },
  {
    id: "pkg-3",
    name: "Full Narrative Suite",
    tagline: "The Complete Monthly Content Engine",
    badge: "Most Comprehensive",
    priceDisplay: "₹1,20,000",
    pricePeriod: "/ month",
    pricingNote: "2 Reels Weekly (8-10 Reels/Mo) + Carousels",
    idealFor: "Cafes, restaurants, and hospitality brands looking for consistent, end-to-end social media content management without the overhead of hiring an in-house media team.",
    features: [
      "8 to 10 High-Production Reels per month (2 weekly drops)",
      "Coordinated High-Value Carousel Designs & Slide Creatives",
      "End-to-End Content Strategy, Topic Research & Scripts",
      "Dedicated Monthly Shooting Sessions",
      "Uncut Raw Photo Access: full set of raw pictures provided for your flexible, everyday use"
    ]
  }
];

const TEAM = [
  {
    id: "team-1",
    name: "Aastha Singh",
    role: "Video Editor",
    badge: "EDITOR",
    pill: "THE EDITOR",
    headline: "Finding the story in the smallest of moments.",
    image: "/team/aastha.jpeg",
    bio: [
      "I see video editing as more than just putting clips together; it’s about finding a story in the smallest of moments and bringing it to life. I love experimenting with visuals, transitions, rhythm, and storytelling to turn raw footage into something engaging and memorable.",
      "I’m someone who enjoys exploring ideas, thinking creatively, and constantly learning something new with every project. For me, every edit is an opportunity to tell a story differently.",
    ],
  },
  {
    id: "team-2",
    name: "Nafeesa Saleh",
    role: "Brand Manager",
    badge: "BRAND MANAGER",
    pill: "THE BRAND MANAGER",
    headline: "Where critical thinking meets creative storytelling.",
    image: "/team/brand-manager.jpeg",
    bio: [
      "I’ve always been drawn to spaces where critical thinking meets creative storytelling. As Brand Manager, my focus is turning brand identity into compelling, consistent digital presence.",
      "From scripting and creative oversight to aligning fast-moving production teams and publishing workflows, I manage the moving parts that take an idea from raw concept to finished, high-impact content. I bring structured execution, sharp audience awareness, and an obsessive eye for detail to every brand partner we scale.",
    ],
  },
];

function TeamSlide({ m }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5 relative">
        <div className="relative rounded-3xl overflow-hidden bg-[#13131A] border border-[#2B2B3A] p-4 sm:p-5 shadow-2xl group">
          <div className="relative w-full h-[480px] sm:h-[540px] rounded-2xl overflow-hidden bg-[#0A0A0E] border border-[#22222E]">
            <img
              src={m.image}
              alt={m.name + " - " + m.role}
              loading="lazy"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 block"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#FBBF24]">
              <Crosshair className="w-3 h-3 text-[#E89A3C]" />
              <span>{m.badge}</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-white/10">
              <h4 className="text-base font-bold text-white tracking-wide">{m.name}</h4>
              <span className="text-xs text-[#E89A3C] font-mono block mt-0.5">{m.role}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E89A3C]/10 border border-[#E89A3C]/20 text-xs font-mono text-[#E89A3C]">
          <span>{m.pill}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">{m.headline}</h2>
        {m.bio.map((p, i) => (
          <p key={i} className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">{p}</p>
        ))}
      </div>
    </div>
  );
}

function TeamSwipe({ slides, labels }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(slides.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex items-center overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((sl, i) => (
          <div key={i} className="shrink-0 w-full snap-center">{sl}</div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(index - 1)}
            className="p-2.5 rounded-full bg-[#181822] border border-[#2B2B38] text-white hover:border-[#E89A3C] transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={"Go to " + labels[i]}
                onClick={() => goTo(i)}
                className={"h-2 rounded-full transition-all " + (i === index ? "w-6 bg-[#E89A3C]" : "w-2 bg-[#3A3A48]")}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(index + 1)}
            className="p-2.5 rounded-full bg-[#181822] border border-[#2B2B38] text-white hover:border-[#E89A3C] transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [selectedBts, setSelectedBts] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activePackage, setActivePackage] = useState(PACKAGES[0]);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    founderName: "",
    companyName: "",
    email: "",
    selectedPkg: "Founder Brand Sprint (₹50,000)",
    location: "Bengaluru (In-Person)",
    brief: ""
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingSending, setBookingSending] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Filtered portfolio
  const filteredPortfolio = useMemo(() => {
    if (activeCategory === "All") return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError("");
    setBookingSending(true);
    try {
      const res = await fetch("https://formspree.io/f/xeaavzrb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          founderName: bookingForm.founderName,
          companyName: bookingForm.companyName,
          email: bookingForm.email,
          selectedPackage: bookingForm.selectedPkg,
          location: bookingForm.location,
          brief: bookingForm.brief,
        }),
      });
      if (res.ok) {
        setBookingSubmitted(true);
      } else {
        setBookingError("Something went wrong. Please try again or email us directly.");
      }
    } catch (err) {
      setBookingError("Network error. Please check your connection and try again.");
    } finally {
      setBookingSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#E6E6EB] font-sans selection:bg-[#E89A3C]/30 selection:text-[#FBBF24] antialiased">
      {/* Background Ambience Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-[#E89A3C]/10 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] bg-[#B45309]/8 rounded-full blur-[160px]" />
        <div className="absolute bottom-20 left-10 w-[550px] h-[550px] bg-[#F59E0B]/5 rounded-full blur-[180px]" />
        {/* Subtle cinematic scanline & grid texture */}
        <div 
          className="w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      {/* ---------------- NAVIGATION ---------------- */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#09090C]/80 border-b border-[#26262B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo with Devanagari touch */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E89A3C] via-[#B45309] to-[#78350F] p-[1.5px] shadow-lg shadow-[#E89A3C]/10 group-hover:shadow-[#E89A3C]/25 transition-all duration-300">
              <div className="w-full h-full bg-[#0E0E12] rounded-[7px] flex items-center justify-center">
                <span className="font-serif text-[#FBBF24] text-lg font-bold">वा</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-[0.2em] text-white flex items-center gap-2">
                VAADA <span className="text-[#E89A3C] font-light text-xs tracking-widest uppercase">PRODUCTIONS</span>
              </span>
              <span className="text-[10px] tracking-wider text-[#8A8A93] uppercase font-mono">
                Cinematic Proof for Startups • BLR
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase font-medium tracking-widest text-[#A0A0AA]">
            <a href="#story" className="hover:text-[#E89A3C] transition-colors">The Vaada</a>
            <a href="#founder" className="hover:text-[#E89A3C] transition-colors">About Team</a>
            <a href="#bts" className="hover:text-[#E89A3C] transition-colors">Behind The Lens</a>
            <a href="#craft" className="hover:text-[#E89A3C] transition-colors">Rig & Craft</a>
            <a href="#packages" className="hover:text-[#E89A3C] transition-colors">Packages</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const btsEl = document.getElementById("bts");
                btsEl?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#2F2F37] hover:border-[#E89A3C]/50 hover:bg-[#15151B] text-[#D1D1DB] transition-all"
            >
              <Clapperboard className="w-3.5 h-3.5 text-[#E89A3C]" />
              On-Location BTS
            </button>
            <button
              onClick={() => setShowBookingModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-gradient-to-r from-[#E89A3C] to-[#D97706] text-[#0A0A0C] hover:brightness-110 hover:shadow-lg hover:shadow-[#E89A3C]/20 transition-all active:scale-[0.98]"
            >
              <span>Work With Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative z-10 pt-16 pb-24 md:pt-28 md:pb-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Micro badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#16161D]/90 border border-[#2A2A33] text-[11px] font-mono text-[#D4AF37] mb-8 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#E89A3C] animate-pulse" />
            <span className="text-[#E6E6EB] font-sans font-medium">वादा • Commitment Over Talk</span>
            <span className="text-[#52525C]">•</span>
            <span>Bengaluru HQ</span>
            <span className="text-[#52525C]">•</span>
            <span>Canon 200D II & DJI RS 3 Mini Rig</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
            We Turn Your Startup’s Promise Into{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 bg-gradient-to-r from-[#FDE68A] via-[#E89A3C] to-[#F59E0B] bg-clip-text text-transparent">
                Cinematic Proof.
              </span>
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#E89A3C]/20 -rotate-1 rounded-full blur-[1px]" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-lg sm:text-xl text-[#9E9EA8] max-w-3xl mx-auto leading-relaxed font-normal">
            No static talking heads. No cookie-cutter agency fluff. We build high-retention founder reels, event launch drops, and monthly content suites powered by kinetic camera motion and culinary-grade precision.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#E89A3C] via-[#F59E0B] to-[#D97706] text-[#0A0A0D] font-bold text-sm uppercase tracking-wider shadow-xl shadow-[#E89A3C]/20 hover:shadow-[#E89A3C]/35 hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
            >
              <Sparkles className="w-4 h-4 text-[#0A0A0D]" />
              <span>Explore Monthly Packages</span>
            </button>
            <button
              onClick={() => {
                const btsEl = document.getElementById("bts");
                btsEl?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-xl border border-[#2D2D38] bg-[#121217]/80 hover:bg-[#1A1A22] hover:border-[#E89A3C]/40 text-white font-semibold text-sm transition-all flex items-center justify-center gap-3 group"
            >
              <div className="w-6 h-6 rounded-full bg-[#E89A3C]/10 flex items-center justify-center group-hover:bg-[#E89A3C] transition-colors">
                <Clapperboard className="w-3 h-3 text-[#E89A3C] group-hover:text-black transition-colors" />
              </div>
              <span>View On-Location BTS</span>
            </button>
          </div>

          {/* Proof Ribbon */}
          <div className="mt-16 pt-10 border-t border-[#1C1C22] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="p-4 rounded-xl bg-[#0F0F14]/60 border border-[#1E1E26]">
              <div className="flex items-center gap-2 text-[#E89A3C] text-xs font-mono mb-1">
                <ChefHat className="w-3.5 h-3.5" />
                <span>ARTISANAL PRECISION</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">Culinary Discipline</div>
              <div className="text-xs text-[#7A7A85] mt-1">Obsessive attention to every cut & detail</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0F0F14]/60 border border-[#1E1E26]">
              <div className="flex items-center gap-2 text-[#E89A3C] text-xs font-mono mb-1">
                <Camera className="w-3.5 h-3.5" />
                <span>HARDWARE & OPTICS</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">DJI RS 3 Mini + 4K</div>
              <div className="text-xs text-[#7A7A85] mt-1">Ultra-smooth, dynamic 3-axis tracking</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0F0F14]/60 border border-[#1E1E26]">
              <div className="flex items-center gap-2 text-[#E89A3C] text-xs font-mono mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>COMMERCIAL MINDSET</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">Business Grounded</div>
              <div className="text-xs text-[#7A7A85] mt-1">We understand ROI, hooks & brand equity</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0F0F14]/60 border border-[#1E1E26]">
              <div className="flex items-center gap-2 text-[#E89A3C] text-xs font-mono mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>BENGALURU ROOTED</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">Direct Production</div>
              <div className="text-xs text-[#7A7A85] mt-1">In-person shoots across startup hubs</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- THE VAADA STORY & MANIFESTO ---------------- */}
      <section id="story" className="relative z-10 py-24 bg-[#0B0B0F] border-y border-[#1C1C24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Manifesto Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E89A3C]/10 border border-[#E89A3C]/20 text-xs font-mono text-[#E89A3C]">
                <span>THE PHILOSOPHY OF ‘वादा’</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                A promise made to the market. <br />
                <span className="text-[#E89A3C] font-serif italic">Turned into undeniable proof.</span>
              </h2>

              <p className="text-base text-[#A1A1AA] leading-relaxed">
                In Hindi and Sanskrit heritage, <strong className="text-white">‘Vaada’ (वादा)</strong> is not casual speech—it is a sacred commitment. Every startup enters the market making a bold promise: to early believers, angel investors, first hires, and customers.
              </p>

              <p className="text-base text-[#A1A1AA] leading-relaxed">
                At Vaada Productions, we believe your visual story must honor that commitment with equal weight. We bridge the <strong className="text-[#E89A3C]">uncompromising sensory discipline of artisanal culinary arts</strong> with the <strong className="text-[#E89A3C]">kinetic motion of modern cinematography</strong> to craft visual assets that make people stop, watch, and believe.
              </p>

              {/* Three Pillared Values */}
              <div className="pt-4 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-[#181822] text-[#E89A3C] border border-[#2B2B36] shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Unrelenting Craft & Discipline</h4>
                    <p className="text-xs text-[#80808B] mt-0.5">Forged over baking ovens and high-pressure kitchens: lighting, audio stems, and framing tuned with millimetric precision.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-[#181822] text-[#E89A3C] border border-[#2B2B36] shrink-0">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dynamic 3-Axis Gimbal Balance</h4>
                    <p className="text-xs text-[#80808B] mt-0.5">Continuous forward tracking and handheld movement that mirrors the velocity of your company.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-[#181822] text-[#E89A3C] border border-[#2B2B36] shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Commercial & Strategic Acumen</h4>
                    <p className="text-xs text-[#80808B] mt-0.5">Grounded in business management: we shoot for brand equity, conversions, and founder conviction, not empty aesthetics.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Manifest Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#2E2E3A] bg-[#121218] p-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#E89A3C]/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-[#22222C] pb-4 mb-6">
                  <span className="font-mono text-xs text-[#E89A3C] uppercase tracking-widest">
                    // THE VAADA STANDARD
                  </span>
                  <span className="text-[11px] font-mono text-[#71717A]">BLR-CINE-SPEC-01</span>
                </div>

                <div className="space-y-6">
                  <blockquote className="font-serif text-xl sm:text-2xl text-[#E4E4E7] italic leading-snug">
                    “Whether plating a signature dessert or framing a founder’s defining moment, the principle never changes: mastery lives in the balance.”
                  </blockquote>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1F1F28]">
                    <div className="p-3.5 rounded-lg bg-[#181820] border border-[#262633]">
                      <span className="text-xs text-[#82828F] font-mono block">FIRST 3 SECONDS</span>
                      <span className="text-lg font-black text-white">Visual Hook Lock</span>
                      <span className="text-[11px] text-[#A1A1AA] block mt-0.5">Engineered retention</span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#181820] border border-[#262633]">
                      <span className="text-xs text-[#82828F] font-mono block">MONTHLY CADENCE</span>
                      <span className="text-lg font-black text-[#E89A3C]">Reliable Velocity</span>
                      <span className="text-[11px] text-[#A1A1AA] block mt-0.5">Consistent founder presence</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#E89A3C]/10 to-transparent border-l-2 border-[#E89A3C] text-xs text-[#D1D1DB] leading-relaxed">
                    <strong>The Promise:</strong> We work directly with founders to translate raw ambition into magnetic video assets that command market respect.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- ABOUT THE FOUNDER SECTION ---------------- */}
      <section id="founder" className="relative z-10 py-24 bg-[#09090D] border-b border-[#1C1C24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TeamSwipe
            labels={["Founder", ...TEAM.map((m) => m.name)]}
            slides={[
<div key="founder-slide" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Profile Column with Real Founder Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-[#13131A] border border-[#2B2B3A] p-4 sm:p-5 shadow-2xl group">
                <div className="relative w-full h-[480px] sm:h-[540px] rounded-2xl overflow-hidden bg-[#0A0A0E] border border-[#22222E]">
                  <img
                    src="/founder.jpeg"
                    alt="Rajat Raghavendra Munavalli - Founder & Creative Director, Vaada Productions"
                    loading="eager"
                    className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.04] group-hover:scale-105 transition-all duration-700 block"
                    onError={(e) => {
                      // Fallback in case of local path resolving differences
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "./WhatsApp Image 2026-11-02 at 19.52.19.jpeg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent opacity-80 pointer-events-none" />
                  
                  {/* Subtle Top Accent */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#FBBF24]">
                    <Crosshair className="w-3 h-3 text-[#E89A3C]" />
                    <span>FOUNDER / DIR</span>
                  </div>

                  {/* Bottom info tag */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold text-white tracking-wide">Rajat Raghavendra Munavalli</h4>
                        <span className="text-xs text-[#E89A3C] font-mono block mt-0.5">Founder & Creative Director</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#E89A3C]/20 border border-[#E89A3C]/40 text-[10px] font-mono text-[#E89A3C]">
                        Bengaluru, IN
                      </span>
                    </div>
                  </div>
                </div>

                {/* Accolades Strip */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#1C1C26] text-center">
                  <div className="p-2.5 rounded-lg bg-[#0C0C10] border border-[#1E1E28]">
                    <ChefHat className="w-4 h-4 text-[#E89A3C] mx-auto mb-1" />
                    <span className="text-[10px] font-mono text-[#A1A1AA] block leading-tight">MasterChef Contestant</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0C0C10] border border-[#1E1E28]">
                    <Award className="w-4 h-4 text-[#E89A3C] mx-auto mb-1" />
                    <span className="text-[10px] font-mono text-[#A1A1AA] block leading-tight">Odisha Top Chef Runner-Up</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0C0C10] border border-[#1E1E28]">
                    <BookOpen className="w-4 h-4 text-[#E89A3C] mx-auto mb-1" />
                    <span className="text-[10px] font-mono text-[#A1A1AA] block leading-tight">Published Author</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E89A3C]/10 border border-[#E89A3C]/20 text-xs font-mono text-[#E89A3C]">
                <span>THE MAKER’S JOURNEY</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                From High-Heat Patisserie to the Lens of Bengaluru’s Startups.
              </h2>

              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                Before picking up the camera rig, my crucible was the kitchen. As an artisanal baker, founder of <strong className="text-white">Vaada Bakes</strong>, a <strong className="text-white">MasterChef India contestant</strong>, and <strong className="text-white">Runner-up in Odisha Top Chef</strong>, I learned that excellence is never accidental. In high-end pastry, a two-degree shift in chocolate tempering or three grams of fat alters the entire outcome.
              </p>

              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                That obsessive discipline was captured in my published chapter, <strong className="text-[#E89A3C]">‘A Platter with My Signature’</strong> (featured in <em>Growth Mindset: It’s All You Need to Succeed</em>) documenting how high standards and relentless self-reinvention shape enduring craft.
              </p>

              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                Paired with a formal background in <strong className="text-white">business administration</strong>, that operational rigor forms the commercial backbone founders look for. I don’t approach video as just aesthetic portfolio pieces I build visual assets through the lens of brand positioning, audience retention, and founder conviction.
              </p>

              {/* The Rig & Mindset Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#121218] border border-[#22222E]">
                  <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider mb-1">
                    <Camera className="w-4 h-4 text-[#E89A3C]" />
                    <span>The Production Arsenal</span>
                  </div>
                  <p className="text-xs text-[#8A8A96] leading-relaxed">
                    Powered by a dedicated <strong>Canon EOS 200D Mark II</strong>, a mechanically balanced <strong>DJI RS 3 Mini 3-axis gimbal</strong>, and high-fidelity directional audio for clean run-and-gun motion.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121218] border border-[#22222E]">
                  <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#E89A3C]" />
                    <span>Founder-to-Founder</span>
                  </div>
                  <p className="text-xs text-[#8A8A96] leading-relaxed">
                    Zero bureaucracy. You collaborate directly with a creative director who understands both the sweat equity of building a brand from scratch and the narrative levers that move tech.
                  </p>
                </div>
              </div>

            </div>

          </div>,
              ...TEAM.map((m) => <TeamSlide key={m.id} m={m} />),
            ]}
          />
        </div>
      </section>

      {/* ---------------- BEHIND THE LENS / ON-LOCATION BTS SECTION ---------------- */}
      <section id="bts" className="relative z-10 py-24 bg-[#08080B] border-b border-[#1C1C24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#171722] border border-[#262638] text-xs font-mono text-[#E89A3C] mb-3">
                <Clapperboard className="w-3.5 h-3.5" />
                <span>ON-LOCATION PRODUCTION ARCHIVE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white">
                Behind The Lens & Field Work.
              </h2>
              <p className="text-[#8E8E98] text-sm sm:text-base mt-2 max-w-xl">
                Actual stills and field captures from our recent brand shoots, commercial kitchen tracking, and gimbal setups.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-[#A1A1AA]">
              <span className="w-2 h-2 rounded-full bg-[#34D399]" />
              <span>Live production equipment & shoots</span>
            </div>
          </div>

          {/* BTS Grid - 6 Actual Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BTS_GALLERY.map((bts) => (
              <div
                key={bts.id}
                onClick={() => setSelectedBts(bts)}
                className="group relative rounded-2xl overflow-hidden bg-[#111117] border border-[#20202A] hover:border-[#E89A3C]/60 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E89A3C]/10"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <img
                    src={bts.image}
                    alt={bts.title}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500 opacity-90 group-hover:opacity-100 block"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `./${bts.image}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111117] via-transparent to-black/20" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] font-mono text-[#E89A3C] border border-[#E89A3C]/30">
                      {bts.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md text-white">
                      <Maximize2 className="w-3.5 h-3.5 text-[#E89A3C]" />
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#787884] block mb-1">
                      {bts.location}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#E89A3C] transition-colors leading-snug">
                      {bts.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#8A8A96] leading-relaxed line-clamp-2">
                      {bts.caption}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#1C1C26] flex items-center justify-between text-[10px] text-[#A1A1AA] font-mono">
                    <span className="text-[#E89A3C]">Inspect Full Frame</span>
                    <ChevronRight className="w-3 h-3 text-[#E89A3C]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BTS Footer Strip */}
          <div className="mt-8 p-4 rounded-xl bg-[#0D0D12] border border-[#1D1D26] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A7A88]">
            <div className="flex items-center gap-2.5">
              <Camera className="w-4 h-4 text-[#E89A3C]" />
              <span>Real rigs on real shoots: from tabletop macro espresso pulls to 3-axis Ronin kinetic tracking.</span>
            </div>
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#181822] hover:bg-[#20202E] text-white border border-[#2C2C3A] text-xs font-semibold whitespace-nowrap"
            >
              Book A Shoot
            </button>
          </div>

        </div>
      </section>

      {/* ---------------- THE PRODUCTION RIG & CRAFT ---------------- */}
      <section id="craft" className="relative z-10 py-24 bg-[#0A0A0E] border-t border-[#1C1C24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E89A3C]/10 border border-[#E89A3C]/20 text-xs font-mono text-[#E89A3C] mb-3">
              <span>THE ARSENAL & METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Kinetic Camera & Fluid Mechanics.
            </h2>
            <p className="text-[#8E8E98] text-sm sm:text-base mt-3">
              We eliminated static, lifeless corporate setups. Our production workflow is built on continuous tracking, dynamic angles, and tactile light.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#111117] border border-[#20202A] hover:border-[#E89A3C]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#E89A3C]/10 border border-[#E89A3C]/25 flex items-center justify-center text-[#E89A3C] mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">DJI RS 3 Mini Gimbal</h3>
              <p className="text-xs text-[#83838E] leading-relaxed">
                Zero micro-jitters. Fluid follow-focus shots tracking founders walking through tech parks, office spaces, and demo setups.
              </p>
              <div className="mt-4 pt-4 border-t border-[#1A1A24] font-mono text-[10px] text-[#A1A1AA]">
                • High-speed rotational balance<br />
                • Seamless horizontal & vertical locks
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111117] border border-[#20202A] hover:border-[#E89A3C]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#E89A3C]/10 border border-[#E89A3C]/25 flex items-center justify-center text-[#E89A3C] mb-4">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Canon 200D II Optics</h3>
              <p className="text-xs text-[#83838E] leading-relaxed">
                Dual Pixel CMOS autofocus ensuring razor-sharp subject isolation, natural skin tones, and rich depth of field.
              </p>
              <div className="mt-4 pt-4 border-t border-[#1A1A24] font-mono text-[10px] text-[#A1A1AA]">
                • High Dynamic Range capture<br />
                • Intimate portrait & macro framing
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111117] border border-[#20202A] hover:border-[#E89A3C]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#E89A3C]/10 border border-[#E89A3C]/25 flex items-center justify-center text-[#E89A3C] mb-4">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Directional Voice Audio</h3>
              <p className="text-xs text-[#83838E] leading-relaxed">
                Audio is over 60% of vertical video retention. Crisp vocal capture paired with punchy, deliberate sound design and risers.
              </p>
              <div className="mt-4 pt-4 border-t border-[#1A1A24] font-mono text-[10px] text-[#A1A1AA]">
                • Low-noise wireless mic rig<br />
                • Bespoke Foley & impact sound stems
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111117] border border-[#20202A] hover:border-[#E89A3C]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#E89A3C]/10 border border-[#E89A3C]/25 flex items-center justify-center text-[#E89A3C] mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">The Amber Color Grade</h3>
              <p className="text-xs text-[#83838E] leading-relaxed">
                Our signature warm grade: subtle tungsten glow, restrained contrast, and filmic texture tailored for mobile screens and OLED feeds.
              </p>
              <div className="mt-4 pt-4 border-t border-[#1A1A24] font-mono text-[10px] text-[#A1A1AA]">
                • Handcrafted LUT pipeline<br />
                • Optimized for Instagram & LinkedIn
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- 3 PRICING PACKAGES (TURNAROUND EXCLUDED) ---------------- */}
      <section id="packages" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#181822] border border-[#262636] text-xs font-mono text-[#E89A3C] mb-3">
              <span>SIMPLE & TRANSPARENT PACKAGES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Built for Startups. Scaled to Your Stage.
            </h2>
            <p className="text-[#8E8E98] text-sm sm:text-base mt-3">
              Clear, monthly retained workflows and event production models. No hidden production agency fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PACKAGES.map((pkg) => {
              const isSelected = activePackage.id === pkg.id;
              return (
                <div
            key={pkg.id}
            onClick={() => {
              setActivePackage(pkg);
              setBookingForm((prev) => ({ ...prev, selectedPkg: `${pkg.name} (${pkg.priceDisplay})` }));
            }}
            className={`cursor-pointer rounded-2xl p-7 transition-all flex flex-col justify-between relative ${
                    isSelected
                      ? "bg-[#14141E] border-2 border-[#E89A3C] shadow-2xl shadow-[#E89A3C]/15"
                      : "bg-[#0E0E14] border border-[#20202A] hover:border-[#2D2D3B]"
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3.5 left-7">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#E89A3C] to-[#D97706] text-[10px] font-bold text-black uppercase tracking-wider shadow">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-white mt-2">{pkg.name}</h3>
                    <p className="text-xs text-[#82828E] mt-1">{pkg.tagline}</p>

                    <div className="mt-6 pb-6 border-b border-[#1E1E28]">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-white">{pkg.priceDisplay}</span>
                        <span className="text-xs text-[#8A8A96]">{pkg.pricePeriod}</span>
                      </div>
                      <div className="text-[11px] text-[#E89A3C] font-mono mt-1 font-semibold">
                        {pkg.pricingNote}
                      </div>
                    </div>

                    <div className="mt-5">
                      <span className="text-[11px] uppercase tracking-wider font-mono text-[#A1A1AA]">Ideal For:</span>
                      <p className="text-xs text-[#D1D1D8] mt-1 leading-relaxed">{pkg.idealFor}</p>
                    </div>

                    {/* Features list */}
                    <div className="mt-6 space-y-3">
                      <span className="text-[11px] uppercase tracking-wider font-mono text-[#71717A]">What's Included:</span>
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E1E1E8]">
                          <CheckCircle2 className="w-4 h-4 text-[#E89A3C] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#1C1C26]">
                    <button
                      onClick={() => {
                        setActivePackage(pkg);
                        setBookingForm((prev) => ({ ...prev, selectedPkg: `${pkg.name} (${pkg.priceDisplay})` }));
                        setShowBookingModal(true);
                      }}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-gradient-to-r from-[#E89A3C] to-[#D97706] text-black shadow-lg shadow-[#E89A3C]/20 hover:brightness-110"
                          : "bg-[#181822] text-[#E4E4E7] border border-[#2B2B38] hover:bg-[#20202C] hover:text-white"
                      }`}
                    >
                      <span>Choose {pkg.name.split(" ")[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>


        </div>
      </section>

      {/* ---------------- FINAL CTA BANNER ---------------- */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-[#0A0A0E] via-[#121118] to-[#08080B] border-t border-[#1E1E28]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E89A3C] to-[#B45309] p-[1.5px] mx-auto mb-6 shadow-2xl shadow-[#E89A3C]/20">
            <div className="w-full h-full bg-[#0E0E12] rounded-[14px] flex items-center justify-center">
              <span className="font-serif text-[#FBBF24] text-2xl font-bold">वा</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to give your startup the cinema it deserves?
          </h2>
          <p className="mt-4 text-[#9C9CA8] text-sm sm:text-base max-w-xl mx-auto">
            Direct collaboration with founder Rajat Raghavendra Munavalli. Reserve your monthly production slot today.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#E89A3C] via-[#F59E0B] to-[#D97706] text-black font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-[#E89A3C]/25 hover:brightness-110 hover:scale-[1.02] transition-all"
            >
              Initiate Project Inquiry
            </button>
            <button
              onClick={() => {
                const btsEl = document.getElementById("bts");
                btsEl?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#15151D] border border-[#2B2B38] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#1E1E29] transition-all flex items-center justify-center gap-2"
            >
              <Clapperboard className="w-3.5 h-3.5 text-[#E89A3C]" />
              Explore BTS Gallery
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="relative z-10 py-12 bg-[#050507] border-t border-[#181820] text-xs text-[#6F6F7C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#E89A3C]/20 flex items-center justify-center font-serif text-[#E89A3C] font-bold text-xs">
              वा
            </div>
            <span className="text-white font-black tracking-widest text-xs uppercase">
              VAADA PRODUCTIONS
            </span>
            <span className="text-[#3F3F4A]">|</span>
            <span>Bengaluru, India</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#story" className="hover:text-white transition-colors">Manifesto</a>
            <a href="#founder" className="hover:text-white transition-colors">About Team</a>
            <a href="#bts" className="hover:text-white transition-colors">Behind The Lens</a>
            <a href="#packages" className="hover:text-white transition-colors">Pricing</a>
          </div>


        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-[#101017] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#52525E]">
          <div>
            © {new Date().getFullYear()} Vaada Productions. Founded by Rajat Raghavendra Munavalli. All Rights Reserved.
          </div>
          <div className="font-mono text-[#E89A3C]/70">
            ‘The promise made. The cinema delivered.’
          </div>
        </div>
      </footer>

      {/* ---------------- BTS EXPANDED MODAL ---------------- */}
      {selectedBts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-150">
          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-[#121218] border border-[#2B2B38] shadow-2xl">
            <div className="p-4 bg-[#0A0A0E] flex items-center justify-between border-b border-[#20202A]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E89A3C]" />
                <span className="text-xs font-mono text-white tracking-widest uppercase">
                  BTS STILL // {selectedBts.tag}
                </span>
              </div>
              <button
                onClick={() => setSelectedBts(null)}
                className="p-1 rounded-lg text-[#888894] hover:text-white hover:bg-[#1E1E26] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedBts.image}
                alt={selectedBts.title}
                className="w-full h-full object-contain bg-black"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `./${selectedBts.image}`;
                }}
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
                {selectedBts.location}
              </div>
            </div>

            <div className="p-5 bg-[#0E0E14] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <h4 className="text-sm font-bold text-white">{selectedBts.title}</h4>
                <p className="text-[#8E8E9A] mt-1">{selectedBts.caption}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedBts(null);
                  setShowBookingModal(true);
                }}
                className="px-4 py-2 rounded-lg bg-[#E89A3C] hover:bg-[#F59E0B] text-black text-xs font-bold uppercase tracking-wider whitespace-nowrap self-start sm:self-auto"
              >
                Book This Rig & Setup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- PROJECT SPEC INSPECTOR MODAL ---------------- */}
      {selectedPortfolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#111117] border border-[#2B2B38] p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#20202A] pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#E89A3C] uppercase tracking-widest">{selectedPortfolio.category}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{selectedPortfolio.title}</h3>
                <span className="text-xs text-[#82828E]">Client: {selectedPortfolio.client}</span>
              </div>
              <button
                onClick={() => setSelectedPortfolio(null)}
                className="p-1.5 rounded-lg text-[#888894] hover:text-white hover:bg-[#1C1C24]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-[#22222E]">
                <img
                  src={selectedPortfolio.thumbnail}
                  alt={selectedPortfolio.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                  {selectedPortfolio.duration}
                </div>
              </div>

              <p className="text-xs text-[#A1A1AC] leading-relaxed">
                {selectedPortfolio.description}
              </p>

              <div className="p-3.5 rounded-xl bg-[#09090D] border border-[#1E1E28] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#72727E] font-mono">Performance Impact:</span>
                  <span className="font-bold text-[#34D399]">{selectedPortfolio.metrics}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#72727E] font-mono">Camera & Rigging:</span>
                  <span className="text-white font-mono">{selectedPortfolio.gearUsed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#72727E] font-mono">Scope Delivered:</span>
                  <span className="text-[#E89A3C] font-mono">{selectedPortfolio.deliverables}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedPortfolio(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[#8C8C96] hover:bg-[#1B1B22]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedPortfolio(null);
                  setBookingForm((prev) => ({
                    ...prev,
                    brief: `Interested in a look and feel similar to: ${selectedPortfolio.title} (${selectedPortfolio.client})`
                  }));
                  setShowBookingModal(true);
                }}
                className="px-4 py-2 rounded-lg bg-[#E89A3C] hover:bg-[#F59E0B] text-black text-xs font-bold uppercase tracking-wider"
              >
                Inquire With Similar Style
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- PROJECT INQUIRY MODAL ---------------- */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#111117] border border-[#2F2F3F] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-[#20202A] pb-4 mb-6">
              <div>
                <span className="text-[11px] font-mono text-[#E89A3C] uppercase tracking-widest">
                  // PROJECT INQUIRY
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Connect With Vaada Productions
                </h3>
                <p className="text-xs text-[#80808C] mt-1">
                  Direct inquiry for founder reels, launch drops, or monthly retained content.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setBookingSubmitted(false);
                  setBookingError("");
                }}
                className="p-1.5 rounded-lg text-[#888894] hover:text-white hover:bg-[#1C1C24]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E89A3C]/20 border border-[#E89A3C] flex items-center justify-center mx-auto text-[#E89A3C]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-[#A0A0AC] max-w-sm mx-auto leading-relaxed">
                  Thank you! Rajat will personally review your requirements and reach out to discuss the creative direction and shoot schedule.
                </p>
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    setBookingSubmitted(false);
                  setBookingError("");
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#1D1D26] hover:bg-[#252532] text-xs font-bold text-white uppercase tracking-wider"
                >
                  Return to Site
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#9E9EAA] font-mono mb-1.5">Founder / Lead Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={bookingForm.founderName}
                      onChange={(e) => setBookingForm({ ...bookingForm, founderName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-[#232330] text-white focus:outline-none focus:border-[#E89A3C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#9E9EAA] font-mono mb-1.5">Company / Product Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. NovaTech"
                      value={bookingForm.companyName}
                      onChange={(e) => setBookingForm({ ...bookingForm, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-[#232330] text-white focus:outline-none focus:border-[#E89A3C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#9E9EAA] font-mono mb-1.5">Direct Work Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="founder@yourcompany.com"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-[#232330] text-white focus:outline-none focus:border-[#E89A3C]"
                  />
                </div>

                <div>
                  <label className="block text-[#9E9EAA] font-mono mb-1.5">Selected Package</label>
                  <select
                    value={bookingForm.selectedPkg}
                    onChange={(e) => setBookingForm({ ...bookingForm, selectedPkg: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-[#232330] text-white focus:outline-none focus:border-[#E89A3C]"
                  >
                    <option value="Founder Brand Sprint (₹50,000)">Founder Brand Sprint (4 Reels - ₹50,000 / mo)</option>
                    <option value="Product Launch Cut (Demand Based)">Product Launch Cut (Demand Based / Custom)</option>
                    <option value="Full Narrative Suite (₹1,20,000)">Full Narrative Suite (2 Reels/wk + Carousels - ₹1,20,000 / mo)</option>
                    <option value="Custom Event / Milestone">Custom Milestone / Event Scope</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#9E9EAA] font-mono mb-1.5">Production Location</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Bengaluru (In-Person)", "Outside Bengaluru"].map((loc) => (
                      <button
                        type="button"
                        key={loc}
                        onClick={() => setBookingForm({ ...bookingForm, location: loc })}
                        className={`py-2 px-3 rounded-lg border text-xs text-left transition-all ${
                          bookingForm.location === loc
                            ? "bg-[#1C1C26] border-[#E89A3C] text-white font-bold"
                            : "bg-[#09090D] border-[#22222E] text-[#82828E]"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#9E9EAA] font-mono mb-1.5">Brief / Vision for Content</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you are building, your audience, or target goals for video..."
                    value={bookingForm.brief}
                    onChange={(e) => setBookingForm({ ...bookingForm, brief: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#09090D] border border-[#232330] text-white focus:outline-none focus:border-[#E89A3C] text-xs resize-none"
                  />
                </div>

                <div className="pt-2">
                {bookingError && (
                  <p className="mb-3 text-xs text-red-400 text-center">{bookingError}</p>
                )}
                <button
                  type="submit"
                  disabled={bookingSending}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E89A3C] to-[#D97706] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#E89A3C]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{bookingSending ? "Sending..." : "Submit Project Inquiry"}</span>
                </button>
                  <p className="text-[10px] text-center text-[#5E5E6C] mt-2 font-mono">
                    Protected by the Vaada Commitment • Direct Founder Access
                  </p>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
