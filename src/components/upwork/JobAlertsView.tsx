import React, { useState } from 'react';
import { 
  Radio, 
  Plus, 
  Trash2, 
  Zap, 
  Play, 
  Pause, 
  RefreshCw, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Eye, 
  Edit3,
  TrendingUp,
  Filter
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useUpwork, UpworkRadar } from '../../context/UpworkContext';
import { CreateRadarModal } from './CreateRadarModal';

export interface JobAlertsViewProps {
  onOpenCreateAlert: () => void;
}

export const JobAlertsView: React.FC<JobAlertsViewProps> = ({
  onOpenCreateAlert,
}) => {
  const { 
    radars, 
    deleteRadar, 
    toggleRadarStatus, 
    triggerRadarScan, 
    isEmergencyPaused,
    todayConnectsUsed,
    todayConnectsBudget
  } = useUpwork();

  const [editingRadar, setEditingRadar] = useState<UpworkRadar | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Aggregate telemetry
  const totalDiscovered = radars.reduce((acc, r) => acc + r.telemetry.jobsDiscovered, 0);
  const totalQualified = radars.reduce((acc, r) => acc + r.telemetry.qualifiedCount, 0);
  const totalSkipped = radars.reduce((acc, r) => acc + r.telemetry.skippedCount, 0);
  const totalApplied = radars.reduce((acc, r) => acc + r.telemetry.appliedCount, 0);

  const handleEdit = (radar: UpworkRadar) => {
    setEditingRadar(radar);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Smart Job Radars ({radars.length})
            </h2>
            <Badge variant="emerald" size="sm">Continuous Scanner</Badge>
          </div>
          <p className="text-xs text-slate-500 max-w-xl">
            Cloud background workers scanning Upwork feeds with multi-factor match intelligence, anti-spam screening, and autonomous proposal drafting.
          </p>
        </div>

        <Button 
          variant="primary" 
          size="sm" 
          onClick={onOpenCreateAlert} 
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          New Smart Radar
        </Button>
      </div>

      {/* 2. Operational Telemetry KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Jobs Discovered</span>
            <Radio className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-xl font-mono font-extrabold text-slate-950 dark:text-white">
            {totalDiscovered}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Last 24h stream</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Qualified Matches</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
            {totalQualified}
          </div>
          <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 font-mono">
            {totalDiscovered > 0 ? `${((totalQualified / totalDiscovered) * 100).toFixed(0)}% qualified` : '32% qualified'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Policy Skipped</span>
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl font-mono font-extrabold text-amber-600 dark:text-amber-400">
            {totalSkipped}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Spam / Low budget filtered</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Proposals Dispatched</span>
            <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="text-xl font-mono font-extrabold text-purple-600 dark:text-purple-400">
            {totalApplied}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Connects: {todayConnectsUsed}/{todayConnectsBudget} used
          </div>
        </div>
      </div>

      {/* 3. Radars List */}
      <div className="space-y-3">
        {radars.map((radar) => {
          const isActive = radar.status === 'Active';
          const modeBadge = radar.mode === 'assisted' 
            ? { label: 'Mode B: Assisted (Review Required)', variant: 'emerald' as const }
            : radar.mode === 'automated'
            ? { label: 'Mode A: Autonomous Auto-Dispatch', variant: 'purple' as const }
            : { label: 'Mode C: Monitor & Alerts Only', variant: 'slate' as const };

          return (
            <div 
              key={radar.id} 
              className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 hover:border-slate-300 dark:hover:border-[#383838] transition-colors"
            >
              {/* Radar Title & Top Actions */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                      {radar.name}
                    </h3>
                    <Badge variant={isActive ? 'emerald' : 'slate'} size="sm">
                      {radar.status}
                    </Badge>
                    <Badge variant={modeBadge.variant} size="sm">
                      {modeBadge.label}
                    </Badge>
                  </div>
                  {radar.description && (
                    <p className="text-xs text-slate-500">
                      {radar.description}
                    </p>
                  )}
                </div>

                {/* Control Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => triggerRadarScan(radar.id)}
                    leftIcon={<RefreshCw className="w-3.5 h-3.5 text-blue-500" />}
                    title="Execute immediate manual poll of Upwork RSS stream"
                  >
                    Scan Now
                  </Button>

                  <button
                    type="button"
                    onClick={() => toggleRadarStatus(radar.id)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isActive 
                        ? 'border-amber-500/30 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30' 
                        : 'border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                    }`}
                    title={isActive ? 'Pause Radar' : 'Activate Radar'}
                  >
                    {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEdit(radar)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-[#2E2E2E] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    title="Edit Radar criteria"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteRadar(radar.id)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-[#2E2E2E] text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Delete Radar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Criteria Pills Row */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-slate-300">
                  Query: <strong className="text-blue-600 dark:text-blue-400 font-sans">{radar.searchQuery}</strong>
                </span>

                {radar.minHourlyRate && (
                  <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-slate-300">
                    Min Rate: <strong>${radar.minHourlyRate}/hr</strong>
                  </span>
                )}

                <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-slate-300">
                  Hire Rate &ge; <strong>{radar.clientFilter.minHireRate}%</strong>
                </span>

                <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-slate-300">
                  Proposals &lt; <strong>{radar.competitionFilter.maxProposals}</strong>
                </span>

                <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  Match &ge; {radar.minMatchScore}%
                </span>

                {radar.boostStrategy.enabled && (
                  <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                    ⚡ Auto-Boost (+{radar.boostStrategy.maxBoostConnects}c)
                  </span>
                )}
              </div>

              {/* Negative Keywords Tags */}
              {radar.negativeKeywords && radar.negativeKeywords.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-400">
                  <span>Excluded:</span>
                  {radar.negativeKeywords.map((nk) => (
                    <span key={nk} className="px-1.5 py-0.5 rounded-md bg-rose-500/5 text-rose-500 border border-rose-500/15">
                      -{nk}
                    </span>
                  ))}
                </div>
              )}

              {/* Live Telemetry Stats Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#222222] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Last Scan: <strong className="text-slate-900 dark:text-white">{radar.telemetry.lastScanTime}</strong></span>
                  </div>
                  <div>
                    <span>Next Scan: <strong className="text-slate-900 dark:text-white">{radar.telemetry.nextScanTime}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span>Discovered: <strong className="text-slate-900 dark:text-white">{radar.telemetry.jobsDiscovered}</strong></span>
                  <span>•</span>
                  <span>Qualified: <strong className="text-emerald-600 dark:text-emerald-400">{radar.telemetry.qualifiedCount}</strong></span>
                  <span>•</span>
                  <span>Skipped: <strong className="text-amber-500">{radar.telemetry.skippedCount}</strong></span>
                  <span>•</span>
                  <span>Applied: <strong className="text-purple-600 dark:text-purple-400">{radar.telemetry.appliedCount}</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Radar Modal */}
      <CreateRadarModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRadar(null);
        }}
        radarToEdit={editingRadar}
      />

    </div>
  );
};
