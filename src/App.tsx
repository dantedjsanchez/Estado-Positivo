import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Project from "./pages/Project.tsx";
import Research from "./pages/Research.tsx";
import Contact from "./pages/Contact.tsx";
import { LangProvider } from "./i18n/LangProvider.tsx";
import { SiteLayout } from "./components/site/SiteLayout.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LangProvider>
          <SiteLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/proyecto" element={<Project />} />
              <Route path="/investigacion" element={<Research />} />
              <Route path="/contacto" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SiteLayout>
        </LangProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
