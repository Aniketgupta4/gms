import React, { useState, useEffect } from "react";
import { 
  FiMenu, FiX, FiCheck, FiUsers, FiCalendar, 
  FiZap, FiPieChart, FiArrowRight, FiActivity, FiLock, FiShield, FiTarget,
  FiTrendingUp, FiGlobe, FiAward, FiPhone, FiMessageCircle
} from "react-icons/fi"; 
import Login from "../../Components/Login/login";
import SignUp from "../../Components/Signup/signUp";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 🔷 Popup State
  
  // 🔒 Admin Security States (UNTOUCHED)
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
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      
      {/* 🔷 PREMIUM PARTNER MODAL (Pop-up) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-6 md:p-12 shadow-2xl text-center border border-white">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"><FiX size={20}/></button>
            
            <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 shadow-inner">
               <FiShield size={36} />
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-slate-900">Partner With Us</h2>
            <p className="text-slate-500 font-medium mb-8 text-sm md:text-base px-2">Want to list your gym on our platform? <br className="hidden md:block"/> Get in touch with our Admin to activate your membership.</p>

            <div className="bg-slate-50 border border-slate-100 p-5 md:p-6 rounded-3xl mb-8">
               <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Lead Developer</h4>
               <h4 className="text-lg md:text-xl font-black text-slate-800 italic uppercase">Aniket Gupta</h4>
               <p className="text-indigo-600 font-black text-xl md:text-2xl mt-1 tracking-tighter">+91 8770191425</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <a href="tel:+918770191425" className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all text-xs md:text-sm uppercase tracking-widest"><FiPhone /> Call Now</a>
               <a href="https://wa.me/918770191425" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white rounded-2xl font-bold hover:opacity-90 transition-all text-xs md:text-sm uppercase tracking-widest"><FiMessageCircle /> WhatsApp</a>
            </div>
          </div>
        </div>
      )}

      {/* 🔷 MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <aside className={`absolute right-0 top-0 h-full w-[280px] bg-white p-8 shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center mb-12">
            <span className="font-extrabold text-slate-900 text-xl tracking-tight">GYMPRO</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-50 rounded-full"><FiX size={20}/></button>
          </div>
          <nav className="flex flex-col gap-6 font-semibold text-slate-600">
            <span onClick={() => scrollToSection("features")} className="hover:text-slate-900 cursor-pointer">Platform</span>
            <span onClick={() => scrollToSection("plans")} className="hover:text-slate-900 cursor-pointer">Plans</span>
            <span onClick={() => scrollToSection("auth")} className="hover:text-slate-900 cursor-pointer">Portal</span>
            <hr className="border-slate-100 my-2" />
            <button onClick={() => scrollToSection("auth")} className="w-full py-4 bg-slate-900 text-white rounded-xl shadow-lg font-bold">Sign In</button>
          </nav>
        </aside>
      </div>

      {/* 🔷 HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm h-16 border-b border-slate-100" : "bg-transparent h-20 md:h-24"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => scrollToSection("hero")}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black shadow-md transition-transform group-hover:scale-105">G</div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">GymPro.</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-semibold text-xs text-slate-500 uppercase tracking-widest">
            <span onClick={() => scrollToSection("features")} className="cursor-pointer hover:text-slate-900 transition-colors">Solutions</span>
            <span onClick={() => scrollToSection("plans")} className="cursor-pointer hover:text-slate-900 transition-colors">Plans</span>
            <button onClick={() => scrollToSection("auth")} className="px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all shadow-md font-bold">Owner Login</button>
          </nav>
          <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(true)}><FiMenu size={24} /></button>
        </div>
      </header>

      {/* 🔷 HERO SECTION */}
      <section id="hero" className="pt-32 pb-16 md:pt-48 md:pb-24 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" /> Enterprise Management OS
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900 uppercase italic">
              Run gyms <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Digitally.</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium mb-10 px-2 md:px-0">
              Stop guessing. Start growing. Manage members, automate renewals, and monitor revenue in real-time with a centralized infrastructure.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button onClick={() => scrollToSection("auth")} className="group px-7 py-4 bg-slate-900 text-white font-black rounded-full flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-xl active:scale-95 uppercase text-[10px] tracking-widest">
                  Register Gym <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>
          <div className="relative hidden lg:block transform lg:rotate-2">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-full blur-[80px] opacity-70" />
            <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1000" alt="Elite Gym" className="relative rounded-[3rem] border-8 border-white shadow-2xl object-cover" />
          </div>
        </div>
      </section>

      {/* 🔷 SOLUTIONS SECTION */}
      <section id="features" className="py-20 md:py-24 bg-white px-4 md:px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16 text-center lg:text-left">
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-4 text-slate-900 uppercase italic">The Business Engine.</h2>
            <p className="text-slate-500 text-sm md:text-lg font-medium">Built for gym owners who stop manual paperwork and start scaling.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <FiUsers />, title: "Member Database", desc: "Centralized logs for every admission and client detail." },
              { icon: <FiZap />, title: "Plan Assignment", desc: "Assign membership cycles in one seamless click." },
              { icon: <FiCalendar />, title: "Expiry Tracking", desc: "Auto-track upcoming plan deadlines effortlessly." },
              { icon: <FiPieChart />, title: "Revenue Flow", desc: "Daily and monthly income visualization dashboard." }
            ].map((f, i) => (
              <div key={i} className="p-8 bg-[#fafafa] rounded-[2rem] border border-slate-100 hover:border-indigo-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-white border border-slate-200 text-slate-700 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 tracking-tight text-slate-900 uppercase">{f.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔷 MEMBERSHIP ARCHITECT SECTION (RESTORED & RESPONSIVE) */}
      <section id="plans" className="py-20 md:py-24 px-4 md:px-6 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4 px-2">
             <h2 className="text-3xl md:text-6xl font-black tracking-tighter italic uppercase text-slate-900">Membership Architect.</h2>
             <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Create flexible revenue streams</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipCycles.map((p, i) => (
              <div 
                key={i} 
                className={`group p-8 rounded-[3rem] border-2 transition-all duration-500 hover:scale-[1.03] ${p.popular ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xl shadow-indigo-200' : 'bg-white border-slate-50 hover:border-slate-200 shadow-sm'}`}
              >
                <div className="flex justify-between items-start mb-10">
                  <div className={`p-4 rounded-2xl ${p.popular ? 'bg-white/10' : 'bg-slate-50 text-indigo-600'} text-xl`}><FiTarget /></div>
                </div>
                <h4 className={`text-xs font-black tracking-[0.2em] uppercase mb-2 ${p.popular ? 'text-indigo-200' : 'text-slate-400'}`}>{p.title}</h4>
                <div className="flex items-baseline mb-4">
                   <span className="text-4xl font-black italic">₹{p.price}</span>
                   <span className={`text-xs ml-1 opacity-60 font-bold ${p.popular ? 'text-white' : 'text-slate-500'}`}>/{p.cycle}</span>
                </div>
                <p className={`text-sm font-medium mb-8 leading-relaxed ${p.popular ? 'text-indigo-100' : 'text-slate-500'}`}>{p.desc}</p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all shadow-md ${p.popular ? 'bg-white text-indigo-600 hover:bg-slate-50' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                >
                  Assign Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔷 METRICS SECTION */}
      <section id="metrics" className="py-20 md:py-24 px-4 md:px-6 bg-slate-900 text-white relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 max-w-2xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-white uppercase italic">Built for Scale.</h2>
            <p className="text-slate-400 font-medium text-sm md:text-lg">Trusted by elite fitness centers to handle operations securely and fast.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {[
               { icon: <FiGlobe />, stat: "99.9%", label: "Uptime Guarantee" },
               { icon: <FiTrendingUp />, stat: "Zero", label: "Paperwork" },
               { icon: <FiAward />, stat: "ISO", label: "Security" }
            ].map((m, i) => (
               <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-sm">
                  <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6">{m.icon}</div>
                  <h3 className="text-4xl font-black mb-2 tracking-tighter italic">{m.stat}</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{m.label}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔷 AUTH SECTION */}
      <section id="auth" className="py-16 md:py-24 px-4 md:px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
          <div className="lg:w-[45%] bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-between text-left relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <FiActivity className="text-indigo-500 text-3xl mb-8 md:mb-10" />
              <h3 className="text-3xl md:text-4xl font-black italic leading-none mb-6 uppercase">Command <br /><span className="text-indigo-500 text-5xl md:text-6xl">Center.</span></h3>
              <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed italic">Login to oversee admissions, track expiry, and scale your gym business.</p>
            </div>
            <div className="pt-8 border-t border-slate-800 relative z-10">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">Priority Admin Support</p>
              <span className="text-white font-bold tracking-tight text-sm">+91 8770191425</span>
            </div>
          </div>
          
          <div className="lg:w-[55%] p-8 md:p-16 flex flex-col justify-center bg-white">
            <div className="max-w-sm mx-auto w-full">
              <div className="flex gap-2 mb-10 p-1.5 bg-slate-100 rounded-2xl font-black">
                <button onClick={() => handleAuthToggle("login")} className={`flex-1 py-3 text-[10px] tracking-widest rounded-xl transition-all ${authMode === "login" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"}`}>LOGIN</button>
                <button onClick={() => handleAuthToggle("signup")} className={`flex-1 py-3 text-[10px] tracking-widest rounded-xl transition-all ${authMode !== "login" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"}`}>REGISTER</button>
              </div>

              {authMode === "login" && <Login />}
              {authMode === "protect" && (
                <div className="space-y-6 text-left animate-in fade-in duration-300">
                   <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center gap-3">
                      <FiShield className="text-indigo-600" />
                      <p className="text-[10px] font-black text-indigo-800 uppercase tracking-tight italic text-left">Identity Verification Required</p>
                   </div>
                   <input 
                      type="password" placeholder="System Secret Key" 
                      value={passInput} onChange={(e) => setPassInput(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-sm"
                   />
                   <button onClick={verifySecret} className="w-full py-4 bg-slate-900 text-white font-black text-[10px] tracking-[0.2em] rounded-2xl hover:bg-indigo-600 shadow-xl transition-all uppercase">Verify Access</button>
                </div>
              )}
              {authMode === "signup" && <SignUp />}
            </div>
          </div>
        </div>
      </section>

      {/* 🔷 FOOTER */}
      <footer className="bg-white pt-20 pb-12 px-4 md:px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black italic text-xs">G</div>
                <span className="text-xl font-black tracking-tight text-slate-900 italic uppercase">GymPro.</span>
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
                The digital operating system for modern fitness hubs. We empower gym owners to manage, scale, and secure their operations with intelligence.
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-6 tracking-widest text-xs uppercase">Product</h4>
              <ul className="space-y-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <li className="hover:text-indigo-600 cursor-pointer" onClick={() => scrollToSection("features")}>Solutions</li>
                <li className="hover:text-indigo-600 cursor-pointer" onClick={() => scrollToSection("plans")}>Plans</li>
                <li className="hover:text-indigo-600 cursor-pointer" onClick={() => scrollToSection("auth")}>Portal</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-6 tracking-widest text-xs uppercase">Support</h4>
              <ul className="space-y-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <li className="cursor-pointer" onClick={() => setIsModalOpen(true)}>Partner With Us</li>
                <li className="cursor-pointer">Help Center</li>
                <li className="cursor-pointer">Contact Support</li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">© 2026 GymPro Technologies. All rights reserved.</p>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic">Built for the Elite by Aniket Gupta</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;