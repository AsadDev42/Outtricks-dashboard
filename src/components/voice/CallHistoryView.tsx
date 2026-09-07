import React, { useState } from 'react';
import { Clock, Play, Pause, FileText, CheckCircle2, DollarSign } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useVoiceAi, HistoricalCall } from '../../context/VoiceAiContext';

export const CallHistoryView: React.FC = () => {
  const { callHistory } = useVoiceAi();
  const [selectedCall, setSelectedCall] = useState<HistoricalCall | null>(null);

  return (
    <div className="space-y-4 font-sans">
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Historical Call Logs & Audio Transcripts ({callHistory.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Full audio recordings, speaker diarization transcripts, and CRM pipeline attribution.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs font-mono">
        {callHistory.map((call) => (
          <div key={call.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">{call.prospectName}</span>
                <Badge variant="emerald" size="sm">{call.outcome}</Badge>
                <span className="text-slate-400 text-[10px]">({call.duration})</span>
              </div>
              <div className="text-[11px] text-slate-500 font-sans">
                {call.company} • {call.phone} • {call.timestamp}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {call.dealAttributed > 0 && (
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                  +${call.dealAttributed.toLocaleString()} Pipeline
                </span>
              )}
              <Button variant="outline" size="sm" onClick={() => setSelectedCall(call)} leftIcon={<FileText className="w-3.5 h-3.5" />}>
                View Transcript
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Transcript Modal */}
      {selectedCall && (
        <Modal
          isOpen={!!selectedCall}
          onClose={() => setSelectedCall(null)}
          title={`Call Transcript: ${selectedCall.prospectName} (${selectedCall.company})`}
          description={`Recorded on ${selectedCall.timestamp} • Duration: ${selectedCall.duration}`}
          size="md"
        >
          <div className="space-y-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] max-h-80 overflow-y-auto whitespace-pre-line leading-relaxed font-sans">
              {selectedCall.transcript}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#202020]">
              <span className="text-emerald-600 font-bold">Outcome: {selectedCall.outcome}</span>
              <Button variant="primary" size="sm" onClick={() => setSelectedCall(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
