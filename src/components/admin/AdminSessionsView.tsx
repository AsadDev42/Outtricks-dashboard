import React, { useState } from 'react';
import { 
  Laptop, 
  Smartphone, 
  Globe, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  Shield 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export const AdminSessionsView: React.FC = () => {
  const { success, info } = useToast();

  const [sessions, setSessions] = useState([
    { id: 'sess-1', user: 'Sarah Jenkins (Owner)', device: 'Chrome on Windows 11', ip: '192.168.0.114', location: 'San Francisco, CA, USA', lastActive: 'Current Active Session', isCurrent: true },
    { id: 'sess-2', user: 'David Zhao (Admin)', device: 'Safari on macOS Sequoia', ip: '10.0.4.12', location: 'Austin, TX, USA', lastActive: '12m ago', isCurrent: false },
    { id: 'sess-3', user: 'Alex Rivera (Team Admin)', device: 'Firefox on Linux Ubuntu', ip: '172.16.8.99', location: 'New York, NY, USA', lastActive: '1 hour ago', isCurrent: false },
    { id: 'sess-4', user: 'Sarah Jenkins (Owner)', device: 'Safari on iPhone 15 Pro', ip: '192.168.0.118', location: 'San Francisco, CA, USA', lastActive: '3 hours ago', isCurrent: false },
  ]);

  const handleForceLogout = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    success('Session revoked. User will be forced to re-authenticate.', 'Session Terminated');
  };

  const handleRevokeAllOther = () => {
    setSessions(prev => prev.filter(s => s.isCurrent));
    info('All secondary active sessions terminated across platform.', 'All Other Sessions Revoked');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Laptop className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Active Administrative Sessions & Device Tokens
            </h2>
            <Badge variant="blue" size="sm">{sessions.length} Live Sessions</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Inspect live JSON web token authentication sessions, geo-locations, and force revocation.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleRevokeAllOther}
          leftIcon={<LogOut className="w-3.5 h-3.5 text-rose-500" />}
        >
          Revoke All Other Sessions
        </Button>
      </div>

      {/* 2. Sessions List */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden text-xs">
        <div className="divide-y divide-slate-100 dark:divide-white/[0.04]">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  sess.isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-[#181818] text-slate-500'
                }`}>
                  {sess.device.includes('iPhone') ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 dark:text-white text-xs">{sess.user}</strong>
                    {sess.isCurrent && (
                      <Badge variant="emerald" size="sm">Current Session</Badge>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {sess.device} • IP: {sess.ip} • {sess.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] text-slate-400 font-mono">{sess.lastActive}</span>
                {!sess.isCurrent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleForceLogout(sess.id)}
                    className="text-rose-500 text-[11px]"
                  >
                    Revoke
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
