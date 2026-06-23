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
  private _canvasRef: HTMLDivElement | null = null;
  private _contextLostListener: ((e: Event) => void) | null = null;

  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Canvas Error Caught:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  /** Attach a WebGL context-loss listener to the canvas element so that GPU
   *  crashes (very common on mobile / low-memory devices) are caught and shown
   *  to the user with a reload option, rather than silently leaving a blank screen. */
  public componentDidMount() {
    this._contextLostListener = (e: Event) => {
      e.preventDefault(); // stop Three.js from going into an unrecoverable loop
      const syntheticError = new Error(
        "WebGL context was lost. The GPU ran out of resources or the browser reclaimed it."
      );
      // Trigger the error boundary UI
      this.setState({ hasError: true, error: syntheticError });
      if (this.props.onError) {
        this.props.onError(syntheticError);
      }
    };

    // We can't get the canvas ref directly here; listen at the document level
    // for any webglcontextlost event that bubbles up.
    document.addEventListener("webglcontextlost", this._contextLostListener, true);
  }

  public componentWillUnmount() {
    if (this._contextLostListener) {
      document.removeEventListener(
        "webglcontextlost",
        this._contextLostListener,
        true
      );
    }
  }

  /** Reloading the page is the ONLY reliable way to recover a lost WebGL context.
   *  Resetting React state would remount the Canvas component, but the underlying
   *  GL context is already gone — Three.js would silently render nothing. */
  private handleRetry = () => {
    window.location.reload();
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
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
