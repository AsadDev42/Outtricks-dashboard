import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, FileText, ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { BLOG_ARTICLES } from '../../data/blogArticles';
import { COMPARISONS_DATA } from '../../data/contentData';

interface SearchResult {
  title: string;
  category: 'Platform' | 'Blog' | 'Comparison' | 'Documentation' | 'Tool';
  description: string;
  path: string;
}

export const GlobalSearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build searchable database
  const searchCorpus: SearchResult[] = [
    { title: '8-Dimension B2B Lead Finder', category: 'Platform', description: '480M+ global business contacts with multiAttribute filtering', path: '/platform/lead-finder' },
    { title: 'Multi-Inbox Cold Email Outreach', category: 'Platform', description: 'Round-robin sending, SPF/DKIM warmup, and dynamic spintax', path: '/platform/email-outreach' },
    { title: 'Safe LinkedIn Cloud Automation', category: 'Platform', description: '100% official versioned API with dedicated residential proxies', path: '/platform/linkedin-automation' },
    { title: 'Sub-400ms WebRTC Voice AI SDR', category: 'Platform', description: 'Conversational voice qualification dialer with live calendar booking', path: '/platform/voice-ai' },
    { title: 'Deals CRM Pipeline Kanban', category: 'Platform', description: 'Native single PostgreSQL database with zero webhook sync lag', path: '/platform/crm' },
    { title: 'Visual Flow Builder Graph', category: 'Platform', description: 'Multi-channel trigger, condition branch, and action graph', path: '/platform/workflow-automation' },
    { title: 'Deliverability Guard & DNS Sentinel', category: 'Platform', description: 'Real-time SPF, DKIM, DMARC, and custom tracking domain health', path: '/platform/deliverability' },
    { title: 'Free AI Cold Email Generator', category: 'Tool', description: 'Generate high-converting custom cold outreach copy in seconds', path: '/free-tools/cold-email-generator' },
    { title: 'Free Subject Line Generator & Scorer', category: 'Tool', description: 'AI subject line open rate estimator and spam trigger check', path: '/free-tools/subject-line-generator' },
    { title: 'Free Email Deliverability Checker', category: 'Tool', description: 'Test DNS MX records, SPF, DKIM, and spam inbox score', path: '/free-tools/deliverability-checker' },
    { title: 'Outtricks vs Apollo.io', category: 'Comparison', description: 'Why single-database outreach and Voice AI beats siloed databases', path: '/comparisons/outtricks-vs-apollo' },
    { title: 'Outtricks vs Instantly.ai', category: 'Comparison', description: 'Full multi-channel SDR platform vs email-only sending tool', path: '/comparisons/outtricks-vs-instantly' },
    { title: 'Outtricks vs Clay.com', category: 'Comparison', description: 'Built-in multi-inbox execution vs spreadsheet-only contact lists', path: '/comparisons/outtricks-vs-clay' },
  ];

  // Include blog articles
  Object.values(BLOG_ARTICLES).forEach((art) => {
    searchCorpus.push({
      title: art.title,
      category: 'Blog',
      description: art.excerpt,
      path: `/resources/blog/${art.slug}`,
    });
  });

  const filteredResults = searchCorpus.filter((item) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1100] flex items-start justify-center pt-[10vh] px-4"
    >
      <div
        className="fixed inset-0 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md transition-opacity duration-200 animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150 font-sans">
        
        {/* Search Header */}
        <div className="flex items-center px-5 py-4 border-b border-slate-100 dark:border-[#202020]">
          <Search className="w-5 h-5 text-primary mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search platform documentation, features, guides, or tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none font-sans"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-[#181818] text-slate-500 rounded border border-slate-200 dark:border-[#2A2A2A]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[55vh] overflow-y-auto p-3 space-y-1.5">
          {!query.trim() ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-muted text-primary flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Quick Search Across Outtricks
              </div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Search for 480M+ lead search, multi-inbox rotation, sub-400ms Voice SDR, or competitor comparison benchmarks.
              </p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching content found for "{query}". Try searching "lead", "email", or "voice".
            </div>
          ) : (
            filteredResults.map((res, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(res.path)}
                className="p-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#1C1C1C] border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-primary-muted text-primary font-mono">
                      {res.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white truncate">
                      {res.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
