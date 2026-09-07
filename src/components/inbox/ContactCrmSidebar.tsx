import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  ExternalLink, 
  Check, 
  Copy,
  ChevronRight,
  TrendingUp,
  User
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useMasterInbox } from '../../context/MasterInboxContext';
import { useToast } from '../../context/ToastContext';

export interface ContactCrmSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactCrmSidebar: React.FC<ContactCrmSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const { activeConversation } = useMasterInbox();
  const { success } = useToast();
  const navigate = useNavigate();

  if (!isOpen || !activeConversation) return null;

  return (
    <div className="w-72 shrink-0 bg-white dark:bg-[#141414] border-l border-slate-200/80 dark:border-[#222222] p-4 flex flex-col justify-between overflow-y-auto font-sans h-full text-xs">
      
      <div className="space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#202020]">
          <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
            Prospect & CRM Record
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Contact Coordinates
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#222222] space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-mono truncate">{activeConversation.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-mono truncate">{activeConversation.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <a
                href={`https://linkedin.com/in/${activeConversation.contactName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-500 hover:underline flex items-center gap-0.5"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Account Firmographics */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Target Account
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#222222] space-y-1.5">
            <div className="flex items-center gap-2">
              <img
                src={activeConversation.companyLogo}
                alt={activeConversation.companyName}
                className="w-6 h-6 rounded-lg object-cover border border-slate-200 dark:border-[#2A2A2A]"
              />
              <span className="font-bold text-slate-900 dark:text-white">
                {activeConversation.companyName}
              </span>
            </div>
            <div className="text-slate-500 font-mono text-[11px]">
              {activeConversation.companyDomain}
            </div>
          </div>
        </div>

        {/* CRM Deal & Pipeline Attribution */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Deals CRM Attribution
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Opportunity Value</span>
              <span className="font-extrabold text-emerald-500 font-mono">
                ${activeConversation.dealValue.toLocaleString()} ARR
              </span>
            </div>
            <div className="text-[11px] font-bold text-slate-900 dark:text-white">
              Stage: {activeConversation.dealStage}
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-[#202020] space-y-2">
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => {
            success(`Navigating to CRM Contact & Deal context for ${activeConversation.contactName}.`, 'Opening CRM');
            navigate('/crm');
          }}
          leftIcon={<User className="w-3.5 h-3.5" />}
        >
          View Full CRM Profile
        </Button>
      </div>

    </div>
  );
};
