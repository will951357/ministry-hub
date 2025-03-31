
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index, NotFound } from "./pages";
import People from "./pages/People";
import Members from "./pages/people/Members";
import Visitors from "./pages/people/Visitors";
import Journeys from "./pages/people/Journeys";
import Appointments from "./pages/people/Appointments";
import Birthdays from "./pages/people/Birthdays";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* People section */}
          <Route path="/people" element={<People />}>
            <Route index element={<Members />} />
            <Route path="members" element={<Members />} />
            <Route path="visitors" element={<Visitors />} />
            <Route path="journeys" element={<Journeys />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="birthdays" element={<Birthdays />} />
          </Route>
          
          {/* Placeholder routes for future implementation */}
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
