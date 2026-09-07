import React, { useState } from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  BrainCircuit, 
  Play, 
  Pause,
  Keyboard,
  Flame,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useVoiceAi } from '../../context/VoiceAiContext';

export const CallCenterView: React.FC = () => {
  const { activeCall, endActiveCall, toggleMuteActiveCall, setCallDisposition, startOutboundCall } = useVoiceAi();
  const [targetNumber, setTargetNumber] = useState('+1 (415) 782-9014');
  const [targetName, setTargetName] = useState('Jessica Miller');
  const [targetCompany, setTargetCompany] = useState('Apex Revenue Tech');

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 2-Column Grid: Live Active Call Console & Outbound Quick Dialer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Live WebRTC Call Console */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-6">
            
            {/* Header: Call Status */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">
                    {activeCall ? `Live Call: ${activeCall.prospectName}` : 'Dialer Ready'}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    {activeCall ? `${activeCall.phone} • ${activeCall.company}` : 'Sub-400ms WebRTC line standby'}
                  </p>
                </div>
              </div>

              {activeCall && (
                <div className="flex items-center gap-2 font-mono">
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">
                    {formatTime(activeCall.durationSeconds)}
                  </span>
                  <Badge variant="emerald" size="sm">
                    {activeCall.status}
                  </Badge>
                </div>
              )}
            </div>

            {/* Audio Wave Visualizer */}
            {activeCall && (
              <div className="p-4 rounded-2xl bg-slate-950 text-white flex items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-1.5 h-8">
                  {[40, 70, 95, 45, 80, 100, 60, 30, 90, 75, 40, 85, 95, 60, 45, 80, 100, 50].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-full animate-pulse"
                      style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
                    />
                  ))}
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Latency: 280ms</div>
                  <div className="text-[11px] text-emerald-400 font-bold">11Labs Turbo v2.5 Active</div>
                </div>
              </div>
            )}

            {/* Live Speaker Transcript */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase font-mono">
                Live Speaker Transcript
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] max-h-64 overflow-y-auto text-xs font-mono">
                {activeCall?.liveTranscript.map((line, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className={line.speaker === 'AI SDR' ? 'text-emerald-500 font-bold' : 'text-slate-700 dark:text-slate-300 font-bold'}>
                        {line.speaker}
                      </span>
                      <span>{line.time}</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 font-sans text-xs leading-relaxed">
                      {line.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call Controls & Dispositions */}
            {activeCall ? (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={toggleMuteActiveCall}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      activeCall.isMuted
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-slate-100 dark:bg-[#1C1C1C] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#2A2A2A]'
                    }`}
                  >
                    {activeCall.isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{activeCall.isMuted ? 'Unmute' : 'Mute'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={endActiveCall}
                    className="p-3 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>End Call</span>
                  </button>
                </div>

                {/* Dispositions */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
                  <div className="text-[11px] font-bold text-slate-400 uppercase font-mono">
                    Select Call Disposition (Syncs to CRM)
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {[
                      'Meeting Booked',
                      'Qualified (Follow-Up)',
                      'Pricing Requested',
                      'Voicemail Left',
                      'Not Interested',
                    ].map((disp) => (
                      <button
                        key={disp}
                        type="button"
                        onClick={() => setCallDisposition(disp)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-500/40 border border-slate-200 dark:border-[#202020] text-slate-800 dark:text-slate-200 font-bold transition-colors cursor-pointer"
                      >
                        {disp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs space-y-2">
                <PhoneCall className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
                <div className="font-bold text-slate-700 dark:text-slate-300">No Active Call</div>
                <p>Use the Quick Outbound Dialer on the right to place a sub-400ms voice call.</p>
              </div>
            )}

          </div>
        </div>

        {/* Right 1 Col: Quick Outbound Dialer */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <div>
              <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">
                Quick Outbound AI Dialer
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Dispatch an autonomous voice SDR to call and qualify a target lead.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Prospect Full Name
                </label>
                <input
                  type="text"
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={targetNumber}
                  onChange={(e) => setTargetNumber(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] outline-none font-mono"
                />
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => startOutboundCall(targetName, targetCompany, targetNumber)}
                  leftIcon={<PhoneCall className="w-4 h-4" />}
                >
                  Place Voice Call
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
