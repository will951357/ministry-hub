
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index, NotFound } from "./pages";
import People from "./pages/People";
import Members from "./pages/people/Members";
import EditMember from "./pages/people/EditMember";
import Visitors from "./pages/people/Visitors";
import Journeys from "./pages/people/Journeys";
import Appointments from "./pages/people/Appointments";
import CreateAppointment from "./pages/people/CreateAppointment";
import Birthdays from "./pages/people/Birthdays";
import Ministries from "./pages/Ministries";
import Groups from "./pages/Groups";
import Events from "./pages/Events";
import Finance from "./pages/Finance";
import Donations from "./pages/finance/Donations";
import Tithes from "./pages/finance/Tithes";
import Funds from "./pages/finance/Funds";
import AppMember from "./pages/AppMember";
import Blog from "./pages/app-member/Blog";
import NewPost from "./pages/app-member/NewPost";
import AppManager from "./pages/app-member/AppManager";

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
            <Route path="members/:id" element={<EditMember />} />
            <Route path="visitors" element={<Visitors />} />
            <Route path="journeys" element={<Journeys />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="appointments/create" element={<CreateAppointment />} />
            <Route path="birthdays" element={<Birthdays />} />
          </Route>
          
          {/* Finance section */}
          <Route path="/finance" element={<Finance />}>
            <Route index element={<Donations />} />
            <Route path="donations" element={<Donations />} />
            <Route path="tithes" element={<Tithes />} />
            <Route path="funds" element={<Funds />} />
          </Route>
          
          {/* App Member section */}
          <Route path="/app-member" element={<AppMember />}>
            <Route index element={<Blog />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/new" element={<NewPost />} />
            <Route path="app-manager" element={<AppManager />} />
          </Route>
          
          {/* Using real components */}
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/events" element={<Events />} />
          <Route path="/settings" element={<Index />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
