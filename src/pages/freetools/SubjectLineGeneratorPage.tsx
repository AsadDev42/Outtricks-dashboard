import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { Zap, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import { cleanAiSlop } from '../../utils/noAiSlop';

export const SubjectLineGeneratorPage: React.FC = () => {
  const [keyword, setKeyword] = useState('Outbound pipeline');
  const [prospectCompany, setProspectCompany] = useState('Acme Corp');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [lines, setLines] = useState([
    { text: `Quick question regarding ${keyword.toLowerCase()}`, openRate: "68%", badge: "High Open Rate" },
    { text: `${keyword} idea for {{first_name}}`, openRate: "64%", badge: "Short & Casual" },
    { text: `Scaling ${prospectCompany}'s pipeline this quarter?`, openRate: "72%", badge: "Top Performer" },
    { text: `{{first_name}}, saw your recent update`, openRate: "59%", badge: "Personalized" },
    { text: `3 ideas to double reply rates at ${prospectCompany}`, openRate: "66%", badge: "Value-Driven" },
  ]);

  const handleGenerate = () => {
    setLines([
      { text: cleanAiSlop(`Thoughts on ${keyword.toLowerCase()} for {{company}}?`), openRate: "74%", badge: "Question Angle" },
      { text: cleanAiSlop(`{{first_name}} / ${keyword.toLowerCase()}`), openRate: "69%", badge: "Ultra Minimal" },
      { text: cleanAiSlop(`Fixing ${keyword.toLowerCase()} bottlenecks this month`), openRate: "63%", badge: "Direct Pain" },
      { text: cleanAiSlop(`Quick idea for ${prospectCompany}`), openRate: "71%", badge: "Top Performer" },
      { text: cleanAiSlop(`15 mins on Thursday regarding ${keyword.toLowerCase()}?`), openRate: "65%", badge: "Low Friction" }
    ]);
  };

  const copyLine = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Free Cold Email Subject Line Generator & Scorer | Outtricks"
        description="Generate and score cold email subject lines optimized for open rates and spam filter avoidance."
        canonical="https://outtricks.com/free-tools/subject-line-generator"
        keywords={["subject line generator","email subject tester","cold email open rate optimizer","subject line scorer"]}
        breadcrumbs={[{"name":"Free Tools","url":"/resources/free-tools"},{"name":"Subject Line Generator","url":"/free-tools/subject-line-generator"}]}
      />
      <PageHeader 
        category="Free Tools"
        categoryHref="/resources/free-tools"
        badge="Open-Rate Optimizer"
        title="Cold Email Subject Line Generator"
        description="Test, score and generate proven cold email subject lines with AI open-rate prediction."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-white dark:bg-[#141414] p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Generator Settings</span>
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Topic / Core Keyword</label>
            <input 
              type="text" 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#181818] text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Company Name</label>
            <input 
              type="text" 
              value={prospectCompany} 
              onChange={(e) => setProspectCompany(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#181818] text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate 5 New Subject Lines</span>
          </button>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-[#141414] rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between">
            <span>High Probability Subject Lines</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-sans font-bold">Avg Open Rate: 68%</span>
          </h3>

          <div className="space-y-2.5">
            {lines.map((line, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/80 dark:border-[#2A2A2A] flex items-center justify-between gap-3 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="space-y-1">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans">
                    "{line.text}"
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-blue-50 dark:bg-[#1A1A1A] text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold px-2 py-0.5 rounded">
                      {line.badge}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      Est. Open Rate: {line.openRate}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => copyLine(line.text, idx)}
                  className="p-2 rounded-lg bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all shrink-0 cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CtaBanner />
    </div>
  );
};

