import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UploadPage from "./pages/cmmo/upload";
import MappingPage from "./pages/cmmo/mapping";
import HarmonizationPage from "./pages/cmmo/harmonization";
import ValidationPage from "./pages/cmmo/validation";
import ExportPage from "./pages/cmmo/export";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cmmo/upload" element={<UploadPage />} />
          <Route path="/cmmo/mapping" element={<MappingPage />} />
          <Route path="/cmmo/harmonization" element={<HarmonizationPage />} />
          <Route path="/cmmo/validation" element={<ValidationPage />} />
          <Route path="/cmmo/export" element={<ExportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;