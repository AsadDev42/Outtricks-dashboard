import React, { useState, useMemo } from 'react';
import { 
  Mail, 
  Sparkles, 
  Send, 
  Search, 
  Plus, 
  Filter, 
  Eye, 
  MessageSquare, 
  Flame, 
  X, 
  Coins,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLinkedIn, LinkedInInMail } from '../../context/LinkedInContext';

export const LinkedInInMailsView: React.FC = () => {
  const { inmails, composeInMail, campaigns } = useLinkedIn();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedInMail, setSelectedInMail] = useState<LinkedInInMail | null>(null);

  // Form State
  const [recipientName, setRecipientName] = useState('');
  const [recipientCompany, setRecipientCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [campaignName, setCampaignName] = useState('VIP Executive Outbound');

  const filteredInMails = useMemo(() => {
    return inmails.filter((inm) => {
      const matchesSearch = 
        inm.prospectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inm.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inm.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || inm.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [inmails, searchQuery, statusFilter]);

  const handleSendInMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !subject.trim()) return;
    composeInMail({
      prospectName: recipientName.trim(),
      company: recipientCompany.trim() || 'Target Co',
      subject: subject.trim(),
      campaignName,
    });
    setRecipientName('');
    setRecipientCompany('');
    setSubject('');
    setBody('');
    setIsComposeOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>InMails Studio</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Direct executive sponsored InMails bypassing connection barriers for VIP enterprise decision makers.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsComposeOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-md shadow-emerald-600/20"
        >
          Compose InMail
        </Button>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Credits Remaining</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
            <Coins className="w-4 h-4 text-amber-500" />
            <span>120 / 150</span>
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">InMails Sent</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">280</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Replies Received</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">84</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Open Rate</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">78.2%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Reply Rate</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">30.0%</span>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prospect, company, subject..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex items-center gap-1">
          {(['All', 'Delivered', 'Replied', 'Opened', 'Bounced'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 4. InMails Table */}
      <div className="bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-3.5 px-4">Target Contact</th>
                <th className="py-3.5 px-3">Subject Line</th>
                <th className="py-3.5 px-3">Sent Date</th>
                <th className="py-3.5 px-3">Delivery Status</th>
                <th className="py-3.5 px-3">Reply Feedback</th>
                <th className="py-3.5 px-3">Campaign Source</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {filteredInMails.map((inm) => (
                <tr
                  key={inm.id}
                  onClick={() => setSelectedInMail(inm)}
                  className="hover:bg-slate-50/80 dark:hover:bg-[#1C1C1C]/50 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-slate-900 dark:text-white">{inm.prospectName}</div>
                    <div className="text-[10px] text-slate-400">{inm.title || 'Executive'} @ {inm.company}</div>
                  </td>

                  <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200 max-w-xs truncate">
                    {inm.subject}
                  </td>

                  <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                    {inm.sentDate || 'Today'}
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <Badge
                      variant={inm.status === 'Replied' ? 'emerald' : inm.status === 'Opened' ? 'blue' : 'slate'}
                      size="sm"
                    >
                      {inm.status}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-3 font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                    {inm.replyStatus || 'Pending Response'}
                  </td>

                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 font-medium max-w-xs truncate">
                    {inm.campaignName}
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedInMail(inm)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold text-[11px] cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Compose InMail Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">Compose Sponsored InMail</h3>
                <span className="text-xs text-slate-400">1 Credit will be deducted upon delivery</span>
              </div>
              <button onClick={() => setIsComposeOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendInMail} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Recipient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jonathan Taylor"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Cloud Corp"
                    value={recipientCompany}
                    onChange={(e) => setRecipientCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Subject Line</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scalable AI outbound architecture for {{company}}"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Message Body</label>
                  <span className="text-[10px] text-slate-400 font-mono">Dynamic tags: {`{{firstName}}`}, {`{{company}}`}</span>
                </div>
                <textarea
                  rows={4}
                  required
                  placeholder="Hi {{firstName}}, saw your recent expansion at {{company}}..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setIsComposeOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" leftIcon={<Send className="w-3.5 h-3.5" />}>
                  Dispatch InMail (1 Credit)
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. View InMail Modal */}
      {selectedInMail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">InMail Dispatch</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedInMail.subject}</h3>
                <span className="text-xs text-slate-400">To: {selectedInMail.prospectName} ({selectedInMail.company}) • {selectedInMail.sentDate || 'Today'}</span>
              </div>
              <button onClick={() => setSelectedInMail(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Status</span>
                  <strong className="text-emerald-600 font-mono">{selectedInMail.status}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Reply Feedback</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{selectedInMail.replyStatus}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Credit Deducted</span>
                  <strong className="text-slate-900 dark:text-white font-mono">1 Credit</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <strong className="text-slate-900 dark:text-white block">Message Content</strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Hi {selectedInMail.prospectName}, we noticed your team is actively auditing multi-channel outbound systems at {selectedInMail.company}. Our platform provides dedicated static residential proxy isolation to ensure 0% checkpoint rates. Would you be open to a 15-minute briefing?
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setSelectedInMail(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
