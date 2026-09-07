import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from './SEOHead';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-slate-500 dark:text-slate-400 font-medium py-2 ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 shrink-0" aria-hidden="true" />
              {isLast ? (
                <span 
                  className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-none"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  to={item.url} 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
