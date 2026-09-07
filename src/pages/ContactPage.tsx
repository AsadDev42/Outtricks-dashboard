import React, { useState } from 'react';
import { Mail, Phone, Building2, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '1-10',
    useCase: 'Agency Client Management'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEOHead 
        title="Contact Outtricks | Sales, Support & Partnerships"
        description="Get in touch with our sales, technical engineering, or partnership teams."
        canonical="https://outtricks.com/contact"
        keywords={["contact Outtricks","Outtricks support","sales inquiries"]}
        breadcrumbs={[{"name":"Contact","url":"/contact"}]}
      />
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold font-sans uppercase tracking-wider">
          Get in Touch • 1-on-1 Strategy
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Talk to an Outtricks Outbound Architect
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base">
          Whether you are an agency scaling 50+ clients or a B2B SaaS team consolidating your sales stack, we are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
        
        {/* Contact Information & Perks */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900 rounded-3xl p-8 text-white space-y-6 shadow-xl border border-slate-800">
          <div className="space-y-2">
            <span className="text-xs font-sans text-blue-300 uppercase tracking-widest">Enterprise & Agency SLA</span>
            <h3 className="text-2xl font-bold">What to expect on your call:</h3>
          </div>

          <ul className="space-y-4 text-xs text-slate-200">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Full audit of your current deliverability & SPF/DKIM records</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Live custom demo of the Voice AI SDR & Upwork Bidding feed</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Agency white-label portal setup (`app.yourdomain.com`)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>1-click migration checklist from Lemlist, Instantly, or Apollo</span>
            </li>
          </ul>

          <div className="pt-4 border-t border-blue-800/80 text-xs text-blue-300 space-y-2 font-sans">
            <div>Direct Email: <strong>sales@outtricks.com</strong></div>
            <div>Offices: San Francisco • Austin • London</div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#141414] rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Request Dispatched!</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
                Thank you, <strong>{formData.name}</strong>. Our outbound architecture team will contact you at <strong>{formData.email}</strong> within 2 business hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input 
                    type="text" required
                    placeholder="Sarah Connor"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Work Email</label>
                  <input 
                    type="email" required
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Company Name</label>
                  <input 
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Team Size</label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-semibold text-slate-700 dark:text-slate-300"
                  >
                    <option value="1-10">1-10 Employees</option>
                    <option value="11-50">11-50 Employees</option>
                    <option value="51-200">51-200 Employees</option>
                    <option value="200+">200+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary Outbound Goal</label>
                <select
                  value={formData.useCase}
                  onChange={(e) => setFormData({...formData, useCase: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-semibold text-slate-700 dark:text-slate-300"
                >
                  <option value="Agency Client Management">Scaling Client Outbound Campaigns</option>
                  <option value="Stack Consolidation">Replacing 5-8 Point Tools with Outtricks</option>
                  <option value="Voice AI SDR">Deploying Sub-400ms Voice AI SDR Calls</option>
                  <option value="Multi-Inbox Cold Email">Scaling High-Volume Cold Email Outreach</option>
                  <option value="B2B Lead Discovery">480M+ Database & contact search</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                Schedule Architecture Consultation →
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
