import React, { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  onError?: (error: Error) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error so developers can identify recurring production failures
    console.error("3D Canvas Error Caught:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050f2e] z-50">
          <div className="text-center p-6 bg-slate-900/80 rounded-xl border border-slate-700/50 backdrop-blur-md max-w-sm">
            <h2 className="text-xl font-bold text-white mb-2 font-head">
              Failed to load 3D experience
            </h2>
            <p className="text-sm text-slate-300 mb-6 font-serif">
              A network issue prevented the cinematic assets from loading.
            </p>
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-medium transition-colors"
            >
              <RefreshCcw size={16} />
              Retry Connection
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
