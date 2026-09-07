import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { ArrowRight, MapPin, Briefcase, CheckCircle2, Sparkles, X } from 'lucide-react';

const JOBS = [
  { id: 1, title: "Senior WebRTC / Voice AI Engineer", dept: "Engineering", loc: "San Francisco / Remote", type: "Full-Time", desc: "Build sub-300ms audio pipelines connecting WebRTC directly to conversational LLMs." },
  { id: 2, title: "Staff PostgreSQL Distributed Systems Architect", dept: "Engineering", loc: "Remote (Global)", type: "Full-Time", desc: "Scale our single-schema multi-tenant PostgreSQL cluster to 500M+ events/day." },
  { id: 3, title: "Enterprise Account Executive (Outbound)", dept: "Sales", loc: "New York / Austin", type: "Full-Time", desc: "Close $50k-$200k ACV deals with hyper-growth B2B SaaS and agency accounts." },
  { id: 4, title: "Lead Product Designer (B2B SaaS)", dept: "Design", loc: "San Francisco / Remote", type: "Full-Time", desc: "Craft intuitive visual flow editors and high-density revenue command centers." },
  { id: 5, title: "Deliverability & Anti-Abuse Specialist", dept: "Infrastructure", loc: "Remote", type: "Full-Time", desc: "Manage automated SPF/DKIM validation and IP warm-up ramps for 50k+ mailboxes." }
];

export const CareersPage: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [applyingJob, setApplyingJob] = useState<typeof JOBS[0] | null>(null);
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', linkedin: '', resume: '' });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
  };

  const filteredJobs = JOBS.filter(job => selectedDept === 'All' || job.dept === selectedDept);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Careers at Outtricks | Join Our Global Team"
        description="Help build the future of AI revenue execution and autonomous outbound sales."
        canonical="https://outtricks.com/careers"
        keywords={["Outtricks careers","engineering jobs at Outtricks","sales software company careers"]}
        breadcrumbs={[{"name":"Careers","url":"/careers"}]}
      />
      <PageHeader 
        badge="We are Hiring"
        title="Build the Future of Autonomous Sales"
        description="Join an elite engineering and product team shaping the world's most performant AI revenue operating system."
      />

      {/* Dept Filter Tabs */}
      <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto flex-wrap">
        {["All", "Engineering", "Sales", "Design", "Infrastructure"].map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedDept === dept 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white dark:bg-[#141414] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredJobs.map((job) => (
          <div 
            key={job.id} 
            className="bg-white dark:bg-[#141414] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-clean flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white text-lg">{job.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">{job.desc}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 font-sans pt-1">
                <span>{job.dept}</span>
                <span>•</span>
                <span>{job.loc}</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{job.type}</span>
              </div>
            </div>

            <button 
              onClick={() => { setApplyingJob(job); setApplied(false); }}
              className="px-5 py-2.5 rounded-xl bg-blue-50 dark:bg-[#1A1A1A]/80 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 font-bold text-xs transition-colors shrink-0 cursor-pointer"
            >
              Apply Now →
            </button>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141414] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-[#2A2A2A] shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">Apply for role</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{applyingJob.title}</h3>
              </div>
              <button 
                onClick={() => setApplyingJob(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applied ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Application Submitted!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Thank you, {form.name}. Our talent team will review your application and reach out within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                  <input 
                    type="text" required placeholder="Sarah Connor"
                    value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                  <input 
                    type="email" required placeholder="sarah@email.com"
                    value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">LinkedIn Profile or Portfolio URL</label>
                  <input 
                    type="url" required placeholder="https://linkedin.com/in/sarah"
                    value={form.linkedin} onChange={(e) => setForm({...form, linkedin: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer mt-2"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <CtaBanner />
    </div>
  );
};
