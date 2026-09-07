import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  CheckCircle2, 
  Share2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';
import { CtaBanner } from '../../components/CtaBanner';
import { BLOG_ARTICLES, BlogArticleData } from '../../data/blogArticles';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Lookup article by slug, with fallback to featured article
  const currentSlug = slug || 'how-to-build-modern-outbound-sales-engine';
  const article: BlogArticleData = BLOG_ARTICLES[currentSlug] || BLOG_ARTICLES['how-to-build-modern-outbound-sales-engine'];

  if (!article) {
    return <Navigate to="/resources/blog" replace />;
  }

  // Get related articles (other articles excluding current)
  const relatedArticles = Object.values(BLOG_ARTICLES)
    .filter(a => a.slug !== article.slug)
    .slice(0, 3);

  // Helper to render markdown content cleanly into styled JSX
  const renderMarkdownContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let tableHeaders: string[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let currentParagraph: string[] = [];

    const flushParagraph = (key: string) => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ');
        if (text.trim()) {
          elements.push(
            <p key={key} className="text-slate-700 dark:text-slate-300 leading-relaxed my-4 text-base">
              {formatInlineText(text)}
            </p>
          );
        }
        currentParagraph = [];
      }
    };

    const formatInlineText = (text: string): React.ReactNode => {
      // Process bold **text**, inline code `code`, italics *text*
      const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
      return parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={idx} className="font-bold text-slate-950 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#181818] text-blue-600 dark:text-blue-400 font-mono text-xs border border-slate-200/60 dark:border-[#2A2A2A]">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={idx} className="italic text-slate-800 dark:text-slate-200">{part.slice(1, -1)}</em>;
        }
        return part;
      });
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Code blocks
      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <div key={`code-${index}`} className="my-6 p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 shadow-lg">
              <pre>{codeContent.trim()}</pre>
            </div>
          );
          codeContent = '';
          inCodeBlock = false;
        } else {
          flushParagraph(`p-before-code-${index}`);
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      // Tables
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushParagraph(`p-before-table-${index}`);
        const cells = trimmed.split('|').slice(1, -1).map(c => c.trim());
        if (!inTable) {
          inTable = true;
          tableHeaders = cells;
          tableRows = [];
        } else if (cells.some(c => c.includes('---'))) {
          // Separator row, skip
        } else {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        // Table ended
        elements.push(
          <div key={`table-${index}`} className="my-8 overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-sm bg-white dark:bg-[#141414]/60">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#181818]/80 border-b border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-bold">
                  {tableHeaders.map((th, thi) => (
                    <th key={thi} className="p-3.5 sm:p-4">{formatInlineText(th)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {tableRows.map((row, ri) => (
                  <tr key={ri} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    {row.map((cell, ci) => (
                      <td key={ci} className="p-3.5 sm:p-4 text-slate-700 dark:text-slate-300 font-normal">
                        {formatInlineText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableHeaders = [];
        tableRows = [];
      }

      // Checklists
      if (trimmed.startsWith('- [ ]') || trimmed.startsWith('- [x]')) {
        flushParagraph(`p-before-check-${index}`);
        const text = trimmed.replace(/- \[[ x]\]/, '').trim();
        elements.push(
          <div key={`check-${index}`} className="flex items-start gap-3 my-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/40 border border-slate-100 dark:border-[#2A2A2A]/60">
            <div className="w-5 h-5 rounded-md bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">
              {formatInlineText(text)}
            </span>
          </div>
        );
        return;
      }

      // Horizontal Rule
      if (trimmed === '---') {
        flushParagraph(`p-before-hr-${index}`);
        elements.push(<hr key={`hr-${index}`} className="my-10 border-slate-200 dark:border-[#2A2A2A]" />);
        return;
      }

      // Headings
      if (trimmed.startsWith('## ')) {
        flushParagraph(`p-before-h2-${index}`);
        const title = trimmed.replace('## ', '');
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight mt-10 mb-4 pt-4 border-t border-slate-100 dark:border-[#2A2A2A]/50">
            {formatInlineText(title)}
          </h2>
        );
        return;
      }

      if (trimmed.startsWith('### ')) {
        flushParagraph(`p-before-h3-${index}`);
        const title = trimmed.replace('### ', '');
        elements.push(
          <h3 key={`h3-${index}`} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">
            {formatInlineText(title)}
          </h3>
        );
        return;
      }

      // Bullet lists
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        flushParagraph(`p-before-li-${index}`);
        const text = trimmed.slice(2);
        elements.push(
          <div key={`li-${index}`} className="flex items-start gap-2.5 my-2.5 ml-2 text-slate-700 dark:text-slate-300 text-base">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2.5 shrink-0" />
            <span>{formatInlineText(text)}</span>
          </div>
        );
        return;
      }

      // Numbered lists
      if (/^\d+\.\s/.test(trimmed)) {
        flushParagraph(`p-before-num-${index}`);
        const num = trimmed.match(/^(\d+)\./)?.[1] || '•';
        const text = trimmed.replace(/^\d+\.\s/, '');
        elements.push(
          <div key={`num-${index}`} className="flex items-start gap-3 my-3 ml-2 text-slate-700 dark:text-slate-300 text-base">
            <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-blue-200/60 dark:border-blue-800">
              {num}
            </span>
            <span>{formatInlineText(text)}</span>
          </div>
        );
        return;
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        flushParagraph(`p-before-quote-${index}`);
        const text = trimmed.slice(2);
        elements.push(
          <blockquote key={`quote-${index}`} className="my-4 pl-4 py-2 border-l-4 border-blue-600 dark:border-blue-400 bg-blue-50/50 dark:bg-white/[0.04] rounded-r-xl italic text-slate-700 dark:text-slate-300 text-sm">
            {formatInlineText(text)}
          </blockquote>
        );
        return;
      }

      // Normal paragraph lines
      if (trimmed) {
        currentParagraph.push(trimmed);
      } else {
        flushParagraph(`p-${index}`);
      }
    });

    flushParagraph('p-final');
    return elements;
  };

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Comprehensive SEO & AEO Structured Data */}
      <SEOHead 
        title={`${article.metaTitle} | Outtricks`}
        description={article.metaDescription}
        ogType="article"
        canonical={`https://outtricks.com/resources/blog/${article.slug}`}
        breadcrumbs={[
          { name: 'Resources', url: '/resources' },
          { name: 'Blog', url: '/resources/blog' },
          { name: article.title, url: `/resources/blog/${article.slug}` }
        ]}
        articleData={{
          publishedTime: '2026-08-01T08:00:00Z',
          modifiedTime: '2026-08-26T12:00:00Z',
          author: article.author,
          section: article.category,
          tags: [article.primaryKeyword, ...article.secondaryKeywords]
        }}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'headline': article.title,
          'description': article.metaDescription,
          'author': {
            '@type': 'Person',
            'name': article.author,
            'jobTitle': article.authorRole
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Outtricks',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://outtricks.com/outtricks-footer-logo.png'
            }
          },
          'datePublished': '2026-08-01T08:00:00Z',
          'dateModified': '2026-08-26T12:00:00Z',
          'mainEntityOfPage': `https://outtricks.com/resources/blog/${article.slug}`
        }}
      />

      {/* Back Link */}
      <Link 
        to="/resources/blog" 
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> 
        <span>Back to all articles</span>
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-sans font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-white/[0.04] border border-blue-200/80 dark:border-blue-800 px-3 py-1 rounded-full uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-xs font-sans text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readTime}
          </span>
          <span className="text-xs font-sans text-slate-400">•</span>
          <span className="text-xs font-sans text-emerald-600 dark:text-emerald-400 font-semibold">
            ✓ Complete 2026 Engineering Guide
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.16]">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-slate-500 dark:text-slate-400 pt-3 border-b border-slate-200/80 dark:border-[#2A2A2A] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              {article.author.charAt(0)}
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">{article.author}</span>
              <span className="text-[11px] text-slate-400">{article.authorRole}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span>Published {article.date}</span>
          </div>
        </div>
      </div>

      {/* Editorial Hero Image */}
      <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-slate-100 dark:bg-[#181818] border border-slate-200/80 dark:border-[#2A2A2A] shadow-md">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Long-Form Article Body */}
      <div className="space-y-2">
        {renderMarkdownContent(article.content)}
      </div>

      {/* AEO / FAQ Structured Section */}
      {article.faqs && article.faqs.length > 0 && (
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-[#2A2A2A] space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {article.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-[#141414]/40 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center justify-between gap-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/40 dark:border-[#2A2A2A]/40 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Author Bio Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/80 dark:border-[#2A2A2A] flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md">
          {article.author.charAt(0)}
        </div>
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{article.author}</h4>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-[#1A1A1A]/80 text-blue-700 dark:text-blue-300 font-bold">
              {article.authorRole}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Written by Outtricks revenue operations and infrastructure engineers specializing in high-deliverability multi-inbox cold email, Lead Lead Search cascades, and autonomous Voice AI pipelines.
          </p>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="space-y-6 pt-10 border-t border-slate-200 dark:border-[#2A2A2A]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Recommended Reading
          </h3>
          <Link 
            to="/resources/blog" 
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View all articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel, ri) => (
            <Link
              key={ri}
              to={`/resources/blog/${rel.slug}`}
              className="group rounded-2xl p-4 bg-white dark:bg-[#141414]/50 border border-slate-200/80 dark:border-[#2A2A2A] hover:border-blue-400 dark:hover:border-blue-600 transition-all shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 dark:bg-[#181818]">
                  <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {rel.category}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {rel.title}
                </h4>
              </div>
              <div className="pt-3 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-[#2A2A2A]/60 mt-3">
                <span>{rel.readTime}</span>
                <span className="text-blue-600 font-bold flex items-center gap-0.5">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <CtaBanner 
        title="Ready to build your modern outbound engine?"
        description="Consolidate 480M+ lead search, multiAttribute search Contact Search, 24-inbox rotation, and Voice AI calling in one single workspace."
      />
    </div>
  );
};
