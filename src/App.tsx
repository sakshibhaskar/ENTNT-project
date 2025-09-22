import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobForm from "./pages/JobForm";
import Candidates from "./pages/Candidates";
import CandidateForm from "./pages/CandidateForm";
import Interviews from "./pages/Interviews";
import InterviewSchedule from "./pages/InterviewSchedule";
import Reports from "./pages/Reports";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/new" element={<JobForm />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/candidates/new" element={<CandidateForm />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/interviews/new" element={<InterviewSchedule />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/messages" element={<Messages />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
