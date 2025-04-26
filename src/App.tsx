import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index, NotFound } from "./pages";
import People from "./pages/People";
import Members from "./pages/people/Members";
import EditMember from "./pages/people/EditMember";
import EditVisitor from "./pages/people/EditVisitor";
import Visitors from "./pages/people/Visitors";
import Journeys from "./pages/people/Journeys";
import JourneyDetails from "./pages/people/JourneyDetails";
import CreateJourney from "./pages/people/CreateJourney";
import Appointments from "./pages/people/Appointments";
import CreateAppointment from "./pages/people/CreateAppointment";
import AppointmentDetails from "./pages/people/AppointmentDetails";
import Birthdays from "./pages/people/Birthdays";
import Kids from "./pages/people/Kids";
import Ministries from "./pages/Ministries";
import Groups from "./pages/Groups";
import Learning from "./pages/groups/Learning";
import CourseEdit from "./pages/groups/CourseEdit";
import Events from "./pages/Events";
import Finance from "./pages/Finance";
import Donations from "./pages/finance/Donations";
import Tithes from "./pages/finance/Tithes";
import Funds from "./pages/finance/Funds";
import Accounting from "./pages/finance/Accounting";
import AppMember from "./pages/AppMember";
import Blog from "./pages/app-member/Blog";
import NewPost from "./pages/app-member/NewPost";
import AppManager from "./pages/app-member/AppManager";
import ExpenseForm from "./pages/finance/ExpenseForm";
import ClassDetails from "./pages/groups/ClassDetails";
import Calendar from "./pages/Calendar";
import { CreateEvent } from "./pages/events/CreateEvent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Calendar section */}
          <Route path="/calendar" element={<Calendar />} />
          
          {/* People section */}
          <Route path="/people" element={<People />}>
            <Route index element={<Members />} />
            <Route path="members" element={<Members />} />
            <Route path="members/new" element={<EditMember />} />
            <Route path="members/:id" element={<EditMember />} />
            <Route path="visitors" element={<Visitors />} />
            <Route path="visitors/new" element={<EditVisitor />} />
            <Route path="journeys" element={<Journeys />} />
            <Route path="journeys/new" element={<CreateJourney />} />
            <Route path="journeys/:journeyId" element={<JourneyDetails />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="appointments/:id" element={<AppointmentDetails />} />
            <Route path="appointments/create" element={<CreateAppointment />} />
            <Route path="birthdays" element={<Birthdays />} />
            <Route path="kids" element={<Kids />} />
            <Route path="kids/:id" element={<KidDetails />} />
          </Route>
          
          {/* Finance section */}
          <Route path="/finance" element={<Finance />}>
            <Route index element={<Donations />} />
            <Route path="donations" element={<Donations />} />
            <Route path="tithes" element={<Tithes />} />
            <Route path="funds" element={<Funds />} />
            <Route path="accounting" element={<Accounting />} />
            <Route path="expenses/new" element={<ExpenseForm />} />
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
          <Route path="/groups/learning" element={<Learning />} />
          <Route path="/groups/learning/class/:courseId/:classId" element={<ClassDetails />} />
          <Route path="/groups/learning/edit/:courseId" element={<CourseEdit />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/edit/:eventId" element={<CreateEvent />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
