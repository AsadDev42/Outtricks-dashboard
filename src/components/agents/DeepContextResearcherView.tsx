import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  FileText, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Play, 
  Plus, 
  ArrowRight, 
  ExternalLink,
  BookOpen,
  Database,
  Sliders,
  Check,
  X,
  RotateCw
} from 'lucide-react';
import { useAgents, AgentRecord } from '../../context/AgentsContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export const DeepContextResearcherView: React.FC = () => {
  const { agents } = useAgents();
  const { success, info } = useToast();

  const [isNewResearchOpen, setIsNewResearchOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newDepth, setNewDepth] = useState('Deep Multi-Source (10-K, News, Tech Stack)');

  const [activeResearches, setActiveResearches] = useState([
    {
      id: 'res-01',
      title: 'Snowflake vs Databricks Enterprise AI Market Migration Analysis',
      objective: 'Identify CIO pain points, migration budget cycles, and key account intent keywords for 50 target accounts.',
      progress: 68,
      sourcesProcessed: 14,
      status: 'Analyzing SEC Filings',
      started: '18 mins ago',
      depth: 'Enterprise SEC & Technographic'
    },
    {
      id: 'res-02',
      title: 'Top 100 HealthTech Series B-D Companies Hiring VP RevOps',
      objective: 'Scrape org charts, identify recent executive departures, and flag outbound timing triggers.',
      progress: 42,
      sourcesProcessed: 8,
      status: 'Synthesizing Org Signals',
      started: '34 mins ago',
      depth: 'Org Intelligence & Hiring Velocity'
    }
  ]);

  const COMPLETED_RESEARCHES = [
    {
      id: 'comp-01',
      title: 'Cybersecurity Threat Detection Buyer Persona Dossier (2026)',
      completed: 'Today at 11:20 AM',
      sources: 32,
      duration: '14 mins',
      resultSummary: 'Comprehensive 12-page dossier profiling CISO purchasing criteria, budget cycles, and vendor evaluation metrics.',
      keyFindings: [
        '84% of CISOs prioritising consolidation of legacy point solutions into unified agentic platforms.',
        'Average evaluation window: 45 days with mandatory SOC2 and GDPR compliance audit.',
        'Primary budget trigger: Recent security audit or executive board mandate.'
      ]
    },
    {
      id: 'comp-02',
      title: 'B2B Fintech Automated Billing Engine Competitive Landscape',
      completed: 'Yesterday at 4:15 PM',
      sources: 28,
      duration: '18 mins',
      resultSummary: 'Detailed feature comparison, pricing matrix, and customer sentiment analysis across 8 top enterprise competitors.',
      keyFindings: [
        'High dissatisfaction with Stripe Billing custom enterprise tier pricing among high-volume SaaS.',
        'Opportunity window: Fast-growing startups seeking usage-based metering without 3% transaction markup.'
      ]
    }
  ];

  const handleCreateResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: `res-${Date.now()}`,
      title: newTitle,
      objective: newObjective || 'Autonomous account and technographic discovery.',
      progress: 10,
      sourcesProcessed: 2,
      status: 'Initiating Web & SEC Search',
      started: 'Just now',
      depth: newDepth
    };

    setActiveResearches([newItem, ...activeResearches]);
    setIsNewResearchOpen(false);
    setNewTitle('');
    setNewObjective('');
    success(`DeepContext research task "${newTitle}" dispatched.`, 'Research Dispatched');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center font-black text-xl shadow-xs shrink-0">
            <Sparkles className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                DeepContext Researcher
              </h1>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Multi-Source Synthesis
              </span>

              <span className="text-xs font-mono text-slate-400">ID: agt_deep_researcher</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              Conducts exhaustive firmographic intelligence, analyzes SEC 10-K/Q filings, maps buyer org structures, and produces executive-ready briefing memos.
            </p>
          </div>
        </div>

        {/* Action button */}
        <Button
          onClick={() => setIsNewResearchOpen(true)}
          variant="primary"
          className="flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Research Task</span>
        </Button>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active Research</span>
          <div className="text-xl font-black text-emerald-500 font-mono">
            {activeResearches.length} Tasks
          </div>
          <span className="text-[10px] text-slate-400">In-flight synthesis</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Completed Research</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">48 Reports</div>
          <span className="text-[10px] text-emerald-600 font-bold">100% verified</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Sources Processed</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">1,420</div>
          <span className="text-[10px] text-slate-400">Filings, news, web</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Reports Generated</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">64 Dossiers</div>
          <span className="text-[10px] text-slate-400">Available in CRM</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Avg Research Time</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">16.4 mins</div>
          <span className="text-[10px] text-slate-400">Full depth analysis</span>
        </div>
      </div>

      {/* 3. Section A: Active Research Tasks */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-500" />
          <span>Active Autonomous Research Workflows ({activeResearches.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeResearches.map((task) => (
            <div
              key={task.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-1">
                    {task.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {task.objective}
                  </p>
                </div>
                <Badge variant="emerald">{task.status}</Badge>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>{task.sourcesProcessed} Sources Synthesized</span>
                  <span className="text-emerald-500 font-bold">{task.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#181818] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${task.progress}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-white/[0.05]">
                <span>Started: {task.started}</span>
                <span className="text-emerald-500 font-semibold">{task.depth}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Section B: Completed Research Dossiers */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
          Completed Research Briefings & Executive Dossiers
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-white/[0.05] text-xs">
          {COMPLETED_RESEARCHES.map((doc) => (
            <div key={doc.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 max-w-xl">
                <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{doc.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {doc.resultSummary}
                </p>
                <div className="flex items-center gap-3 text-slate-400 text-[10px]">
                  <span>Completed: {doc.completed}</span>
                  <span>•</span>
                  <span>{doc.sources} Sources</span>
                  <span>•</span>
                  <span>Duration: {doc.duration}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedReport(doc)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-500 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 border border-slate-200/80 dark:border-[#2A2A2A]"
              >
                <span>View Full Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. New Research Modal */}
      {isNewResearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>Deploy DeepContext Research Task</span>
              </h3>
              <button onClick={() => setIsNewResearchOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateResearch} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Research Topic or Target Account
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Data Lakehouse Modernization Trends (2026)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Core Objective & Target Questions
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify key questions, required datapoints (e.g. budget, tech stack, hiring velocity)..."
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Investigation Depth
                </label>
                <select
                  value={newDepth}
                  onChange={(e) => setNewDepth(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option>Deep Multi-Source (10-K, News, Tech Stack)</option>
                  <option>Executive Org Chart & Intent Signals</option>
                  <option>Fast Technographic Enrichment (&lt;5 mins)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#2A2A2A]">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsNewResearchOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Dispatch Research
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Selected Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase">Executive Research Report</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedReport.title}</h3>
                <span className="text-xs text-slate-400">Synthesized {selectedReport.completed} • {selectedReport.sources} citations</span>
              </div>
              <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <strong className="text-slate-900 dark:text-white block">Executive Summary</strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selectedReport.resultSummary}</p>
              </div>

              <div className="space-y-2">
                <strong className="text-slate-900 dark:text-white block uppercase tracking-wider text-[11px]">Key Findings & Strategic Triggers</strong>
                <ul className="space-y-2">
                  {selectedReport.keyFindings?.map((kf: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{kf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setSelectedReport(null)}>
                Close Report
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
