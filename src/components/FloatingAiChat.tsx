import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Send, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Search, 
  Home, 
  MessageSquare, 
  HelpCircle, 
  Calendar,
  Layers,
  Database,
  Mail,
  PhoneCall,
  Linkedin,
  ShieldCheck,
  Bot
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  linkText?: string;
  linkHref?: string;
  time: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: "👋 Hi! I'm TRIXIE AI, your Outtricks Revenue Assistant. How can I help you scale your outbound pipeline today?",
    time: 'Just now'
  }
];

interface HelpTopic {
  id: string;
  title: string;
  category: string;
  answer: string;
  linkText?: string;
  linkHref?: string;
}

const HELP_TOPICS: HelpTopic[] = [
  {
    id: 'inbox-warmup',
    title: 'Multi-inbox rotation & automated warmup',
    category: 'Cold Email',
    answer: 'Outtricks distributes sending volume across unlimited connected inboxes (Google Workspace & Microsoft 365) with automated peer-to-peer warmup and dynamic spintax to maintain 99.4% inbox placement.',
    linkText: 'Learn about Multi-Inbox Outreach',
    linkHref: '/platform/multi-inbox-email-outreach'
  },
  {
    id: 'lead-search',
    title: '8-Dimension B2B Lead Search',
    category: 'Lead Finder',
    answer: 'Our lead search engine allows searching 480M+ global B2B contacts with multiDimensional filtering by job title, company size, industry, revenue, and direct contact details.',
    linkText: 'Explore 480M+ B2B Pool',
    linkHref: '/platform/8-dimension-b2b-pool'
  },
  {
    id: 'voice-ai-sdr',
    title: 'Voice AI SDR calling (<400ms WebRTC)',
    category: 'Voice AI',
    answer: 'Our Voice AI SDR places ultra-low latency WebRTC phone calls, conducts natural multi-turn qualification conversations, handles objections dynamically, and logs booked demos into your CRM.',
    linkText: 'See Voice AI SDR Studio',
    linkHref: '/platform/sub-400ms-webrtc'
  },
  {
    id: 'linkedin-outreach',
    title: 'LinkedIn outreach & safe cloud limits',
    category: 'LinkedIn',
    answer: 'Outtricks uses cloud-based actions with dedicated static residential proxies and human-like delay pacing to automate connection requests, profile views, and follow-ups with zero ban risks.',
    linkText: 'View LinkedIn Automation',
    linkHref: '/platform/linkedin-automation'
  },
  {
    id: 'credit-usage',
    title: 'Credit usage, pricing & rollover',
    category: 'Pricing',
    answer: 'Usage is transparent: 1 credit = 1 email sent or 1 contact search query. Credits draw from a shared workspace ledger and roll over every month.',
    linkText: 'View Modular Pricing Plans',
    linkHref: '/pricing'
  }
];

export const FloatingAiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentTab, setCurrentTab] = useState<'home' | 'messages' | 'help'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Chat messaging states
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && currentTab === 'messages') {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen, currentTab]);

  const handleSendMessage = (queryText?: string, customAiResponse?: { text: string; linkText?: string; linkHref?: string }) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setCurrentTab('messages');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = customAiResponse?.text || "Outtricks consolidates 6 outbound engines (480M+ Lead Finder, Cold Email, LinkedIn, Voice AI SDR, Freelance Bidding, and Deals CRM) onto 1 connected database with 0 sync delay.";
      let linkText: string | undefined = customAiResponse?.linkText || "Explore Platform Architecture";
      let linkHref: string | undefined = customAiResponse?.linkHref || "/platform";

      if (!customAiResponse) {
        const lower = textToSend.toLowerCase();
        if (lower.includes('apollo')) {
          aiReply = "Outtricks combines 8-dimension B2B lead search across 480M+ global profiles with multi-channel outreach (email, LinkedIn, Voice AI SDR) and unified Deals CRM in one continuous platform.";
          linkText = "View Outtricks vs Apollo Comparison";
          linkHref = "/comparisons/outtricks-vs-apollo";
        } else if (lower.includes('credit') || lower.includes('cost') || lower.includes('price')) {
          aiReply = "Usage is simple: 1 credit = 1 email sent or 1 contact search query. Modular plans start at $20/mo with full rollover.";
          linkText = "View Modular Pricing Plans";
          linkHref = "/pricing";
        } else if (lower.includes('voice') || lower.includes('phone') || lower.includes('call')) {
          aiReply = "Our Voice AI SDR makes sub-400ms WebRTC phone calls, qualifies leads dynamically, handles objections in real time, and books meetings directly into your CRM.";
          linkText = "Learn About Voice AI SDR";
          linkHref = "/platform/sub-400ms-webrtc";
        } else if (lower.includes('demo') || lower.includes('sales') || lower.includes('talk')) {
          aiReply = "You can schedule a live 20-minute architecture walkthrough with our sales engineering team at any time!";
          linkText = "Book a Live Demo";
          linkHref = "/book-a-demo";
        } else if (lower.includes('trial') || lower.includes('start') || lower.includes('free')) {
          aiReply = "You can start your 7-Day Free Trial instantly with full access to 480M+ lead search and multi-inbox sending with no credit card required.";
          linkText = "Start Free 7-Day Trial";
          linkHref = "/signup";
        }
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        linkText,
        linkHref,
        time: 'Just now'
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleSelectHelpTopic = (topic: HelpTopic) => {
    handleSendMessage(topic.title, {
      text: topic.answer,
      linkText: topic.linkText,
      linkHref: topic.linkHref
    });
  };

  const filteredTopics = HELP_TOPICS.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* =========================================================================
          FIXED LAUNCHER / TRIGGER BUTTON (Bottom-Right Viewport)
          ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
        
        {/* Tooltip on Hover when Closed */}
        {!isOpen && isHovered && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-slate-950 text-white text-[11px] font-sans font-bold tracking-wide shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in duration-150 border border-slate-800">
            Chat with TRIXIE AI
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isOpen ? "Close TRIXIE AI" : "Open TRIXIE AI"}
          className={`w-[58px] h-[58px] rounded-2xl transition-all duration-200 flex items-center justify-center cursor-pointer shadow-xl hover:scale-105 active:scale-95 group relative ${
            isOpen 
              ? 'bg-[#0B1120] text-slate-300 hover:text-white border border-slate-800 shadow-2xl' 
              : 'bg-gradient-to-tr from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] hover:from-[#2563EB] hover:to-[#60A5FA] text-white shadow-blue-600/35 border border-blue-400/30'
          }`}
        >
          {isOpen ? (
            <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <div className="relative flex items-center justify-center">
              {/* Outtricks Sparkle Icon */}
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              {/* Live Emerald Pulse Dot */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0B1120] shadow-xs" />
            </div>
          )}
        </button>
      </div>

      {/* =========================================================================
          OUTTRICKS COPILOT DRAWER PANEL (Luxury Dark Navy + Electric Blue)
          ========================================================================= */}
      {isOpen && (
        <div className="fixed bottom-[84px] right-3 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-[390px] h-[560px] max-h-[calc(100vh-6.5rem)] bg-[#0A0F1D] text-white rounded-3xl border border-slate-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* 1. HEADER (TRIXIE AI • Autonomous Intelligence) */}
          <div className="bg-[#0D1527] border-b border-slate-800/80 px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-600/25 border border-blue-400/30 shrink-0">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white tracking-tight">
                  TRIXIE AI
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] font-sans text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </div>
              </div>
            </div>

            {/* Simple Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              aria-label="Close panel"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* 2. BODY CONTENT (Home, Messages, Help) */}
          <div className="flex-1 overflow-y-auto bg-[#0A0F1D] p-4 sm:p-5 space-y-4 no-scrollbar text-xs">
            
            {/* TAB 1: HOME */}
            {currentTab === 'home' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                
                {/* PRIMARY ACTION CARD: Start a conversation */}
                <button
                  onClick={() => {
                    setCurrentTab('messages');
                    setTimeout(() => inputRef.current?.focus(), 150);
                  }}
                  className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-left flex items-center justify-between gap-3 transition-all cursor-pointer shadow-lg shadow-blue-600/25 border border-blue-400/30 group"
                >
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Start a conversation</span>
                    </h4>
                    <p className="text-[11px] text-blue-100 font-sans">
                      Instant AI responses • Available 24/7
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform shrink-0">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </button>

                {/* SEARCH INPUT BAR */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Outtricks docs & guides..."
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#111111] text-white placeholder:text-[#707070] text-xs border border-[#2A2A2A] focus:border-[var(--color-primary,#2563EB)] outline-none transition-all font-sans shadow-inner"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* SUGGESTED HELP TOPICS GROUP */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-sans font-bold text-slate-400 uppercase tracking-wider px-1">
                    <span>Suggested Topics</span>
                    <span className="text-[10px] text-slate-500 font-normal">Click to ask</span>
                  </div>

                  <div className="space-y-2">
                    {filteredTopics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => handleSelectHelpTopic(topic)}
                        className="w-full p-3 rounded-xl bg-[#161616] hover:bg-[#202020] border border-[#2A2A2A] hover:border-white/40 text-left flex items-center justify-between gap-2.5 text-[#B5B5B5] hover:text-white transition-all cursor-pointer group shadow-2xs"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[9px] font-sans font-bold px-1.5 py-0.2 rounded bg-white/[0.06] text-white border border-white/[0.08] inline-block mb-1">
                            {topic.category}
                          </span>
                          <p className="truncate text-xs font-medium text-slate-200 group-hover:text-white">
                            {topic.title}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* SECONDARY BOOK DEMO CARD */}
                <div className="pt-1">
                  <div className="p-3.5 rounded-xl bg-[#161616] border border-[#2A2A2A] flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-white shrink-0" />
                      <span className="font-medium">Need an architecture demo?</span>
                    </div>
                    <Link
                      to="/book-a-demo"
                      onClick={() => setIsOpen(false)}
                      className="font-bold text-blue-400 hover:underline flex items-center gap-1 shrink-0 text-xs"
                    >
                      <span>Book Demo →</span>
                    </Link>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: MESSAGES */}
            {currentTab === 'messages' && (
              <div className="flex flex-col h-full space-y-3 animate-in fade-in duration-150">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar text-xs">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[var(--color-primary,#2563EB)] text-white rounded-tr-xs font-sans shadow-sm'
                            : 'bg-[#161616] text-white border border-[#2A2A2A] rounded-tl-xs font-sans shadow-sm space-y-2'
                        }`}
                      >
                        <p>{msg.text}</p>
                        {msg.linkHref && msg.linkText && (
                          <div className="pt-2 mt-2 border-t border-[#202020]">
                            <Link
                              to={msg.linkHref}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1 font-bold text-[11px] text-blue-400 hover:underline"
                            >
                              <span>{msg.linkText}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] font-sans text-[#777777] mt-1 px-1">
                        {msg.time}
                      </span>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#161616] w-fit text-[#B5B5B5] text-xs border border-[#2A2A2A]">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-2 bg-[#111111] rounded-2xl border border-[#2A2A2A] flex items-center gap-2 focus-within:border-white/40 transition-colors"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 px-3 py-1.5 bg-transparent text-white placeholder:text-[#707070] text-xs outline-none font-sans"
                  />
                  <button
                    type="submit"
                    disabled={!inputQuery.trim()}
                    className="w-8 h-8 rounded-xl bg-[var(--color-primary,#2563EB)] hover:brightness-110 text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shrink-0 shadow-sm"
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: HELP */}
            {currentTab === 'help' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white font-sans uppercase tracking-wider px-1">
                    Knowledge Base Articles
                  </h4>
                  <div className="space-y-2 text-xs">
                    {HELP_TOPICS.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => handleSelectHelpTopic(topic)}
                        className="w-full p-3.5 rounded-2xl bg-[#161616] hover:bg-[#202020] border border-[#2A2A2A] text-left flex items-start justify-between gap-3 text-[#B5B5B5] hover:text-white transition-colors cursor-pointer group shadow-2xs"
                      >
                        <div className="space-y-1">
                          <span className="text-[9px] font-sans font-bold px-2 py-0.5 rounded bg-white/[0.06] text-white border border-white/[0.08]">
                            {topic.category}
                          </span>
                          <h5 className="font-bold text-xs text-white pt-1">{topic.title}</h5>
                          <p className="text-[11px] text-[#8A8A8A] line-clamp-2 leading-relaxed">{topic.answer}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white shrink-0 mt-2" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* 3. CLEAN 3-TAB BOTTOM NAVIGATION BAR */}
          <div className="bg-[#0D1527] border-t border-slate-800/90 px-4 py-2.5 grid grid-cols-3 gap-2 text-center shrink-0">
            
            {/* 1. Home */}
            <button
              onClick={() => setCurrentTab('home')}
              className={`py-2 px-2 rounded-xl flex flex-col items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                currentTab === 'home' 
                  ? 'text-blue-400 bg-blue-500/15 font-bold border border-blue-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            {/* 2. Messages */}
            <button
              onClick={() => {
                setCurrentTab('messages');
                setTimeout(() => inputRef.current?.focus(), 150);
              }}
              className={`py-2 px-2 rounded-xl flex flex-col items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                currentTab === 'messages' 
                  ? 'text-blue-400 bg-blue-500/15 font-bold border border-blue-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </button>

            {/* 3. Help */}
            <button
              onClick={() => setCurrentTab('help')}
              className={`py-2 px-2 rounded-xl flex flex-col items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                currentTab === 'help' 
                  ? 'text-blue-400 bg-blue-500/15 font-bold border border-blue-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </button>

          </div>

        </div>
      )}
    </>
  );
};
