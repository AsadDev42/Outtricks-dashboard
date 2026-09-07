import { SEOHead } from '../../components/seo/SEOHead';
﻿import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { Clock, Zap } from 'lucide-react';

export const ChangelogPage: React.FC = () => {
  const RELEASES = [
    { version: "v2.8.0", date: "August 2026", title: "Sub-400ms WebRTC Voice AI SDR Engine", changes: ["Added conversational intent scoring (+0.94)", "Direct live calendar slot booking into Google Calendar", "Automatic noise cancellation & human breath simulation"] },
    { version: "v2.7.0", date: "July 2026", title: "Official LinkedIn Versioned API Integration", changes: ["Added dedicated static IP allocation per account", "Automated smart capability matrix pre-checks", "Eliminated Chrome extension dependency"] },
    { version: "v2.6.0", date: "June 2026", title: "Freelance Proposal Bidding Engine", changes: ["24/7 Feed monitoring for Upwork & Freelancer", "Sub-3-minute AI proposal generation", "Direct CRM deal pipeline integration"] }
  ];

  return (
    <div className="pt-20 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Product Changelog & Platform Releases | Outtricks"
        description="See the latest feature additions, performance updates, and engine upgrades across Outtricks."
        canonical="https://outtricks.com/resources/changelog"
        keywords={["Outtricks changelog","product updates","release notes","feature releases"]}
        breadcrumbs={[{"name":"Resources","url":"/resources"},{"name":"Changelog","url":"/resources/changelog"}]}
      />
      <PageHeader 
        category="Resources" categoryHref="/resources"
        badge="Product Updates"
        title="Outtricks Product Changelog"
        description="Weekly releases, engine speedups, and new revenue channels."
      />

      <div className="space-y-8">
        {RELEASES.map((rel, idx) => (
          <div key={idx} className="bg-white dark:bg-[#141414] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-sans font-bold bg-blue-600 text-white px-2.5 py-1 rounded-full">{rel.version}</span>
              <span className="text-xs text-slate-400 font-sans">{rel.date}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{rel.title}</h3>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside pt-1">
              {rel.changes.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <CtaBanner />
    </div>
  );
};

