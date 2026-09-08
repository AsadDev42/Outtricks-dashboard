import React from 'react';
import { 
  Users, 
  Building2, 
  Layers, 
  CreditCard, 
  Coins, 
  Mail, 
  PhoneCall, 
  Search, 
  Linkedin, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  UserX,
  Plus,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { GsapStagger } from '../ui/GsapStagger';
import { ThreeParticleDrift } from '../3d/ThreeParticleDrift';
import { useAdmin } from '../../context/AdminContext';
import { Link } from 'react-router-dom';

export const AdminDashboardView: React.FC = () => {
  const { 
    users, 
    teams, 
    plans, 
    subscriptions, 
    systemHealth, 
    auditLogs, 
    impersonatedUser, 
    stopImpersonation 
  } = useAdmin();

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalTeams = teams.length;
  const activePlans = plans.filter(p => p.status === 'active').length;
  const totalRevenue = subscriptions.reduce((acc, s) => acc + s.amount, 0);
  const totalCreditsAllocated = users.reduce((acc, u) => acc + u.credits, 0) + teams.reduce((acc, t) => acc + t.credits, 0);

  const stats = [
    { title: 'Total Registered Users', value: totalUsers.toLocaleString(), change: '+14% this mo', icon: Users, variant: 'blue' as const },
    { title: 'Active Workspace Seats', value: activeUsers.toLocaleString(), change: '94.2% active', icon: CheckCircle2, variant: 'emerald' as const },
    { title: 'Teams & Workspaces', value: totalTeams.toLocaleString(), change: '+3 new', icon: Building2, variant: 'indigo' as const },
    { title: 'Active Subscriptions', value: subscriptions.length.toLocaleString(), change: '100% renewal', icon: Layers, variant: 'purple' as const },
    { title: 'Monthly Revenue Run-Rate', value: `$${totalRevenue.toLocaleString()}/mo`, change: '+$1,197 vs last mo', icon: CreditCard, variant: 'emerald' as const },
    { title: 'Platform Credits Issued', value: totalCreditsAllocated.toLocaleString(), change: 'Pool healthy', icon: Coins, variant: 'amber' as const },
    { title: 'Emails Sent (30d)', value: '109,700', change: '99.4% deliverability', icon: Mail, variant: 'blue' as const },
    { title: 'Voice AI Calls Made', value: '1,420 mins', change: 'Sub-400ms avg', icon: PhoneCall, variant: 'cyan' as const },
    { title: 'Leads Found & Verified', value: '51,900', change: '480M+ pool', icon: Search, variant: 'blue' as const },
    { title: 'LinkedIn Safe Actions', value: '19,300', change: 'Zero flags', icon: Linkedin, variant: 'indigo' as const },
    { title: 'TRIXIE AI Inference Runs', value: '52,800', change: '1.2s avg latency', icon: Sparkles, variant: 'purple' as const },
    { title: 'System Infrastructure Health', value: '99.96%', change: 'All 7 nodes green', icon: Activity, variant: 'emerald' as const },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Impersonation Banner if active */}
      {impersonatedUser && (
        <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              !
            </div>
            <div>
              <div className="font-bold text-amber-500 text-xs">
                Active User Impersonation Mode: {impersonatedUser.name} ({impersonatedUser.email})
              </div>
              <p className="text-[11px] text-slate-400">
                You are currently viewing platform access and permissions through this user's assigned role ({impersonatedUser.role}).
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={stopImpersonation}
            leftIcon={<UserX className="w-3.5 h-3.5" />}
          >
            Stop Impersonation
          </Button>
        </div>
      )}

      {/* 1. Compact Header Banner */}
      <div className="relative overflow-hidden px-5 sm:px-6 py-4 sm:py-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Subtle Background Glow/Gradient */}
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-primary/[0.04] to-transparent pointer-events-none" />

        <div className="flex items-center gap-3.5 min-w-0 relative z-10">
          <div className="w-10 h-10 rounded-2xl bg-primary-muted border border-primary-border text-primary flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-slate-950 dark:text-white tracking-tight">
                Workspace Control Center
              </h1>
              <Badge variant="primary" size="sm" className="font-mono text-[10px] uppercase tracking-wider font-bold">
                Workspace Governance
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              Manage workspace members, teams, products, access, billing, usage and configuration.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap relative z-10">
          <Link to="/workspace/users">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Users className="w-3.5 h-3.5" />}
              className="font-semibold text-xs min-h-[36px] px-3.5"
            >
              Manage Users
            </Button>
          </Link>
          <Link to="/workspace/plans">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              className="font-bold text-xs min-h-[36px] px-3.5 shadow-xs"
            >
              New Plan
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Key Operational Metrics Grid (12 Cards) */}
      <GsapStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" stagger={0.035} duration={0.4}>
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 hover:border-primary-border transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">{st.title}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  st.variant === 'amber' ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400' :
                  'bg-primary-muted text-primary'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                  {st.value}
                </div>
                <div className="text-[11px] font-bold text-primary flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{st.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </GsapStagger>

      {/* 3. Operational Sections: Recent Activity & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Admin Activity (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
                Recent Admin Activity & Audit Trail
              </h3>
            </div>
            <Link to="/workspace/audit-center" className="text-xs text-primary hover:underline font-bold flex items-center gap-1">
              <span>View All Logs</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {auditLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 dark:text-white truncate">{log.adminName}</strong>
                    <Badge variant="primary" size="sm">{log.action}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    Target: <span className="font-semibold text-slate-700 dark:text-slate-300">{log.target}</span> {log.reason ? `• ${log.reason}` : ''}
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 shrink-0 font-mono">
                  {log.timestamp.split(' ')[1] || log.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Infrastructure Health (1 Col) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
                Node Health Status
              </h3>
            </div>
            <Badge variant="primary" size="sm">99.96% SLA</Badge>
          </div>

          <div className="space-y-2.5 text-xs">
            {systemHealth.map((srv) => (
              <div
                key={srv.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 dark:text-white truncate">{srv.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{srv.latencyMs}ms latency • {srv.uptimePercentage}% uptime</div>
                </div>
                <Badge variant={srv.status === 'healthy' ? 'primary' : 'amber'} size="sm">
                  {srv.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
