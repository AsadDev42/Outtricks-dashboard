import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Building2, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Zap, 
  Workflow, 
  BarChart3, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { FragmentedStackConvergence } from '../3d/FragmentedStackConvergence';
import { Card3DTilt } from '../3d/Card3DTilt';

export const ProblemAndPlatformSection: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-32">
      
      {/* =========================================================================
          THE OLD SALES STACK (Redesigned Clean Comparison Visualization)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-rose-500/10 dark:bg-rose-500/20 border border-rose-400/30 text-rose-600 dark:text-rose-300 text-xs font-sans font-bold uppercase tracking-wider">
            THE OLD SALES STACK
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Your Revenue Shouldn't Live Across Six Different Tools
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Leads, CRM data, email, LinkedIn, calling, and spreadsheets shouldn�t live in separate systems. Outtricks brings your revenue workflow together in one connected platform.
          </p>
        </div>

        {/* Clean Transformation Visualization Component */}
        <FragmentedStackConvergence />
      </section>

      {/* =========================================================================
          THE 8 ESSENTIAL REVENUE MODULES (Clean Grid with 3D Tilt)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ONE REVENUE OPERATING SYSTEM
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Every Outbound Capability. One Single Database.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Replace disconnected point solutions with one native platform built for modern sales and growth teams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Lead Database", desc: "Access 480M+ verified B2B profiles with 8D targeting filters and contact search.", href: "/platform/lead-finder", icon: Search, badge: "480M+ Contacts" },
            { title: "Email Outreach", desc: "Scale personalized cold email campaigns across unlimited inboxes with peer-to-peer warmup.", href: "/platform/email-outreach", icon: Mail, badge: "Multi-Inbox" },
            { title: "LinkedIn Automation", desc: "Connect with decision makers using LinkedIn's official API and dedicated residential proxies.", href: "/platform/linkedin-automation", icon: Linkedin, badge: "Safe OAuth API" },
            { title: "Voice AI SDR", desc: "Deploy sub-400ms conversational voice agents that qualify prospects and book meetings 24/7.", href: "/platform/voice-ai", icon: PhoneCall, badge: "<400ms Latency" },
            { title: "AI Sales Agents", desc: "Automate account research, personalization, objection handling, and proposal generation.", href: "/platform/ai-agents", icon: Zap, badge: "Autonomous AI" },
            { title: "Unified Deals CRM", desc: "Track contacts, deals, activities, and pipelines with zero sync lag on one PostgreSQL core.", href: "/platform/crm", icon: Building2, badge: "0ms Sync Drift" },
            { title: "Workflow Automation", desc: "Orchestrate multi-channel trigger and action workflows across email, LinkedIn, and calls.", href: "/platform/workflow-automation", icon: Workflow, badge: "Visual Graph" },
            { title: "Revenue Analytics", desc: "Attribute closed-won revenue directly to specific channels, messages, and sales reps.", href: "/platform/analytics", icon: BarChart3, badge: "Attribution" }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card3DTilt key={idx} maxTilt={6} scale={1.02}>
                <Link
                  to={card.href}
                  className="liquid-glass-card p-7 rounded-3xl shadow-clean space-y-4 group flex flex-col justify-between h-full block"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300">
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Feature</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </Card3DTilt>
            );
          })}
        </div>
      </section>

    </div>
  );
};

