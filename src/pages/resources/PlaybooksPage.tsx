import { SEOHead } from '../../components/seo/SEOHead';
﻿import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { Workflow, Copy, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

const PLAYBOOKS = [
  {
    id: 1,
    title: "The Inbound Lead Fast-Response Playbook",
    trigger: "New Contact Form Submission on Website",
    steps: [
      { step: "01", action: "Trigger contact search", detail: "Verify phone, LinkedIn URL, and verified work email in < 15 seconds." },
      { step: "02", action: "Immediate Voice AI Qualification Call", detail: "Autonomous WebRTC Voice AI SDR calls prospect in < 90 seconds while intent is high." },
      { step: "03", action: "Google Calendar Sync", detail: "AI locks demo into AE calendar and sends calendar invite automatically." }
    ]
  },
  {
    id: 2,
    title: "The 24/7 Upwork & Freelance Bidding Playbook",
    trigger: "High-Budget B2B SaaS Project Posted on Upwork",
    steps: [
      { step: "01", action: "Feed Scraping & Requirement Analysis", detail: "AI Agent parses client budget, scope, and technical stack requirements." },
      { step: "02", action: "Sub-3-Minute Custom Proposal Submission", detail: "Drafts tailored pitch with past case study metrics and Loom video demo." },
      { step: "03", action: "CRM Deal Progression", detail: "Logs prospective deal in Native Pipeline with 35% estimated win probability." }
    ]
  }
];

export const PlaybooksPage: React.FC = () => {
  const [openPlaybook, setOpenPlaybook] = useState<number | null>(1);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Sales Execution Playbooks & Sequence Templates | Outtricks"
        description="Proven multi-channel sales playbooks for outbound SDR teams, recruiters, and founders."
        canonical="https://outtricks.com/resources/playbooks"
        breadcrumbs={[{"name":"Resources","url":"/resources"},{"name":"Playbooks","url":"/resources/playbooks"}]}
      />
      <PageHeader 
        category="Resources" categoryHref="/resources"
        badge="Execution Blueprints"
        title="Outbound Campaign Playbooks"
        description="Plug-and-play outbound workflows for cold emailing, hiring signal triggers, and Upwork proposal bidding."
      />

      <div className="space-y-6 max-w-4xl mx-auto">
        {PLAYBOOKS.map((pb) => {
          const isOpen = openPlaybook === pb.id;

          return (
            <div key={pb.id} className="bg-white dark:bg-[#141414] rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-clean overflow-hidden">
              <button
                onClick={() => setOpenPlaybook(isOpen ? null : pb.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-extrabold text-base text-slate-900 dark:text-white hover:text-blue-600 transition-colors bg-slate-50/50 cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-sans font-bold text-blue-600 uppercase block mb-1">TRIGGER: {pb.trigger}</span>
                  <span>{pb.title}</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>

              {isOpen && (
                <div className="p-6 sm:p-8 space-y-4 border-t border-slate-100 dark:border-[#2A2A2A] animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {pb.steps.map((st, i) => (
                      <div key={i} className="p-4 bg-slate-50 dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#2A2A2A] space-y-2">
                        <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs font-sans">
                          {st.step}
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs">{st.action}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{st.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <CtaBanner />
    </div>
  );
};

