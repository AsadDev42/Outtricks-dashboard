import React from 'react';
import { 
  Inbox, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Bookmark, 
  Calendar, 
  Archive, 
  Tag, 
  Plus, 
  Sparkles, 
  Flame,
  CheckCircle2,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMasterInbox } from '../../context/MasterInboxContext';

export interface MasterInboxSidebarProps {
  onOpenAddLabelModal: () => void;
  onCloseMobile?: () => void;
}

export const MasterInboxSidebar: React.FC<MasterInboxSidebarProps> = ({
  onOpenAddLabelModal,
  onCloseMobile,
}) => {
  const navigate = useNavigate();
  const {
    activeFolder,
    setActiveFolder,
    unreadTotal,
    interestedTotal,
    meetingsTotal,
    labelsList,
    seedDemoConversations,
  } = useMasterInbox();

  const handleSelectFolder = (id: string) => {
    setActiveFolder(id);
    if (id.startsWith('label:')) {
      navigate('/inbox/labels');
    } else {
      navigate(`/inbox/${id}`);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const CHANNELS = [
    { id: 'all', label: 'All Messages', icon: Inbox, badge: null },
    { id: 'unread', label: 'Unread', icon: Mail, badge: unreadTotal > 0 ? unreadTotal : null },
    { id: 'interested', label: 'Interested (Hot)', icon: Flame, badge: interestedTotal > 0 ? interestedTotal : null },
    { id: 'meetings', label: 'Meetings Booked', icon: Calendar, badge: meetingsTotal > 0 ? meetingsTotal : null },
    { id: 'email', label: 'Email Outreach', icon: Mail, badge: null },
    { id: 'linkedin', label: 'LinkedIn Safe DMs', icon: Linkedin, badge: null },
    { id: 'voice', label: 'Voice AI Calls', icon: PhoneCall, badge: null },
  ];

  return (
    <div className="w-56 shrink-0 h-full bg-[#0F0F0F] border-r border-white/[0.08] flex flex-col justify-between p-3 font-sans select-none">
      <div className="space-y-5 overflow-y-auto pr-1 no-scrollbar">
        {/* Header */}
        <div className="pt-2 px-2.5 flex items-center justify-between">
          <span className="text-[13px] font-black text-white uppercase tracking-wider">
            Master Inbox
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={seedDemoConversations}
              className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold px-2 py-0.5 rounded bg-blue-500/10 cursor-pointer"
              title="Seed 10 realistic demo leads across all channels"
            >
              <span>Seed</span>
            </button>
            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 text-slate-400 hover:text-white lg:hidden cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Channels Section */}
        <div>
          <div className="px-2.5 mb-2 text-[10.5px] font-semibold text-slate-400/80 uppercase tracking-[0.04em]">
            CHANNELS
          </div>
          <div className="space-y-[3px]">
            {CHANNELS.map((item) => {
              const active = activeFolder === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectFolder(item.id)}
                  className={`w-full flex items-center justify-between h-[31px] px-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white shadow-xs border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      active ? 'bg-blue-500 text-white font-bold' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* System Section */}
        <div>
          <div className="px-2.5 mb-2 text-[10.5px] font-semibold text-slate-400/80 uppercase tracking-[0.04em]">
            SYSTEM
          </div>
          <div className="space-y-[3px]">
            <button
              type="button"
              onClick={() => handleSelectFolder('archived')}
              className={`w-full flex items-center gap-2 h-[31px] px-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                activeFolder === 'archived'
                  ? 'bg-blue-600 text-white shadow-xs border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
              }`}
            >
              <Archive className={`w-3.5 h-3.5 ${activeFolder === 'archived' ? 'text-white' : 'text-slate-400'}`} />
              <span>Archived</span>
            </button>
          </div>
        </div>

        {/* Labels Section */}
        <div>
          <div className="flex items-center justify-between px-2.5 mb-2 text-[10.5px] font-semibold text-slate-400/80 uppercase tracking-[0.04em]">
            <button
              type="button"
              onClick={() => handleSelectFolder('labels')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeFolder === 'labels' ? 'text-blue-400 font-bold' : ''
              }`}
            >
              <Tag className="w-3 h-3" />
              <span>LABELS</span>
            </button>
            <button
              type="button"
              onClick={onOpenAddLabelModal}
              className="text-blue-400 hover:text-blue-300 cursor-pointer p-0.5 rounded hover:bg-white/[0.04]"
              title="Add new label"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-[3px]">
            {labelsList.map((lbl) => {
              const active = activeFolder === `label:${lbl.name}`;

              return (
                <button
                  key={lbl.id}
                  type="button"
                  onClick={() => handleSelectFolder(`label:${lbl.name}`)}
                  className={`w-full flex items-center gap-2 h-[31px] px-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white shadow-xs border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${lbl.color}`} />
                  <span className="truncate">{lbl.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
