import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import { Button } from './Button';

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className="w-full max-w-full overflow-x-auto min-w-0 rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] bg-white dark:bg-[#161616] shadow-xs">
    <table className={`w-full min-w-[760px] text-left text-xs border-collapse font-sans ${className}`} {...props}>
      {children}
    </table>
  </div>
);

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <thead className={`bg-slate-50/90 dark:bg-[#111111] border-b border-slate-200/80 dark:border-[#2A2A2A] text-slate-500 dark:text-[#A0A0A0] font-bold uppercase tracking-wider text-[10px] select-none ${className}`} {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <tbody className={`divide-y divide-slate-100 dark:divide-[#202020] text-slate-800 dark:text-white ${className}`} {...props}>
    {children}
  </tbody>
);

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  clickable?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  selected = false,
  clickable = false,
  className = '',
  ...props
}) => (
  <tr
    className={`transition-colors duration-150 ${
      selected
        ? 'bg-primary-muted'
        : 'hover:bg-slate-50/70 dark:hover:bg-[#1E1E1E]'
    } ${clickable ? 'cursor-pointer' : ''} ${className}`}
    {...props}
  >
    {children}
  </tr>
);

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
}

export const TableHead: React.FC<TableHeadProps> = ({
  children,
  sortable = false,
  sortDirection,
  onSort,
  className = '',
  ...props
}) => (
  <th
    className={`p-3.5 sm:p-4 font-bold text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider ${
      sortable ? 'cursor-pointer select-none hover:text-slate-900 dark:hover:text-white' : ''
    } ${className}`}
    onClick={sortable ? onSort : undefined}
    {...props}
  >
    <div className="flex items-center gap-1.5">
      <span>{children}</span>
      {sortable && (
        <span className="text-slate-400">
          {sortDirection === 'asc' ? (
            <ChevronUp className="w-3.5 h-3.5 text-primary" />
          ) : sortDirection === 'desc' ? (
            <ChevronDown className="w-3.5 h-3.5 text-primary" />
          ) : (
            <ArrowUpDown className="w-3 h-3 opacity-50" />
          )}
        </span>
      )}
    </div>
  </th>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <td className={`p-3.5 sm:p-4 text-xs sm:text-sm font-sans align-middle ${className}`} {...props}>
    {children}
  </td>
);

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  className = '',
}) => {
  const startItem = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-slate-100 dark:border-[#242424] text-xs text-slate-500 dark:text-[#B5B5B5] font-sans ${className}`}>
      <div className="flex items-center gap-2">
        <span>
          Showing <strong className="text-slate-900 dark:text-white font-bold">{startItem}</strong> to{' '}
          <strong className="text-slate-900 dark:text-white font-bold">{endItem}</strong> of{' '}
          <strong className="text-slate-900 dark:text-white font-bold">{totalItems}</strong> entries
        </span>
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="ml-2 pl-2.5 pr-7 py-1 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] rounded-lg text-slate-800 dark:text-white font-mono text-xs outline-none cursor-pointer focus:border-primary"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
        >
          Previous
        </Button>
        <div className="flex items-center gap-1 px-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          Page {currentPage} of {Math.max(totalPages, 1)}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
