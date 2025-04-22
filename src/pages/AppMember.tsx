
import { Outlet } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-background">
      <div className="bg-white rounded-lg shadow p-8 text-center max-w-md w-full">
        <h2 className="text-xl font-semibold mb-2 text-destructive">Something went wrong</h2>
        <p className="text-muted-foreground mb-4">
          {error.message || "An unexpected error occurred"}
        </p>
        <pre className="text-xs bg-muted p-2 rounded mb-4 overflow-auto max-h-32">
          {error.stack?.toString().split("\n").slice(0, 3).join("\n")}
        </pre>
        <button 
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default function AppMember() {
  return (
    <MainLayout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Outlet />
      </ErrorBoundary>
      <Toaster />
    </MainLayout>
  );
}
