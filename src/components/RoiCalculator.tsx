import React, { useState } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RoiCalculator: React.FC = () => {
  const [prospects, setProspects] = useState(2500);
  const [replyRate, setReplyRate] = useState(4.2);
  const [acv, setAcv] = useState(5000);

  const replies = Math.round(prospects * (replyRate / 100));
  const meetings = Math.round(replies * 0.45);
  const dealsClosed = (meetings * 0.20).toFixed(1);
  const monthlyPipeline = Math.round(parseFloat(dealsClosed) * acv);
  const hoursSaved = Math.round((prospects * 2.5) / 60);

  return (
    <div className="bg-white dark:bg-[#141414] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 p-6 sm:p-10">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
          Real Revenue Impact
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Calculate Your Pipeline & Time Savings
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Slide the assumptions below based on your target ICP. See why consolidating 6 tools into 1 database accelerates pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2 bg-slate-50 dark:bg-[#181818]/80 p-4 rounded-2xl border border-slate-200/60 dark:border-[#2A2A2A]">
            <div className="flex justify-between items-center text-sm font-bold text-slate-800 dark:text-slate-200">
              <span>Prospects Contacted / Month:</span>
              <span className="text-blue-600 dark:text-blue-400 text-base font-extrabold font-sans">{prospects.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="20000" 
              step="250"
              value={prospects} 
              onChange={(e) => setProspects(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <span>500 (Boutique)</span>
              <span>10,000+ (Growth)</span>
              <span>20,000 (Scale)</span>
            </div>
          </div>

          <div className="space-y-2 bg-slate-50 dark:bg-[#181818]/80 p-4 rounded-2xl border border-slate-200/60 dark:border-[#2A2A2A]">
            <div className="flex justify-between items-center text-sm font-bold text-slate-800 dark:text-slate-200">
              <span>Positive Reply Rate (%):</span>
              <span className="text-blue-600 dark:text-blue-400 text-base font-extrabold font-sans">{replyRate}%</span>
            </div>
            <input 
              type="range" 
              min="1.0" 
              max="12.0" 
              step="0.1"
              value={replyRate} 
              onChange={(e) => setReplyRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <span>1.0% (Cold Cold)</span>
              <span>4.2% (Outtricks Avg)</span>
              <span>12.0% (Hyper-Targeted)</span>
            </div>
          </div>

          <div className="space-y-2 bg-slate-50 dark:bg-[#181818]/80 p-4 rounded-2xl border border-slate-200/60 dark:border-[#2A2A2A]">
            <div className="flex justify-between items-center text-sm font-bold text-slate-800 dark:text-slate-200">
              <span>Average Deal ACV ($):</span>
              <span className="text-blue-600 dark:text-blue-400 text-base font-extrabold font-sans">${acv.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="50000" 
              step="1000"
              value={acv} 
              onChange={(e) => setAcv(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <span>$1,000 (SMB)</span>
              <span>$15,000 (Mid-Market)</span>
              <span>$50,000+ (Enterprise)</span>
            </div>
          </div>
        </div>

        {/* Projected Monthly Revenue Block */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="space-y-1">
            <span className="text-xs font-sans font-bold text-blue-400 uppercase tracking-wider">Projected Output</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
              ${monthlyPipeline.toLocaleString()}
              <span className="text-xs text-slate-400 font-normal font-sans"> / mo pipeline</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs">
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block text-[11px]">Qualified Replies</span>
              <span className="font-sans text-base font-bold text-white">{replies}</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block text-[11px]">Demos Booked</span>
              <span className="font-sans text-base font-bold text-white">{meetings}</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block text-[11px]">Deals Won</span>
              <span className="font-sans text-base font-bold text-emerald-400">{dealsClosed}</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Hours Saved</span>
                <span className="font-sans text-base font-bold text-white">{hoursSaved} hrs</span>
              </div>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
          </div>

          <Link 
            to="/signup" 
            className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all text-center"
          >
            <span>Lock In This Pipeline ROI</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
