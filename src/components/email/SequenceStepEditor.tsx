import React, { useState, useRef, useMemo } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Code, 
  List, 
  ListOrdered, 
  Quote, 
  Link2, 
  Smile, 
  Sparkles, 
  Paperclip, 
  Image as ImageIcon, 
  FileText, 
  Trash2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Plus, 
  Eye, 
  Edit3, 
  Settings2, 
  ChevronDown, 
  ChevronUp, 
  Split, 
  ExternalLink, 
  RotateCw, 
  Wand2, 
  X,
  File,
  Check,
  Zap,
  Globe
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { useToast } from '../../context/ToastContext';
import { cleanAiSlop, evaluateAiSlop } from '../../utils/noAiSlop';

export interface SequenceAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
  isImage?: boolean;
}

export interface SequenceStepItem {
  stepNumber: number;
  delayDays: number;
  subject: string;
  body: string;
  attachments?: SequenceAttachment[];
  threadReply?: boolean;
  unsubscribeOption?: 'standard' | 'casual' | 'none';
  signatureType?: 'default' | 'sdr' | 'custom' | 'none';
  hasVariantB?: boolean;
  variantBSubject?: string;
  variantBBody?: string;
  activeVariant?: 'A' | 'B';
  trackOpens?: boolean;
  trackClicks?: boolean;
}

export interface SequenceStepEditorProps {
  step: SequenceStepItem;
  stepIndex: number;
  totalSteps: number;
  onChange: (updatedStep: SequenceStepItem) => void;
  onApplyAiPolish?: () => void;
}

interface SpamTrigger {
  word: string;
  category: 'urgency' | 'money' | 'salesy' | 'gimmick';
  severity: 'high' | 'medium';
  replacement: string;
}

const SPAM_TRIGGER_WORDS: SpamTrigger[] = [
  { word: 'free', category: 'money', severity: 'high', replacement: 'complimentary' },
  { word: '100%', category: 'gimmick', severity: 'high', replacement: 'fully' },
  { word: 'guarantee', category: 'gimmick', severity: 'high', replacement: 'ensure' },
  { word: 'guaranteed', category: 'gimmick', severity: 'high', replacement: 'proven' },
  { word: 'risk-free', category: 'gimmick', severity: 'high', replacement: 'low-friction' },
  { word: 'urgent', category: 'urgency', severity: 'high', replacement: 'time-sensitive' },
  { word: 'act now', category: 'urgency', severity: 'high', replacement: 'take a look' },
  { word: 'make money', category: 'money', severity: 'high', replacement: 'drive revenue' },
  { word: 'cash', category: 'money', severity: 'high', replacement: 'capital' },
  { word: 'earn cash', category: 'money', severity: 'high', replacement: 'capture value' },
  { word: 'credit card', category: 'money', severity: 'high', replacement: 'billing method' },
  { word: 'winner', category: 'gimmick', severity: 'high', replacement: 'selected partner' },
  { word: 'no catch', category: 'gimmick', severity: 'high', replacement: 'transparent' },
  { word: 'click here', category: 'salesy', severity: 'high', replacement: 'review the deck' },
  { word: 'buy now', category: 'salesy', severity: 'high', replacement: 'explore collaboration' },
  { word: 'cheap', category: 'money', severity: 'medium', replacement: 'cost-effective' },
  { word: 'unlimited', category: 'gimmick', severity: 'medium', replacement: 'high-capacity' },
  { word: 'miracle', category: 'gimmick', severity: 'high', replacement: 'breakthrough' },
  { word: 'fast cash', category: 'money', severity: 'high', replacement: 'accelerated cashflow' },
  { word: 'lowest price', category: 'money', severity: 'medium', replacement: 'competitive pricing' },
  { word: 'apply now', category: 'urgency', severity: 'medium', replacement: 'submit interest' },
  { word: 'instant', category: 'urgency', severity: 'medium', replacement: 'real-time' },
  { word: 'special promotion', category: 'salesy', severity: 'medium', replacement: 'exclusive initiative' },
  { word: 'discount', category: 'money', severity: 'medium', replacement: 'incentive' },
  { word: 'limited time', category: 'urgency', severity: 'medium', replacement: 'current quarter' },
  { word: 'save big', category: 'money', severity: 'medium', replacement: 'reduce overhead' },
  { word: 'congratulations', category: 'gimmick', severity: 'medium', replacement: 'kudos' },
  { word: 'prize', category: 'gimmick', severity: 'high', replacement: 'recognition' },
  { word: 'order now', category: 'salesy', severity: 'high', replacement: 'confirm participation' },
  { word: 'exclusive deal', category: 'salesy', severity: 'medium', replacement: 'strategic partnership' },
  { word: 'no cost', category: 'money', severity: 'medium', replacement: 'no upfront commitment' },
  { word: 'extra income', category: 'money', severity: 'high', replacement: 'ancillary revenue' },
  { word: 'promise', category: 'gimmick', severity: 'medium', replacement: 'commit' },
];

const VARIABLE_GROUPS = [
  {
    category: 'Lead Information',
    variables: [
      { tag: 'firstName', label: 'First Name', preview: 'Sarah' },
      { tag: 'lastName', label: 'Last Name', preview: 'Jenkins' },
      { tag: 'fullName', label: 'Full Name', preview: 'Sarah Jenkins' },
      { tag: 'title', label: 'Job Title', preview: 'VP of Growth' },
      { tag: 'email', label: 'Work Email', preview: 'sarah@cloudscale.ai' },
      { tag: 'phone', label: 'Phone Number', preview: '+1 (555) 019-2834' },
      { tag: 'city', label: 'City', preview: 'San Francisco' },
      { tag: 'state', label: 'State / Region', preview: 'California' },
      { tag: 'country', label: 'Country', preview: 'United States' },
      { tag: 'linkedinUrl', label: 'LinkedIn Profile', preview: 'linkedin.com/in/sarah' },
    ]
  },
  {
    category: 'Company Profile',
    variables: [
      { tag: 'company', label: 'Company Name', preview: 'CloudScale AI' },
      { tag: 'website', label: 'Website Domain', preview: 'cloudscale.ai' },
      { tag: 'industry', label: 'Industry', preview: 'Enterprise Software' },
      { tag: 'employeeCount', label: 'Headcount', preview: '120-250' },
      { tag: 'revenue', label: 'Annual Revenue', preview: '$25M-$50M' },
      { tag: 'techStack', label: 'Primary Tech', preview: 'Salesforce, HubSpot' },
    ]
  },
  {
    category: 'Smart Fallbacks',
    variables: [
      { tag: 'firstName|there', label: 'First Name (fallback "there")', preview: 'Hi {{firstName|there}}' },
      { tag: 'company|your company', label: 'Company (fallback "your company")', preview: 'at {{company|your company}}' },
      { tag: 'title|growth leader', label: 'Title (fallback "growth leader")', preview: 'leading as {{title|growth leader}}' },
    ]
  },
  {
    category: 'Dynamic Spintax Snippets',
    variables: [
      { tag: 'spintax:greeting', label: '{Hi|Hello|Hey}', preview: '{Hi|Hello|Hey}' },
      { tag: 'spintax:opener', label: '{Quick question|Brief inquiry|Reaching out}', preview: '{Quick question|Brief inquiry}' },
      { tag: 'spintax:closing', label: '{Best|Cheers|Regards}', preview: '{Best|Cheers|Regards}' },
    ]
  },
  {
    category: 'AI Personalized Tags',
    variables: [
      { tag: 'ai_icebreaker', label: 'AI 1-to-1 Icebreaker', preview: 'Loved your recent post on SDR retention' },
      { tag: 'ai_ps_line', label: 'AI Postscript Note', preview: 'P.S. Congrats on the Series B' },
      { tag: 'unsubscribe_link', label: '1-Click Unsubscribe Tag', preview: '{{unsubscribe_link}}' },
      { tag: 'sender_signature', label: 'Sender Signature Tag', preview: '{{sender_signature}}' },
    ]
  }
];

const EMOJIS = ['👋', '🚀', '💼', '📈', '🤝', '🎯', '✨', '💡', '🔥', '📩', '👏', '☕', '⚡', '📊'];

export const SequenceStepEditor: React.FC<SequenceStepEditorProps> = ({
  step,
  stepIndex,
  totalSteps,
  onChange,
  onApplyAiPolish,
}) => {
  const { success, info } = useToast();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Local UI State
  const [activeVariant, setActiveVariant] = useState<'A' | 'B'>(step.activeVariant || 'A');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showVariableMenu, setShowVariableMenu] = useState(false);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [variableSearch, setVariableSearch] = useState('');
  const [customVarName, setCustomVarName] = useState('');

  // Link dialog state
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  // Image dialog state
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  // Determine current active content based on Variant A or Variant B
  const isEditingVariantB = activeVariant === 'B' && step.hasVariantB;
  const currentSubject = isEditingVariantB ? (step.variantBSubject || '') : step.subject;
  const currentBody = isEditingVariantB ? (step.variantBBody || '') : step.body;
  const attachments = step.attachments || [];

  // Update subject
  const handleSubjectChange = (val: string) => {
    if (isEditingVariantB) {
      onChange({ ...step, variantBSubject: val });
    } else {
      onChange({ ...step, subject: val });
    }
  };

  // Update body
  const handleBodyChange = (val: string) => {
    if (isEditingVariantB) {
      onChange({ ...step, variantBBody: val });
    } else {
      onChange({ ...step, body: val });
    }
  };

  // Insert variable or token at cursor position or end of body
  const insertTextAtCursor = (textToInsert: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      handleBodyChange(currentBody + (currentBody ? ' ' : '') + textToInsert);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = currentBody.substring(0, start);
    const after = currentBody.substring(end, currentBody.length);
    const newText = before + textToInsert + after;

    handleBodyChange(newText);

    // Reposition cursor after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
    }, 10);
  };

  // Format selection with markdown/HTML tags
  const applyFormatting = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = currentBody.substring(start, end);
    const replacement = selected ? `${prefix}${selected}${suffix}` : `${prefix}text${suffix}`;

    const before = currentBody.substring(0, start);
    const after = currentBody.substring(end, currentBody.length);
    handleBodyChange(before + replacement + after);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 10);
  };

  // Insert custom variable
  const handleInsertCustomVariable = () => {
    if (!customVarName.trim()) return;
    const cleanTag = customVarName.trim().replace(/[{}]/g, '');
    insertTextAtCursor(`{{${cleanTag}}}`);
    setCustomVarName('');
    setShowVariableMenu(false);
    success(`Inserted variable {{${cleanTag}}}`);
  };

  // Insert link
  const handleInsertLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;
    const label = linkText.trim() || 'click here';
    const formattedLink = `[${label}](${linkUrl.trim()})`;
    insertTextAtCursor(formattedLink);
    setLinkText('');
    setLinkUrl('');
    setShowLinkModal(false);
    success('Hyperlink inserted into copy');
  };

  // Insert image via URL
  const handleInsertImageUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    const alt = imageAlt.trim() || 'Attached Image';
    const newAttachment: SequenceAttachment = {
      id: 'img_' + Date.now(),
      name: alt,
      size: 'Web Asset',
      type: 'image/jpeg',
      url: imageUrl.trim(),
      isImage: true,
    };
    onChange({
      ...step,
      attachments: [...attachments, newAttachment],
    });
    insertTextAtCursor(`\n![${alt}](${imageUrl.trim()})\n`);
    setImageUrl('');
    setImageAlt('');
    setShowImageModal(false);
    success('Image added to sequence step');
  };

  // File upload handler (mock reader for files & images)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isImage: boolean = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const sizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newAttachment: SequenceAttachment = {
        id: 'att_' + Date.now(),
        name: file.name,
        size: sizeFormatted,
        type: file.type || (isImage ? 'image/png' : 'application/pdf'),
        url: dataUrl,
        isImage: isImage || file.type.startsWith('image/'),
      };

      onChange({
        ...step,
        attachments: [...attachments, newAttachment],
      });

      if (newAttachment.isImage) {
        insertTextAtCursor(`\n![${file.name}](${dataUrl})\n`);
      }

      success(`Attached "${file.name}" (${sizeFormatted}) to Step ${step.stepNumber}`);
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Remove attachment
  const handleRemoveAttachment = (id: string) => {
    const updated = attachments.filter(a => a.id !== id);
    onChange({ ...step, attachments: updated });
    info('Removed attachment from step');
  };

  // Toggle A/B testing variant
  const handleToggleVariantB = () => {
    if (step.hasVariantB) {
      onChange({ ...step, hasVariantB: false, activeVariant: 'A' });
      setActiveVariant('A');
      info('Disabled A/B testing variant for this step');
    } else {
      onChange({
        ...step,
        hasVariantB: true,
        variantBSubject: currentSubject ? `Alternative: ${currentSubject}` : 'Alternative Subject Line',
        variantBBody: currentBody || 'Hi {{firstName}},\n\nSharing an alternative value perspective for {{company}}...',
        activeVariant: 'B',
      });
      setActiveVariant('B');
      success('Created Variant B! You can now test 50/50 subject line & copy combinations.');
    }
  };

  // =========================================================================
  // REAL-TIME SPAM WORD & DELIVERABILITY INTELLIGENCE ENGINE (INSTANTLY STYLE)
  // =========================================================================
  const deliverabilityAnalysis = useMemo(() => {
    const textToScan = `${currentSubject} ${currentBody}`.toLowerCase();
    
    // 1. Detect Spam Triggers
    const detectedTriggers: SpamTrigger[] = [];
    SPAM_TRIGGER_WORDS.forEach((item) => {
      const regex = new RegExp(`\\b${item.word.replace('$', '\\$')}\\b`, 'gi');
      if (regex.test(textToScan)) {
        detectedTriggers.push(item);
      }
    });

    // 2. Body Metrics
    const words = currentBody.trim() ? currentBody.trim().split(/\s+/) : [];
    const wordCount = words.length;
    const subjectWords = currentSubject.trim() ? currentSubject.trim().split(/\s+/) : [];
    const subjectWordCount = subjectWords.length;
    const readingTimeSec = Math.max(4, Math.ceil(wordCount / 3.2));

    // 3. Link Count
    const links = (currentBody.match(/https?:\/\/[^\s]+/gi) || []).length;

    // 4. Personalization Tokens
    const personalizationTokens = (currentBody.match(/\{\{[^}]+\}\}/g) || []).length;

    // 5. Spintax Check
    const hasSpintax = /\{[^{}]+\|[^{}]+\}/.test(currentBody) || /\{[^{}]+\|[^{}]+\}/.test(currentSubject);

    // 6. Excessive Capitalization
    const allCapsWords = words.filter(w => w.length >= 4 && w === w.toUpperCase() && /^[A-Z]+$/.test(w));

    // 7. Calculate Deliverability Score (0 - 100)
    let score = 100;
    
    detectedTriggers.forEach(t => {
      score -= t.severity === 'high' ? 14 : 7;
    });

    if (wordCount > 180) score -= 15;
    else if (wordCount > 130) score -= 8;
    else if (wordCount < 25 && wordCount > 0) score -= 8;

    if (links > 1) score -= 12;
    else if (links === 1 && step.stepNumber === 1) score -= 5;

    if (allCapsWords.length > 0) score -= 10;
    if (subjectWordCount > 8) score -= 8;
    if (subjectWordCount === 0) score -= 20;

    if (personalizationTokens >= 2) score += 4;
    if (hasSpintax) score += 4;

    score = Math.max(10, Math.min(100, score));

    return {
      score,
      detectedTriggers,
      wordCount,
      subjectWordCount,
      readingTimeSec,
      links,
      personalizationTokens,
      hasSpintax,
      allCapsWords,
    };
  }, [currentSubject, currentBody, step.stepNumber]);

  // AI 1-Click Spam & Slop Sanitizer
  const handleAiSanitizeCopy = () => {
    let cleanSubject = currentSubject;
    let cleanBody = currentBody;

    SPAM_TRIGGER_WORDS.forEach((item) => {
      const regex = new RegExp(`\\b${item.word.replace('$', '\\$')}\\b`, 'gi');
      cleanSubject = cleanSubject.replace(regex, item.replacement);
      cleanBody = cleanBody.replace(regex, item.replacement);
    });

    cleanSubject = cleanAiSlop(cleanSubject).replace(/\?{2,}/g, '?').replace(/!{2,}/g, '!');
    cleanBody = cleanAiSlop(cleanBody).replace(/\?{2,}/g, '?').replace(/!{2,}/g, '!');

    if (isEditingVariantB) {
      onChange({ ...step, variantBSubject: cleanSubject, variantBBody: cleanBody });
    } else {
      onChange({ ...step, subject: cleanSubject, body: cleanBody });
    }

    success('Sanitized spam words and AI slop into direct, human cold email copy! Deliverability score boosted.', 'Copy Polished');
  };

  // Filtered variables for search
  const filteredVariableGroups = useMemo(() => {
    if (!variableSearch.trim()) return VARIABLE_GROUPS;
    const q = variableSearch.toLowerCase();
    return VARIABLE_GROUPS.map(g => ({
      ...g,
      variables: g.variables.filter(v => v.tag.toLowerCase().includes(q) || v.label.toLowerCase().includes(q) || v.preview.toLowerCase().includes(q))
    })).filter(g => g.variables.length > 0);
  }, [variableSearch]);

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* Hidden File Inputs */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".pdf,.docx,.doc,.csv,.xlsx,.pptx"
        onChange={(e) => handleFileUpload(e, false)} 
      />
      <input 
        type="file" 
        ref={imageInputRef} 
        className="hidden" 
        accept="image/png,image/jpeg,image/gif,image/webp"
        onChange={(e) => handleFileUpload(e, true)} 
      />

      {/* Header Bar with Variant Tabs & Advanced Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-100/80 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-extrabold text-slate-950 dark:text-white text-xs flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-[10px] font-mono">
              #{step.stepNumber}
            </span>
            <span>Step {step.stepNumber} Copy</span>
          </span>

          {/* Variant A / B Switcher */}
          {step.hasVariantB && (
            <div className="flex items-center p-0.5 rounded-xl bg-white dark:bg-[#101010] border border-slate-200 dark:border-[#2C2C2C]">
              <button
                type="button"
                onClick={() => setActiveVariant('A')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  activeVariant === 'A'
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Variant A (50%)
              </button>
              <button
                type="button"
                onClick={() => setActiveVariant('B')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  activeVariant === 'B'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Variant B (50%)
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* A/B Split Toggle Button */}
          <button
            type="button"
            onClick={handleToggleVariantB}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              step.hasVariantB
                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
                : 'bg-white dark:bg-[#1E1E1E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#2A2A2A] hover:border-purple-400'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>{step.hasVariantB ? 'A/B Testing Active' : '+ A/B Split Test'}</span>
          </button>

          {/* Content Settings Drawer Button */}
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 bg-white dark:bg-[#1E1E1E] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors cursor-pointer"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Content Settings</span>
            {showSettings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Advanced Step Content Settings Panel (Collapsible) */}
      {showSettings && (
        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#222222] pb-2">
            <span className="font-extrabold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
              <Settings2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Step {step.stepNumber} Sending & Content Safeguards</span>
            </span>
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
            {/* Thread Reply */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#282828] flex items-center justify-between gap-2">
              <div>
                <strong className="text-slate-900 dark:text-white font-bold block">Thread as Reply</strong>
                <span className="text-slate-400 text-[10px]">Send in the same conversation thread as Step 1</span>
              </div>
              <input
                type="checkbox"
                checked={step.threadReply ?? (step.stepNumber > 1)}
                onChange={(e) => onChange({ ...step, threadReply: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            {/* Unsubscribe Footer Selection */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#282828] space-y-1">
              <label className="text-slate-900 dark:text-white font-bold block">Unsubscribe Footer Policy</label>
              <select
                value={step.unsubscribeOption || 'standard'}
                onChange={(e) => onChange({ ...step, unsubscribeOption: e.target.value as any })}
                className="w-full p-1.5 rounded-lg border border-slate-200 dark:border-[#2C2C2C] bg-white dark:bg-[#101010] text-[11px] text-slate-900 dark:text-white font-medium"
              >
                <option value="standard">Standard (1-Click Safe Opt-out Link)</option>
                <option value="casual">Casual text ("Reply stop if not interested")</option>
                <option value="none">Zero Footer (Strict clean plain text)</option>
              </select>
            </div>

            {/* Signature Policy */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#282828] space-y-1">
              <label className="text-slate-900 dark:text-white font-bold block">Sender Signature</label>
              <select
                value={step.signatureType || 'default'}
                onChange={(e) => onChange({ ...step, signatureType: e.target.value as any })}
                className="w-full p-1.5 rounded-lg border border-slate-200 dark:border-[#2C2C2C] bg-white dark:bg-[#101010] text-[11px] text-slate-900 dark:text-white font-medium"
              >
                <option value="default">Default Outtricks SDR Signature</option>
                <option value="sdr">Sarah Jenkins (VP Growth & Revenue)</option>
                <option value="custom">Custom Dynamic Signature</option>
                <option value="none">None (No automatic signature appended)</option>
              </select>
            </div>

            {/* Deliverability Tracking Toggles */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#282828] flex items-center justify-between gap-2">
              <div>
                <strong className="text-slate-900 dark:text-white font-bold block">Pixel Open Tracking</strong>
                <span className="text-slate-400 text-[10px]">1x1 transparent tracking pixel</span>
              </div>
              <input
                type="checkbox"
                checked={step.trackOpens ?? true}
                onChange={(e) => onChange({ ...step, trackOpens: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Subject Line & Delay Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-3">
          <Input
            label={isEditingVariantB ? "Variant B Subject Line *" : "Subject Line *"}
            placeholder="e.g. Quick question regarding {{company}}'s outbound"
            value={currentSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            required
          />
        </div>

        <div>
          <Input
            label="Wait Days Before Send"
            type="number"
            value={step.delayDays}
            onChange={(e) => onChange({ ...step, delayDays: Number(e.target.value) })}
            min={0}
            max={30}
          />
        </div>
      </div>

      {/* Dynamic Variables Pill Bar & Dropdown Picker ("yeh variable add kerna ka") */}
      <div className="p-2.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#282828] space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap text-[11px]">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-500" />
              <span>Insert Variables:</span>
            </span>

            {/* Quick Quick Variable Chips */}
            {['firstName', 'lastName', 'company', 'title', 'city', 'industry'].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => insertTextAtCursor(`{{${v}}}`)}
                className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#202020] text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold hover:bg-emerald-500/10 hover:border-emerald-500/30 border border-transparent transition-all cursor-pointer"
                title={`Insert {{${v}}}`}
              >
                +{`{{${v}}}`}
              </button>
            ))}

            {/* Open All Variables Modal */}
            <button
              type="button"
              onClick={() => setShowVariableMenu(true)}
              className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] hover:bg-emerald-500/20 transition-colors flex items-center gap-1 cursor-pointer border border-emerald-500/20"
            >
              <span>+ More Variables ({VARIABLE_GROUPS.reduce((acc, g) => acc + g.variables.length, 0)})</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* AI Polish Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAiSanitizeCopy}
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Polish Copy</span>
            </button>
          </div>
        </div>
      </div>

      {/* WYSIWYG Content Formatting Toolbar ("content ko edit kerna ka sara features da") */}
      <div className="border border-slate-200 dark:border-[#2A2A2A] rounded-2xl overflow-hidden bg-white dark:bg-[#141414] shadow-xs">
        {/* The Action Toolbar */}
        <div className="p-2 bg-slate-50 dark:bg-[#1A1A1A] border-b border-slate-200 dark:border-[#262626] flex items-center justify-between gap-1 flex-wrap">
          <div className="flex items-center gap-0.5 flex-wrap">
            {/* Bold */}
            <button
              type="button"
              onClick={() => applyFormatting('**', '**')}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              title="Bold (**text**)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>

            {/* Italic */}
            <button
              type="button"
              onClick={() => applyFormatting('*', '*')}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              title="Italic (*text*)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>

            {/* Underline */}
            <button
              type="button"
              onClick={() => applyFormatting('<u>', '</u>')}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              title="Underline"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>

            {/* Strikethrough */}
            <button
              type="button"
              onClick={() => applyFormatting('~~', '~~')}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              title="Strikethrough"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-slate-300 dark:bg-[#333333] mx-1" />

            {/* Bullet List */}
            <button
              type="button"
              onClick={() => insertTextAtCursor('\n• ')}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              title="Bulleted List"
            >
              <List className="w-3.5 h-3.5" />
            </button>

            {/* Numbered List */}
            <button
              type="button"
              onClick={() => insertTextAtCursor('\n1. ')}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              title="Numbered List"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>

            {/* Quote */}
            <button
              type="button"
              onClick={() => applyFormatting('> ')}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              title="Quote Block"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>

            {/* Code */}
            <button
              type="button"
              onClick={() => applyFormatting('`', '`')}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              title="Inline Code"
            >
              <Code className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-slate-300 dark:bg-[#333333] mx-1" />

            {/* Insert Link Button */}
            <button
              type="button"
              onClick={() => setShowLinkModal(true)}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              title="Insert Hyperlink"
            >
              <Link2 className="w-3.5 h-3.5" />
            </button>

            {/* Insert Image Button ("sfile images") */}
            <button
              type="button"
              onClick={() => setShowImageModal(true)}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              title="Insert Image (Upload or URL)"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>

            {/* Attach File Button ("sfile images") */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              title="Attach Document (PDF, DOCX, Deck)"
            >
              <Paperclip className="w-3.5 h-3.5" />
            </button>

            {/* Spintax Quick Tag */}
            <button
              type="button"
              onClick={() => insertTextAtCursor('{Hi|Hello|Hey}')}
              className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              title="Insert Spintax Variation Block"
            >
              {'{A|B}'}
            </button>

            {/* Emoji Picker */}
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setShowEmojiMenu(!showEmojiMenu)}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#252525] transition-colors cursor-pointer"
                title="Insert Business Emoji"
              >
                <Smile className="w-3.5 h-3.5" />
              </button>

              {showEmojiMenu && (
                <div className="absolute left-0 top-full mt-1 w-44 p-2 bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2C2C2C] rounded-xl shadow-lg z-50 flex items-center gap-1.5 flex-wrap">
                  {EMOJIS.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        insertTextAtCursor(` ${emoji} `);
                        setShowEmojiMenu(false);
                      }}
                      className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-[#252525] flex items-center justify-center text-sm cursor-pointer transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Toolbar: HTML / Preview Mode Switcher */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer border ${
                isPreviewMode
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'bg-white dark:bg-[#121212] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#2C2C2C]'
              }`}
            >
              {isPreviewMode ? <Edit3 className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              <span>{isPreviewMode ? 'Back to Editor' : 'Live Preview'}</span>
            </button>
          </div>
        </div>

        {/* Textarea or Formatted HTML Preview */}
        {isPreviewMode ? (
          <div className="p-4 min-h-[160px] max-h-[320px] overflow-y-auto bg-white dark:bg-[#141414] text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans select-text">
            <div className="border-b border-slate-100 dark:border-[#222222] pb-2 mb-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Rendered Preview (Lead Perspective):</span>
              <strong className="text-slate-900 dark:text-white font-bold text-xs">
                {currentSubject.replace(/\{\{firstName\}\}/gi, 'Sarah').replace(/\{\{company\}\}/gi, 'CloudScale AI')}
              </strong>
            </div>

            <div className="whitespace-pre-wrap">
              {currentBody
                .replace(/\{\{firstName\}\}/gi, 'Sarah')
                .replace(/\{\{lastName\}\}/gi, 'Jenkins')
                .replace(/\{\{company\}\}/gi, 'CloudScale AI')
                .replace(/\{\{title\}\}/gi, 'VP of Growth')
                .replace(/\{\{city\}\}/gi, 'San Francisco')}
            </div>

            {/* Preview Signature */}
            {step.signatureType !== 'none' && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#222222] text-slate-500 text-[11px]">
                <div>--</div>
                <strong>Sarah Jenkins</strong>
                <div className="text-[10px] text-slate-400">VP of Growth & Revenue · Outtricks OS</div>
              </div>
            )}

            {/* Preview Unsubscribe */}
            {step.unsubscribeOption !== 'none' && (
              <div className="mt-4 pt-2 text-[10px] text-slate-400 border-t border-slate-100 dark:border-[#222222]">
                {step.unsubscribeOption === 'casual' ? (
                  <span>If you'd rather not hear from me, let me know and I won't follow up.</span>
                ) : (
                  <span>If you'd like to unsubscribe, <span className="underline text-emerald-500 cursor-pointer">click here</span>.</span>
                )}
              </div>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            rows={7}
            value={currentBody}
            onChange={(e) => handleBodyChange(e.target.value)}
            placeholder="Type your cold email sequence copy here. Use variables like {{firstName}} and formatting tools..."
            className="w-full p-3.5 bg-transparent text-xs text-slate-900 dark:text-white font-sans focus:outline-none leading-relaxed resize-y border-none"
          />
        )}

        {/* ========================================================================= */}
        {/* DEDICATED BOTTOM ACTION & VARIABLE TOOLBAR                                */}
        {/* "es jaga pa bottom ma yeh variable add kerna ka aur content ko edit kerna ka sara features da" */}
        {/* ========================================================================= */}
        <div className="p-3 bg-slate-50/95 dark:bg-[#181818] border-t border-slate-200/80 dark:border-[#262626] space-y-2.5">
          {/* Row 1: Bottom Quick Variable Chips ("yeh variable add kerna ka") */}
          <div className="flex items-center justify-between gap-2 flex-wrap text-[11px]">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-700 dark:text-slate-300 font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                <span>Add Variables:</span>
              </span>

              {['firstName', 'lastName', 'company', 'title', 'city', 'industry', 'ai_icebreaker'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => insertTextAtCursor(`{{${v}}}`)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#202020] text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold hover:bg-emerald-500/15 hover:border-emerald-500/40 border border-slate-200 dark:border-[#2E2E2E] transition-all cursor-pointer shadow-2xs active:scale-95"
                  title={`Insert {{${v}}}`}
                >
                  +{`{{${v}}}`}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setShowVariableMenu(true)}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] hover:bg-emerald-500/20 transition-colors flex items-center gap-1 cursor-pointer border border-emerald-500/30 shadow-2xs"
              >
                <span>+ All Variables ({VARIABLE_GROUPS.reduce((acc, g) => acc + g.variables.length, 0)})</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Quick Content Settings & AI Polish Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer border shadow-2xs ${
                  showSettings
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-white dark:bg-[#1E1E1E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#252525]'
                }`}
                title="Open Content Safeguards, Sender Signature & Unsubscribe settings"
              >
                <Settings2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Content Settings</span>
                {showSettings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <button
                type="button"
                onClick={handleAiSanitizeCopy}
                className="px-3 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 bg-emerald-500 text-white hover:bg-emerald-600 transition-colors cursor-pointer shadow-xs active:scale-95"
                title="AI Polish Copy: Enhances tone and sanitizes spam triggers"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Polish Copy</span>
              </button>
            </div>
          </div>

          {/* Row 2: Bottom Formatting & Media Attachments Toolbar ("content ko edit kerna ka sara features da aur sfile images") */}
          <div className="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-slate-200/60 dark:border-[#222222]">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Quick Tools:</span>

              <button
                type="button"
                onClick={() => applyFormatting('**', '**')}
                className="px-2 py-1 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-[#252525] text-xs font-black transition-colors cursor-pointer"
                title="Bold (**text**)"
              >
                B
              </button>

              <button
                type="button"
                onClick={() => applyFormatting('*', '*')}
                className="px-2 py-1 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-[#252525] text-xs italic font-serif transition-colors cursor-pointer"
                title="Italic (*text*)"
              >
                I
              </button>

              <button
                type="button"
                onClick={() => applyFormatting('<u>', '</u>')}
                className="px-2 py-1 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-[#252525] text-xs underline transition-colors cursor-pointer"
                title="Underline (<u>text</u>)"
              >
                U
              </button>

              <button
                type="button"
                onClick={() => setShowLinkModal(true)}
                className="px-2 py-1 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-[#252525] text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                title="Insert Hyperlink"
              >
                <Link2 className="w-3 h-3 text-blue-500" />
                <span>Link</span>
              </button>

              <button
                type="button"
                onClick={() => insertTextAtCursor('{Hi|Hello|Hey}')}
                className="px-2 py-1 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-[#252525] text-[10px] font-mono font-bold transition-colors cursor-pointer"
                title="Spintax Variation {A|B}"
              >
                {'{A|B}'}
              </button>

              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setShowEmojiMenu(!showEmojiMenu)}
                  className="px-2 py-1 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-[#252525] text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                  title="Emoji"
                >
                  <Smile className="w-3 h-3 text-amber-500" />
                  <span>Emoji</span>
                </button>
              </div>
            </div>

            {/* Media & Documents Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2C2C2C] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs hover:border-blue-400 transition-colors"
                title="Attach Document (PDF, DOCX, Deck, CSV)"
              >
                <Paperclip className="w-3.5 h-3.5 text-blue-500" />
                <span>Attach File</span>
              </button>

              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2C2C2C] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs hover:border-purple-400 transition-colors"
                title="Insert Image (Upload PNG/JPG or Web URL)"
              >
                <ImageIcon className="w-3.5 h-3.5 text-purple-500" />
                <span>Insert Image</span>
              </button>
            </div>
          </div>
        </div>

        {/* Attached Documents & Images Tray ("sfile images") */}
        {attachments.length > 0 && (
          <div className="p-2.5 bg-slate-50/80 dark:bg-[#181818] border-t border-slate-200/80 dark:border-[#242424] space-y-1.5">
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Attached Files & Images ({attachments.length}):</span>
              <span className="text-amber-500 text-[9px] font-mono">Tip: Attachments in Step 1 can lower deliverability</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {attachments.map((att) => (
                <div 
                  key={att.id}
                  className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#1F1F1F] border border-slate-200 dark:border-[#2A2A2A] flex items-center gap-2 text-[11px] shadow-2xs"
                >
                  {att.isImage ? (
                    <ImageIcon className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  )}
                  
                  <span className="font-bold text-slate-800 dark:text-slate-200 max-w-[140px] truncate">
                    {att.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">({att.size})</span>

                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(att.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                    title="Remove attachment"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Editor Bottom Status Bar: Word Count & Metrics */}
        <div className="px-3 py-1.5 bg-slate-50 dark:bg-[#121212] border-t border-slate-200/60 dark:border-[#222222] flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span>
              Words: <strong className="text-slate-900 dark:text-white">{deliverabilityAnalysis.wordCount}</strong>
              <span className="text-slate-400 font-mono ml-1">
                {deliverabilityAnalysis.wordCount >= 50 && deliverabilityAnalysis.wordCount <= 125 
                  ? '✓ Optimal range (50-125w)' 
                  : deliverabilityAnalysis.wordCount > 125 ? '⚠ Long (>125w)' : '(Aim for 50-125w)'}
              </span>
            </span>

            <span>
              Reading time: <strong className="text-slate-900 dark:text-white">~{deliverabilityAnalysis.readingTimeSec}s</strong>
            </span>

            <span>
              Personalized tokens: <strong className="text-emerald-500 font-mono">{deliverabilityAnalysis.personalizationTokens}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>Links: <strong className={deliverabilityAnalysis.links > 1 ? 'text-amber-500' : 'text-slate-900 dark:text-white'}>{deliverabilityAnalysis.links}</strong></span>
            {deliverabilityAnalysis.hasSpintax && (
              <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                <Check className="w-3 h-3" /> Spintax Active
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ADVANCED REAL-TIME SPAM WORD & DELIVERABILITY ENGINE (INSTANTLY STYLE)     */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#151515] border border-slate-200 dark:border-[#282828] shadow-xs space-y-3">
        {/* Deliverability Gauge Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-[#242424] pb-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              deliverabilityAnalysis.score >= 90
                ? 'bg-emerald-500/15 text-emerald-500'
                : deliverabilityAnalysis.score >= 70
                ? 'bg-amber-500/15 text-amber-500'
                : 'bg-red-500/15 text-red-500'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-slate-950 dark:text-white text-xs flex items-center gap-2">
                <span>Real-Time AI Spam & Deliverability Engine</span>
                <Badge variant={deliverabilityAnalysis.score >= 90 ? 'emerald' : deliverabilityAnalysis.score >= 70 ? 'amber' : 'rose'} size="sm">
                  {deliverabilityAnalysis.score >= 90 ? 'INBOX READY' : deliverabilityAnalysis.score >= 70 ? 'MODERATE RISK' : 'SPAM RISK'}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Continuous ESP sandbox emulation (Google Workspace, Office 365, Postfix filters).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Score Display */}
            <div className="text-right">
              <div className="text-lg font-black font-mono leading-none tracking-tight text-slate-900 dark:text-white">
                <span className={
                  deliverabilityAnalysis.score >= 90
                    ? 'text-emerald-500'
                    : deliverabilityAnalysis.score >= 70
                    ? 'text-amber-500'
                    : 'text-red-500'
                }>
                  {deliverabilityAnalysis.score}
                </span>
                <span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Deliverability Score</span>
            </div>

            {/* AI Clean Trigger Words Button */}
            {deliverabilityAnalysis.detectedTriggers.length > 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleAiSanitizeCopy}
                leftIcon={<Wand2 className="w-3.5 h-3.5" />}
              >
                Clean Words ({deliverabilityAnalysis.detectedTriggers.length})
              </Button>
            )}
          </div>
        </div>

        {/* Detected Spam Trigger Words Chips & Replacements */}
        {deliverabilityAnalysis.detectedTriggers.length > 0 ? (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Detected {deliverabilityAnalysis.detectedTriggers.length} Spam Words in copy:</span>
              </span>
              <span className="text-slate-500 text-[10px]">Click synonym to replace</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {deliverabilityAnalysis.detectedTriggers.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const regex = new RegExp(`\\b${item.word.replace('$', '\\$')}\\b`, 'gi');
                    handleSubjectChange(currentSubject.replace(regex, item.replacement));
                    handleBodyChange(currentBody.replace(regex, item.replacement));
                    success(`Replaced "${item.word}" with "${item.replacement}"`);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E1E1E] border border-amber-500/30 text-[11px] flex items-center gap-1.5 hover:border-amber-500 transition-colors cursor-pointer group shadow-2xs"
                >
                  <span className="line-through text-red-500 font-bold font-mono text-[10px]">"{item.word}"</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[10px] group-hover:underline">
                    "{item.replacement}"
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>✓ 0 spam triggers detected. Safe for primary inbox delivery across Google Workspace & O365.</span>
          </div>
        )}

        {/* Deliverability Multi-Point Inspection Grid (Instantly & Lemlist Style) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
          {/* 1. Subject Quality */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/70 dark:border-[#262626]">
            <div className="text-slate-400 text-[10px] font-bold uppercase">Subject Line</div>
            <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {deliverabilityAnalysis.subjectWordCount} words
            </div>
            <div className="text-[10px] text-slate-400">
              {deliverabilityAnalysis.subjectWordCount >= 2 && deliverabilityAnalysis.subjectWordCount <= 6 
                ? '✓ Ideal (2-6 words)' 
                : 'Aim for 2-6 words'}
            </div>
          </div>

          {/* 2. Body Length */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/70 dark:border-[#262626]">
            <div className="text-slate-400 text-[10px] font-bold uppercase">Email Length</div>
            <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {deliverabilityAnalysis.wordCount} words
            </div>
            <div className="text-[10px] text-slate-400">
              {deliverabilityAnalysis.wordCount <= 125 ? '✓ Quick to read' : 'Too long (>125w)'}
            </div>
          </div>

          {/* 3. Link Count */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/70 dark:border-[#262626]">
            <div className="text-slate-400 text-[10px] font-bold uppercase">Link Density</div>
            <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {deliverabilityAnalysis.links} links
            </div>
            <div className="text-[10px] text-slate-400">
              {deliverabilityAnalysis.links <= 1 ? '✓ High deliverability' : 'Avoid > 1 link'}
            </div>
          </div>

          {/* 4. Personalization */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/70 dark:border-[#262626]">
            <div className="text-slate-400 text-[10px] font-bold uppercase">Personalization</div>
            <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {deliverabilityAnalysis.personalizationTokens} tags
            </div>
            <div className="text-[10px] text-slate-400">
              {deliverabilityAnalysis.personalizationTokens >= 2 ? '✓ High engagement' : 'Add {{company}}'}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: HYPERLINK INSERTER                                                 */}
      {/* ========================================================================= */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] rounded-2xl p-4 max-w-md w-full shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#242424] pb-2">
              <span className="font-extrabold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-emerald-500" />
                <span>Insert Hyperlink</span>
              </span>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInsertLinkSubmit} className="space-y-3">
              <Input
                label="Anchor Text"
                placeholder="e.g. Schedule a 10-min chat"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />

              <Input
                label="Destination URL *"
                placeholder="https://cal.com/sarah-jenkins"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                required
                autoFocus
              />

              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Cold email best practice: Avoid raw IP links or URL shorteners (bit.ly). Use your branded custom domain.</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <Button variant="secondary" size="sm" onClick={() => setShowLinkModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Insert Link
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: IMAGE INSERTER ("sfile images")                                     */}
      {/* ========================================================================= */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] rounded-2xl p-4 max-w-md w-full shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#242424] pb-2">
              <span className="font-extrabold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-purple-500" />
                <span>Insert Image</span>
              </span>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Option 1: Local Device Upload */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414] border border-dashed border-slate-300 dark:border-[#2C2C2C] text-center space-y-2">
                <ImageIcon className="w-6 h-6 text-slate-400 mx-auto" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">Upload from Device</div>
                  <div className="text-[10px] text-slate-400">PNG, JPG, GIF up to 2MB</div>
                </div>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  onClick={() => {
                    setShowImageModal(false);
                    imageInputRef.current?.click();
                  }}
                >
                  Browse Image
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-full h-px bg-slate-200 dark:bg-[#282828]" />
                <span className="text-[10px] text-slate-400 uppercase font-bold">OR</span>
                <span className="w-full h-px bg-slate-200 dark:bg-[#282828]" />
              </div>

              {/* Option 2: Image Web URL */}
              <form onSubmit={handleInsertImageUrlSubmit} className="space-y-2">
                <Input
                  label="Image Web URL"
                  placeholder="https://cdn.example.com/screenshot.png"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Input
                  label="Alt Text / Description"
                  placeholder="Platform Performance Chart"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                />

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button variant="secondary" size="sm" onClick={() => setShowImageModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    Insert Image
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DYNAMIC MERGE VARIABLES & SPINTAX                                  */}
      {/* ========================================================================= */}
      {showVariableMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-5 max-w-lg w-full shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#242424] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Dynamic Merge Variables</h4>
                  <p className="text-[11px] text-slate-400">Click any variable to insert directly at your cursor</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowVariableMenu(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search variables (e.g. company, city, first name)..."
              value={variableSearch}
              onChange={(e) => setVariableSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#121212] text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
              autoFocus
            />

            {/* Variable Groups Container */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 max-h-[46vh]">
              {filteredVariableGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1.5">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    {group.category}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {group.variables.map((item, vIdx) => (
                      <button
                        key={vIdx}
                        type="button"
                        onClick={() => {
                          insertTextAtCursor(`{{${item.tag}}}`);
                          setShowVariableMenu(false);
                          success(`Inserted {{${item.tag}}}`);
                        }}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-[#202020] hover:bg-emerald-500/15 hover:border-emerald-500/40 border border-transparent text-left transition-all cursor-pointer group shadow-2xs"
                      >
                        <div className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-xs group-hover:text-emerald-500">
                          {`{{${item.tag}}}`}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">{item.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Variable Creator Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-[#242424] space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Custom Variable</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. custom_icebreaker or specific_tag"
                  value={customVarName}
                  onChange={(e) => setCustomVarName(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2C2C2C] bg-slate-50 dark:bg-[#101010] text-xs font-mono text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                />
                <Button size="sm" variant="primary" onClick={handleInsertCustomVariable}>
                  Insert
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SequenceStepEditor;
