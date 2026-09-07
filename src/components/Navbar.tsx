import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ArrowRight, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Search,
  Mail,
  Linkedin,
  PhoneCall,
  Bot,
  Database,
  Workflow,
  BarChart3,
  Layers,
  ShieldCheck,
  Zap,
  Code2,
  Users,
  Briefcase,
  Rocket,
  UserCheck,
  TrendingUp,
  LineChart,
  BookOpen,
  Sparkles,
  Award,
  Video,
  FileText
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const handleLinkClick = () => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Mega Menu Data
  const PLATFORM_MENU = [
    { title: '8-Dimension B2B Pool', description: '480M+ verified prospects with multiAttribute criteria', icon: Search, href: '/platform/8-dimension-b2b-pool' },
    { title: 'Multi-Inbox Cold Email', description: 'Automated rotation & 99.4% inbox deliverability', icon: Mail, href: '/platform/multi-inbox-email-outreach' },
    { title: 'LinkedIn Safe Automation', description: 'Cloud API actions with zero account ban risk', icon: Linkedin, href: '/platform/linkedin-automation' },
    { title: 'Sub-400ms WebRTC Voice SDR', description: 'Instant conversational AI phone agents', icon: PhoneCall, href: '/platform/sub-400ms-webrtc' },
    { title: 'AI Freelance Bidding Agent', description: 'Auto-pilot Upwork & Freelancer bidding engine', icon: Bot, href: '/platform/ai-agents' },
    { title: 'Unified Deals CRM', description: 'Lead-to-cash pipeline on 1 PostgreSQL database', icon: Database, href: '/platform/crm' },
    { title: 'Visual Flow Builder', description: 'Drag-and-drop revenue automation engine', icon: Workflow, href: '/platform/visual-flow-builder' },
    { title: 'Cross-Channel Attribution', description: 'Track every dollar back to the exact touchpoint', icon: BarChart3, href: '/platform/attribution' },
    { title: 'Official Versioned API', description: 'High-throughput REST endpoints & webhooks', icon: Code2, href: '/platform/api' }
  ];

  const SOLUTIONS_MENU = [
    { title: 'B2B Sales Teams', description: 'Build and scale a predictable outbound pipeline.', icon: Users, href: '/solutions/sales-teams' },
    { title: 'Founders & Startups', description: 'Build your first repeatable revenue engine.', icon: Rocket, href: '/solutions/founders' },
    { title: 'Lead Gen Agencies', description: 'Scale client campaigns without tool sprawl.', icon: Briefcase, href: '/solutions/agencies' },
    { title: 'Recruiters & Staffing', description: 'Find talent and clients faster.', icon: UserCheck, href: '/solutions/recruiters' },
    { title: 'Marketing Teams', description: 'Turn intent into qualified pipeline.', icon: TrendingUp, href: '/solutions/marketing' },
    { title: 'RevOps Leaders', description: 'Unify your revenue stack and workflows.', icon: LineChart, href: '/solutions/revops' }
  ];

  const USECASES_MENU = [
    { title: 'Cold Email Outreach', description: 'Scale high-converting multi-inbox campaigns', icon: Mail, href: '/use-cases/cold-email' },
    { title: 'B2B Lead Generation', description: 'Target 480M+ verified decision makers', icon: Search, href: '/use-cases/lead-generation' },
    { title: 'LinkedIn Prospecting', description: 'Automate warm touches and connection requests', icon: Linkedin, href: '/use-cases/linkedin-prospecting' },
    { title: 'Conversational Voice AI', description: 'Inbound & outbound sub-400ms phone calls', icon: PhoneCall, href: '/use-cases/voice-ai' },
    { title: 'Multi-Channel Sales Workflows', description: 'Seamless orchestration across all channels', icon: Workflow, href: '/use-cases/multichannel' }
  ];

  const RESOURCES_MENU = [
    { title: 'Outbound Blog', description: 'Data-backed outbound playbooks & strategies', icon: BookOpen, href: '/resources/blog' },
    { title: 'Live Case Studies', description: 'How teams generate $148K+ pipeline in 30 days', icon: Award, href: '/resources/case-studies' },
    { title: 'Video Masterclasses', description: 'Watch live workflow setups and cold teardowns', icon: Video, href: '/resources/academy' },
    { title: 'Cold Email Templates', description: '50+ verified high-reply email copy templates', icon: FileText, href: '/resources/templates' }
  ];

  const COMPARISONS_MENU = [
    { title: 'Outtricks vs Apollo.io', href: '/comparisons/outtricks-vs-apollo' },
    { title: 'Outtricks vs Instantly', href: '/comparisons/outtricks-vs-instantly' },
    { title: 'Outtricks vs Smartlead', href: '/comparisons/outtricks-vs-smartlead' },
    { title: 'Outtricks vs Clay', href: '/comparisons/outtricks-vs-clay' },
    { title: 'Outtricks vs Lemlist', href: '/comparisons/outtricks-vs-lemlist' },
    { title: 'Compare All Outbound Platforms', href: '/comparisons' }
  ];

  const isPlatformActive = location.pathname.startsWith('/platform');
  const isSolutionsActive = location.pathname.startsWith('/solutions');
  const isUseCasesActive = location.pathname.startsWith('/use-cases');
  const isResourcesActive = location.pathname.startsWith('/resources');
  const isComparisonsActive = location.pathname.startsWith('/comparisons');
  const isPricingActive = location.pathname === '/pricing';

  return (
    <>
      {/* Subtle Backdrop Overlay when Menu is Open to prevent any visual confusion */}
      {activeMenu && (
        <div 
          className="fixed inset-0 bg-slate-950/10 dark:bg-black/30 backdrop-blur-[2px] z-[900] pointer-events-auto transition-opacity duration-200"
          onClick={() => setActiveMenu(null)}
        />
      )}

      <header className="fixed top-0 left-0 right-0 z-[999] transition-all duration-200 pointer-events-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-auto">
          <nav className={`liquid-glass-nav ${scrolled ? 'scrolled' : ''} rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-4 relative`}>
            
            {/* Logo Area */}
            <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2.5 shrink-0 group py-1" aria-label="Outtricks Home">
              <div className="w-8 h-8 rounded-xl bg-[#111111] border border-[#2A2A2A] flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <img 
                  src="/logo.png" 
                  alt="Outtricks Logo" 
                  className="w-full h-full object-cover rounded-xl" 
                />
              </div>
              <span className="font-black text-sm tracking-tight text-slate-900 dark:text-white">Outtricks</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 font-medium text-xs text-slate-800 dark:text-slate-200">
              
              {/* 1. Platform */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('platform')}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  to="/platform"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeMenu === 'platform' || isPlatformActive
                      ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-400/30 shadow-xs' 
                      : 'text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  <span>Platform</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                {activeMenu === 'platform' && (
                  <div 
                    className="absolute top-full pt-3 -left-20 w-[620px] animate-in fade-in zoom-in-95 duration-150 z-[1000] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                    onMouseEnter={() => handleMouseEnter('platform')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white dark:bg-[#0b101f] border border-slate-200/90 dark:border-[#2A2A2A] rounded-2xl p-6 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(37,99,235,0.06)] space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.07] pb-3">
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-950 dark:text-slate-100">The AI Revenue Operating System</h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">6 native outbound engines running on 1 connected database</p>
                        </div>
                        <Link to="/platform" onClick={handleLinkClick} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                          <span>Overview</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {PLATFORM_MENU.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={idx}
                              to={item.href}
                              onClick={handleLinkClick}
                              className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-[#1C1C1C] hover:bg-blue-50/60 dark:hover:bg-[#222222] border border-slate-200/60 dark:border-[#202020] hover:border-blue-300 dark:hover:border-blue-500/30 transition-all flex items-start gap-3 group/item cursor-pointer"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 border border-slate-200/60 dark:border-blue-900/40 flex items-center justify-center shrink-0 shadow-2xs group-hover/item:bg-blue-600 group-hover/item:text-white dark:group-hover/item:bg-blue-600 dark:group-hover/item:text-white transition-all">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5 min-w-0">
                                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 truncate">
                                  {item.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-tight font-sans">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Solutions */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('solutions')}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  to="/solutions"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeMenu === 'solutions' || isSolutionsActive
                      ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-400/30 shadow-xs' 
                      : 'text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                {activeMenu === 'solutions' && (
                  <div 
                    className="absolute top-full pt-3 -left-20 w-[540px] animate-in fade-in zoom-in-95 duration-150 z-[1000] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                    onMouseEnter={() => handleMouseEnter('solutions')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white dark:bg-[#0b101f] border border-slate-200/90 dark:border-[#2A2A2A] rounded-2xl p-6 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(37,99,235,0.06)] space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.07] pb-3">
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-950 dark:text-slate-100">Tailored for Every Revenue Team</h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Customized outbound setups for your growth model</p>
                        </div>
                        <Link to="/solutions" onClick={handleLinkClick} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                          <span>All Solutions</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {SOLUTIONS_MENU.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={idx}
                              to={item.href}
                              onClick={handleLinkClick}
                              className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-[#1C1C1C] hover:bg-blue-50/60 dark:hover:bg-[#222222] border border-slate-200/60 dark:border-[#202020] hover:border-blue-300 dark:hover:border-blue-500/30 transition-all flex items-start gap-3 group/item cursor-pointer"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 border border-slate-200/60 dark:border-blue-900/40 flex items-center justify-center shrink-0 shadow-2xs group-hover/item:bg-blue-600 group-hover/item:text-white dark:group-hover/item:bg-blue-600 dark:group-hover/item:text-white transition-all">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5 min-w-0">
                                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 truncate">
                                  {item.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-tight font-sans">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Use Cases */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('usecases')}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  to="/use-cases"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeMenu === 'usecases' || isUseCasesActive
                      ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-400/30 shadow-xs' 
                      : 'text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  <span>Use Cases</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                {activeMenu === 'usecases' && (
                  <div 
                    className="absolute top-full pt-3 -left-20 w-[540px] animate-in fade-in zoom-in-95 duration-150 z-[1000] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                    onMouseEnter={() => handleMouseEnter('usecases')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white dark:bg-[#0b101f] border border-slate-200/90 dark:border-[#2A2A2A] rounded-2xl p-6 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(37,99,235,0.06)] space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.07] pb-3">
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-950 dark:text-slate-100">Revenue Playbooks</h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Discover practical outbound workflows</p>
                        </div>
                        <Link to="/use-cases" onClick={handleLinkClick} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                          <span>All Use Cases</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {USECASES_MENU.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={idx}
                              to={item.href}
                              onClick={handleLinkClick}
                              className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-[#1C1C1C] hover:bg-blue-50/60 dark:hover:bg-[#222222] border border-slate-200/60 dark:border-[#202020] hover:border-blue-300 dark:hover:border-blue-500/30 transition-all flex items-start gap-3 group/item cursor-pointer"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 border border-slate-200/60 dark:border-blue-900/40 flex items-center justify-center shrink-0 shadow-2xs group-hover/item:bg-blue-600 group-hover/item:text-white dark:group-hover/item:bg-blue-600 dark:group-hover/item:text-white transition-all">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5 min-w-0">
                                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 truncate">
                                  {item.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-tight font-sans">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Resources */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  to="/resources"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeMenu === 'resources' || isResourcesActive
                      ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-400/30 shadow-xs' 
                      : 'text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  <span>Resources</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                {activeMenu === 'resources' && (
                  <div 
                    className="absolute top-full pt-3 -left-12 w-[440px] animate-in fade-in zoom-in-95 duration-150 z-[1000] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                    onMouseEnter={() => handleMouseEnter('resources')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white dark:bg-[#0b101f] border border-slate-200/90 dark:border-[#2A2A2A] rounded-2xl p-6 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(37,99,235,0.06)] space-y-4">
                      <div className="grid grid-cols-1 gap-2">
                        {RESOURCES_MENU.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.href}
                            onClick={handleLinkClick}
                            className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#1C1C1C] hover:bg-blue-50/60 dark:hover:bg-[#222222] border border-slate-200/60 dark:border-[#202020] hover:border-blue-300 dark:hover:border-blue-500/30 transition-all block group cursor-pointer"
                          >
                            <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 font-sans">{item.description}</p>
                          </Link>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-white/[0.07] flex items-center justify-between text-xs font-bold">
                        <Link to="/resources/free-tools" onClick={handleLinkClick} className="text-blue-600 dark:text-blue-400 hover:underline font-sans text-[11px]">
                          Explore 5 Free AI Tools →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Comparisons */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('comparisons')}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  to="/comparisons"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeMenu === 'comparisons' || isComparisonsActive
                      ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-400/30 shadow-xs' 
                      : 'text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  <span>Comparisons</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                {activeMenu === 'comparisons' && (
                  <div 
                    className="absolute top-full pt-2.5 -left-24 sm:-left-20 w-[420px] animate-in fade-in zoom-in-95 duration-150 z-[1000] before:absolute before:-top-2.5 before:left-0 before:right-0 before:h-2.5"
                    onMouseEnter={() => handleMouseEnter('comparisons')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white/95 dark:bg-[#080d1a]/95 backdrop-blur-xl border border-slate-200/80 dark:border-[#2A2A2A] rounded-2xl p-3 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(59,130,246,0.08)]">
                      <div className="grid grid-cols-2 gap-2.5">
                        {COMPARISONS_MENU.map((item, idx) => {
                          const isOverview = idx === 5;
                          return (
                            <Link
                              key={idx}
                              to={item.href}
                              onClick={handleLinkClick}
                              className={`group/comp min-h-[48px] px-3.5 py-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-2 cursor-pointer ${
                                isOverview 
                                  ? 'bg-blue-500/5 dark:bg-blue-600/10 hover:bg-blue-500/15 dark:hover:bg-blue-600/20 border-blue-200/60 dark:border-blue-500/25 hover:border-blue-300 dark:hover:border-blue-400/40 text-blue-600 dark:text-blue-400' 
                                  : 'bg-slate-50/60 dark:bg-[#0d1426]/70 hover:bg-blue-50/70 dark:hover:bg-[#131d36] border-slate-200/50 dark:border-white/[0.05] hover:border-blue-200/80 dark:hover:border-blue-500/25 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
                              }`}
                            >
                              <span className="font-sans text-[12px] font-semibold leading-tight">
                                {item.title}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover/comp:text-blue-600 dark:group-hover/comp:text-blue-400 group-hover/comp:translate-x-0.5 transition-all shrink-0 opacity-0 group-hover/comp:opacity-100" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Pricing */}
              <Link
                to="/pricing"
                onClick={handleLinkClick}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  isPricingActive
                    ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-400/30 shadow-xs'
                    : 'text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                Pricing
              </Link>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center shrink-0">
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/80 dark:bg-[#181818]/80 flex items-center justify-center text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-all hover:scale-105 cursor-pointer shadow-2xs border border-white/60 dark:border-[#2A2A2A]/80 mr-2 sm:mr-3"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400" /> : <Moon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-slate-600 dark:text-slate-400" />}
              </button>

              {/* Log in */}
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="hidden sm:inline-flex items-center text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap mr-3 sm:mr-4"
              >
                Log in
              </Link>

              {/* Book a Demo */}
              <Link
                to="/book-a-demo"
                onClick={handleLinkClick}
                className="hidden md:inline-flex items-center justify-center h-8 sm:h-9 px-3.5 sm:px-4 rounded-full border border-slate-300/80 dark:border-[#2A2A2A]/90 bg-white/80 dark:bg-[#181818]/80 hover:bg-white dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-all hover:scale-[1.01] active:scale-[0.99] whitespace-nowrap shadow-2xs mr-2 sm:mr-2.5"
              >
                Book a Demo
              </Link>

              {/* Get Started */}
              <Link
                to="/signup"
                onClick={handleLinkClick}
                className="inline-flex items-center justify-center gap-1.5 h-8 sm:h-9 px-4 sm:px-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" />
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 ml-1.5 rounded-full hover:bg-white/60 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </nav>
        </div>

        {/* Mobile Drawer Navigation (Solid High Z-Index Treatment) */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[64px] bg-white dark:bg-[#0b101f] border-t border-slate-200 dark:border-[#2A2A2A] z-[1000] p-6 overflow-y-auto space-y-6 animate-in fade-in duration-150 shadow-2xl">
            <div className="space-y-3">
              <h4 className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Platform Modules</h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {PLATFORM_MENU.slice(0, 8).map((item, i) => (
                  <Link key={i} to={item.href} onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] text-slate-800 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-500/30">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Solutions & Use Cases</h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {SOLUTIONS_MENU.map((item, i) => (
                  <Link key={i} to={item.href} onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] text-slate-800 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-500/30">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 dark:border-[#2A2A2A] flex flex-col gap-2.5">
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-blue-600 text-white font-bold text-xs text-center shadow-md shadow-blue-500/25"
              >
                Start 7-Day Free Trial
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-bold text-xs text-center"
              >
                Sign In to Workspace
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
