import React, { useState } from 'react';
import { 
  Sparkles, 
  Save, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Zap, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Select } from '../ui/Select';
import { useSettings } from '../../context/SettingsContext';

export const SettingsAiAssistantView: React.FC = () => {
  const { aiSettings, updateAiSettings } = useSettings();
  const [formData, setFormData] = useState({ ...aiSettings });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAiSettings(formData);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            AI Assistant & Generative Intelligence Settings
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Configure underlying foundation LLM models, outbound sales copywriting tone, RAG vector context depth, and tool execution boundaries.
        </p>
      </div>

      {/* 2. Token Quota & Consumption */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 font-mono">
            Monthly Generative Token Usage
          </div>
          <div className="text-2xl font-black text-slate-950 dark:text-white font-mono">
            {formData.tokensUsedThisMonth.toLocaleString()} / 2,000,000 Tokens
          </div>
          <p className="text-slate-500 text-[11px]">
            Claude 3.5 Sonnet and GPT-4o hybrid inference pool. Resetting on September 1.
          </p>
        </div>

        <Badge variant="emerald" size="sm">71% Quota Consumed</Badge>
      </div>

      {/* 3. AI Configurations Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl text-xs">
          
          {/* Model Selector & Tone */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              Foundation LLM & Copywriting Persona
            </h3>

            <Select
              label="Primary Foundation Model"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              options={[
                { value: 'Claude 3.5 Sonnet / GPT-4o Hybrid', label: 'Claude 3.5 Sonnet / GPT-4o Hybrid (Recommended for Sales)' },
                { value: 'Claude 3.5 Sonnet (Direct)', label: 'Anthropic Claude 3.5 Sonnet (Direct)' },
                { value: 'OpenAI GPT-4o', label: 'OpenAI GPT-4o' },
                { value: 'Gemini 1.5 Pro', label: 'Google Gemini 1.5 Pro (2M Context)' },
                { value: 'DeepSeek R1', label: 'DeepSeek R1 (Deep Context Reasoning)' },
              ]}
            />

            <Select
              label="Outbound Tone & Style"
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              options={[
                { value: 'Authoritative & Data-Driven (B2B SaaS / Enterprise)', label: 'Authoritative & Data-Driven (B2B SaaS / Enterprise)' },
                { value: 'Casual & Consultative (Founder-to-Founder)', label: 'Casual & Consultative (Founder-to-Founder)' },
                { value: 'Direct & Concise (Short < 75 words)', label: 'Direct & Concise (Short < 75 words)' },
                { value: 'Storytelling & Value-Led', label: 'Storytelling & Value-Led' },
              ]}
            />
          </div>

          {/* Context Settings & Vector RAG */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-[#202020]">
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              Context Retrieval Depth (RAG)
            </h3>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Maximum Historical Touchpoints Included:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{formData.contextDepth} Touchpoints</span>
              </label>
              <input
                type="range"
                min="3"
                max="30"
                step="1"
                value={formData.contextDepth}
                onChange={(e) => setFormData({ ...formData, contextDepth: parseInt(e.target.value, 10) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">
                Higher depth injects past email replies, CRM note history, and website scrape signals.
              </span>
            </div>
          </div>

          {/* Knowledge Sources Checkboxes */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-[#202020]">
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              Active Knowledge Sources
            </h3>

            <div className="space-y-2">
              {[
                { id: 'crm', label: 'CRM Deals & Contact Notes', desc: 'Sync historical objection handling and win/loss notes', checked: formData.sources.crm },
                { id: 'docs', label: 'Company Case Studies & Collateral', desc: 'Ground claims with real customer metrics and whitepapers', checked: formData.sources.docs },
                { id: 'pastEmails', label: 'Top Converting Email Threads', desc: 'Replicate phrasing from highest-performing sales reps', checked: formData.sources.pastEmails },
                { id: 'kb', label: 'Product Knowledge Base & FAQ', desc: 'Technical specifications and pricing answers', checked: formData.sources.kb },
              ].map((src) => (
                <label
                  key={src.id}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-slate-900/40 flex items-start gap-3 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={src.checked}
                    onChange={(e) => setFormData({
                      ...formData,
                      sources: { ...formData.sources, [src.id]: e.target.checked }
                    })}
                    className="mt-0.5 rounded-sm text-emerald-600 accent-emerald-500 focus:ring-emerald-500"
                  />
                  <div>
                    <strong className="text-slate-900 dark:text-white block text-xs">{src.label}</strong>
                    <span className="text-[11px] text-slate-500">{src.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setFormData({ ...aiSettings })}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-3.5 h-3.5" />}
            >
              Save AI Settings
            </Button>
          </div>

        </form>
      </div>

    </div>
  );
};
