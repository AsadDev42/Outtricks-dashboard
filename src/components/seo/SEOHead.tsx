import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  schema?: Record<string, any> | Record<string, any>[];
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const DEFAULT_BASE_URL = 'https://outtricks.com';
const DEFAULT_IMAGE = 'https://outtricks.com/logo-dark.png';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  keywords,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  noindex = false,
  breadcrumbs,
  faqs,
  schema,
  articleData
}) => {
  const location = useLocation();
  const currentUrl = canonical || `${DEFAULT_BASE_URL}${location.pathname}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to set/update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Helper to set/update link tags
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // 2. Primary Meta Tags
    setMetaTag('description', description);
    if (keywords && keywords.length > 0) {
      setMetaTag('keywords', keywords.join(', '));
    }
    setMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setLinkTag('canonical', currentUrl);

    // 3. Open Graph Tags
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', currentUrl, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', 'Outtricks', true);

    // 4. Twitter/X Card Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);
    setMetaTag('twitter:site', '@outtricks');

    // 5. Article Tags
    if (ogType === 'article' && articleData) {
      if (articleData.publishedTime) setMetaTag('article:published_time', articleData.publishedTime, true);
      if (articleData.modifiedTime) setMetaTag('article:modified_time', articleData.modifiedTime, true);
      if (articleData.author) setMetaTag('article:author', articleData.author, true);
      if (articleData.section) setMetaTag('article:section', articleData.section, true);
    }

    // 6. Organization & Software Structured Data
    const baseSchemas: Record<string, any>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://outtricks.com/#organization',
        'name': 'Outtricks',
        'url': 'https://outtricks.com',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://outtricks.com/outtricks-footer-logo.png',
          'width': 512,
          'height': 128
        },
        'description': 'Outtricks is the unified AI revenue operating system coordinating 480M+ lead discovery, multi-inbox cold email, LinkedIn outreach, sub-400ms Voice AI SDRs, and CRM execution.',
        'sameAs': [
          'https://linkedin.com/company/outtricks',
          'https://x.com/outtricks',
          'https://github.com/outtricks'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://outtricks.com/#website',
        'url': 'https://outtricks.com',
        'name': 'Outtricks',
        'publisher': {
          '@id': 'https://outtricks.com/#organization'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://outtricks.com/#software',
        'name': 'Outtricks',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'Web, Cloud',
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': 'USD',
          'lowPrice': '20.00',
          'highPrice': '499.00'
        },
        'description': 'Unified sales and revenue automation platform featuring 480M+ verified lead database, multi-inbox rotation, cloud LinkedIn automation, and autonomous Voice AI SDR calling.'
      }
    ];

    // BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://outtricks.com'
          },
          ...breadcrumbs.map((b, idx) => ({
            '@type': 'ListItem',
            'position': idx + 2,
            'name': b.name,
            'item': b.url.startsWith('http') ? b.url : `${DEFAULT_BASE_URL}${b.url}`
          }))
        ]
      };
      baseSchemas.push(breadcrumbSchema);
    }

    // FAQPage Schema
    if (faqs && faqs.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      };
      baseSchemas.push(faqSchema);
    }

    // Custom Schemas
    if (schema) {
      if (Array.isArray(schema)) {
        baseSchemas.push(...schema);
      } else {
        baseSchemas.push(schema);
      }
    }

    // Inject / Update JSON-LD Script Tag
    let scriptTag = document.getElementById('outtricks-seo-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'outtricks-seo-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(baseSchemas);

  }, [title, description, currentUrl, keywords, ogType, ogImage, noindex, breadcrumbs, faqs, schema, articleData]);

  return null;
};
