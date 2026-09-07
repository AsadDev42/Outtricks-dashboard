import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PhoneCall, 
  Mic, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  RotateCcw, 
  Play, 
  Pause,
  Volume2,
  TrendingUp,
  Activity,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
  User,
  Bot
} from 'lucide-react';
import { Card3DTilt } from './3d/Card3DTilt';

interface Message {
  speaker: 'AI SDR' | 'Prospect';
  text: string;
  time: string;
}

const CONVERSATION: Message[] = [
  {
    speaker: 'AI SDR',
    text: "Hi Jessica, this is Alex from Outtricks. I noticed your team is expanding its sales operation. Do you have 60 seconds?",
    time: "00:04"
  },
  {
    speaker: 'Prospect',
    text: "Sure. What exactly does Outtricks help with?",
    time: "00:09"
  },
  {
    speaker: 'AI SDR',
    text: "We help revenue teams find prospects, automate outreach, and qualify conversations across email, LinkedIn, and voice.",
    time: "00:15"
  },
  {
    speaker: 'Prospect',
    text: "That sounds interesting. How does the AI handle objections?",
    time: "00:21"
  },
  {
    speaker: 'AI SDR',
    text: "It can respond in real time, understand intent, and route qualified opportunities directly to your sales team.",
    time: "00:28"
  }
];

export const VoiceSimulator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [callSeconds, setCallSeconds] = useState(4);
  const [qualificationScore, setQualificationScore] = useState(45);
  const [intentLevel, setIntentLevel] = useState<'Medium' | 'High'>('Medium');

  // Progressive conversation stepper
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let secondTimer: ReturnType<typeof setInterval>;

    if (isPlaying) {
      secondTimer = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);

      if (currentLineIndex < CONVERSATION.length - 1) {
        timer = setTimeout(() => {
          setCurrentLineIndex((prev) => {
            const next = prev + 1;
            if (next >= 2) {
              setIntentLevel('High');
              setQualificationScore(87);
            } else {
              setQualificationScore(62);
            }
            return next;
          });
        }, 3200);
      }
    }

    return () => {
      clearTimeout(timer);
      clearInterval(secondTimer);
    };
  }, [isPlaying, currentLineIndex]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(true);
    setCurrentLineIndex(0);
    setCallSeconds(4);
    setQualificationScore(45);
    setIntentLevel('Medium');
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `0${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      
      {/* Ambient Gradient Glow Behind Container */}
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-blue-500/10 via-blue-500/10 to-blue-500/10 blur-3xl pointer-events-none" />

        {/* Main 2-Column Product Interface */}
        <div className="liquid-glass rounded-3xl p-5 sm:p-8 md:p-10 shadow-clean-lg relative z-10 border border-slate-200/90 dark:border-[#2A2A2A]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* =========================================================================
                LEFT COLUMN: Large Conversational AI Voice Interface (5 Cols)
                ========================================================================= */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
              
              {/* Header Box */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-[#2A2A2A]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs tracking-wider uppercase text-slate-900 dark:text-white font-sans">
                      OUTTRICKS VOICE AI
                    </h3>
                    <p className="text-[10px] text-slate-400 font-sans">Autonomous Sales Development Rep</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/80 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-[10px] font-sans font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>AI SDR ACTIVE</span>
                </div>
              </div>

              {/* Center Voice AI Interactive Visual Indicator */}
              <div className="p-7 rounded-3xl bg-slate-50/80 dark:bg-[#141414]/80 border border-slate-200/80 dark:border-[#2A2A2A] text-center space-y-5 relative overflow-hidden">
                
                {/* Timer & State */}
                <div className="space-y-1">
                  <span className="text-3xl font-black font-sans text-slate-900 dark:text-white tracking-tight">
                    {formatTimer(callSeconds)}
                  </span>
                  <div className="text-[11px] font-sans text-blue-600 dark:text-blue-400 font-semibold flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span>Call in progress with Jessica (VP Sales)</span>
                  </div>
                </div>

                {/* Pulsing AI Voice Avatar */}
                <div className="relative flex items-center justify-center py-2">
                  {/* Outer Pulsing Waves */}
                  {isPlaying && (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0.05, 0.35] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-28 h-28 rounded-full bg-blue-500/25 pointer-events-none"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.15, 0.5] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-20 h-20 rounded-full bg-blue-500/20 pointer-events-none"
                      />
                    </>
                  )}

                  {/* Core Orb */}
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-700 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <Bot className="w-8 h-8" />
                  </div>
                </div>

                {/* Animated Voice Waveform Bars */}
                <div className="flex items-center justify-center gap-1 h-10 px-4">
                  {[18, 36, 64, 42, 85, 52, 95, 38, 72, 48, 88, 62, 34, 78, 55, 90, 45, 68, 30].map((h, idx) => (
                    <motion.div
                      key={idx}
                      animate={isPlaying ? {
                        height: [10, h, 14],
                        opacity: [0.6, 1, 0.6]
                      } : { height: 8, opacity: 0.3 }}
                      transition={{
                        duration: 0.8 + (idx % 4) * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: (idx * 0.04)
                      }}
                      className="w-1.5 rounded-full bg-gradient-to-t from-blue-600 via-blue-600 to-indigo-400"
                    />
                  ))}
                </div>

                {/* 3 Live KPI Indicator Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-sans">
                  <div className="p-2 rounded-xl liquid-glass-pill space-y-0.5">
                    <span className="text-[10px] text-slate-400 block">Prospect Intent</span>
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">{intentLevel}</span>
                  </div>
                  <div className="p-2 rounded-xl liquid-glass-pill space-y-0.5">
                    <span className="text-[10px] text-slate-400 block">Sentiment</span>
                    <span className="font-extrabold text-emerald-600">Positive</span>
                  </div>
                  <div className="p-2 rounded-xl liquid-glass-pill space-y-0.5">
                    <span className="text-[10px] text-slate-400 block">Qualification</span>
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">{qualificationScore}%</span>
                  </div>
                </div>

              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTogglePlay}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause AI Call' : 'Start AI Call'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 py-3.5 px-5 rounded-full liquid-glass-button text-slate-700 dark:text-slate-300 font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  title="Reset Conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

            </div>

            {/* =========================================================================
                RIGHT COLUMN: Realistic Live Conversation Panel (7 Cols)
                ========================================================================= */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Header Box */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-[#2A2A2A]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-sans font-bold text-slate-800 dark:text-slate-200 uppercase">
                    Live AI Conversation
                  </span>
                  <span className="text-[11px] text-slate-400">• WebRTC Sub-400ms Feed</span>
                </div>
                <div className="flex items-center gap-1.5 font-sans text-[11px] text-emerald-600 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Connected</span>
                </div>
              </div>

              {/* Progressive Message Bubbles Stream */}
              <div className="space-y-3.5 min-h-[380px] p-4 sm:p-6 rounded-3xl bg-slate-50/50 dark:bg-[#141414]/50 border border-slate-200/80 dark:border-[#2A2A2A] flex flex-col justify-start">
                
                <AnimatePresence>
                  {CONVERSATION.slice(0, currentLineIndex + 1).map((msg, idx) => {
                    const isAi = msg.speaker === 'AI SDR';
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className={`flex gap-3 max-w-[92%] sm:max-w-[85%] ${
                          isAi ? 'self-start' : 'self-end flex-row-reverse'
                        }`}
                      >
                        {/* Avatar Pill */}
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold font-sans shadow-xs ${
                          isAi 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        }`}>
                          {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>

                        {/* Speech Bubble */}
                        <div className={`p-4 rounded-2xl space-y-1 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                          isAi
                            ? 'bg-white dark:bg-[#181818] text-slate-800 dark:text-slate-100 border border-blue-100/80 dark:border-blue-900/80 rounded-tl-sm'
                            : 'bg-blue-600 text-white rounded-tr-sm'
                        }`}>
                          <div className="flex items-center justify-between gap-3 text-[10px] font-sans opacity-75">
                            <span className="font-bold">{msg.speaker}</span>
                            <span>{msg.time}</span>
                          </div>
                          <p className="font-normal">{msg.text}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Streaming Indicator */}
                {isPlaying && currentLineIndex < CONVERSATION.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-[11px] font-sans text-blue-600 dark:text-blue-400 pt-2 pl-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    <span>AI SDR is processing conversational response (&lt;400ms)...</span>
                  </motion.div>
                )}

                {/* Outcome Success Banner When All Lines Delivered */}
                {currentLineIndex >= CONVERSATION.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mt-auto shadow-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-extrabold block">Meeting Booked for Thursday 2:00 PM CST</span>
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-sans">
                          $45,000 Opportunity Logged to CRM • Google Calendar Sent
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-sans text-[10px] font-bold self-start sm:self-center">
                      Auto-Logged
                    </span>
                  </motion.div>
                )}

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =========================================================================
          FOUR COMPACT METRICS
          ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { metric: "< 400ms", label: "Response latency", detail: "Sub-second WebRTC audio pipeline" },
          { metric: "87%", label: "Intent accuracy", detail: "Conversational qualification score" },
          { metric: "24/7", label: "AI availability", detail: "Zero rep burnout or dropped leads" },
          { metric: "$45K+", label: "Pipeline influenced", detail: "Average ACV per qualified opportunity" }
        ].map((item, idx) => (
          <Card3DTilt key={idx} maxTilt={6}>
            <div className="p-5 sm:p-6 rounded-3xl liquid-glass-card space-y-1.5 text-center h-full">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                {item.metric}
              </span>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.label}</h4>
              <p className="text-[10px] text-slate-400 font-sans">{item.detail}</p>
            </div>
          </Card3DTilt>
        ))}
      </div>

    </div>
  );
};

