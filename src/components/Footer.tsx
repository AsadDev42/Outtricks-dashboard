import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Linkedin, 
  Twitter, 
  Instagram,
  Facebook,
  Github, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export const Footer: React.FC = () => {
  // Mobile accordion state
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection(openMobileSection === section ? null : section);
  };

  // Structured Link Categories
  const PLATFORM_LINKS = [
    { title: 'Platform Overview', href: '/platform' },
    { title: 'Lead Finder', href: '/platform/8-dimension-b2b-pool' },
    { title: 'Email Outreach', href: '/platform/multi-inbox-email-outreach' },
    { title: 'LinkedIn Automation', href: '/platform/linkedin-automation' },
    { title: 'Voice AI SDR', href: '/platform/sub-400ms-webrtc' },
    { title: 'AI Agents', href: '/platform/ai-agents' },
    { title: 'Unified CRM', href: '/platform/crm' },
    { title: 'Workflow Automation', href: '/platform/visual-flow-builder' },
  ];

  const SOLUTIONS_LINKS = [
    { title: 'For Sales Teams', href: '/solutions/sales-teams' },
    { title: 'For Founders', href: '/solutions/founders' },
    { title: 'For Agencies', href: '/solutions/agencies' },
    { title: 'For Recruiters', href: '/solutions/recruiters' },
    { title: 'For Marketing Teams', href: '/solutions/marketing' },
    { title: 'For Revenue Teams', href: '/solutions/revops' },
    { title: 'Enterprise', href: '/book-a-demo' },
    { title: 'View All Solutions →', href: '/solutions', highlight: true }
  ];

  const RESOURCES_LINKS = [
    { title: 'Academy', href: '/resources/academy' },
    { title: 'Outbound Playbooks', href: '/resources/playbooks' },
    { title: 'Cold Email Templates', href: '/resources/templates' },
    { title: 'Free Tools', href: '/resources/free-tools' },
    { title: 'Customer Stories', href: '/resources/customer-stories' },
    { title: 'Documentation', href: '/platform/api' },
    { title: 'API', href: '/platform/api' },
    { title: 'Product Changelog', href: '/resources/changelog' }
  ];

  const COMPANY_LINKS = [
    { title: 'About Outtricks', href: '/about' },
    { title: 'Why Outtricks', href: '/why-outtricks' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'Contact Sales', href: '/contact' },
    { title: 'Careers', href: '/careers' },
    { title: 'Partners', href: '/partners' },
    { title: 'Security', href: '/security' },
    { title: 'Compare Tools', href: '/comparisons' }
  ];

  return (
    <footer className="relative bg-[#080808] text-slate-300 overflow-hidden border-t border-slate-800/80">
      
      {/* Subtle Top Ambient Glow for Dark Footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-600/10 via-blue-600/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10 space-y-14 sm:space-y-16">
        
        {/* =========================================================================
            LEVEL 1: HERO CTA BLOCK (Clean, Balanced 2-Line Headline, Refined Spacing)
            ========================================================================= */}
        <div className="relative text-center max-w-4xl mx-auto space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] font-bold text-slate-300 tracking-wider uppercase font-sans">
              THE AI REVENUE OPERATING SYSTEM
            </span>
          </div>

          {/* Clean 2-Line Headline on Desktop */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
            Build a Revenue Engine That Runs on Autopilot.
          </h2>

          {/* Concise Supporting Copy */}
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Find qualified prospects, automate outreach, and keep every revenue motion connected in one system.
          </p>

          {/* Refined CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/book-a-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Book a Demo</span>
            </Link>
          </div>

        </div>

        {/* =========================================================================
            LEVEL 2: FOOTER NAVIGATION GRID (5 Clean Structured Columns)
            ========================================================================= */}
        <div className="pt-6 border-t border-slate-800/80">
          
          {/* Desktop & Tablet 5-Column Grid */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
            
            {/* COLUMN 1: Brand Info & Social Icons (Spans 3.5 cols) */}
            <div className="col-span-4 space-y-4 pr-4">
              
              {/* Outtricks Brand Full Logo */}
              <Link to="/" className="flex items-center gap-2.5 group" aria-label="Outtricks Home">
                <div className="w-9 h-9 rounded-xl bg-[#111111] border border-[#2A2A2A] flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <img 
                    src="/logo.png" 
                    alt="Outtricks Logo" 
                    className="w-full h-full object-cover rounded-xl" 
                  />
                </div>
                <span className="font-extrabold text-lg text-white tracking-tight">Outtricks</span>
              </Link>
              
              <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                AI-powered revenue infrastructure for modern sales teams.
              </p>

              {/* Social Icon Row */}
              <div className="flex items-center gap-2 pt-1">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors"
                  aria-label="X"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Security Badges */}
              <div className="pt-2 flex items-center gap-2 text-[10px] font-sans text-slate-400">
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Secure
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                  <Lock className="w-3 h-3 text-blue-400" /> GDPR Ready
                </span>
              </div>

            </div>

            {/* COLUMN 2: PLATFORM (Spans 2 cols) */}
            <div className="col-span-2 space-y-3">
              <h4 className="font-bold text-xs text-white uppercase tracking-wider font-sans">
                Platform
              </h4>
              <ul className="space-y-2 text-xs">
                {PLATFORM_LINKS.map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      to={item.href} 
                      className="text-slate-400 hover:text-white transition-colors block"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: SOLUTIONS (Spans 2 cols) */}
            <div className="col-span-2 space-y-3">
              <h4 className="font-bold text-xs text-white uppercase tracking-wider font-sans">
                Solutions
              </h4>
              <ul className="space-y-2 text-xs">
                {SOLUTIONS_LINKS.map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      to={item.href} 
                      className={`${
                        item.highlight ? 'text-blue-400 hover:text-blue-300 font-bold' : 'text-slate-400 hover:text-white'
                      } transition-colors block`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 4: RESOURCES (Spans 2 cols) */}
            <div className="col-span-2 space-y-3">
              <h4 className="font-bold text-xs text-white uppercase tracking-wider font-sans">
                Resources
              </h4>
              <ul className="space-y-2 text-xs">
                {RESOURCES_LINKS.map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      to={item.href} 
                      className="text-slate-400 hover:text-white transition-colors block"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 5: COMPANY (Spans 2 cols) */}
            <div className="col-span-2 space-y-3">
              <h4 className="font-bold text-xs text-white uppercase tracking-wider font-sans">
                Company
              </h4>
              <ul className="space-y-2 text-xs">
                {COMPANY_LINKS.map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      to={item.href} 
                      className="text-slate-400 hover:text-white transition-colors block"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Mobile & Tablet Accordion Layout */}
          <div className="lg:hidden space-y-6">
            
            {/* Mobile Brand Block */}
            <div className="space-y-3 pb-4 border-b border-slate-800/80">
              <Link to="/" className="inline-block" aria-label="Outtricks Home">
                <img 
                  src="/outtricks-footer-logo.png" 
                  alt="Outtricks • Build. Automate. Grow." 
                  className="h-8 sm:h-9 w-auto object-contain" 
                />
              </Link>
              <p className="text-slate-400 text-xs leading-relaxed">
                AI-powered revenue infrastructure for modern sales teams.
              </p>
              
              <div className="flex items-center gap-2 pt-1">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors" aria-label="X">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors" aria-label="Instagram">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors" aria-label="Facebook">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors" aria-label="GitHub">
                  <Github className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Mobile Collapsible Groups */}
            {[
              { id: 'platform', title: 'Platform', links: PLATFORM_LINKS },
              { id: 'solutions', title: 'Solutions', links: SOLUTIONS_LINKS },
              { id: 'resources', title: 'Resources', links: RESOURCES_LINKS },
              { id: 'company', title: 'Company', links: COMPANY_LINKS }
            ].map((section) => {
              const isOpen = openMobileSection === section.id;
              return (
                <div key={section.id} className="border-b border-slate-800/80 pb-3">
                  <button
                    onClick={() => toggleMobileSection(section.id)}
                    className="w-full flex items-center justify-between py-2 text-xs font-bold text-white uppercase tracking-wider font-sans cursor-pointer"
                  >
                    <span>{section.title}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {isOpen && (
                    <ul className="space-y-2 pt-2 pb-1 pl-1 text-xs">
                      {section.links.map((link, i) => (
                        <li key={i}>
                          <Link to={link.href} className="text-slate-400 hover:text-white block py-1">
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}

          </div>

        </div>

        {/* =========================================================================
            LEVEL 3: BOTTOM LEGAL / SYSTEM STATUS BAR
            ========================================================================= */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-sans">
          
          {/* Left Copyright */}
          <div>
            © 2026 Outtricks Inc. All rights reserved.
          </div>

          {/* Center System Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">All systems operational</span>
          </div>

          {/* Right Legal Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-slate-400">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/security" className="hover:text-white transition-colors">Security</Link>
            <span>·</span>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            <span>·</span>
            <button 
              type="button" 
              onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-preferences'))}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Preferences
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};

