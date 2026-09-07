import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Zap, 
  Building2, 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall 
} from 'lucide-react';
import { useAgents, AgentType, AutonomyLevel, AgentRecord } from '../../context/AgentsContext';

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEMPLATES = [
  {
    id: 'tpl-sdr',
    type: 'sdr' as AgentType,
    name: 'Apollo SDR Alpha',
    role: 'Autonomous Outbound SDR',
    description: 'Finds qualified B2B decision-makers, crafts hyper-relevant outreach hooks, and dispatches personalized emails across rotated inboxes.',
    instructions: 'You are an elite B2B SDR for Outtricks. Research target companies using firmographic indicators, verify work emails, and compose 3-sentence personalized hooks.',
    objective: 'Generate 20 qualified discovery meetings per month with VP Sales and Revenue Operations leaders.',
    autonomy: 'Autonomous' as AutonomyLevel,
    avatarBg: 'bg-emerald-600'
  },
  {
    id: 'tpl-linkedin',
    type: 'inmail' as AgentType,
    name: 'Sentinel LinkedIn Bot',
    role: 'Safe LinkedIn Outreach Specialist',
    description: 'Monitors target prospect profiles, visits accounts with residential proxy rotation, and sends personalized connection notes with zero ban risk.',
    instructions: 'Review prospect recent posts on LinkedIn. Compose concise, value-focused connection requests under 250 characters referencing mutual relevance.',
    objective: 'Connect with 25 target buyers daily and bridge warm responses directly into Deals CRM.',
    autonomy: 'Approval-Required' as AutonomyLevel,
    avatarBg: 'bg-indigo-600'
  },
  {
    id: 'tpl-upwork',
    type: 'bidding' as AgentType,
    name: 'BidCraft Upwork Agent',
    role: 'Marketplace Bidding Prospector',
    description: 'Scans live enterprise project postings, scores budget match & client hire rate, and generates bespoke technical proposals in under 90 seconds.',
    instructions: 'Analyze client project scope, past review history, and budget feasibility. Generate high-conversion custom proposals highlighting relevant case studies.',
    objective: 'Submit high-fit proposals within the first 5 minutes of job posting to maximize client viewing rank.',
    autonomy: 'Approval-Required' as AutonomyLevel,
    avatarBg: 'bg-sky-600'
  },
  {
    id: 'tpl-research',
    type: 'research' as AgentType,
    name: 'DeepContext Intelligence Agent',
    role: 'Account & Technographic Researcher',
    description: 'Performs deep reconnaissance across company funding, installed tech stacks, and active hiring surges before multi-channel outreach begins.',
    instructions: 'Extract key company properties, installed cloud infrastructure, recent executive promotions, and strategic expansion signals.',
    objective: 'Populate account cards with verified actionable intelligence prior to SDR call scheduling.',
    autonomy: 'Autonomous' as AutonomyLevel,
    avatarBg: 'bg-teal-600'
  }
];

export const CreateAgentModal: React.FC<CreateAgentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { createAgent } = useAgents();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('tpl-sdr');
  const [name, setName] = useState('Apollo SDR Alpha');
  const [role, setRole] = useState('Autonomous Outbound SDR');
  const [type, setType] = useState<AgentType>('sdr');
  const [description, setDescription] = useState('Finds qualified B2B decision-makers, crafts hyper-relevant outreach hooks, and dispatches personalized emails across rotated inboxes.');
  const [systemInstructions, setSystemInstructions] = useState('You are an elite B2B SDR for Outtricks. Research target companies using firmographic indicators, verify work emails, and compose 3-sentence personalized hooks.');
  const [objective, setObjective] = useState('Generate 20 qualified discovery meetings per month with VP Sales and Revenue Operations leaders.');
  const [constraints, setConstraints] = useState('Never contact companies with under 50 employees. Maintain 100% CAN-SPAM compliance.');
  const [autonomyLevel, setAutonomyLevel] = useState<AutonomyLevel>('Autonomous');
  const [maxDailyActions, setMaxDailyActions] = useState(150);
  const [avatarBg, setAvatarBg] = useState('bg-emerald-600');

  const handleSelectTemplate = (tpl: typeof TEMPLATES[0]) => {
    setSelectedTemplateId(tpl.id);
    setName(tpl.name);
    setRole(tpl.role);
    setType(tpl.type);
    setDescription(tpl.description);
    setSystemInstructions(tpl.instructions);
    setObjective(tpl.objective);
    setAutonomyLevel(tpl.autonomy);
    setAvatarBg(tpl.avatarBg);
  };

  const handleFinish = () => {
    createAgent({
      name,
      role,
      type,
      description,
      systemInstructions,
      objective,
      constraints,
      autonomyLevel,
      maxDailyActions,
      avatarBg
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-[#161616] rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shadow-emerald-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                Create Autonomous Agent
              </h2>
              <p className="text-xs text-slate-500">
                Step {step} of 4: {
                  step === 1 ? 'Select Template & Role' :
                  step === 2 ? 'Instructions & Logic' :
                  step === 3 ? 'Tools & Permissions' :
                  'Autonomy & Guardrails'
                }
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-[#181818] h-1">
          <div 
            className="bg-emerald-500 h-1 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          
          {/* STEP 1: TEMPLATE & IDENTITY */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-2">
                  Choose a Pre-Built Specialty Template
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TEMPLATES.map((tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => handleSelectTemplate(tpl)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                        selectedTemplateId === tpl.id
                          ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-500/10'
                          : 'border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300 dark:hover:border-[#333]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                          {tpl.name}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300">
                          {tpl.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {tpl.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-1.5">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-1.5">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-1.5">
                  Summary & Purpose
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                />
              </div>
            </div>
          )}

          {/* STEP 2: INSTRUCTIONS & OBJECTIVES */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-1.5">
                  System Persona & Core Logic Instructions
                </label>
                <textarea
                  rows={5}
                  value={systemInstructions}
                  onChange={(e) => setSystemInstructions(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-1.5">
                  Primary Quantitative Objective
                </label>
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-1.5">
                  Behavioral Constraints & Exclusions
                </label>
                <input
                  type="text"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                />
              </div>
            </div>
          )}

          {/* STEP 3: TOOLS */}
          {step === 3 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="text-xs text-slate-500">
                Select platform modules this agent is authorized to access:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: '8D Lead Database Search', module: 'lead-finder', icon: Search, desc: 'Search 480M+ verified global B2B profiles' },
                  { name: 'Cold Email Dispatch', module: 'email', icon: Mail, desc: 'Personalized sequences across rotated mailboxes' },
                  { name: 'LinkedIn Safe Cloud', module: 'linkedin', icon: Linkedin, desc: 'Isolated proxy connection & message outreach' },
                  { name: 'Voice AI SDR Calling', module: 'voice', icon: PhoneCall, desc: 'Sub-400ms conversational qualification calls' },
                  { name: 'Deals CRM Stage Updates', module: 'crm', icon: Building2, desc: 'Sync pipeline opportunities and activity logs' },
                  { name: 'DAG Workflow Triggers', module: 'workflows', icon: Zap, desc: 'Invoke multi-channel event sequences' }
                ].map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#202020] flex items-start gap-2.5 text-xs"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="mt-0.5 rounded border-slate-300 dark:border-[#333] text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-500"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <tool.icon className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{tool.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: AUTONOMY & GUARDRAILS */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white mb-2">
                  Operating Autonomy Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'Autonomous', label: 'Autonomous', desc: 'Auto-executes within daily limits' },
                    { id: 'Approval-Required', label: 'Human Review', desc: 'Queues actions for approval' },
                    { id: 'Manual', label: 'Manual Assist', desc: 'Drafts only, no auto dispatch' }
                  ].map((lvl) => (
                    <div
                      key={lvl.id}
                      onClick={() => setAutonomyLevel(lvl.id as AutonomyLevel)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1 ${
                        autonomyLevel === lvl.id
                          ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-500/10 text-emerald-950 dark:text-emerald-200'
                          : 'border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#141414]'
                      }`}
                    >
                      <div className="font-bold text-xs">{lvl.label}</div>
                      <div className="text-[10px] text-slate-500">{lvl.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>Daily Action Throttle</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{maxDailyActions} Actions / Day</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={maxDailyActions}
                  onChange={(e) => setMaxDailyActions(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-[#181818] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 text-xs space-y-1">
                <span className="font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Enterprise Safety Protocol Active</span>
                </span>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                  Agent will strictly adhere to rate limits, static residential proxies, and spam prevention safeguards.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-5 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between bg-slate-50/50 dark:bg-[#141414]/40">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => (prev - 1) as any)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            {step < 4 ? (
              <button
                onClick={() => setStep((prev) => (prev + 1) as any)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs shadow-emerald-500/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs shadow-emerald-500/20"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Deploy & Publish Agent</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
