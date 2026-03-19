import React, { useState, useEffect } from "react";
import { 
  FiMenu, FiX, FiCheck, FiUsers, FiCalendar, 
  FiZap, FiPieChart, FiArrowRight, FiActivity, FiLock, FiShield, FiTarget
} from "react-icons/fi"; // npm install react-icons
import Login from "../../Components/Login/login";
import SignUp from "../../Components/Signup/signUp";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [scrolled, setScrolled] = useState(false);
  
  // 🔒 Admin Security States
  const [passInput, setPassInput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const ADMIN_SECRET = "GYMPRO_ADMIN_2026";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: "smooth" });
    }
  };

  const handleAuthToggle = (mode) => {
    if (mode === "signup" && !isAuthorized) {
      setAuthMode("protect");
    } else {
      setAuthMode(mode);
    }
  };

  const verifySecret = () => {
    if (passInput === ADMIN_SECRET) {
      setIsAuthorized(true);
      setAuthMode("signup");
    } else {
      alert("❌ Invalid Developer Key");
      setPassInput("");
    }
  };

  const membershipCycles = [
    { title: "Standard", price: "700", cycle: "Monthly", desc: "Entry-level member tracking." },
    { title: "Quarterly", price: "2000", cycle: "3 Months", desc: "Best for retention.", popular: true },
    { title: "Strategic", price: "3800", cycle: "6 Months", desc: "Long-term commitment." },
    { title: "Annual", price: "7000", cycle: "1 Year", desc: "Elite fitness club cycle." },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white">
      
      {/* 🔷 MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <aside className={`absolute right-0 top-0 h-full w-[280px] bg-white p-8 shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center mb-12">
            <span className="font-black text-indigo-600 text-xl tracking-tighter italic uppercase">GymPro</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-100 rounded-full"><FiX /></button>
          </div>
          <nav className="flex flex-col gap-6 font-bold text-lg text-slate-600">
            <span onClick={() => scrollToSection("features")} className="hover:text-indigo-600 cursor-pointer">Solutions</span>
            <span onClick={() => scrollToSection("plans")} className="hover:text-indigo-600 cursor-pointer">Membership</span>
            <span onClick={() => scrollToSection("auth")} className="hover:text-indigo-600 cursor-pointer transition">Admin Portal</span>
            <hr className="border-slate-100" />
            <button onClick={() => scrollToSection("auth")} className="w-full py-4 bg-indigo-600 text-white rounded-2xl shadow-lg">Get Started</button>
          </nav>
        </aside>
      </div>

      {/* 🔷 STICKY HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm h-16" : "bg-transparent h-24"}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection("hero")}>
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black italic shadow-indigo-200 group-hover:scale-105 transition">G</div>
            <span className="text-xl font-black tracking-tighter italic uppercase">GYMPRO</span>
          </div>
          <nav className="hidden md:flex items-center gap-10 font-bold text-xs tracking-widest text-slate-500 uppercase">
            <span onClick={() => scrollToSection("features")} className="cursor-pointer hover:text-indigo-600 transition">Solutions</span>
            <span onClick={() => scrollToSection("plans")} className="cursor-pointer hover:text-indigo-600 transition">Plans</span>
            <button onClick={() => scrollToSection("auth")} className="px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-indigo-600 transition shadow-xl active:scale-95">Owner Login</button>
          </nav>
          <button className="md:hidden p-2 text-2xl" onClick={() => setIsMenuOpen(true)}><FiMenu /></button>
        </div>
      </header>

      {/* 🔷 HERO SECTION */}
      <section id="hero" className="pt-48 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-8">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" /> Enterprise Management OS
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-slate-900 uppercase">Run gyms <br /><span className="text-indigo-600 italic">Digitally.</span></h1>
            <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-medium mb-10 italic">Stop guessing. Start growing. Manage members, automate renewals, and monitor revenue in real-time.</p>
            <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollToSection("auth")} className="group px-8 py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-indigo-700 transition shadow-2xl active:scale-95">Register Gym <FiArrowRight /></button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50 rounded-full blur-[100px] opacity-60" />
            <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f" alt="Elite Gym" className="relative rounded-[3rem] border-8 border-white shadow-2xl transform lg:rotate-2" />
          </div>
        </div>
      </section>

      {/* 🔷 SOLUTIONS SECTION */}
      <section id="features" className="py-32 bg-slate-50 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto text-left">
          <div className="max-w-2xl mb-20">
            <h2 className="text-4xl font-black tracking-tighter mb-4 italic uppercase">The Business Engine.</h2>
            <p className="text-slate-500 text-lg font-medium">Built for gym owners who stop manual paperwork and start scaling.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FiUsers />, title: "Member Database", desc: "Centralized logs for every admission." },
              { icon: <FiZap />, title: "Plan Assignment", desc: "Assign membership cycles in one click." },
              { icon: <FiCalendar />, title: "Expiry Tracking", desc: "Auto-track upcoming plan deadlines." },
              { icon: <FiPieChart />, title: "Revenue Flow", desc: "Daily and monthly income visualization." }
            ].map((f, i) => (
              <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all group">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xl mb-6 group-hover:bg-indigo-600 transition-colors italic">{f.icon}</div>
                <h3 className="text-lg font-black mb-2 tracking-tight uppercase">{f.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔷 MEMBERSHIP PLANS SECTION */}
      <section id="plans" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black tracking-tighter italic uppercase italic">Membership Architect.</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Create flexible revenue streams</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {membershipCycles.map((p, i) => (
              <div key={i} className={`p-8 rounded-[3rem] border-2 transition-all duration-300 ${p.popular ? 'bg-indigo-600 text-white border-indigo-600 scale-105 shadow-2xl' : 'bg-white border-slate-100 hover:border-slate-900 shadow-sm'}`}>
                <div className="flex justify-between items-start mb-10">
                  <div className={`p-3 rounded-2xl ${p.popular ? 'bg-white/10' : 'bg-slate-50'} text-xl`}><FiTarget /></div>
                </div>
                <h4 className={`text-xs font-black tracking-[0.2em] uppercase mb-2 ${p.popular ? 'text-indigo-200' : 'text-slate-400'}`}>{p.title}</h4>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-black italic">₹{p.price}</span>
                  <span className={`text-xs ml-1 opacity-60 ${p.popular ? 'text-white' : 'text-slate-500'}`}>/{p.cycle}</span>
                </div>
                <p className={`text-sm font-medium mb-8 leading-relaxed ${p.popular ? 'text-indigo-100' : 'text-slate-500'}`}>{p.desc}</p>
                <button onClick={() => scrollToSection("auth")} className={`w-full py-4 rounded-2xl font-black text-[10px] tracking-widest transition-all ${p.popular ? 'bg-white text-indigo-600 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>ASSIGN PLAN</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔷 AUTH SECTION (Locked) */}
      <section id="auth" className="py-32 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row min-h-[650px]">
          <div className="lg:w-[45%] bg-slate-900 p-16 text-white flex flex-col justify-between text-left">
            <div>
              <FiActivity className="text-indigo-500 text-3xl mb-10" />
              <h3 className="text-5xl font-black italic leading-none mb-6 uppercase italic">Command <br /><span className="text-indigo-500 text-6xl">Center.</span></h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed italic">Login to oversee admissions, track expiry, and scale your gym business.</p>
            </div>
            <div className="pt-10 border-t border-slate-800">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">Priority Admin Support</p>
              <span className="text-white font-bold tracking-tight">+91 8770191425</span>
            </div>
          </div>
          
          <div className="lg:w-[55%] p-12 lg:p-24 flex flex-col justify-center bg-white">
            <div className="max-w-sm mx-auto w-full">
              <div className="flex gap-2 mb-12 p-1.5 bg-slate-100 rounded-2xl font-black">
                <button onClick={() => handleAuthToggle("login")} className={`flex-1 py-3 text-[10px] tracking-widest rounded-xl transition-all ${authMode === "login" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"}`}>OWNER LOGIN</button>
                <button onClick={() => handleAuthToggle("signup")} className={`flex-1 py-3 text-[10px] tracking-widest rounded-xl transition-all ${authMode !== "login" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"}`}>REGISTRATION</button>
              </div>

              {authMode === "login" && <Login />}
              
              {authMode === "protect" && (
                <div className="space-y-6 text-left animate-in fade-in duration-300">
                   <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
                      <FiShield className="text-indigo-600" />
                      <p className="text-xs font-bold text-indigo-800 uppercase tracking-tight italic">Identity Verification Required</p>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secret Key</label>
                     <div className="relative group">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" />
                        <input 
                          type="password" placeholder="••••••••" 
                          value={passInput} onChange={(e) => setPassInput(e.target.value)}
                          className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-bold"
                        />
                     </div>
                   </div>
                   <button onClick={verifySecret} className="w-full py-4 bg-slate-900 text-white font-black text-xs tracking-widest rounded-2xl hover:bg-indigo-600 shadow-xl transition-all">VERIFY ACCESS</button>
                </div>
              )}

              {authMode === "signup" && <SignUp />}
            </div>
          </div>
        </div>
      </section>

      {/* 🔷 PROFESSIONAL FOOTER */}
      <footer className="bg-white py-24 px-6 border-t border-slate-50 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black italic text-xs">G</div>
              <span className="text-xl font-black tracking-tighter italic uppercase">GYMPRO.</span>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic leading-loose">The digital OS for modern fitness hubs. <br /> Built for the Elite Gym Owners © 2026</p>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <span onClick={() => scrollToSection("features")} className="hover:text-indigo-600 cursor-pointer transition">Solutions</span>
            <span onClick={() => scrollToSection("plans")} className="hover:text-indigo-600 cursor-pointer transition">Plans</span>
            <span onClick={() => scrollToSection("auth")} className="hover:text-indigo-600 cursor-pointer transition">Portal</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
// GYMPRO_ADMIN_2026