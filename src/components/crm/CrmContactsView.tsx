import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Linkedin, 
  Building2, 
  User, 
  Calendar, 
  ShieldCheck, 
  ExternalLink,
  MoreVertical,
  CheckCircle2,
  Clock,
  Trash2,
  Edit2,
  X,
  ArrowRight,
  MessageSquare,
  Filter,
  Download,
  CheckSquare,
  Send,
  Sparkles,
  Tag
} from 'lucide-react';
import { useCrm, CrmContact, ContactQualificationStatus } from '../../context/CrmContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatNumber, formatDate } from '../../utils/formatters';
import { ContactDetailDrawer } from './ContactDetailDrawer';

export const CrmContactsView: React.FC = () => {
  const { contacts, createContact, deleteContact, deals, setActiveTab, activeTab } = useCrm();
  const isLeadsView = activeTab === 'leads' || (typeof window !== 'undefined' && window.location.pathname.includes('/crm/leads'));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<CrmContact | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // New Contact Form
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [channel, setChannel] = useState<'Email' | 'LinkedIn' | 'Voice SDR' | 'Inbound'>('Email');

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch = !searchQuery.trim() || (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesStatus = statusFilter === 'all' || 
      (c.leadStatus && c.leadStatus.toLowerCase() === statusFilter.toLowerCase()) ||
      c.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesOwner = ownerFilter === 'all' || c.owner === ownerFilter;
    return matchesSearch && matchesStatus && matchesOwner;
  });

  const handleSelectAll = () => {
    if (selectedIds.length === filteredContacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContacts.map(c => c.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    createContact({
      name,
      title: title || 'Decision Maker',
      companyName: companyName || 'Target Organization',
      email,
      phone: phone || '+1 (555) 000-0000',
      channel,
      score: 95,
      stage: 'Lead',
      leadStatus: 'New',
      tags: ['Direct Entry'],
    });

    setIsAddModalOpen(false);
    setName('');
    setTitle('');
    setCompanyName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
            {isLeadsView ? `CRM Leads & Working Pipeline (${contacts.length})` : `Contacts Action Hub (${contacts.length})`}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isLeadsView 
              ? 'Track newly identified prospects, qualification stages (MQL/SQL), and transition working leads into active deals.' 
              : 'Verified relationships, direct phone numbers, and cross-platform communication timelines.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            {isLeadsView ? 'Add Lead' : 'Add Contact'}
          </Button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by contact name, job title, company, or email..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
          >
            <option value="all">All Qualification Statuses</option>
            <option value="qualified">Qualified</option>
            <option value="engaged">Engaged</option>
            <option value="contacted">Contacted</option>
            <option value="working">Working</option>
            <option value="new">New</option>
            <option value="converted">Converted</option>
          </select>

          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
          >
            <option value="all">All Owners</option>
            <option value="Sarah Jenkins">Sarah Jenkins</option>
            <option value="Alex Rivera">Alex Rivera</option>
            <option value="Marcus Vance">Marcus Vance</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing {filteredContacts.length} of {contacts.length} Contacts
        </div>
      </div>

      {/* 3. Contacts Table */}
      <div className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#202020] bg-slate-50/50 dark:bg-[#181818] text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredContacts.length}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 dark:border-[#2A2A2A] text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Email & Phone</th>
                <th className="py-3.5 px-4">Qualification</th>
                <th className="py-3.5 px-4">AI Score</th>
                <th className="py-3.5 px-4">Channel</th>
                <th className="py-3.5 px-4">Owner</th>
                <th className="py-3.5 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredContacts.map((contact) => {
                const isSelected = selectedIds.includes(contact.id);

                return (
                  <tr
                    key={contact.id}
                    className={`hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors ${
                      isSelected ? 'bg-emerald-500/5 dark:bg-emerald-500/10' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(contact.id)}
                        className="rounded border-slate-300 dark:border-[#2A2A2A] text-emerald-600 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0"
                        />
                        <div>
                          <div
                            onClick={() => setSelectedContact(contact)}
                            className="font-bold text-slate-900 dark:text-white hover:text-emerald-500 cursor-pointer flex items-center gap-1.5"
                          >
                            <span>{contact.name}</span>
                          </div>
                          <div className="text-[11px] text-slate-500">{contact.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{contact.companyName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold">{contact.email}</div>
                      <div className="text-slate-400">{contact.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        contact.leadStatus === 'Qualified' ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20' :
                        contact.leadStatus === 'Engaged' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' :
                        contact.leadStatus === 'Contacted' ? 'bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10' :
                        contact.leadStatus === 'Converted' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' :
                        'bg-slate-100 dark:bg-[#202020] text-slate-400 border border-slate-200 dark:border-[#303030]'
                      }`}>
                        {contact.leadStatus || 'New'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-1 font-mono font-bold text-emerald-500">
                        <Sparkles className="w-3 h-3" />
                        <span>{contact.score}/100</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="primary" size="sm">
                        {contact.channel}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {contact.owner}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedContact(contact)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                          title="Open Contact Action Hub"
                        >
                          <User className="w-3 h-3" />
                          <span>Action Hub</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteContact(contact.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete Contact"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Contact Detail Action Hub Drawer */}
      {selectedContact && (
        <ContactDetailDrawer
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}

      {/* 5. Create Contact Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <h3 className="font-black text-lg text-slate-950 dark:text-white">Add New Contact</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateContact} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Job Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. VP of Revenue Operations"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Company</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Stripe Inc."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@stripe.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Contact
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
