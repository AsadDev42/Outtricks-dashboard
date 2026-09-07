import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Sparkles, 
  Search, 
  MessageSquare, 
  Trash2, 
  Check, 
  X, 
  ArrowRight, 
  Bot, 
  User, 
  Layers, 
  Mail, 
  Building2, 
  ShieldCheck, 
  Copy, 
  RotateCcw,
  Zap,
  CheckCircle2,
  AlertCircle,
  Clock,
  Pin,
  Paperclip,
  Image as ImageIcon,
  Mic,
  MicOff,
  Square,
  ChevronDown,
  History,
  Download,
  ThumbsUp,
  ThumbsDown,
  Edit2,
  Terminal,
  Play
} from 'lucide-react';
import { useCoPilot, CoPilotMessage, CoPilotConversation } from '../../context/CoPilotContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export const CoPilotChatView: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    createNewConversation, 
    deleteConversation, 
    messages, 
    sendMessage, 
    isThinking,
    approveAction,
    cancelAction
  } = useCoPilot();

  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState<'gemini-pro' | 'claude-sonnet' | 'gpt-4o' | 'deepcontext-70b'>('gemini-pro');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { success, info } = useToast();

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const filteredConversations = conversations.filter(c => 
    c.title.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(historySearchQuery.toLowerCase())
  );

  const QUICK_STARTER_PROMPTS = [
    {
      title: 'Find B2B Decision Makers',
      subtitle: 'Identify 500 VP Product leads at Series A-B FinTechs',
      prompt: 'Find 500 VP Product and Chief Product Officer leads at Series A-B FinTech companies in North America with verified emails.',
      icon: UsersIcon,
    },
    {
      title: 'Draft Cold Email Spintax',
      subtitle: 'Generate 3 high-converting intro variations',
      prompt: 'Draft 3 cold email spintax variations offering a 14-day pipeline acceleration pilot to enterprise sales leaders.',
      icon: Mail,
    },
    {
      title: 'Forecast CRM Pipeline',
      subtitle: 'Calculate probability-weighted Q3 ARR',
      prompt: 'Analyze active opportunities in my Deals CRM and forecast expected closed-won ARR for Q3 with conversion probabilities.',
      icon: Layers,
    },
    {
      title: 'Audit Mailboxes Deliverability',
      subtitle: 'Scan 24 rotating inboxes for SPF/DKIM health',
      prompt: 'Run a full deliverability health audit across all 24 rotating mailboxes. Check SPF, DKIM, and warmup progression.',
      icon: ShieldCheck,
    }
  ];

  function UsersIcon(props: any) {
    return <Building2 {...props} />;
  }

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!input.trim() && attachedFiles.length === 0) || isThinking) return;

    let payload = input.trim();
    if (attachedFiles.length > 0) {
      payload += `\n[Attached: ${attachedFiles.join(', ')}]`;
    }

    sendMessage(payload);
    setInput('');
    setAttachedFiles([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    success('Response copied to clipboard.');
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleVoiceToggle = () => {
    if (isRecordingVoice) {
      setIsRecordingVoice(false);
      info('Voice transcription completed.');
      setInput((prev) => prev + (prev ? ' ' : '') + 'Audit pipeline health and deliverability for all active accounts.');
    } else {
      setIsRecordingVoice(true);
      info('Listening... Speak your prompt.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map(f => f.name);
      setAttachedFiles((prev) => [...prev, ...fileNames]);
      success(`Attached ${files.length} file(s).`);
    }
  };

  const handleExportChat = () => {
    const chatText = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}:\n${m.text}\n`).join('\n---\n\n');
    const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `copilot_chat_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    success('Chat exported as text file.');
  };

  const MODEL_LABELS = {
    'gemini-pro': 'Gemini 1.5 Pro (Ultra-Fast)',
    'claude-sonnet': 'Claude 3.5 Sonnet (Deep Reasoning)',
    'gpt-4o': 'GPT-4o Omnichannel',
    'deepcontext-70b': 'DeepContext 70B (Revenue Brain)',
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] sm:h-[calc(100vh-9.5rem)] min-h-[500px] w-full font-sans bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden relative">
      
      {/* ================================================== */}
      {/* 1. TOP CHAT HEADER (ChatGPT / Claude / Kimi Style) */}
      {/* ================================================== */}
      <header className="h-14 px-4 sm:px-6 bg-slate-50/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-[#2A2A2A] flex items-center justify-between gap-3 shrink-0 z-20">
        
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-950 dark:text-white tracking-tight">
                Tricksy AI
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Revenue OS
              </span>
            </div>
          </div>
        </div>

        {/* Center: Model Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-emerald-500 transition-colors shadow-2xs"
          >
            <span>{MODEL_LABELS[selectedModel]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isModelDropdownOpen && (
            <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-2xl p-1.5 shadow-xl z-50 space-y-1 text-xs animate-in fade-in zoom-in-95">
              {(Object.keys(MODEL_LABELS) as Array<keyof typeof MODEL_LABELS>).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelectedModel(key);
                    setIsModelDropdownOpen(false);
                    success(`Switched AI Model to ${MODEL_LABELS[key]}`);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors flex items-center justify-between ${
                    selectedModel === key
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{MODEL_LABELS[key]}</span>
                  {selectedModel === key && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Controls (New Chat, History, Export) */}
        <div className="flex items-center gap-1.5">
          {/* History Button (Compact Slide-out Drawer) */}
          <button
            type="button"
            onClick={() => setIsHistoryDrawerOpen(!isHistoryDrawerOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-colors"
            title="Chat History"
          >
            <History className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">History</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-white/10 font-mono">
              {conversations.length}
            </span>
          </button>

          {/* Export Chat */}
          <button
            type="button"
            onClick={handleExportChat}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-colors"
            title="Export Conversation"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* New Chat Primary Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={createNewConversation}
            className="text-xs font-bold gap-1.5 shadow-sm shadow-primary/25"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Chat</span>
          </Button>
        </div>

      </header>

      {/* ================================================== */}
      {/* 2. CHAT HISTORY SLIDE-OUT DRAWER / MODAL           */}
      {/* ================================================== */}
      {isHistoryDrawerOpen && (
        <div className="absolute inset-0 z-30 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsHistoryDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-80 max-w-[85vw] h-full bg-white dark:bg-[#161616] border-r border-slate-200 dark:border-[#2A2A2A] p-4 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="space-y-3 flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#202020]">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Conversation History
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsHistoryDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search in History */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={historySearchQuery}
                  onChange={(e) => setHistorySearchQuery(e.target.value)}
                  placeholder="Search past conversations..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto space-y-1 pr-1 no-scrollbar">
                {filteredConversations.map((conv) => {
                  const isActive = conv.id === activeConversationId;
                  return (
                    <div
                      key={conv.id}
                      onClick={() => {
                        setActiveConversationId(conv.id);
                        setIsHistoryDrawerOpen(false);
                      }}
                      className={`group p-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-start justify-between gap-2 ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="truncate text-slate-900 dark:text-white">{conv.title}</div>
                        <div className="truncate text-[10px] text-slate-400 font-normal">{conv.lastMessage}</div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conv.id);
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-200 dark:hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete chat"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                createNewConversation();
                setIsHistoryDrawerOpen(false);
              }}
              className="w-full text-xs font-bold gap-1.5 mt-3"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Start Fresh Chat</span>
            </Button>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* 3. CENTER CONVERSATION THREAD (Full Available Width)*/}
      {/* ================================================== */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 flex flex-col justify-between min-h-0">
        
        <div className="max-w-4xl mx-auto w-full space-y-6">
          
          {/* Empty State Welcome Screen */}
          {messages.length <= 1 && (
            <div className="py-8 sm:py-12 text-center space-y-6 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800/60 shadow-md">
                <Sparkles className="w-7 h-7" />
              </div>

              <div className="space-y-1 max-w-lg mx-auto">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                  How can I accelerate your revenue today?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ask me to search 480M+ decision makers, write hyper-personalized cold outreach, audit mailbox warmup, or forecast deal velocity.
                </p>
              </div>

              {/* 4 Interactive Starter Prompt Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
                {QUICK_STARTER_PROMPTS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        sendMessage(item.prompt);
                      }}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-400 dark:hover:border-emerald-600/60 transition-all cursor-pointer group shadow-2xs space-y-1"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Render Active Conversation Messages */}
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${isAi ? 'items-start' : 'items-start justify-end'} group`}
              >
                {/* Avatar Icon (AI) */}
                {isAi && (
                  <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                {/* Message Bubble Container */}
                <div
                  className={`relative max-w-[85%] sm:max-w-[78%] space-y-2.5 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                    isAi
                      ? 'bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 shadow-2xs'
                      : 'bg-primary text-white font-medium shadow-sm shadow-primary/25 ml-auto rounded-tr-none'
                  }`}
                >
                  {/* Message Header / Timestamp */}
                  <div className="flex items-center justify-between gap-3 text-[10px] opacity-70 pb-1 border-b border-black/5 dark:border-white/5">
                    <span className="font-extrabold uppercase tracking-wider">
                      {isAi ? 'Tricksy AI' : 'You'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Message Text with Code Block formatting */}
                  <div className="whitespace-pre-wrap break-words font-sans">
                    {msg.text}
                  </div>

                  {/* Tool Call Status Card */}
                  {msg.toolCall && (
                    <div className="p-3 rounded-xl bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                          <Terminal className="w-3.5 h-3.5 text-primary" />
                          <span>Action: {msg.toolCall.name}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                          {msg.toolCall.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        {msg.toolCall.summary}
                      </p>
                    </div>
                  )}

                  {/* Action Confirmation Card */}
                  {msg.actionConfirmation && (
                    <div className="p-3.5 rounded-xl bg-primary/5 dark:bg-white/[0.04] border border-primary/20 dark:border-primary/30 space-y-2.5 text-xs">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {msg.actionConfirmation.title}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        {msg.actionConfirmation.description}
                      </p>

                      {msg.actionConfirmation.status === 'pending' ? (
                        <div className="flex items-center gap-2 pt-1">
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => approveAction(msg.actionConfirmation!.actionId)}
                            className="h-7 text-xs font-bold"
                          >
                            Approve & Execute
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => cancelAction(msg.actionConfirmation!.actionId)}
                            className="h-7 text-xs font-semibold text-slate-600"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 pt-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Action Approved & Executed</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* AI Response Utility Toolbar */}
                  {isAi && (
                    <div className="pt-2 flex items-center gap-2 text-slate-400">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(msg.id, msg.text)}
                        className="p-1 rounded-md hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
                        title="Copy Response"
                      >
                        {copiedMessageId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => sendMessage('Continue and provide further specific breakdown.')}
                        className="text-[10px] font-semibold text-primary hover:underline px-1"
                      >
                        Continue
                      </button>
                      <button
                        type="button"
                        onClick={() => sendMessage('Regenerate response with alternative strategy.')}
                        className="p-1 rounded-md hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
                        title="Regenerate"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {!isAi && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Thinking / Streaming Indicator */}
          {isThinking && (
            <div className="flex items-start gap-3 animate-in fade-in duration-200">
              <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#2A2A2A] text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Tricksy AI is analyzing revenue telemetry & formulating response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ================================================== */}
      {/* 4. LARGE ANCHORED CHAT COMPOSER (Bottom Centered)  */}
      {/* ================================================== */}
      <footer className="p-4 sm:p-5 bg-white/90 dark:bg-[#161616]/90 backdrop-blur-md border-t border-slate-200/80 dark:border-[#2A2A2A] shrink-0">
        
        <form onSubmit={handleSend} className="max-w-4xl mx-auto w-full space-y-2">
          
          {/* File Attachments Pills */}
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pb-1">
              {attachedFiles.map((file, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-xl text-xs bg-primary/10 dark:bg-white/[0.04] text-primary dark:text-primary border border-primary/20 dark:border-primary/30 flex items-center gap-1.5 font-medium"
                >
                  <Paperclip className="w-3 h-3" />
                  <span className="truncate max-w-[140px]">{file}</span>
                  <button
                    type="button"
                    onClick={() => setAttachedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                    className="p-0.5 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Main Input Box Container */}
          <div className="relative flex items-end rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-300/80 dark:border-[#2A2A2A] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all p-2 shadow-sm">
            
            {/* Attachment Controls (Left) */}
            <div className="flex items-center gap-1 shrink-0 pb-1 pl-1">
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-colors"
                title="Attach files (CSV, PDF, Doc)"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-colors hidden sm:flex"
                title="Upload screenshot or image"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`p-2 rounded-xl transition-colors ${
                  isRecordingVoice
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/[0.06]'
                }`}
                title={isRecordingVoice ? 'Stop recording' : 'Voice prompt input'}
              >
                {isRecordingVoice ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>

            {/* Auto-expanding Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask Tricksy AI to prospect leads, generate sequences, audit CRM, or trigger workflows..."
              className="flex-1 bg-transparent border-none focus:outline-none px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 resize-none max-h-48 overflow-y-auto leading-relaxed"
            />

            {/* Send / Stop Button (Right) */}
            <div className="shrink-0 pb-1 pr-1">
              {isThinking ? (
                <button
                  type="button"
                  onClick={() => success('Stopped AI generation.')}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center justify-center"
                  title="Stop Generating"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim() && attachedFiles.length === 0}
                  className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
                    input.trim() || attachedFiles.length > 0
                      ? 'bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/30'
                      : 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed'
                  }`}
                  title="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Micro Status Footnote */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-medium">
            <span>Tricksy AI has verified read/write access to your Deals CRM, Leads, and Mailboxes.</span>
            <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[10px] font-mono">Enter</kbd> to send</span>
          </div>

        </form>

      </footer>

    </div>
  );
};
