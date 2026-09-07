import { SEOHead } from '../../components/seo/SEOHead';
﻿import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { Card3DTilt } from '../../components/3d/Card3DTilt';
import { 
  Search,
  Calendar, 
  Clock, 
  CheckCircle2, 
  User, 
  Mail, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const BookDemoPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState("Thursday, Aug 28");
  const [selectedSlot, setSelectedSlot] = useState("2:00 PM CST");
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", teamSize: "1-10", notes: "" });

  const SLOTS = ["10:00 AM CST", "11:30 AM CST", "2:00 PM CST", "3:30 PM CST", "5:00 PM CST"];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBooked(true);
    }, 900);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      <SEOHead 
        title="Book a Live Architecture Demo | Outtricks"
        description="Schedule a 20-minute live demonstration with our revenue engineering team. See 480M+ lead search, Voice AI, and multi-channel workflows."
        canonical="https://outtricks.com/book-a-demo"
        keywords={["book Outtricks demo","live sales platform demo","schedule SDR studio walkthrough"]}
        breadcrumbs={[{"name":"Book a Demo","url":"/book-a-demo"}]}
      />
      
      {/* 1. HERO */}
      <PageHeader 
        badge="Tailored Architecture Session"
        title="Schedule a Live 1-on-1 Outbound Demo"
        description="See how Outtricks can replace 6 disjointed sales tools, automate your cold outreach across Email, LinkedIn, and Voice AI, and double your booked meetings."
        highlights={["20-Minute Tailored Session", "Live Voice AI Demo", "Custom TAM Calculation", "Zero Sales Pressure"]}
      />

      {/* 2. DEMO BOOKING INTERACTIVE ENGINE */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#141414] rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-2xl p-6 sm:p-10">
        {booked ? (
          <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Demo Confirmed!</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              We've dispatched a Google Calendar invite & Google Meet link to <strong>{formData.email}</strong> for <strong>{selectedDay} at {selectedSlot}</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setBooked(false)}
                className="px-6 py-2.5 rounded-full bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                Book Another Time
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Step 1: Time Selection */}
            <div className="md:col-span-6 space-y-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-[#2A2A2A] pb-6 md:pb-0 md:pr-6">
              <div className="text-xs font-sans font-bold text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>1. Select Date & Slot</span>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-[#181818]/60 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] space-y-3">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Available Dates:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  {["Wednesday, Aug 27", "Thursday, Aug 28", "Friday, Aug 29", "Monday, Sep 01"].map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedDay === day 
                          ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-md shadow-blue-600/30' 
                          : 'bg-white dark:bg-[#141414] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 pt-2">
                  Select Time Slot:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  {SLOTS.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedSlot === slot 
                          ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-sm' 
                          : 'bg-white dark:bg-[#141414] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-[11px] font-sans text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>20 minutes • Google Meet video call</span>
              </div>
            </div>

            {/* Step 2: Contact Details */}
            <div className="md:col-span-6 space-y-4">
              <div className="text-xs font-sans font-bold text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>2. Your Details</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Revenue"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Sales Team Size
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Solo Founder">Solo Founder / 1 Rep</option>
                    <option value="2-5 Reps">2 - 5 Sales Reps</option>
                    <option value="6-20 Reps">6 - 20 Sales Reps</option>
                    <option value="Agency">Agency (Multi-Client)</option>
                    <option value="20+ Reps">20+ Enterprise Reps</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? 'Confirming Calendar Slot...' : 'Confirm Demo Booking'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}
      </div>

      {/* 3. WHAT HAPPENS AFTER BOOKING */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">TRANSPARENT PROCESS</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">What Happens Next</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Instant Calendar Invite", desc: "You will immediately receive a Google Calendar invitation with your personalized Google Meet link.", icon: Calendar },
            { step: "02", title: "Custom TAM Analysis", desc: "Our team researches your target market ICP across our 480M+ B2B database before the call.", icon: Search },
            { step: "03", title: "Live Tailored Demo", desc: "We build a live multi-channel workflow and demonstrate sub-400ms Voice AI with your actual offer.", icon: Zap },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-3">
                <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-[#1A1A1A] px-2 py-0.5 rounded">
                  Step {item.step}
                </span>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{item.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WHO SHOULD BOOK */}
      <section className="bg-white dark:bg-[#141414] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-6 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">Who Should Book a Demo?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200 dark:border-[#2A2A2A]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>B2B Founders:</strong> Looking to launch an automated outbound engine without hiring a 5-person SDR team.</span>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200 dark:border-[#2A2A2A]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Lead Gen Agencies:</strong> Managing multiple client pipelines wanting white-labeling and pooled wallets.</span>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200 dark:border-[#2A2A2A]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Sales Leaders & SDRs:</strong> Wanting to integrate Voice AI calling and safe LinkedIn automation with cold email.</span>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200 dark:border-[#2A2A2A]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>RevOps Directors:</strong> Looking to eliminate 6 separate SaaS subscriptions and single-database governance.</span>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
};

