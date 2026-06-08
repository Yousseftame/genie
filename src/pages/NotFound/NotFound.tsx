import { useLocation, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const error = useRouteError();

  const is404 = isRouteErrorResponse(error) && error.status === 404;

  useEffect(() => {
    if (is404) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname,
      );
    } else {
      console.error("Application Error caught by router boundary:", error);
    }
  }, [location.pathname, error, is404]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050f2e] text-slate-300">
      <div data-aos="zoom-in" className="text-center p-8 bg-slate-900/60 rounded-2xl border border-slate-800/50 backdrop-blur-md max-w-lg mx-4">
        <h1 className="mb-4 text-5xl font-bold font-head text-white tracking-tight">
          {is404 ? "404" : "Oops!"}
        </h1>
        <p className="mb-6 text-xl font-serif text-slate-300">
          {is404 ? "It seems you've wandered off the script." : "Something went wrong loading the experience."}
        </p>
        {!is404 && (
          <div className="mb-8 p-4 bg-red-950/30 border border-red-900/50 rounded-lg text-sm text-red-200/80 max-w-md mx-auto break-words">
            {error instanceof Error ? error.message : "An unexpected application error occurred."}
          </div>
        )}
        <a
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-medium transition-all shadow-lg shadow-primary/20 hover:scale-105"
        >
          {is404 ? "Return to the Show" : "Reload Experience"}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
