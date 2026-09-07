import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  CheckCircle2, 
  Clock, 
  DollarSign 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin } from '../../context/AdminContext';

export const AdminInvoicesView: React.FC = () => {
  const { invoices } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = invoices.filter(inv => 
    inv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Billing Invoices & PDF Receipts
            </h2>
            <Badge variant="emerald" size="sm">{invoices.length} Invoices</Badge>
          </div>
          <p className="text-xs text-slate-500">
            View generated tax invoices, line items breakdown, and accounting audit histories.
          </p>
        </div>
      </div>

      {/* 2. Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-[#1C1C1C] border-b border-slate-200/80 dark:border-[#2A2A2A] text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Invoice #</th>
                <th className="py-3.5 px-4">Customer Account</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Issued Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300">
                    {inv.customerName}
                    <span className="text-[10px] text-slate-400 font-mono block">{inv.customerEmail}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    ${inv.amount}.00 USD
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={inv.status === 'paid' ? 'emerald' : 'amber'} size="sm">
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {inv.dueDate}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {inv.createdAt}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-[11px]"
                      leftIcon={<Download className="w-3 h-3" />}
                    >
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
