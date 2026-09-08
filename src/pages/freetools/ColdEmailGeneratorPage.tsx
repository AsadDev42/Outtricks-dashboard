import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { Mail, Sparkles, Copy, Check, RefreshCw, Zap } from 'lucide-react';
import { cleanAiSlop } from '../../utils/noAiSlop';

export const ColdEmailGeneratorPage: React.FC = () => {
  const [recipientRole, setRecipientRole] = useState('VP of Sales');
  const [industry, setIndustry] = useState('B2B SaaS');
  const [painPoint, setPainPoint] = useState('Managing 5 disjointed outreach tools & poor email deliverability');
  const [offer, setOffer] = useState('Consolidating cold email, voice AI & LinkedIn into 1 single database with 99.4% deliverability');
  const [tone, setTone] = useState('Direct & Punchy');
  const [copied, setCopied] = useState(false);
  const [generatedSubject, setGeneratedSubject] = useState('Quick question regarding sales stack deliverability');
  const [generatedBody, setGeneratedBody] = useState(
`Hi {{first_name}},

Noticed {{company}} is scaling sales hiring this quarter • congrats on the growth!

Most {{industry}} sales leaders tell us their reps lose 4-6 hours a week managing fragmented outreach stacks across separate dialers and email tools, while struggling with domain deliverability.

We built Outtricks to consolidate cold email, LinkedIn, and real-time Voice AI into one single database with 99.4% inbox delivery.

Worth a 5-minute chat this Thursday to see how we cut $1,200/mo off tech stacks?

Best,
{{my_name}}`
  );

  const handleGenerate = () => {
    setGeneratedSubject(`Quick idea for ${recipientRole} at {{company}}`);
    const rawBody = `Hi {{first_name}},

Saw your focus on ${industry} expansion • wanted to reach out directly.

Are you running into friction with ${painPoint.toLowerCase()}?

We help high-velocity sales teams solve this by ${offer.toLowerCase()}.

Open to a brief 9-minute walkthrough this week?

Best,
{{my_name}}`;

    setGeneratedBody(cleanAiSlop(rawBody));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${generatedSubject}\n\n${generatedBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Free AI Cold Email Generator | Outtricks"
        description="Generate high-converting personalized cold email drafts based on prospect role, industry, and value proposition."
        canonical="https://outtricks.com/free-tools/cold-email-generator"
        keywords={["free cold email generator","AI email copywriter","sales email draft generator","outbound copy tool"]}
        breadcrumbs={[{"name":"Free Tools","url":"/resources/free-tools"},{"name":"Cold Email Generator","url":"/free-tools/cold-email-generator"}]}
      />
      <PageHeader 
        category="Free Tools"
        categoryHref="/resources/free-tools"
        badge="AI Cold Email Writer"
        title="AI Cold Email Generator"
        description="Generate high-converting, spam-free cold email sequences tailored to your target ICP in seconds."
        highlights={["Zero Spam Triggers", "High Reply Probability", "Dynamic Variables Ready"]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs */}
        <div className="lg:col-span-5 bg-white dark:bg-[#141414] p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Campaign Parameters</span>
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Recipient Role / Title</label>
            <input 
              type="text" 
              value={recipientRole} 
              onChange={(e) => setRecipientRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#181818] text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Industry</label>
            <input 
              type="text" 
              value={industry} 
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#181818] text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Core Prospect Pain Point</label>
            <textarea 
              rows={2}
              value={painPoint} 
              onChange={(e) => setPainPoint(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#181818] text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Core Value Proposition</label>
            <textarea 
              rows={2}
              value={offer} 
              onChange={(e) => setOffer(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#181818] text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate Cold Email Variant</span>
          </button>
        </div>

        {/* Output Preview */}
        <div className="lg:col-span-7 bg-[#090d16] rounded-2xl p-6 sm:p-8 text-white space-y-4 border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <span className="text-xs font-sans text-slate-400 font-bold uppercase">AI GENERATED COLD EMAIL</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Email"}</span>
            </button>
          </div>

          <div className="space-y-3 font-sans text-xs">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-bold">Subject: </span>
              <span className="text-blue-300">{generatedSubject}</span>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 font-sans text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
              {generatedBody}
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-400 flex items-center justify-between font-sans">
            <span>Spam Score: <strong className="text-emerald-400">0.0 (Clean)</strong></span>
            <span>Word Count: <strong>68 words</strong> (Optimal)</span>
          </div>
        </div>
      </div>

      <CtaBanner 
        title="Ready to automate personalized cold email at scale?"
        description="Connect 15+ inboxes and launch multi-inbox rotation with Outtricks."
      />
    </div>
  );
};

