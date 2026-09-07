import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  Layers, 
  Mail, 
  Search, 
  Building2, 
  RotateCcw,
  Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  actionRoute?: string;
  actionLabel?: string;
}

export const FloatingCoPilotDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello Sarah! I'm Tricksy AI, your Outtricks Revenue Assistant. I can search 480M+ leads, generate high-converting spintax, check mailbox deliverability, or inspect your CRM pipeline. How can I accelerate your outbound pipeline today?",
      time: 'Just now'
    }
  ]);

  const QUICK_PROMPTS = [
    { label: 'Find FinTech VP Eng Leads', prompt: 'Search 8D Lead Finder for VP Engineering at Series B FinTechs in the US.' },
    { label: 'Check Mailbox Health', prompt: 'What is the current health and deliverability score of my 24 mailboxes?' },
    { label: 'Summarize Q3 Forecast', prompt: 'Give me a breakdown of our $485,000 active pipeline and Q3 close probability.' },
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText.trim(),
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse: ChatMessage;

      const lower = userText.toLowerCase();
      if (lower.includes('lead') || lower.includes('fintech') || lower.includes('search')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: "I searched the 8D Discovery Matrix: Found 1,450 verified VP Engineering decision-makers at US Series B FinTechs. All profiles have verified work emails with 99.4% deliverability score.",
          time: 'Just now',
          actionRoute: '/lead-finder',
          actionLabel: 'View 1,450 Leads in Lead Finder'
        };
      } else if (lower.includes('mailbox') || lower.includes('health') || lower.includes('deliverability')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: "All 24 connected mailboxes (Google Workspace & Microsoft 365) are at 99.4% average health score with 100% SPF, DKIM, and DMARC alignment passing.",
          time: 'Just now',
          actionRoute: '/cold-email',
          actionLabel: 'Inspect Mailbox Pool'
        };
      } else if (lower.includes('forecast') || lower.includes('pipeline') || lower.includes('crm')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: "Your active pipeline is $485,000 across 38 opportunities. Our machine-learning forecast predicts $295,000 ARR closed-won in Q3 with 82% statistical confidence.",
          time: 'Just now',
          actionRoute: '/analytics',
          actionLabel: 'Open Forecast Model'
        };
      } else {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Understood! I've analyzed your query regarding "${userText.substring(0, 40)}...". I can synthesize personalized email spintax, execute automated LinkedIn safe touches, or launch Voice AI SDR calling runs immediately.`,
          time: 'Just now',
          actionRoute: '/flow-builder',
          actionLabel: 'Open Visual Flow Builder'
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 650);
  };

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('open-copilot-drawer', handleOpen);
    window.addEventListener('toggle-copilot-drawer', handleToggle);
    return () => {
      window.removeEventListener('open-copilot-drawer', handleOpen);
      window.removeEventListener('toggle-copilot-drawer', handleToggle);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <>
      {/* Floating Assistant Drawer (Triggered from Top-Right Header Co-Pilot button) */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[540px] max-h-[calc(100vh-4rem)] bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xl flex flex-col overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="p-4 bg-slate-50 dark:bg-[#1C1C1C] border-b border-slate-100 dark:border-[#202020] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">Tricksy AI</span>
                  <Badge variant="primary" size="sm">Online</Badge>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Claude 3.5 / GPT-4o Hybrid</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-primary-muted text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    AI
                  </div>
                )}

                <div className={`space-y-2 max-w-[82%] ${
                  m.sender === 'user'
                    ? 'bg-primary text-white p-3 rounded-2xl rounded-tr-xs font-sans shadow-xs'
                    : 'bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] p-3 rounded-2xl rounded-tl-xs text-slate-800 dark:text-slate-200 font-sans'
                }`}>
                  <p className="leading-relaxed text-[11px]">{m.text}</p>
                  
                  {m.actionRoute && m.actionLabel && (
                    <button
                      type="button"
                      onClick={() => {
                        navigate(m.actionRoute!);
                        setIsOpen(false);
                      }}
                      className="w-full mt-1.5 py-1.5 px-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-[10px] flex items-center justify-between transition-all cursor-pointer shadow-xs"
                    >
                      <span>{m.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  <div className="text-[9px] opacity-60 text-right font-mono">{m.time}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono italic">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-primary" />
                <span>Tricksy AI is reasoning...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-slate-50/50 dark:bg-[#121212] border-t border-slate-100 dark:border-[#202020] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(qp.prompt)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:text-primary whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 bg-white dark:bg-[#161616] border-t border-slate-100 dark:border-[#202020] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Tricksy AI anything across your pipeline..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-sans"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!input.trim()}
              className="px-3"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>

        </div>
      )}
    </>
  );
};
