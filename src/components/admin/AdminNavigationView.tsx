import React from 'react';
import { 
  Menu, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin, AdminModuleConfig } from '../../context/AdminContext';

export const AdminNavigationView: React.FC = () => {
  const { modules, reorderModules, toggleModuleEnabled } = useAdmin();

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...modules];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    reorderModules(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index === modules.length - 1) return;
    const newItems = [...modules];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    reorderModules(newItems);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Menu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Main Sidebar Navigation Architecture & Sequence
            </h2>
            <Badge variant="blue" size="sm">Live Navigation Engine</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Reorder primary sidebar icons, configure role-based item visibility, and manage sub-sidebar linking.
          </p>
        </div>
      </div>

      {/* 2. Navigation Items List */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden text-xs">
        <div className="divide-y divide-slate-100 dark:divide-white/[0.04]">
          {modules.map((mod, index) => (
            <div
              key={mod.id}
              className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-6 text-center font-mono font-bold text-slate-400">
                  #{index + 1}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 dark:text-white text-xs">{mod.name}</strong>
                    <Badge variant={mod.enabled ? 'emerald' : 'slate'} size="sm">
                      {mod.enabled ? 'Visible' : 'Hidden'}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-slate-400 truncate block">{mod.description}</span>
                </div>
              </div>

              {/* Order buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={index === 0}
                  onClick={() => handleMoveUp(index)}
                  className="p-1.5 h-7 w-7"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  disabled={index === modules.length - 1}
                  onClick={() => handleMoveDown(index)}
                  className="p-1.5 h-7 w-7"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </Button>

                {mod.id !== 'admin' && mod.id !== 'settings' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleModuleEnabled(mod.id)}
                    className="p-1.5 h-7 w-7 text-slate-500"
                    title={mod.enabled ? 'Hide from navigation' : 'Show in navigation'}
                  >
                    {mod.enabled ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-blue-500" />}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
