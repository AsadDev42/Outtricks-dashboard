import { SEOHead } from '../../components/seo/SEOHead';
﻿import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { BookOpen, Download, Search, CheckCircle2, Sparkles, Clock, ArrowRight } from 'lucide-react';

const GUIDES = [
  { id: 1, title: "The 2026 Deliverability Bible", category: "Deliverability", pages: "42 pages", readTime: "25 min read", desc: "The definitive guide to SPF, DKIM, DMARC, secondary domain setups, and Google/Microsoft inbox rotation." },
  { id: 2, title: "Autonomous Voice AI SDR Playbook", category: "Voice AI", pages: "28 pages", readTime: "18 min read", desc: "How to engineer natural conversational prompts, handle gatekeeper objections, and book demos with sub-400ms latency." },
  { id: 3, title: "Agency Multi-Tenant Scaling Blueprint", category: "Agency", pages: "36 pages", readTime: "20 min read", desc: "How top lead gen agencies scale past 50+ retainer clients using white-label domains and single-ledger credit wallets." },
  { id: 4, title: "Ban-Free Official LinkedIn Prospecting", category: "LinkedIn", pages: "24 pages", readTime: "15 min read", desc: "Why versioned OAuth APIs beat Chrome extension bots and how to safely orchestrate connection requests & InMails." }
];

export const GuidesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDownload = (guide: typeof GUIDES[0]) => {
    setDownloadingId(guide.id);
    setTimeout(() => {
      setDownloadingId(null);
      setToastMessage(`"${guide.title}" (PDF) downloaded successfully!`);
      setTimeout(() => setToastMessage(null), 3000);
    }, 1200);
  };

  const filteredGuides = GUIDES.filter(g => {
    const matchSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCat === 'All' || g.category === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Outbound Revenue Guides & Technical Playbooks | Outtricks"
        description="In-depth guides on cold email deliverability, B2B data multiAttributes, and Voice AI objection handling."
        canonical="https://outtricks.com/resources/guides"
        breadcrumbs={[{"name":"Resources","url":"/resources"},{"name":"Guides","url":"/resources/guides"}]}
      />
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold py-3 px-5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <PageHeader 
        category="Resources" categoryHref="/resources"
        badge="Masterclasses & Whitepapers"
        title="Comprehensive B2B Outbound Guides"
        description="In-depth, step-by-step masterclasses on multi-inbox deliverability, Voice AI prompt engineering, and agency white-label scaling."
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-1.5 flex-wrap">
          {["All", "Deliverability", "Voice AI", "Agency", "LinkedIn"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCat === cat ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" placeholder="Search guides..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {filteredGuides.map((guide) => (
          <div key={guide.id} className="bg-white dark:bg-[#141414] rounded-3xl p-8 border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-4 flex flex-col justify-between hover:border-blue-300 transition-all">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-sans font-bold bg-blue-50 dark:bg-[#1A1A1A]/70 text-blue-700 px-2 py-0.5 rounded uppercase">
                  {guide.category}
                </span>
                <span className="text-xs font-sans text-slate-400 font-semibold">{guide.pages} • {guide.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{guide.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{guide.desc}</p>
            </div>

            <button
              onClick={() => handleDownload(guide)}
              disabled={downloadingId === guide.id}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadingId === guide.id ? "Preparing PDF Guide..." : "Download Complete Guide (PDF)"}</span>
            </button>
          </div>
        ))}
      </div>

      <CtaBanner />
    </div>
  );
};

