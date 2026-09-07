import { SEOHead } from '../../components/seo/SEOHead';
﻿import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { Building2, Sparkles, CheckCircle2, DollarSign, ArrowRight } from 'lucide-react';

export const PartnersPage: React.FC = () => {
  const [clientCount, setClientCount] = useState(15);
  const [avgPlan, setAvgPlan] = useState(199);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ agency: '', email: '' });

  const monthlyRevShare = Math.round(clientCount * avgPlan * 0.20);
  const annualRevShare = monthlyRevShare * 12;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Partners & Certified Agency Program | Outtricks"
        description="Partner with Outtricks to deliver high-converting outbound infrastructure to your clients with co-selling and revenue share."
        canonical="https://outtricks.com/partners"
        keywords={["Outtricks partner program","agency partnership","revenue share outbound software"]}
        breadcrumbs={[{"name":"Partners","url":"/partners"}]}
      />
      <PageHeader 
        badge="Agency Partner Program"
        title="Scale Your Outbound Agency with Outtricks"
        description="Earn 20% lifetime recurring commission while providing your clients with branded white-label portals."
        highlights={["20% Recurring Rev-Share", "Custom Domains (app.youragency.com)", "Dedicated Agency Slack Channel"]}
      />

      {/* Interactive Rev-Share Calculator */}
      <div className="bg-white dark:bg-[#141414] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-6 max-w-4xl mx-auto">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          <span>Interactive Agency Commission Calculator</span>
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Active Client Accounts:</span>
              <span className="font-sans text-blue-600 text-sm">{clientCount} clients</span>
            </div>
            <input 
              type="range" min="3" max="100" value={clientCount}
              onChange={(e) => setClientCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="text-xs text-emerald-800 font-bold block">Monthly Recurring Commission (20%)</span>
              <strong className="text-3xl font-black text-emerald-600 font-sans">${monthlyRevShare.toLocaleString()} / mo</strong>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-[#1A1A1A]/70 rounded-2xl border border-blue-200">
              <span className="text-xs text-indigo-800 font-bold block">Annual Partner Earnings</span>
              <strong className="text-3xl font-black text-blue-600 font-sans">${annualRevShare.toLocaleString()} / yr</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Application Form */}
      <div className="max-w-xl mx-auto bg-white dark:bg-[#141414] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#2A2A2A] shadow-clean">
        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Partner Application Received!</h4>
            <p className="text-xs text-slate-500">We will reach out to {form.email} with your dedicated partner portal credentials.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Apply for Partner Status</h4>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Agency Name</label>
              <input 
                type="text" required placeholder="ScaleFlow Media"
                value={form.agency} onChange={(e) => setForm({...form, agency: e.target.value})}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Work Email</label>
              <input 
                type="email" required placeholder="partner@scaleflow.agency"
                value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer mt-2"
            >
              Join Partner Network
            </button>
          </form>
        )}
      </div>

      <CtaBanner />
    </div>
  );
};

