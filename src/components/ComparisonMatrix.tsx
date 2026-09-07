import React from 'react';
import { Check, Zap, Flame } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  const FEATURES = [
    {
      category: "Outreach & Channels",
      items: [
        { name: "Multi-Inbox Cold Email Rotation", outtricks: "Built-in SPF/DKIM rotation", lemlist: "Built-in (lemwarm)", stitched: "Requires Smartlead/Instantly" },
        { name: "Autonomous Real-Time Voice AI SDR", outtricks: "Native WebRTC Assistant", lemlist: "Manual VoIP / Integration only", stitched: "Separate $500/mo dialer" },
        { name: "LinkedIn Automation Engine", outtricks: "100% Official Versioned API", lemlist: "Chrome Extension / Session cookie", stitched: "Unsafe browser puppet bot" },
        { name: "Upwork & Freelancer AI Bidding", outtricks: "24/7 Feed Scanner (<3m Bids)", lemlist: "Not Supported", stitched: "Not Supported" },
        { name: "B2B Lead Database (480M+ Contacts)", outtricks: "Included in single wallet", lemlist: "Included (Credit tier)", stitched: "Apollo/ZoomInfo ($1k+/yr)" }
      ]
    },
    {
      category: "Architecture & Data",
      items: [
        { name: "Database Schema Architecture", outtricks: "1 Single Immutable PostgreSQL", lemlist: "Separate app + external sync", stitched: "6 databases glued by Zapier" },
        { name: "Data Sync Lag / Webhook Failures", outtricks: "0 Hops (Zero latency)", lemlist: "3-5 Hops to your CRM", stitched: "5+ Hops (Regular sync breaks)" },
        { name: "Pre-Send Suppression Engine", outtricks: "Pre-checked on write path", lemlist: "Nightly sweep / list sync", stitched: "Separate per-tool lists" },
        { name: "White-Label Agency Client Workspaces", outtricks: "Full White-label & Credit Ledger", lemlist: "Basic team seats", stitched: "Multiple logins & messy billing" }
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-[#141414] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 p-6 sm:p-10 overflow-hidden">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 w-fit mx-auto border border-amber-200/80 dark:border-amber-800/60">
          <Flame className="w-3.5 h-3.5 fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400" />
          The Modern Battlecard
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Outtricks vs. Lemlist vs. 6-Tool Stack
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Why growing revenue teams are replacing fragmented stacks with a single revenue operating system.
        </p>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs sm:text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-[#2A2A2A]">
              <th className="py-4 px-4 font-bold text-slate-500 dark:text-slate-400 uppercase text-xs">Capability</th>
              <th className="py-4 px-4 bg-blue-50/80 dark:bg-white/[0.04] text-blue-900 dark:text-blue-200 rounded-t-2xl font-extrabold text-sm border-t border-x border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
                  Outtricks
                </div>
              </th>
              <th className="py-4 px-4 font-bold text-slate-800 dark:text-slate-200">Lemlist</th>
              <th className="py-4 px-4 font-bold text-slate-400 dark:text-slate-500">6-Tool Stitched Stack</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {FEATURES.map((cat, idx) => (
              <React.Fragment key={idx}>
                <tr className="bg-slate-50/80 dark:bg-[#181818]/80 font-sans text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <td colSpan={4} className="py-2.5 px-4 tracking-wider uppercase">
                    {cat.category}
                  </td>
                </tr>
                {cat.items.map((item, itemIdx) => (
                  <tr key={itemIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {item.name}
                    </td>
                    <td className="py-4 px-4 bg-blue-50/50 dark:bg-white/[0.04] font-bold text-slate-900 dark:text-white border-x border-blue-100 dark:border-blue-900/50">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span>{item.outtricks}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                      <span className="font-medium">{item.lemlist}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-400 dark:text-slate-500">
                      <span>{item.stitched}</span>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
