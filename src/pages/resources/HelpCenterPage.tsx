import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { 
  Search, 
  HelpCircle, 
  Terminal, 
  Mail, 
  ShieldCheck, 
  PhoneCall, 
  Building2, 
  Cpu, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Copy,
  Send,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const DOC_CATEGORIES = [
  { id: 'dns', title: 'DNS & Deliverability', icon: ShieldCheck, count: '12 articles', desc: 'SPF, DKIM, DMARC, and custom tracking domains configuration.' },
  { id: 'voice', title: 'Voice AI & WebRTC', icon: PhoneCall, count: '8 articles', desc: 'Prompt engineering, sub-second latency, and TCPA compliance.' },
  { id: 'linkedin', title: 'Official LinkedIn API', icon: Mail, count: '6 articles', desc: 'OAuth token rotation, dedicated static proxies, and rate caps.' },
  { id: 'crm', title: 'Native Deals CRM', icon: Building2, count: '9 articles', desc: 'Custom pipeline stages, deal probabilities, and timeline syncing.' },
  { id: 'api', title: 'REST API & Webhooks', icon: Terminal, count: '14 articles', desc: 'Developer endpoints, authentication headers, and idempotency keys.' },
  { id: 'billing', title: 'Billing & Ledgers', icon: Cpu, count: '7 articles', desc: 'Paddle invoicing, credit consumption formulas, and plan upgrades.' }
];

const FAQS = [
  {
    category: 'dns',
    q: "How do I configure SPF and DKIM for Google Workspace inboxes?",
    snippet: `v=spf1 include:_spf.google.com ~all\n\n// DKIM TXT Record\nHost: google._domainkey\nValue: v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...`,
    desc: "Add the TXT records to your domain DNS registrar (Cloudflare, Namecheap, GoDaddy). Outtricks will automatically verify propagation within 15 minutes."
  },
  {
    category: 'voice',
    q: "How does the Voice AI SDR handle gatekeeper transfers?",
    snippet: `// Prompt Instruction Hook\n{\n  "gatekeeper_strategy": "polite_assertive",\n  "target_persona": "VP Sales",\n  "objective": "confirm_calendar_time"\n}`,
    desc: "Our conversational model detects receptionist tone and provides a direct, contextual business reason for contacting the decision-maker."
  },
  {
    category: 'api',
    q: "How do I dispatch a multi-channel sequence via REST API?",
    snippet: `curl -X POST https://api.outtricks.com/v1/campaigns/dispatch \\\n  -H "Authorization: Bearer out_live_89a4bc71" \\\n  -H "Content-Type: application/json" \\\n  -d '{"lead_email": "prospect@target.com", "flow_id": "fl_289"}'`,
    desc: "All endpoints return sub-50ms responses and write directly to your workspace PostgreSQL database with zero queuing drift."
  }
];

export const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', message: '' });

  const copySnippet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
  };

  const filteredFaqs = FAQS.filter(faq => {
    const matchSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = !selectedCat || faq.category === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Help Center, Knowledge Base & Documentation | Outtricks"
        description="Guides, tutorials, API references, and step-by-step documentation for every Outtricks module."
        canonical="https://outtricks.com/resources/help-center"
        keywords={["Outtricks help center","outbound documentation","knowledge base","product support"]}
        breadcrumbs={[{"name":"Resources","url":"/resources"},{"name":"Help Center","url":"/resources/help-center"}]}
      />
      <PageHeader 
        category="Resources" categoryHref="/resources"
        badge="Documentation & Knowledge Base"
        title="Outtricks Help Center & Documentation"
        description="Search setup guides, API endpoints, DNS deliverability playbooks, and troubleshooting docs."
      />

      {/* Live Search Bar */}
      <div className="max-w-3xl mx-auto relative">
        <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input 
          type="text"
          placeholder="Search articles, DNS error codes, API endpoints, WebRTC guides..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none shadow-clean"
        />
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DOC_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCat === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCat(isSelected ? null : cat.id)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                isSelected 
                  ? 'bg-blue-50/50 dark:bg-white/[0.04] border-blue-600 dark:border-blue-500 shadow-md ring-2 ring-blue-500/20' 
                  : 'bg-white dark:bg-[#141414] border-slate-200 dark:border-[#2A2A2A] shadow-clean hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-[#1A1A1A]/80 text-blue-600 dark:text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-sans font-bold bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">
                  {cat.count}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{cat.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{cat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive FAQ & Code Snippets */}
      <div className="bg-white dark:bg-[#141414] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-[#2A2A2A]">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {selectedCat ? `Articles for: ${DOC_CATEGORIES.find(c => c.id === selectedCat)?.title}` : 'Frequently Consulted Documentation'}
          </h3>
          {selectedCat && (
            <button 
              onClick={() => setSelectedCat(null)}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
            >
              Show all topics
            </button>
          )}
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;

            return (
              <div key={idx} className="border border-slate-200 dark:border-[#2A2A2A] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-slate-50/50 dark:bg-[#0D0D0D]/50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {isOpen && (
                  <div className="p-5 space-y-4 bg-white dark:bg-[#141414] border-t border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-600 dark:text-slate-300">
                    <p className="leading-relaxed">{faq.desc}</p>
                    
                    {faq.snippet && (
                      <div className="relative">
                        <pre className="p-4 bg-slate-950 dark:bg-black text-slate-200 rounded-xl font-sans text-[11px] overflow-x-auto border border-slate-800">
                          {faq.snippet}
                        </pre>
                        <button
                          onClick={() => copySnippet(faq.snippet, idx)}
                          className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-[10px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Ticket Section */}
      <div className="bg-slate-900 dark:bg-[#0D0D0D] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Can't find what you are looking for?</h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Our outbound engineering specialists are available 24/7 for deliverability audits, DNS troubleshooting, and API questions.
          </p>
        </div>

        <button
          onClick={() => setIsTicketOpen(true)}
          className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
        >
          Open Support Ticket
        </button>
      </div>

      {/* Support Ticket Modal */}
      {isTicketOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141414] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-[#2A2A2A] shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Submit Support Request</h3>
              <button 
                onClick={() => { setIsTicketOpen(false); setTicketSent(false); }}
                className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold cursor-pointer"
              >
                Close
              </button>
            </div>

            {ticketSent ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Ticket Dispatched!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Our engineering team has received your ticket and will reply to {ticketForm.email} in under 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Your Name</label>
                  <input 
                    type="text" required placeholder="Alex Rivera"
                    value={ticketForm.name} onChange={(e) => setTicketForm({...ticketForm, name: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Work Email</label>
                  <input 
                    type="email" required placeholder="alex@company.com"
                    value={ticketForm.email} onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">How can we help?</label>
                  <textarea 
                    rows={4} required placeholder="Describe your deliverability question or API error code..."
                    value={ticketForm.message} onChange={(e) => setTicketForm({...ticketForm, message: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Send Support Ticket
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
