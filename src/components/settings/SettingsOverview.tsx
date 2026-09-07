import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Building2, 
  Users, 
  CreditCard, 
  Share2, 
  Mail, 
  Key, 
  Bell, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Lock,
  History,
  FileText,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Activity,
  Globe
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useSettings } from '../../context/SettingsContext';

export const SettingsOverview: React.FC = () => {
  const { 
    profileData, 
    orgData, 
    teamMembers, 
    apiKeys, 
    suppressionList, 
    connectedAccounts,
    inboxes,
    agentSettings,
    auditLogs
  } = useSettings();

  const healthyInboxes = inboxes.filter(i => i.status === 'Active').length;
  const connectedChannelsCount = connectedAccounts.filter(c => c.status === 'Connected').length;
  const activeAgentsCount = agentSettings.filter(a => a.status === 'Active').length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Executive Workspace & Account Summary Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-primary shrink-0">
            {orgData.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {orgData.name}
              </h2>
              <Badge variant="primary" size="sm" dot>Enterprise Growth Tier</Badge>
              <span className="text-xs font-mono text-slate-400">ID: {orgData.workspaceId}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Logged in as <strong className="text-slate-800 dark:text-slate-200">{profileData.fullName}</strong> ({profileData.email}) • Timezone: {profileData.timezone}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/settings/profile"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-800 dark:text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Edit Profile
          </Link>
          <Link
            to="/settings/billing-credits"
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md shadow-primary transition-all cursor-pointer"
          >
            Manage Billing
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Status Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs font-mono">
        
        {/* Connected Channels */}
        <Link to="/settings/connected-accounts" className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1 hover:border-primary-border transition-all block">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">Channels</span>
            <Share2 className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white block font-mono">
            {connectedChannelsCount} Connected
          </span>
          <span className="text-[10px] text-primary font-sans font-bold">100% Operational</span>
        </Link>

        {/* Sending Inboxes */}
        <Link to="/settings/sending-inboxes" className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1 hover:border-primary-border transition-all block">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">Sending Pool</span>
            <Mail className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white block font-mono">
            {healthyInboxes} / {inboxes.length} Active
          </span>
          <span className="text-[10px] text-primary font-sans font-bold">SPF/DKIM 100% Pass</span>
        </Link>

        {/* Team Members */}
        <Link to="/settings/team" className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1 hover:border-primary-border transition-all block">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">Team Seats</span>
            <Users className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white block font-mono">
            {teamMembers.length} Members
          </span>
          <span className="text-[10px] text-slate-400 font-sans">1 Owner • 1 Admin</span>
        </Link>

        {/* Search Credits */}
        <Link to="/settings/billing-credits" className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1 hover:border-primary-border transition-all block">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">Search Credits</span>
            <CreditCard className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-xl font-extrabold text-primary block font-mono">
            1,840
          </span>
          <span className="text-[10px] text-slate-400 font-sans">Renews Sep 1</span>
        </Link>

        {/* Autonomous Agents */}
        <Link to="/settings/autonomous-agents" className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1 hover:border-primary-border transition-all block">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">AI Workforce</span>
            <Bot className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-xl font-extrabold text-primary block font-mono">
            {activeAgentsCount} Running
          </span>
          <span className="text-[10px] text-slate-400 font-sans">Safety Guarded</span>
        </Link>

        {/* Security / 2FA */}
        <Link to="/settings/account" className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1 hover:border-primary-border transition-all block">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">Security State</span>
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-xl font-extrabold text-primary block font-mono">
            2FA Active
          </span>
          <span className="text-[10px] text-primary font-sans font-bold">SOC 2 Compliant</span>
        </Link>

      </div>

      {/* 3. Settings Navigation Matrix */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
          Workspace Settings Directory
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: 'Personal Profile', href: '/settings/profile', desc: `${profileData.fullName} • ${profileData.email}`, icon: User, badge: 'Personal' },
            { title: 'Account Security & 2FA', href: '/settings/account', desc: 'Password security, 2FA authenticator, active sessions', icon: ShieldCheck, badge: 'Security' },
            { title: 'Organization Identity', href: '/settings/organization', desc: `${orgData.name} • ${orgData.domain}`, icon: Building2, badge: 'Workspace' },
            { title: 'Team & RBAC Roles', href: '/settings/team', desc: `${teamMembers.length} active seats • Owner, Admin, SDR`, icon: Users, badge: 'Team' },
            { title: 'Billing & Plan Quotas', href: '/settings/billing-credits', desc: 'Enterprise Growth Tier • 1,840 credits available', icon: CreditCard, badge: 'Billing' },
            { title: 'Connected Channels', href: '/settings/connected-accounts', desc: 'LinkedIn 4G Proxy, Google, Microsoft, Twilio', icon: Share2, badge: 'Integrations' },
            { title: 'Multi-Inbox Sending Pool', href: '/settings/sending-inboxes', desc: '24 Mailboxes configured with DNS warmup', icon: Mail, badge: 'Deliverability' },
            { title: 'Autonomous Workforce', href: '/settings/autonomous-agents', desc: 'SDR Outreach, LinkedIn Bot, Upwork Bidder', icon: Bot, badge: 'Automation' },
            { title: 'AI Assistant Preferences', href: '/settings/ai-assistant', desc: 'Claude 3.5 Sonnet / GPT-4o Mix • B2B Tone', icon: Sparkles, badge: 'AI Engine' },
            { title: 'Developer API & Webhooks', href: '/settings/developer-api', desc: `${apiKeys.length} active API keys • REST Webhook streaming`, icon: Key, badge: 'API' },
            { title: 'Notifications Center', href: '/settings/notifications', desc: 'Email digest, in-app alerts, Slack webhooks', icon: Bell, badge: 'Alerts' },
            { title: 'Global Suppression List', href: '/settings/suppression-list', desc: `${suppressionList.length} suppressed records • CAN-SPAM compliant`, icon: Lock, badge: 'Compliance' },
            { title: 'Enterprise SSO & SCIM', href: '/settings/enterprise-governance', desc: 'SAML 2.0, SCIM provisioning, IP allowlisting', icon: Globe, badge: 'Enterprise' },
            { title: 'Security Audit Ledger', href: '/settings/audit-center', desc: 'Chronological activity stream & access logs', icon: History, badge: 'Audit Trail' },
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                to={card.href}
                className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-primary-border transition-all text-left space-y-2 group shadow-xs block"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-primary-muted border border-primary-border text-primary flex items-center justify-center font-bold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-[#181818] px-2 py-0.5 rounded-full font-bold">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-primary transition-colors">
                    {card.title}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {card.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Recent Settings Activity Audit Preview */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Recent Settings & Governance Activity
            </h3>
          </div>

          <Link
            to="/settings/audit-center"
            className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
          >
            <span>View Full Audit Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/[0.04] text-xs font-mono">
          {auditLogs.slice(0, 4).map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white font-sans">{log.event}</span>
                <div className="text-[10px] text-slate-400 font-sans">
                  By <strong className="text-slate-700 dark:text-slate-300">{log.actor}</strong> • {log.resource} ({log.ipAddress})
                </div>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0 font-sans">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
