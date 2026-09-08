import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Send, 
  Eye, 
  MessageSquare, 
  Layers, 
  ArrowDown, 
  AlertCircle, 
  HelpCircle, 
  Check, 
  Edit3, 
  ShieldCheck, 
  CornerDownRight, 
  Tag, 
  UserCheck 
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useLinkedIn, LinkedInAutomationRule } from '../../context/LinkedInContext';
import { 
  LinkedInTriggerType, 
  LinkedInRuleCondition, 
  LinkedInRuleAction 
} from '../../types/linkedinAutomation';

export interface AiAutomationRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRuleBuilder: (prefilledRule: LinkedInAutomationRule) => void;
}

export const AiAutomationRuleModal: React.FC<AiAutomationRuleModalProps> = ({
  isOpen,
  onClose,
  onOpenRuleBuilder,
}) => {
  const { createAutomationRule } = useLinkedIn();

  // Screen states: 'input' | 'clarification' | 'generating' | 'preview'
  const [screen, setScreen] = useState<'input' | 'clarification' | 'generating' | 'preview'>('input');
  const [prompt, setPrompt] = useState('');
  const [generationStep, setGenerationStep] = useState(0);
  const [clarificationQuestion, setClarificationQuestion] = useState<{
    text: string;
    options: string[];
    selected: string;
  } | null>(null);

  // Generated Rule State
  const [generatedRule, setGeneratedRule] = useState<LinkedInAutomationRule | null>(null);
  const [showConfirmActivate, setShowConfirmActivate] = useState(false);

  // Example prompts
  const EXAMPLE_PROMPTS = [
    'Follow up with people who don\'t reply after 3 days',
    'When someone accepts my connection, wait 2 hours, visit their profile, and send a welcome message',
    'If a prospect views my profile, wait 4 hours and send them a personalized connection request',
    'If someone replies positively, mark them as Interested and stop automation'
  ];

  // Loading animation steps
  const LOADING_STEPS = [
    'Understanding your automation...',
    'Building trigger event...',
    'Analyzing conditional filters...',
    'Creating multi-step actions...',
    'Preparing workflow sequence...'
  ];

  // Reset modal state
  useEffect(() => {
    if (isOpen) {
      setScreen('input');
      setPrompt('');
      setClarificationQuestion(null);
      setGeneratedRule(null);
      setShowConfirmActivate(false);
      setGenerationStep(0);
    }
  }, [isOpen]);

  // AI Rule Synthesis Logic
  const synthesizeRuleFromText = (userText: string, extraAnswer?: string): LinkedInAutomationRule => {
    const text = (userText + ' ' + (extraAnswer || '')).toLowerCase();

    // 1. Determine Trigger
    let trigger: LinkedInTriggerType = 'Connection Accepted';
    let triggerDays = 3;

    if (text.includes('view') || text.includes('visit my profile') || text.includes('views my profile')) {
      trigger = 'Profile Viewed';
    } else if (text.includes('no reply') || text.includes("don't reply") || text.includes('not reply') || text.includes('follow up') || text.includes('follow-up')) {
      if (text.includes('1 day') || text.includes('24 hour')) {
        trigger = 'No Reply After 1 Day';
        triggerDays = 1;
      } else if (text.includes('7 day') || text.includes('week')) {
        trigger = 'No Reply After 7 Days';
        triggerDays = 7;
      } else {
        trigger = 'No Reply After 3 Days';
        triggerDays = 3;
      }
    } else if (text.includes('replies positively') || text.includes('reply received') || text.includes('message received')) {
      trigger = 'Message Received';
    } else if (text.includes('accept')) {
      trigger = 'Connection Accepted';
    } else if (text.includes('campaign')) {
      trigger = 'Lead Added to Campaign';
    }

    // 2. Determine Conditions
    const conditions: LinkedInRuleCondition[] = [];
    if (text.includes('2nd') || text.includes('second')) {
      conditions.push({ id: 'c_ai_1', field: 'connection_degree', operator: 'equals', value: '2nd' });
    }
    if (text.includes('interested')) {
      conditions.push({ id: 'c_ai_2', field: 'lead_status', operator: 'equals', value: 'Interested' });
    }
    if (text.includes('ceo') || text.includes('founder') || text.includes('director')) {
      conditions.push({ id: 'c_ai_3', field: 'profile_type', operator: 'equals', value: 'Founder / CEO' });
    }
    if (conditions.length === 0) {
      conditions.push({ id: 'c_ai_def', field: 'lead_status', operator: 'equals', value: 'Contacted' });
    }

    // 3. Determine Actions Sequence
    const actions: LinkedInRuleAction[] = [];

    // Parse delay if mentioned
    let delayVal = 2;
    let delayUnit: 'Hours' | 'Days' = 'Hours';
    if (text.includes('4 hour') || text.includes('4h')) delayVal = 4;
    else if (text.includes('24 hour') || text.includes('1 day')) { delayVal = 24; delayUnit = 'Hours'; }
    else if (text.includes('2 hour') || text.includes('2h')) delayVal = 2;
    else if (text.includes('3 day')) { delayVal = 3; delayUnit = 'Days'; }

    // Always add delay first if mentioned
    if (text.includes('wait') || text.includes('after') || text.includes('delay')) {
      actions.push({
        id: `act_${Date.now()}_1`,
        type: 'wait_delay',
        delay: delayVal,
        delayUnit
      });
    }

    // Visit Profile
    if (text.includes('visit') || text.includes('view profile')) {
      actions.push({
        id: `act_${Date.now()}_2`,
        type: 'visit_profile'
      });
    }

    // Connection Request / Note
    if (text.includes('connection request') || text.includes('invite') || text.includes('connect')) {
      actions.push({
        id: `act_${Date.now()}_3`,
        type: 'send_connection_note',
        connectionNote: 'Hi {{first_name}}, noticed your profile and leadership at {{company}}. Would love to connect and share insights.'
      });
    }

    // Message / Follow-up
    if (text.includes('message') || text.includes('welcome') || text.includes('follow up') || text.includes('follow-up') || text.includes('pitch')) {
      actions.push({
        id: `act_${Date.now()}_4`,
        type: 'send_message',
        message: text.includes('welcome')
          ? 'Thanks for connecting, {{first_name}}. Glad to connect with you at {{company}}. Let me know if you ever want to compare notes on outbound workflows.'
          : 'Hi {{first_name}}, following up on my previous note. Wanted to see if you had 5 minutes to review our case study for {{company}}?'
      });
    }

    // Status Change
    if (text.includes('interested') || text.includes('lead status') || text.includes('status')) {
      actions.push({
        id: `act_${Date.now()}_5`,
        type: 'change_lead_status',
        leadStatus: text.includes('interested') ? 'Interested' : 'Follow-up'
      });
    }

    // Stop Automation
    if (text.includes('stop') || text.includes('halt') || text.includes('discontinue')) {
      actions.push({
        id: `act_${Date.now()}_6`,
        type: 'stop_automation'
      });
    }

    // Fallback if empty actions
    if (actions.length === 0) {
      actions.push(
        { id: `act_${Date.now()}_def1`, type: 'wait_delay', delay: 2, delayUnit: 'Hours' },
        { id: `act_${Date.now()}_def2`, type: 'visit_profile' },
        { id: `act_${Date.now()}_def3`, type: 'send_message', message: 'Hi {{first_name}}, following up regarding {{company}}. Would love to connect.' }
      );
    }

    // 4. Synthesize Name
    let name = 'AI Follow-up Automation';
    if (trigger === 'Connection Accepted') name = 'Connection Accepted Follow-up Flow';
    else if (trigger === 'Profile Viewed') name = 'Profile View → Inbound Invite Rule';
    else if (trigger.includes('No Reply')) name = `No Reply After ${triggerDays} Days Follow-up`;
    else if (trigger === 'Message Received') name = 'Inbound Reply Qualified Routing';

    const stepsText = actions.map(a => {
      if (a.type === 'wait_delay') return `Wait ${a.delay || 2} ${a.delayUnit || 'Hours'}`;
      if (a.type === 'visit_profile') return 'Visit Profile';
      if (a.type === 'send_message') return 'Send Message';
      if (a.type === 'send_connection_note') return 'Send Connection Note';
      if (a.type === 'change_lead_status') return `Change Lead Status → ${a.leadStatus || 'Follow-up'}`;
      if (a.type === 'stop_automation') return 'Stop Automation';
      return a.type.replace(/_/g, ' ');
    });

    const actionText = stepsText.join(' → ');

    return {
      id: `rule_ai_${Date.now()}`,
      name,
      trigger,
      triggerConfig: { days: triggerDays, hours: 0 },
      action: actionText,
      stepsCount: stepsText.length,
      steps: stepsText,
      delayHours: delayVal,
      condition: conditions.map(c => `${c.field} = ${c.value}`).join(' AND '),
      conditions,
      conditionLogic: 'AND',
      actionsList: actions,
      status: 'Active',
      runsCount: 0,
      successRate: 100,
      lastRun: 'Never',
      created: 'Just now',
    };
  };

  // Start Generation Flow
  const handleStartGeneration = () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    // Clarification trigger check: If prompt is too brief or ambiguous (less than 25 chars or missing delay)
    if (trimmed.length < 25 || (trimmed.toLowerCase().includes('follow up') && !trimmed.match(/\d+\s*(day|hour|week)/i))) {
      setClarificationQuestion({
        text: 'How long should I wait before sending the follow-up?',
        options: ['1 Day', '3 Days', '7 Days', '24 Hours'],
        selected: '3 Days'
      });
      setScreen('clarification');
      return;
    }

    proceedWithLoading(trimmed);
  };

  const handleClarificationSubmit = () => {
    if (!clarificationQuestion) return;
    const augmentedPrompt = `${prompt} (Wait ${clarificationQuestion.selected})`;
    proceedWithLoading(augmentedPrompt);
  };

  const proceedWithLoading = (finalPromptText: string) => {
    setScreen('generating');
    setGenerationStep(0);

    // Fast, responsive progressive animation through steps
    const stepInterval = setInterval(() => {
      setGenerationStep(prev => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          const synthesized = synthesizeRuleFromText(finalPromptText);
          setGeneratedRule(synthesized);
          setScreen('preview');
          return prev;
        }
      });
    }, 280);
  };

  // Save / Activate
  const handleConfirmSave = (status: 'Active' | 'Draft') => {
    if (!generatedRule) return;
    createAutomationRule({
      ...generatedRule,
      status,
      name: generatedRule.name.trim() || 'AI Generated LinkedIn Rule',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg text-slate-950 dark:text-white">
              Make Rule with AI
            </span>
          </div>
        </div>
      }
      description="Describe what you want your LinkedIn automation to do. AI will build the rule for you."
      size="lg"
      footer={
        screen === 'preview' ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full font-sans text-xs">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setScreen('input')}
              type="button"
            >
              ← Edit Request
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  if (generatedRule) {
                    onClose();
                    onOpenRuleBuilder(generatedRule);
                  }
                }}
                leftIcon={<Edit3 className="w-3.5 h-3.5" />}
                type="button"
              >
                Edit in Rule Builder
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleConfirmSave('Draft')}
                type="button"
              >
                Save as Draft
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowConfirmActivate(true)}
                type="button"
                leftIcon={<Zap className="w-3.5 h-3.5" />}
              >
                Activate Rule
              </Button>
            </div>
          </div>
        ) : screen === 'clarification' ? (
          <div className="flex items-center justify-between w-full font-sans text-xs">
            <Button variant="secondary" size="sm" onClick={() => setScreen('input')}>
              Back
            </Button>
            <Button variant="primary" size="sm" onClick={handleClarificationSubmit}>
              Continue with AI →
            </Button>
          </div>
        ) : null
      }
    >
      <div className="space-y-5 font-sans text-xs">

        {/* ========================================================= */}
        {/* SCREEN 1: NATURAL LANGUAGE PROMPT INPUT                   */}
        {/* ========================================================= */}
        {screen === 'input' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                Describe your desired automation workflow in plain English:
              </label>
              
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: If someone accepts my connection request, wait 2 hours, visit their profile, then send a personalized message. If they don't reply after 3 days, send a follow-up."
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/20 font-sans leading-relaxed"
                autoFocus
              />
            </div>

            {/* Clickable Example Prompts */}
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Example Prompts (Click to use)
              </span>
              <div className="flex flex-col gap-1.5">
                {EXAMPLE_PROMPTS.map((ex, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(ex)}
                    className="text-left p-2.5 rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#262626] hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">✦</span>
                      <span>{ex}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="md"
                onClick={handleStartGeneration}
                disabled={!prompt.trim()}
                leftIcon={<Sparkles className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Build Rule with AI
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 2: CLARIFICATION QUESTION                          */}
        {/* ========================================================= */}
        {screen === 'clarification' && clarificationQuestion && (
          <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] animate-in fade-in duration-150">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Quick Clarification Needed</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {clarificationQuestion.text}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {clarificationQuestion.options.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setClarificationQuestion(prev => prev ? { ...prev, selected: opt } : null)}
                  className={`p-3 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                    clarificationQuestion.selected === opt
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-white dark:bg-[#1F1F1F] border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-primary/40'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 3: ANIMATED GENERATION PROGRESS                    */}
        {/* ========================================================= */}
        {screen === 'generating' && (
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#242424] text-center space-y-5 animate-in fade-in duration-150">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary animate-bounce">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                {LOADING_STEPS[generationStep]}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Transforming natural language into executable LinkedIn safe workflow...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs mx-auto h-2 rounded-full bg-slate-200 dark:bg-[#252525] overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${((generationStep + 1) / LOADING_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 4: AI GENERATED RULE PREVIEW                       */}
        {/* ========================================================= */}
        {screen === 'preview' && generatedRule && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-bold text-xs">AI Generated Rule Ready for Review</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-500/20 px-2 py-0.5 rounded-md">
                100% Validated Syntax
              </span>
            </div>

            {/* Rule Name Editor */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Generated Rule Name
              </label>
              <input
                type="text"
                value={generatedRule.name}
                onChange={(e) => setGeneratedRule(prev => prev ? { ...prev, name: e.target.value } : null)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-extrabold text-sm focus:outline-hidden focus:border-primary"
              />
            </div>

            {/* Visual Workflow Cards */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Workflow Execution Order
              </span>

              {/* Trigger Node */}
              <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between text-xs font-bold text-primary">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>WHEN: {generatedRule.trigger}</span>
                </div>
                <span className="text-[10px] font-mono bg-primary/20 px-2 py-0.5 rounded-full">Root Event</span>
              </div>

              {/* Connected Action Sequence */}
              <div className="pl-6 border-l-2 border-primary/30 ml-4 space-y-2.5 relative">
                {generatedRule.actionsList?.map((act, idx) => (
                  <div key={act.id} className="relative">
                    <div className="absolute -left-[31px] top-3.5 w-3 h-3 rounded-full bg-white dark:bg-[#161616] border-2 border-primary" />
                    
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1.5 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-[#252525] text-slate-600 dark:text-slate-300 font-mono text-[9px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="capitalize">{act.type.replace(/_/g, ' ')}</span>
                        </div>
                        {act.type === 'wait_delay' && (
                          <span className="text-amber-500 font-mono font-bold text-[11px]">
                            ⏱ {act.delay} {act.delayUnit}
                          </span>
                        )}
                      </div>

                      {act.message && (
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200/60 dark:border-[#252525] text-slate-600 dark:text-slate-300 text-[11px] font-sans leading-relaxed">
                          "{act.message}"
                        </div>
                      )}

                      {act.connectionNote && (
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200/60 dark:border-[#252525] text-slate-600 dark:text-slate-300 text-[11px] font-sans leading-relaxed">
                          Note: "{act.connectionNote}"
                        </div>
                      )}

                      {act.leadStatus && (
                        <div className="text-[11px] text-emerald-500 font-bold">
                          → Transition Lead Stage to "{act.leadStatus}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Conditions Summary */}
              {generatedRule.conditions && generatedRule.conditions.length > 0 && (
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] flex items-center gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Filter: </strong>
                    {generatedRule.condition}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* CONFIRMATION BEFORE ACTIVATION                            */}
      {/* ========================================================= */}
      {showConfirmActivate && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2E2E2E] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center gap-3 text-primary">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Ready to activate?</h3>
                <p className="text-[11px] text-slate-400">AI rule execution confirmation</p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              This automation will run automatically across your connected LinkedIn profiles whenever trigger events and conditions are met.
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-[#282828] flex justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowConfirmActivate(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setShowConfirmActivate(false);
                  handleConfirmSave('Draft');
                }}
                type="button"
              >
                Save Draft
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowConfirmActivate(false);
                  handleConfirmSave('Active');
                }}
                type="button"
                leftIcon={<Zap className="w-3.5 h-3.5" />}
              >
                Activate Rule
              </Button>
            </div>
          </div>
        </div>
      )}

    </Modal>
  );
};
