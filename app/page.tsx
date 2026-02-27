"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useInView, animate, useTransform } from "framer-motion";
import { Menu, X, Play, Heart, TrendingUp, ShoppingBag, MessageSquare, PlusCircle, Package, Store, Bell, CheckCircle2, Video, Users, ChevronRight, Star, Quote, ChevronLeft, Download, ShieldCheck, DollarSign, BadgeCheck, Facebook, Twitter, Instagram, Youtube, Globe, ChevronDown } from "lucide-react";

// DATA ZA FEATURES

const featuresData = [
  {
    id: 0, badge: "Discover", color: "pink",
    title: "Watch, Create & Discover",
    desc: "Dive into a feed tailored perfectly to your vibe. Experience the best short-form videos, unleash your creativity with viral tools, and discover what's trending.",
    img: "/images/reel.png"
  },
  {
    id: 1, badge: "Commerce", color: "blue",
    title: "Shop The Trends & Sell",
    desc: "Turn your likes into leads instantly. Discover unique products from top creators, shop seamlessly, and sell directly to your community without leaving the app.",
    img: "/images/shop-home.png"
  },
  {
    id: 2, badge: "Community", color: "yellow",
    title: "Join Your Tribe & Go Live",
    desc: "Find your people. Build deep connections in moderated social spaces, host real-time streams, and interact with your audience face-to-face.",
    img: "/images/community.png"
  },
  {
    id: 3, badge: "Connect", color: "emerald",
    title: "Deep & Secure Conversations",
    desc: "More than just followers. Slide into DMs that feel different. Negotiate deals, secure orders, or just catch up in a fast and private space.",
    img: "/images/messages.png"
  },
  {
    id: 4, badge: "Monetize", color: "purple",
    title: "Track Your Digital Hustle",
    desc: "Watch your creativity pay off. Track your earnings from gifts, product sales, and tips all in one transparent, easy-to-use dashboard.",
    img: "/images/revenue.png"
  }
];

// ==========================================
// DATA ZA USHUHUDA 
// ==========================================
const testimonials = [
  { name: "Elena Rodriguez", role: "Content Creator", type: "CREATOR", text: "WhapVibez completely transformed my content game. The monetization tools are seamless, and withdrawing my earnings takes literally seconds.", color: "from-primary to-secondary", shadow: "shadow-primary/20" },
  { name: "Marcus Chen", role: "Verified Buyer", type: "SHOPPER", text: "The fastest checkout I've ever experienced! I literally watch a reel, see a hoodie I like, and buy it in two taps without leaving the video.", color: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/20" },
  { name: "Sarah's Boutique", role: "Store Owner", type: "VENDOR", text: "As a small business owner, the integrated shop changed everything. My inventory sells out in hours because of the community engagement.", color: "from-purple-500 to-pink-600", shadow: "shadow-purple-500/20" },
  { name: "Jordan Lee", role: "Live Streamer", type: "STREAMER", text: "Live streaming here feels so personal. Plus, receiving virtual gifts that translate directly to my bank account is unmatched motivation.", color: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/20" },
  { name: "Amara Singh", role: "Daily User", type: "COMMUNITY", text: "The community features are incredibly well-moderated. It feels like a safe, high-energy space to vibe, chat, and meet people with similar tastes.", color: "from-orange-500 to-red-500", shadow: "shadow-orange-500/20" }
];

// ==========================================
// MTAMBO WA NAMBA (STATS)
// ==========================================
const CompactStatCard = ({ icon: Icon, from, to, suffix, text, colorClass }: any) => {
  const nodeRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(nodeRef, { once: false, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration: 2.0,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.floor(value).toLocaleString() + suffix;
          }
        },
      });
      return () => controls.stop();
    } else if (!inView && nodeRef.current) {
      nodeRef.current.textContent = from.toLocaleString() + suffix;
    }
  }, [inView, from, to, suffix]);

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-100 p-4 md:p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 transition-all duration-300 hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${colorClass} flex items-center justify-center flex-shrink-0 text-white shadow-md`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col text-left">
        <p ref={nodeRef} className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-none mb-1">
          {from}{suffix}
        </p>
        <p className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-wider">{text}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hiddenNav, setHiddenNav] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // HERO SECTION AUTO-SWAP
  const [activeHero, setActiveHero] = useState<'shop' | 'messages'>('shop');
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHero((prev) => (prev === 'shop' ? 'messages' : 'shop'));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // MTAMBO WA KU TRACK ACTIVE NAV LINK
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'testimonials', 'download'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // NAVBAR SCROLL HIDE
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setHiddenNav(true);
      setIsMenuOpen(false);
    } else {
      setHiddenNav(false);
    }
  });

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // MTAMBO WA ONE-TICK SCROLL (FEATURES SECTION)
  const containerRef = useRef<HTMLElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.08], [0, -30]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let newIndex = 0;
    if (latest > 0.1 && latest <= 0.3) newIndex = 1;
    else if (latest > 0.3 && latest <= 0.5) newIndex = 2;
    else if (latest > 0.5 && latest <= 0.7) newIndex = 3;
    else if (latest > 0.7) newIndex = 4;
    if (newIndex !== activeFeature) setActiveFeature(newIndex);
  });

  // MTAMBO WA 3D SLIDESHOW
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); 
    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <main className="min-h-screen bg-[#F5F5F7] relative font-sans text-[#1D1D1F] selection:bg-pink-200">
      
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-secondary/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* ==========================================
          NAVBAR
      ========================================== */}
      <motion.nav variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: "-150%", opacity: 0 } }} animate={hiddenNav ? "hidden" : "visible"} transition={{ duration: 0.4, ease: "easeInOut" }} className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-[999]">
        <div className="bg-white/90 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-5 md:px-6 py-3 md:py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <Image src="/images/logo1.png" alt="WhapVibez Logo" width={56} height={56} className="w-9 h-9 md:w-12 md:h-12 object-contain rounded-xl shadow-md" />
            <span className="font-extrabold text-lg md:text-2xl tracking-tight text-gray-900">WhapVibez</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm md:text-base font-bold text-gray-600">
            <button onClick={() => scrollToSection('home')} className={`${activeSection === 'home' ? 'text-primary font-extrabold' : 'hover:text-primary'} transition-colors`}>Home</button>
            <button onClick={() => scrollToSection('features')} className={`${activeSection === 'features' ? 'text-primary font-extrabold' : 'hover:text-primary'} transition-colors`}>Features</button>
            <button onClick={() => scrollToSection('testimonials')} className={`${activeSection === 'testimonials' ? 'text-primary font-extrabold' : 'hover:text-primary'} transition-colors`}>Testimonials</button>
          </div>
          <div className="hidden md:block">
            <button onClick={() => scrollToSection('download')} className="bg-gradient-to-r from-primary to-secondary  text-white px-7 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
              Get Started
            </button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-900 p-2 bg-gray-100/50 rounded-full">
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 10, scale: 1 }} className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-3xl border border-white/50 rounded-3xl flex flex-col items-center py-6 gap-6 shadow-2xl mt-2">
            <button onClick={() => scrollToSection('home')} className={`text-lg ${activeSection === 'home' ? 'text-primary font-extrabold' : 'text-gray-800 font-bold hover:text-primary'}`}>Home</button>
            <button onClick={() => scrollToSection('features')} className={`text-lg ${activeSection === 'features' ? 'text-primary font-extrabold' : 'text-gray-800 font-bold hover:text-primary'}`}>Features</button>
            <button onClick={() => scrollToSection('testimonials')} className={`text-lg ${activeSection === 'testimonials' ? 'text-primary font-extrabold' : 'text-gray-800 font-bold hover:text-primary'}`}>Testimonials</button>
            <button onClick={() => scrollToSection('download')} className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full font-bold mt-2 shadow-lg shadow-primary/30">Get Started</button>
          </motion.div>
        )}
      </motion.nav>

      {/* ==========================================
          SECTION 1: HERO SECTION
      ========================================== */}
      <section id="home" className="w-full max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative z-10 min-h-[85vh]">
        <div className="w-full lg:w-[45%] flex flex-col items-center text-center lg:items-start lg:text-left gap-6 z-30 pt-4 md:pt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-1.5 rounded-full border bg-secondary/10 bg-secondary/10 text-primary text-[10px] md:text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 shadow-sm">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" /> The Future of Social
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[2.5rem] sm:text-5xl lg:text-[4.2rem] font-extrabold text-gray-900 leading-[1.05] tracking-tight">
            Create, Go Live, <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Shop & Connect</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-500 text-base md:text-xl max-w-md leading-relaxed font-medium">
            The ultimate social destination where your creativity meets your community. Stream, shop, and vibe—all in one place.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-row items-center justify-center lg:justify-start gap-3 md:gap-4 mt-4 w-full">
            <button className="flex items-center justify-center gap-2 sm:gap-3 bg-gray-900 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl hover:bg-black transition-all transform hover:scale-105 shadow-xl shadow-gray-900/20">
              <svg viewBox="0 0 384 512" fill="currentColor" className="w-5 h-5 sm:w-7 sm:h-7"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              <div className="flex flex-col items-start"><span className="text-[8px] sm:text-[10px] leading-tight text-gray-300">Download on the</span><span className="text-xs sm:text-lg font-bold leading-tight">App Store</span></div>
            </button>
            <button className="flex items-center justify-center gap-2 sm:gap-3 bg-white border border-gray-200 text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-sm">
              <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5 sm:w-7 sm:h-7 text-gray-900"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
              <div className="flex flex-col items-start"><span className="text-[8px] sm:text-[10px] leading-tight text-gray-500 uppercase font-semibold">GET IT ON</span><span className="text-xs sm:text-lg font-bold leading-tight">Google Play</span></div>
            </button>
          </motion.div>
        </div>

        <div className="w-full lg:w-[55%] relative flex items-start justify-center h-[450px] sm:h-[480px] md:h-[550px] mt-8 lg:mt-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
          <div className="relative w-[250px] sm:w-[280px] md:w-[300px] h-full">
            <motion.div animate={{ scale: activeHero === 'shop' ? 1 : 0.85, zIndex: activeHero === 'shop' ? 20 : 10, rotate: activeHero === 'shop' ? 0 : -8, x: activeHero === 'shop' ? 0 : -30, opacity: activeHero === 'shop' ? 1 : 0.4, filter: activeHero === 'shop' ? 'blur(0px)' : 'blur(4px)' }} transition={{ duration: 0.8, ease: "easeInOut" }} className="absolute top-0 w-full h-[550px] sm:h-[650px] bg-white rounded-[2.5rem] border-[8px] border-white shadow-[0_30px_60px_rgb(0,0,0,0.15)] overflow-hidden">
              <Image src="/images/shop-home.png" alt="Shop Feed" fill className="object-cover" priority />
            </motion.div>
            
            <motion.div animate={{ opacity: activeHero === 'shop' ? 1 : 0, scale: activeHero === 'shop' ? 1 : 0.8, y: activeHero === 'shop' ? 0 : 20 }} transition={{ duration: 0.5, delay: activeHero === 'shop' ? 0.3 : 0 }} className="absolute top-[15%] -right-4 sm:-right-8 z-30 bg-white/95 backdrop-blur-xl border border-gray-100 p-2 rounded-xl shadow-xl flex items-center gap-2 w-max pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><TrendingUp className="w-4 h-4" /></div>
              <div className="pr-1"><p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">New Orders</p><p className="text-xs text-gray-900 font-extrabold">+ TZS 45k</p></div>
            </motion.div>
            <motion.div animate={{ opacity: activeHero === 'shop' ? 1 : 0, scale: activeHero === 'shop' ? 1 : 0.8, x: activeHero === 'shop' ? 0 : -20 }} transition={{ duration: 0.5, delay: activeHero === 'shop' ? 0.5 : 0 }} className="absolute top-[40%] -left-6 sm:-left-10 z-30 bg-white/95 backdrop-blur-xl border border-gray-100 p-1.5 sm:p-2 rounded-full shadow-xl flex items-center gap-2 w-max pointer-events-none">
              <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-primary"><Store className="w-3 h-3" /></div>
              <p className="text-[9px] sm:text-[10px] text-gray-800 font-bold pr-2">Create Shop</p>
            </motion.div>
            <motion.div animate={{ opacity: activeHero === 'shop' ? 1 : 0, scale: activeHero === 'shop' ? 1 : 0.8, y: activeHero === 'shop' ? 0 : -20 }} transition={{ duration: 0.5, delay: activeHero === 'shop' ? 0.7 : 0 }} className="absolute bottom-[40%] md:bottom-[35%] -right-4 sm:-right-6 z-30 bg-white/95 backdrop-blur-xl border border-gray-100 p-1.5 sm:p-2 rounded-full shadow-xl flex items-center gap-2 w-max pointer-events-none">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><PlusCircle className="w-3 h-3" /></div>
              <p className="text-[9px] sm:text-[10px] text-gray-800 font-bold pr-2">Add Products</p>
            </motion.div>
            <motion.div animate={{ opacity: activeHero === 'shop' ? 1 : 0, scale: activeHero === 'shop' ? 1 : 0.8, x: activeHero === 'shop' ? 0 : 20 }} transition={{ duration: 0.5, delay: activeHero === 'shop' ? 0.9 : 0 }} className="absolute bottom-[20%] md:bottom-[15%] -left-4 sm:-left-8 z-30 bg-white/95 backdrop-blur-xl border border-gray-100 p-2 rounded-xl shadow-xl flex items-center gap-2 w-max pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500"><Package className="w-4 h-4" /></div>
              <div className="pr-1"><p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Inventory</p><p className="text-xs text-gray-900 font-extrabold">24 Low</p></div>
            </motion.div>

            <motion.div animate={{ scale: activeHero === 'messages' ? 1 : 0.85, zIndex: activeHero === 'messages' ? 20 : 10, rotate: activeHero === 'messages' ? 0 : 8, x: activeHero === 'messages' ? 0 : 30, opacity: activeHero === 'messages' ? 1 : 0.4, filter: activeHero === 'messages' ? 'blur(0px)' : 'blur(4px)' }} transition={{ duration: 0.8, ease: "easeInOut" }} className="absolute top-0 w-full h-[550px] sm:h-[650px] bg-white rounded-[2.5rem] border-[8px] border-white shadow-[0_30px_60px_rgb(0,0,0,0.15)] overflow-hidden">
              <Image src="/images/messages.png" alt="Messages Feed" fill className="object-cover" />
            </motion.div>

            <motion.div animate={{ opacity: activeHero === 'messages' ? 1 : 0, scale: activeHero === 'messages' ? 1 : 0.8, y: activeHero === 'messages' ? 0 : 20 }} transition={{ duration: 0.5, delay: activeHero === 'messages' ? 0.3 : 0 }} className="absolute top-[25%] -left-6 sm:-left-10 z-30 bg-white/95 backdrop-blur-xl border border-gray-100 p-1.5 sm:p-2 rounded-full shadow-xl flex items-center gap-2 w-max pointer-events-none">
              <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center"><Heart className="w-3 h-3 text-primary fill-pink-500" /></div>
              <p className="text-[9px] sm:text-[10px] text-gray-800 font-bold pr-2">Liked product</p>
            </motion.div>
            <motion.div animate={{ opacity: activeHero === 'messages' ? 1 : 0, scale: activeHero === 'messages' ? 1 : 0.8, x: activeHero === 'messages' ? 0 : 20 }} transition={{ duration: 0.5, delay: activeHero === 'messages' ? 0.5 : 0 }} className="absolute top-[45%] -right-4 sm:-right-8 z-30 bg-white/95 backdrop-blur-xl border border-gray-100 p-2 rounded-xl shadow-xl flex items-center gap-2 w-max pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><MessageSquare className="w-4 h-4" /></div>
              <div className="pr-1"><p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">New Message</p><p className="text-[10px] sm:text-xs text-gray-900 font-extrabold">"I placed an order!"</p></div>
            </motion.div>
            <motion.div animate={{ opacity: activeHero === 'messages' ? 1 : 0, scale: activeHero === 'messages' ? 1 : 0.8, y: activeHero === 'messages' ? 0 : -20 }} transition={{ duration: 0.5, delay: activeHero === 'messages' ? 0.7 : 0 }} className="absolute bottom-[35%] md:bottom-[30%] -left-4 sm:-left-8 z-30 bg-white/95 backdrop-blur-xl border border-gray-100 p-1.5 sm:p-2 rounded-full shadow-xl flex items-center gap-2 w-max pointer-events-none">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500"><CheckCircle2 className="w-3 h-3" /></div>
              <p className="text-[9px] sm:text-[10px] text-gray-800 font-bold pr-2">Payment Received</p>
            </motion.div>
            <motion.div animate={{ opacity: activeHero === 'messages' ? 1 : 0, scale: activeHero === 'messages' ? 1 : 0.8, x: activeHero === 'messages' ? 0 : -20 }} transition={{ duration: 0.5, delay: activeHero === 'messages' ? 0.9 : 0 }} className="absolute bottom-[15%] md:bottom-[10%] -right-2 sm:-right-6 z-30 bg-white/95 backdrop-blur-xl border border-gray-100 p-2 rounded-xl shadow-xl flex items-center gap-2 w-max pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500"><Bell className="w-4 h-4" /></div>
              <div className="pr-1"><p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Notification</p><p className="text-xs text-gray-900 font-extrabold">New Follower</p></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SOCIAL PROOF 
      ========================================== */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-16 pt-10 border-t border-gray-200/50 relative z-20">
        <p className="text-center text-[10px] md:text-xs font-bold tracking-widest text-gray-400 uppercase mb-8">Trusted by top creators from</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <motion.div className="flex items-center gap-2 text-gray-400 hover:text-primary transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 transform hover:scale-105"><Video className="w-6 h-6 md:w-7 md:h-7"/> <span className="font-extrabold text-lg md:text-xl tracking-tight">Vlogify</span></motion.div>
          <motion.div className="flex items-center gap-2 text-gray-400 hover:text-purple-500 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 transform hover:scale-105"><ShoppingBag className="w-6 h-6 md:w-7 md:h-7"/> <span className="font-extrabold text-lg md:text-xl tracking-tight">ShopCore</span></motion.div>
          <motion.div className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 transform hover:scale-105"><TrendingUp className="w-6 h-6 md:w-7 md:h-7"/> <span className="font-extrabold text-lg md:text-xl tracking-tight">StreamWave</span></motion.div>
          <motion.div className="flex items-center gap-2 text-gray-400 hover:text-rose-500 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0 transform hover:scale-105"><Users className="w-6 h-6 md:w-7 md:h-7"/> <span className="font-extrabold text-lg md:text-xl tracking-tight">ConnectHub</span></motion.div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: FEATURES (ONE-TICK SCROLL)
      ========================================== */}
      <section ref={containerRef} id="features" className="relative w-full h-[500vh] z-20">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          <div className="w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-16 h-full relative">
            
            {/* TITLE YA KUZIBA GAP KWENYE SIMU TU */}
            <motion.div style={{ opacity: introOpacity, y: introY }} className="md:hidden absolute top-6 left-0 w-full px-6 flex flex-col items-center text-center z-40">
              <span className="px-3 py-1 rounded-full border bg-secondary/10 bg-secondary/10 text-primary text-[10px] font-extrabold tracking-widest uppercase mb-3">About WhapVibez</span>
              <h2 className="text-3xl font-black text-gray-900 leading-[1.1] tracking-tight">Your All-In-One <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Social Universe.</span></h2>
              <p className="text-gray-500 text-sm mt-3">Scroll down to explore features designed to help you connect, create, and earn seamlessly.</p>
            </motion.div>

            {/* MAELEZO */}
            <div className="w-full md:w-1/2 relative h-[45%] md:h-full flex flex-col justify-end md:justify-center items-center text-center md:items-start md:text-left md:pl-8 order-1 md:order-2 z-20 pb-2 md:pb-0">
              <div className="absolute top-1/2 -translate-y-1/2 right-0 md:right-10 text-[10rem] md:text-[20rem] font-black text-gray-200/40 select-none pointer-events-none -z-10">
                0{activeFeature + 1}
              </div>
              <div className="relative w-full max-w-lg h-[220px] md:h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div key={activeFeature} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4, ease: "easeOut" }} className="absolute inset-0 flex flex-col justify-center items-center md:items-start">
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <div className={`px-4 py-1.5 rounded-full border border-${featuresData[activeFeature].color}-200 bg-${featuresData[activeFeature].color}-50 text-${featuresData[activeFeature].color}-600 text-[11px] font-extrabold tracking-widest uppercase flex items-center shadow-sm`}>
                        {featuresData[activeFeature].badge}
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 md:mb-6 leading-[1.1] tracking-tight">
                      {featuresData[activeFeature].title.split('&').map((part, i, arr) => (
                        <span key={i}>
                          {part} 
                          {i < arr.length - 1 && (
                            <>
                              <span className="text-primary">&</span><br/>
                            </>
                          )}
                        </span>
                      ))}
                    </h2>
                    <p className="text-gray-500 text-[15px] md:text-lg leading-relaxed font-medium mb-5 md:mb-8 max-w-sm">{featuresData[activeFeature].desc}</p>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer group w-max">
                      Explore more feature <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="hidden md:flex absolute bottom-10 left-0 items-center gap-4">
                <div className="flex gap-2">
                  {featuresData.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeFeature ? 'bg-primary w-6' : 'bg-gray-300'}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* SIMU ZINAZOPISHANA */}
            <div className="w-full md:w-1/2 h-[55%] md:h-full flex justify-center md:justify-end items-start md:items-center relative order-2 md:order-1 pt-6 md:pt-0">
              <div className="relative w-[240px] sm:w-[280px] md:w-[300px] h-[450px] sm:h-[480px] md:h-[550px] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
                <AnimatePresence mode="popLayout">
                  <motion.div key={`back-${activeFeature}`} initial={{ opacity: 0 }} animate={{ opacity: 0.4, x: -35, y: -10, rotate: -8, scale: 0.85, zIndex: 10, filter: "blur(4px)" }} transition={{ duration: 0.6, ease: "easeOut" }} className="absolute top-0 left-0 w-full h-[550px] sm:h-[600px] md:h-[650px] bg-white rounded-[2.5rem] border-[8px] border-white shadow-xl overflow-hidden">
                    <Image src={featuresData[(activeFeature + 1) % featuresData.length].img} alt="Next Feature" fill className="object-cover" />
                  </motion.div>
                  <motion.div key={`front-${activeFeature}`} initial={{ opacity: 0, x: 50, rotate: 10, scale: 0.9 }} animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, zIndex: 20, filter: "blur(0px)" }} exit={{ opacity: 0, x: -50, rotate: -10, scale: 0.8, zIndex: 30 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute top-0 left-0 w-full h-[550px] sm:h-[600px] md:h-[650px] bg-white rounded-[2.5rem] border-[8px] border-white shadow-[0_30px_60px_rgb(0,0,0,0.15)] overflow-hidden">
                    <Image src={featuresData[activeFeature].img} alt="Active Feature" fill className="object-cover" priority />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* BOUNCING ARROW */}
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="md:hidden absolute bottom-[5%] left-1/2 -translate-x-1/2 text-primary z-50 pointer-events-none drop-shadow-md">
                <ChevronDown className="w-8 h-8" />
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: TESTIMONIALS & STATS
      ========================================== */}
      <section id="testimonials" className="w-full relative z-30 pt-10 pb-32 overflow-hidden">
        
        <div className="text-center mb-6 md:mb-8 relative z-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Everyone.</span></h2>
          <p className="text-gray-500 text-lg font-medium px-4">Hear from the creators, buyers, and vendors defining the vibe.</p>
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="w-full relative h-[380px] md:h-[420px] flex items-center justify-center perspective-1000">
            <AnimatePresence initial={false}>
              {testimonials.map((t, i) => {
                let offset = i - slideIndex;
                if (offset < -2) offset += testimonials.length;
                if (offset > 2) offset -= testimonials.length;
                const isCenter = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;
                const isHidden = Math.abs(offset) > 1;

                return (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{ x: isCenter ? "0%" : isLeft ? "-60%" : isRight ? "60%" : offset < 0 ? "-120%" : "120%", scale: isCenter ? 1 : 0.85, opacity: isCenter ? 1 : isHidden ? 0 : 0.4, zIndex: isCenter ? 30 : isHidden ? 10 : 20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute w-[320px] sm:w-[420px] md:w-[500px] bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_30px_60px_rgb(0,0,0,0.08)] overflow-hidden flex flex-col"
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${t.color}`} />
                    <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${t.color} rounded-full blur-[80px] opacity-20 pointer-events-none`} />
                    <div className="p-8 pb-4 flex items-start justify-between relative z-10">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${t.color} p-[2px] shadow-lg ${t.shadow}`}>
                          <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                            <span className="font-black text-gray-900 text-lg">{t.name.charAt(0)}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg flex items-center gap-1">{t.name} <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-100" /></h4>
                          <span className={`text-[10px] font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r ${t.color}`}>{t.type}</span>
                        </div>
                      </div>
                      <Quote className="w-8 h-8 text-gray-200" />
                    </div>
                    <div className="px-8 pb-8 pt-2 relative z-10">
                      <p className="text-gray-600 text-[15px] md:text-lg font-medium leading-relaxed">"{t.text}"</p>
                      <div className="flex items-center gap-1 mt-6">
                        {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6 mt-4 relative z-40">
            <button onClick={prevSlide} className="hidden md:flex w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 items-center justify-center text-gray-600 hover:text-primary hover:bg-secondary/10 shadow-sm transition-all hover:scale-110 active:scale-95"><ChevronLeft className="w-5 h-5" /></button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${i === slideIndex ? 'bg-primary w-6' : 'bg-gray-300'}`} />)}
            </div>
            <button onClick={nextSlide} className="hidden md:flex w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary items-center justify-center text-white shadow-lg shadow-primary/30 transition-all hover:scale-110 active:scale-95"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-16 md:mt-20 relative z-30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <CompactStatCard icon={Download} from={0} to={100} suffix="K+" text="Active Users & Downloads" colorClass="from-primary to-secondary" />
            <CompactStatCard icon={ShieldCheck} from={0} to={15} suffix="K+" text="Verified Global Creators" colorClass="from-blue-500 to-indigo-500" />
            <CompactStatCard icon={DollarSign} from={0} to={2} suffix="B+" text="TZS Earned by Community" colorClass="from-purple-500 to-pink-500" />
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: CTA (GET STARTED)
      ========================================== */}
      <section id="download" className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-20 relative z-30">
        <div className="relative w-full rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-primary to-secondary overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-16 pt-10 md:pt-12 pb-0">
          
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M100 0 C 80 50, 20 50, 0 100" stroke="white" strokeWidth="0.5" fill="none" className="opacity-30" />
              <path d="M100 20 C 70 60, 30 40, 0 80" stroke="white" strokeWidth="0.5" fill="none" className="opacity-30" />
              <path d="M100 40 C 60 70, 40 30, 0 60" stroke="white" strokeWidth="0.5" fill="none" className="opacity-30" />
            </svg>
          </div>

          <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center text-center md:items-start md:text-left pb-10 md:pb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
              Download our app <br/>
              It's Free <span className="text-pink-200">forever.</span>
            </h2>
            <p className="text-pink-100/90 text-base md:text-lg font-medium mb-8 max-w-sm leading-relaxed">
              Stay connected, shop directly from streams, and grow your community. 
            </p>
            
            <div className="flex flex-row items-center justify-center md:justify-start gap-2 sm:gap-3 w-full">
              <button className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-3 bg-gray-900 text-white px-2 sm:px-5 py-2.5 sm:py-3 rounded-2xl hover:bg-black transition-all transform hover:scale-105 shadow-xl">
                <svg viewBox="0 0 384 512" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                <div className="flex flex-col items-start"><span className="text-[8px] sm:text-[10px] leading-none text-gray-300">Download on the</span><span className="text-[11px] sm:text-base font-bold leading-none mt-0.5">App Store</span></div>
              </button>
              <button className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-3 bg-white text-gray-900 px-2 sm:px-5 py-2.5 sm:py-3 rounded-2xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl">
                <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                <div className="flex flex-col items-start"><span className="text-[8px] sm:text-[10px] leading-none text-gray-500 uppercase font-semibold">GET IT ON</span><span className="text-[11px] sm:text-base font-bold leading-none mt-0.5">Google Play</span></div>
              </button>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 h-[250px] sm:h-[300px] flex items-start justify-center md:justify-end overflow-hidden [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] mt-6 md:mt-0">
            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute top-10 right-[35%] w-[160px] md:w-[180px] h-[350px] md:h-[390px] bg-white rounded-[2rem] border-[6px] border-white shadow-2xl overflow-hidden rotate-[-10deg] z-10">
              <Image src="/images/messages.png" alt="App Screen" fill className="object-cover" />
            </motion.div>
            <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="absolute top-20 right-[5%] w-[180px] md:w-[200px] h-[390px] md:h-[432px] bg-white rounded-[2rem] border-[6px] border-white shadow-2xl overflow-hidden rotate-[5deg] z-20">
              <Image src="/images/shop-home.png" alt="App Screen" fill className="object-cover" />
            </motion.div>
          </div>

        </div>
      </section>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer className="w-full bg-white pt-20 pb-8 border-t border-gray-100 relative z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-16">
            
            <div className="col-span-2 md:col-span-1 flex flex-col items-start text-left pr-4">
              <div className="flex items-center pb-2 gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
                <Image src="/images/logo1.png" alt="WhapVibez Logo" width={56} height={56} className="w-9 h-9 md:w-12 md:h-12 object-contain rounded-xl shadow-md" />
                <span className="font-extrabold text-lg md:text-2xl tracking-tight text-gray-900">WhapVibez</span>
              </div>
              <p className="text-gray-500 font-medium leading-relaxed text-sm">
                Discover a platform that keeps you and your community connected, entertained, and focused on what matters most.
              </p>
            </div>

            <div className="flex flex-col text-left">
              <h4 className="font-bold text-gray-900 text-lg mb-4 md:mb-6">Quick Link</h4>
              <div className="flex flex-col gap-3">
                <button onClick={() => scrollToSection('home')} className={`${activeSection === 'home' ? 'text-primary font-bold' : 'text-gray-500 hover:text-primary font-medium'} text-left w-max transition-colors text-sm`}>Home</button>
                <button onClick={() => scrollToSection('features')} className={`${activeSection === 'features' ? 'text-primary font-bold' : 'text-gray-500 hover:text-primary font-medium'} text-left w-max transition-colors text-sm`}>Features</button>
                <button onClick={() => scrollToSection('testimonials')} className={`${activeSection === 'testimonials' ? 'text-primary font-bold' : 'text-gray-500 hover:text-primary font-medium'} text-left w-max transition-colors text-sm`}>Testimonials</button>
                <button onClick={() => scrollToSection('download')} className={`${activeSection === 'download' ? 'text-primary font-bold' : 'text-gray-500 hover:text-primary font-medium'} text-left w-max transition-colors text-sm`}>Get Started</button>
              </div>
            </div>

            <div className="flex flex-col text-left">
              <h4 className="font-bold text-gray-900 text-lg mb-4 md:mb-6">About</h4>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-gray-500 font-medium hover:text-primary transition-colors text-sm">Terms & conditions</a>
                <a href="#" className="text-gray-500 font-medium hover:text-primary transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-500 font-medium hover:text-primary transition-colors text-sm">Customer Support</a>
                <a href="#" className="text-gray-500 font-medium hover:text-primary transition-colors text-sm">Contact Us</a>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 flex flex-col text-left">
              <h4 className="font-bold text-gray-900 text-lg mb-4 md:mb-6">Newsletter</h4>
              <p className="text-gray-500 font-medium mb-4 text-sm">Stay up to date with the latest features.</p>
              <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-full p-1.5 focus-within:ring-2 focus-within:ring-pink-200 transition-all">
                <input type="email" placeholder="Enter email here" className="bg-transparent border-none outline-none px-3 w-full text-gray-700 text-sm placeholder-gray-400" />
                <button className="bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs px-5 py-2 rounded-full hover:shadow-lg transition-transform hover:scale-105 active:scale-95 whitespace-nowrap">Subscribe</button>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100 gap-4">
            <div className="flex items-center gap-2 text-gray-600 font-medium text-sm cursor-pointer hover:text-gray-900 transition-colors px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50">
              <Globe className="w-4 h-4" /> English (US)
            </div>
            <p className="text-gray-400 text-sm font-medium text-center">© 2026 WhapVibez. All Rights Reserved</p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-secondary/10 transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-secondary/10 transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-secondary/10 transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-secondary/10 transition-colors"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}