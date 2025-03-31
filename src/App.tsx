
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index, NotFound } from "./pages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Placeholder routes for future implementation */}
          <Route path="/people" element={<Index />} />
          <Route path="/ministries" element={<Index />} />
          <Route path="/groups" element={<Index />} />
          <Route path="/events" element={<Index />} />
          <Route path="/finance" element={<Index />} />
          <Route path="/sermons" element={<Index />} />
          <Route path="/check-in" element={<Index />} />
          <Route path="/settings" element={<Index />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
