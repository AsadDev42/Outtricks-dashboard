import React from 'react';
import { Modal } from '../ui/Modal';
import { Keyboard, Command, CornerDownLeft } from 'lucide-react';

export interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
  category: 'Navigation' | 'Actions' | 'General';
}

const SHORTCUTS: ShortcutItem[] = [
  { keys: ['j', '↓'], description: 'Select next conversation thread', category: 'Navigation' },
  { keys: ['k', '↑'], description: 'Select previous conversation thread', category: 'Navigation' },
  { keys: ['r'], description: 'Focus quick reply composer', category: 'Actions' },
  { keys: ['e'], description: 'Mark thread as read / archive', category: 'Actions' },
  { keys: ['s'], description: 'Toggle star / interested status', category: 'Actions' },
  { keys: ['?'], description: 'Open this keyboard shortcuts cheat-sheet', category: 'General' },
  { keys: ['Esc'], description: 'Close active modal or panel', category: 'General' },
];

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const categories: ('Navigation' | 'Actions' | 'General')[] = ['Navigation', 'Actions', 'General'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Master Inbox Keyboard Shortcuts"
      description="Navigate high-volume conversations and triage leads with speed."
      size="md"
    >
      <div className="space-y-5 font-sans py-1">
        {categories.map((cat) => {
          const items = SHORTCUTS.filter((s) => s.category === cat);
          return (
            <div key={cat} className="space-y-2">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {cat}
              </div>
              <div className="divide-y divide-slate-100 dark:divide-[#222222] rounded-2xl border border-slate-200/80 dark:border-[#222222] bg-slate-50/50 dark:bg-[#161616] overflow-hidden">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3.5 py-2.5 text-xs"
                  >
                    <span className="text-slate-700 dark:text-slate-200 font-medium">
                      {item.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((k) => (
                        <kbd
                          key={k}
                          className="min-w-[24px] h-6 px-1.5 rounded-md bg-white dark:bg-[#202020] border border-slate-200 dark:border-[#333333] shadow-xs text-center font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="pt-2 text-[11px] text-slate-400 dark:text-slate-500 text-center font-medium">
          Shortcuts are active when you are not typing into an input field or text editor.
        </div>
      </div>
    </Modal>
  );
};
