import React from 'react';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const AdminAccessDenied: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400 mx-auto shadow-lg shadow-rose-500/10">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-[11px] font-bold text-rose-600 dark:text-rose-400">
            <Lock className="w-3 h-3" />
            <span>Restricted Governance Area</span>
          </div>

          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
            Access Denied
          </h2>

          <p className="text-xs text-slate-500 leading-relaxed">
            Your current account role does not have administrative privileges to view or manage the Outtricks platform governance console.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#202020] text-[11px] text-slate-600 dark:text-slate-400 text-left space-y-1">
          <div className="font-bold text-slate-900 dark:text-white">Need Admin Privileges?</div>
          <p>Please contact your workspace Super Admin or organization owner to request role elevation or permissions upgrade.</p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link to="/">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Return to Command Center
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
