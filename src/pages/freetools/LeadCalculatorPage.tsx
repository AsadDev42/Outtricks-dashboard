import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { Users, DollarSign, Target, Calculator } from 'lucide-react';

export const LeadCalculatorPage: React.FC = () => {
  const [tamSize, setTamSize] = useState(50000);
  const [targetQuarterlyDeals, setTargetQuarterlyDeals] = useState(25);
  const [closeRate, setCloseRate] = useState(20);

  const neededMeetings = Math.round(targetQuarterlyDeals / (closeRate / 100));
  const neededPositiveReplies = Math.round(neededMeetings / 0.45);
  const monthlyContactVolume = Math.round((neededPositiveReplies / 0.04) / 3);
  const marketPenetration = ((monthlyContactVolume * 12) / tamSize * 100).toFixed(1);

  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Free B2B Lead Volume & TAM Estimator | Outtricks"
        description="Estimate your total addressable market and lead volume across 480M+ verified global B2B profiles."
        canonical="https://outtricks.com/free-tools/lead-calculator"
        keywords={["TAM estimator","B2B lead volume calculator","addressable market tool","prospect pool calculator"]}
        breadcrumbs={[{"name":"Free Tools","url":"/resources/free-tools"},{"name":"Lead Calculator","url":"/free-tools/lead-calculator"}]}
      />
      <PageHeader 
        category="Free Tools"
        categoryHref="/resources/free-tools"
        badge="TAM & Pipeline Modeling"
        title="Lead Generation & Capacity Calculator"
        description="Model how many verified accounts you need to contact to hit your quarterly revenue targets."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 bg-white dark:bg-[#141414] p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span>Total Addressable Market (TAM in ICP Accounts):</span>
              <span className="text-blue-600 dark:text-blue-400 font-sans text-sm">{tamSize.toLocaleString()} accounts</span>
            </div>
            <input 
              type="range" min="5000" max="250000" step="5000"
              value={tamSize} onChange={(e) => setTamSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#181818] rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span>Target Quarterly Deals to Close:</span>
              <span className="text-blue-600 dark:text-blue-400 font-sans text-sm">{targetQuarterlyDeals} closed deals</span>
            </div>
            <input 
              type="range" min="5" max="100" step="1"
              value={targetQuarterlyDeals} onChange={(e) => setTargetQuarterlyDeals(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#181818] rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span>Demo-to-Close Conversion Rate (%):</span>
              <span className="text-blue-600 dark:text-blue-400 font-sans text-sm">{closeRate}%</span>
            </div>
            <input 
              type="range" min="10" max="40" step="1"
              value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#181818] rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#090d16] rounded-2xl p-6 sm:p-8 text-white space-y-4 border border-slate-800 shadow-xl">
          <span className="text-xs font-sans text-blue-400 uppercase tracking-widest">Required Outbound Engine</span>
          <div className="space-y-3 pt-2">
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-300">Required Monthly Contacts:</span>
              <span className="text-sm font-bold text-white font-sans">{monthlyContactVolume.toLocaleString()} / mo</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-300">Meetings Needed / Qtr:</span>
              <span className="text-sm font-bold text-emerald-400 font-sans">{neededMeetings} demos</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-300">Annual TAM Burn Rate:</span>
              <span className="text-sm font-bold text-white font-sans">{marketPenetration}% / year</span>
            </div>
          </div>
        </div>
      </div>

      <CtaBanner />
    </div>
  );
};

