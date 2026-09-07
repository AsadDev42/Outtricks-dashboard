import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by Outtricks ErrorBoundary:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full p-8 rounded-3xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#161616] shadow-2xl space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto shadow-xs border border-rose-200 dark:border-rose-800">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-extrabold text-slate-950 dark:text-white tracking-tight">
                Something went wrong
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                An unexpected application error occurred in this view. Your session and data are safe.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 bg-slate-50 dark:bg-[#141414] rounded-xl text-[11px] font-mono text-rose-600 dark:text-rose-400 text-left overflow-x-auto border border-slate-200 dark:border-[#2A2A2A]">
                {this.state.error.message}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Home className="w-3.5 h-3.5" />}
                onClick={() => (window.location.href = '/')}
              >
                Go Home
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={this.handleReset}
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
