import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  Clock, 
  BookOpen, 
  Mail, 
  Linkedin, 
  Database, 
  Building2, 
  Workflow, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  BarChart3, 
  Zap, 
  TrendingUp, 
  Award, 
  Flame,
  FileText,
  Target,
  ShieldCheck
} from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';
import { CtaBanner } from '../../components/CtaBanner';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: 'Lead Gen' | 'Cold Email' | 'LinkedIn' | 'RevOps' | 'Playbooks' | 'Data';
  imageUrl: string;
  featured?: boolean;
}

interface PlaybookCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stepsCount: string;
  downloadCount: string;
  icon: any;
  href: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FEATURED_ARTICLE: BlogPost = {
  slug: 'how-to-build-modern-outbound-sales-engine',
  title: 'How to Build a Modern Outbound Sales Engine: From Lead Discovery to Closed-Won',
  excerpt: 'The complete architectural blueprint for scaling predictable pipeline. Discover how modern revenue teams combine 480M+ lead discovery, multiAttribute search Contact Search, 24-inbox rotation, and sub-400ms Voice SDRs on 1 PostgreSQL database.',
  author: 'Outtricks Revenue Engineering Team',
  date: 'August 24, 2026',
  readTime: '14 min read',
  category: 'Playbooks',
  imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  featured: true
};

const LATEST_ARTICLES: BlogPost[] = [
  {
    slug: 'how-b2b-lead-generation-works-in-2026',
    title: 'The Real Cost of Bad Deliverability (It\'s Not What You Think)',
    excerpt: 'Why static CSV database downloads are obsolete and how real-time 8-dimension ICP intent filters find active buyers without burning domains.',
    author: 'David Miller',
    date: 'August 22, 2026',
    readTime: '13 min read',
    category: 'Lead Gen',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
  },
  {
    slug: 'cold-email-deliverability-what-actually-matters',
    title: 'How to Scale Multi-Inbox Cold Email Without Burning Domains',
    excerpt: 'The exact DNS configuration (SPF, DKIM, DMARC, Custom Tracking Domains) and automated 24-inbox ramp schedules that keep deliverability at 99.4%.',
    author: 'Sarah Jenkins',
    date: 'August 19, 2026',
    readTime: '14 min read',
    category: 'Cold Email',
    imageUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80'
  },
  {
    slug: 'how-to-build-a-high-intent-icp',
    title: 'What High-Velocity Outbound Teams Actually Look Like in 2026',
    excerpt: 'Stop spraying and praying. Target accounts undergoing technographic shifts, executive hiring, and funding rounds with coordinated multi-channel cadences.',
    author: 'Marcus Vance',
    date: 'August 16, 2026',
    readTime: '14 min read',
    category: 'Lead Gen',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
  },
  {
    slug: 'why-most-outbound-campaigns-fail',
    title: 'Why Most Outbound Campaigns Fail (And How to Fix Them)',
    excerpt: 'Analyzing 1.2M cold emails and identifying the 4 failure modes: single-inbox burn, poor spintax, lack of multi-channel touch, and slow SDR response.',
    author: 'Elena Rostova',
    date: 'August 12, 2026',
    readTime: '14 min read',
    category: 'Cold Email',
    imageUrl: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=800&q=80'
  },
  {
    slug: 'multiAttribute-Contact Search-explained',
    title: 'contact search Explained: Cascading multiDimensional filters',
    excerpt: 'How cascading queries across 15 tier-1 data sources increases mobile and email match rates from 45% to 85%+ without wasting credits.',
    author: 'Alex Chen',
    date: 'August 08, 2026',
    readTime: '14 min read',
    category: 'Data',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80'
  },
  {
    slug: 'safe-linkedin-automation-guide',
    title: 'Ban-Free LinkedIn Workflows With Dedicated Cloud Proxies',
    excerpt: 'Why static residential cloud proxies, human-like delay pacing, and official API fallbacks eliminate profile restrictions permanently.',
    author: 'Michael Chang',
    date: 'August 04, 2026',
    readTime: '14 min read',
    category: 'LinkedIn',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    slug: 'why-revenue-teams-are-moving-toward-unified-systems',
    title: 'Why Revenue Teams Are Moving Toward Unified Outbound Systems in 2026',
    excerpt: 'How high-growth B2B revenue teams are replacing fragmented 6-tool outbound stacks with unified revenue operating systems to eliminate sync lag and cut SaaS costs by 65%.',
    author: 'Outtricks Revenue Engineering Team',
    date: 'August 26, 2026',
    readTime: '15 min read',
    category: 'RevOps',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
  }
];

const FEATURED_PLAYBOOKS: PlaybookCard[] = [
  {
    id: 'pb1',
    title: 'Build Your First Outbound Engine',
    subtitle: 'The 15-Minute Zero-to-One Blueprint',
    description: 'Everything you need to launch a repeatable outbound engine: domain purchase, DNS setup, warmup schedules, and copy templates.',
    stepsCount: '6 Modules',
    downloadCount: '4,820 Reads',
    icon: Zap,
    href: '/resources/playbooks'
  },
  {
    id: 'pb2',
    title: '7-Step Prospecting Framework',
    subtitle: 'From ICP to Calendar Slot',
    description: 'The proven framework top SDR teams use to source 500+ verified decision-makers weekly and book 40+ sales demos monthly.',
    stepsCount: '7 Action Steps',
    downloadCount: '3,940 Reads',
    icon: Target,
    href: '/resources/playbooks'
  },
  {
    id: 'pb3',
    title: 'Cold Email Optimization Checklist',
    subtitle: '24-Point Deliverability Audit',
    description: 'Comprehensive pre-flight checklist covering SPF/DKIM/DMARC alignment, spam word checks, spintax variations, and inbox warmup.',
    stepsCount: '24-Point Audit',
    downloadCount: '6,150 Reads',
    icon: ShieldCheck,
    href: '/resources/playbooks'
  }
];

const BLOG_FAQS: FaqItem[] = [
  {
    question: 'What is modern outbound sales?',
    answer: 'Modern outbound sales is the proactive process of identifying high-fit B2B prospects using data and buying signals, and engaging them across coordinated channels (cold email, LinkedIn, and Voice AI) to create qualified sales pipeline.'
  },
  {
    question: 'How do I find better B2B leads with higher accuracy?',
    answer: 'Rather than buying static CSV lists, use real-time 8-dimension search filters combined with multiAttribute search Contact Search and live SMTP validation to ensure emails and direct phone numbers are verified.'
  },
  {
    question: 'How can I improve cold email reply rates?',
    answer: 'Rotate volume across 24+ warmed mailboxes (capping sends at 35/day per inbox), use dynamic spintax variations to prevent duplicate template spam filtering, and tailor the first sentence to the prospect\'s actual business context.'
  },
  {
    question: 'What is Lead Lead Search?',
    answer: 'Lead Lead Search cascades a prospect query across up to 15 tier-1 data providers sequentially. If Provider 1 lacks a phone number or verified work email, the query passes to Provider 2, 3, and 4 until a complete record is assembled.'
  },
  {
    question: 'How should I define my Ideal Customer Profile (ICP)?',
    answer: 'Define your ICP across 8 dimensions: specific job titles, seniority levels, employee headcount, annual revenue ranges, geographic location, installed technographic software, funding history, and real-time hiring intent.'
  },
  {
    question: 'How does multi-inbox rotation prevent spam blacklists?',
    answer: 'Mailbox providers like Google and Outlook monitor sudden sending spikes on individual domains. By distributing 1,000 daily emails across 30 distinct inboxes (33 emails each), sending patterns remain natural and domain health stays at 100%.'
  }
];

export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const categories = ['All', 'Lead Gen', 'Cold Email', 'LinkedIn', 'RevOps', 'Playbooks', 'Data'];

  const filteredArticles = LATEST_ARTICLES.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14 font-sans">
      <SEOHead 
        title="Outbound Revenue Blog & Sales Playbooks | Outtricks"
        description="Articles, benchmarks, and strategies for B2B prospecting, cold email deliverability, and Voice AI calling."
        canonical="https://outtricks.com/resources/blog"
        keywords={["outbound sales blog","cold email benchmarks","Voice AI SDR guides","B2B pipeline strategies"]}
        breadcrumbs={[{"name":"Resources","url":"/resources"},{"name":"Blog","url":"/resources/blog"}]}
      />
      
      {/* =========================================================================
          1. EDITORIAL BLOG HEADER (Compact, Spacious & Clean)
          ========================================================================= */}
      <section className="text-center max-w-3xl mx-auto pt-4 sm:pt-6 space-y-3.5">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs">
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            Latest Articles
          </span>
        </div>

        {/* Strong Editorial Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-sans text-slate-950 dark:text-white tracking-tight leading-[1.12]">
          Insights for modern outbound <span className="font-sans font-extrabold text-blue-600 dark:text-blue-400">teams.</span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
          Data-backed strategies, tactical benchmarks, and modern outbound engineering playbooks to scale your pipeline.
        </p>

        {/* Clean Category Filters Row */}
        <div className="pt-2 flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold font-sans transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-bold'
                    : 'bg-white dark:bg-[#0b101f] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-[#222222]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          2. LARGE FEATURED ARTICLE (Horizontal Split Card with Left Image)
          ========================================================================= */}
      {(selectedCategory === 'All' || selectedCategory === FEATURED_ARTICLE.category) && !searchQuery && (
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Featured Read
            </span>
            <span className="text-xs font-sans text-slate-400 dark:text-slate-500">
              {FEATURED_ARTICLE.readTime}
            </span>
          </div>

          <Link 
            to={`/resources/blog/${FEATURED_ARTICLE.slug}`} 
            className="group block rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/[0.16] transition-all duration-300 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px] lg:min-h-[420px]">
              
              {/* Left Column: Large Editorial Image */}
              <div className="lg:col-span-6 relative overflow-hidden bg-slate-100 dark:bg-[#1C1C1C] min-h-[260px] sm:min-h-[320px] lg:min-h-full">
                <img 
                  src={FEATURED_ARTICLE.imageUrl} 
                  alt={FEATURED_ARTICLE.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Right Column: Editorial Typography */}
              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  {/* Category Pill */}
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#222222] text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-[#2A2A2A]">
                    {FEATURED_ARTICLE.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.18] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {FEATURED_ARTICLE.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-3">
                    {FEATURED_ARTICLE.excerpt}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white inline-block" />
                    <span>{FEATURED_ARTICLE.readTime}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all font-sans">
                    <span className="text-xs font-semibold">by Outtricks Team</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>

              </div>

            </div>
          </Link>
        </section>
      )}

      {/* =========================================================================
          3. ARTICLE GRID (Clean 3-Column Desktop Grid)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Latest Articles
          </h3>
          <span className="text-xs font-sans text-slate-400">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-[#0b101f] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] space-y-2">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              No articles found matching "{searchQuery}" in {selectedCategory}.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/resources/blog/${article.slug}`}
                className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-white/[0.16] transition-all duration-300 overflow-hidden"
              >
                {/* Card Image with Floating Category Pill */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-[#1C1C1C]">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-white/90 dark:bg-[#0b101f]/90 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-white/40 dark:border-[#2A2A2A] shadow-2xs">
                    {article.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2.5">
                    <h4 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-xs font-sans text-slate-500 dark:text-slate-400">
                    <span>• {article.readTime}</span>
                    <span className="inline-flex items-center gap-1 text-slate-900 dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </section>

      {/* =========================================================================
          4. ACTIONABLE OUTBOUND PLAYBOOKS (Curated Architectural Blueprints)
          ========================================================================= */}
      <section className="space-y-6 pt-4 border-t border-slate-200/80 dark:border-[#2A2A2A]">
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Curated Resources
            </span>
            <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Featured Outbound Playbooks
            </h3>
          </div>

          <Link to="/resources/playbooks" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            <span>View all playbooks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PLAYBOOKS.map((pb) => {
            const Icon = pb.icon;
            return (
              <Link
                key={pb.id}
                to={pb.href}
                className="group p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-sm hover:shadow-lg hover:border-blue-500/80 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-800/60">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans text-slate-400 uppercase">{pb.subtitle}</span>
                    <h4 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {pb.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {pb.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-[11px] font-sans text-slate-400">
                  <span>{pb.stepsCount}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          5. FAQ ACCORDION SECTION
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-6 pt-4">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Frequently Asked Questions
          </span>
          <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Outbound Knowledge Base
          </h3>
        </div>

        <div className="space-y-3">
          {BLOG_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndices.includes(idx);
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-950 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-[#202020] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          6. BOTTOM CTA BANNER
          ========================================================================= */}
      <CtaBanner 
        title="Ready to build a predictable outbound revenue engine?"
        description="Join high-velocity revenue teams finding prospects, automating cold outreach, and closing deals on 1 database."
      />

    </div>
  );
};
