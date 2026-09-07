import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  CheckCheck, 
  Mail, 
  PhoneCall, 
  Users, 
  Zap, 
  ShieldCheck, 
  AlertCircle, 
  X,
  ExternalLink,
  Workflow
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface AppNotification {
  id: string;
  type: 'lead' | 'email' | 'voice' | 'linkedin' | 'system' | 'workflow';
  title: string;
  description: string;
  time: string;
  read: boolean;
  link?: string;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    type: 'voice',
    title: 'Voice AI SDR booked a Demo',
    description: 'Sarah Jenkins (VP Growth @ CloudScale) confirmed demo for Thursday 2:00 PM PST.',
    time: '4m ago',
    read: false,
    link: '/crm',
  },
  {
    id: 'notif_2',
    type: 'email',
    title: 'Warm Reply Received (99% Intent)',
    description: 'David Chen from SaaSFlow replied: "Sounds interesting. Let\'s chat Thursday."',
    time: '18m ago',
    read: false,
    link: '/cold-email',
  },
  {
    id: 'notif_3',
    type: 'lead',
    title: '500 Leads Saved to Workspace',
    description: 'New decision-maker profiles ready for multi-channel sequencing.',
    time: '1h ago',
    read: false,
    link: '/leads',
  },
  {
    id: 'notif_4',
    type: 'system',
    title: 'Deliverability Health Optimal',
    description: 'All 24 mailboxes maintaining 100% SPF/DKIM/DMARC alignment score.',
    time: '3h ago',
    read: true,
    link: '/deliverability',
  },
  {
    id: 'notif_5',
    type: 'linkedin',
    title: 'LinkedIn Invite Accepted',
    description: 'Elena Rostova (FinTech Stack) accepted invite. Sequence DM triggered.',
    time: '5h ago',
    read: true,
    link: '/linkedin',
  },
  {
    id: 'notif_6',
    type: 'workflow',
    title: 'Outbound Flow Execution Succeeded',
    description: 'Triggered 3-Channel Enterprise sequence for 120 new prospects.',
    time: '6h ago',
    read: true,
    link: '/flow-builder',
  }
];

export const NotificationCenter: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNotificationClick = (item: AppNotification) => {
    markAsRead(item.id);
    setIsOpen(false);
    if (item.link) {
      navigate(item.link);
    }
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const icons = {
    voice: <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    email: <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    lead: <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    system: <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    linkedin: <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    workflow: <Workflow className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open notifications"
        className="relative h-10 w-10 flex items-center justify-center rounded-2xl bg-white/80 dark:bg-[#141414] hover:bg-slate-100 dark:hover:bg-[#1C1C1C] border border-slate-200/90 dark:border-[#242424] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer shadow-xs"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white dark:ring-[#141414] animate-pulse" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[700]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 p-3 bg-white dark:bg-[#161616] border border-slate-200/90 dark:border-[#2A2A2A] rounded-3xl shadow-2xl z-[701] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 space-y-2 font-sans">
            
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-950 dark:text-white">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <Badge variant="emerald" size="sm">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 px-3">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-slate-100 dark:bg-[#181818] text-slate-900 dark:text-white'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('unread')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  filter === 'unread'
                    ? 'bg-slate-100 dark:bg-[#181818] text-slate-900 dark:text-white'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>

            {/* List */}
            <div className="max-h-72 overflow-y-auto space-y-1.5 px-1">
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No notifications to display
                </div>
              ) : (
                filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleNotificationClick(item)}
                    className={`group relative p-3 rounded-2xl border transition-all cursor-pointer ${
                      item.read
                        ? 'bg-slate-50/40 dark:bg-[#1C1C1C]/40 border-transparent hover:border-slate-200 dark:hover:border-slate-800'
                        : 'bg-emerald-50/40 dark:bg-white/[0.04] border-emerald-500/20 dark:border-emerald-500/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-white dark:bg-[#181818] shadow-xs shrink-0">
                        {icons[item.type]}
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {item.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </>
      )}
    </div>
  );
};
