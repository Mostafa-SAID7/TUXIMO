import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { HomePageSkeleton, PageSkeleton, FormPageSkeleton } from "@/components/SkeletonLoader";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Hotels = lazy(() => import("./pages/Hotels"));
const Cars = lazy(() => import("./pages/Cars"));
const Support = lazy(() => import("./pages/Support"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Suspense fallback={<HomePageSkeleton />}>
                  <Index />
                </Suspense>
              } 
            />
            <Route 
              path="/about" 
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <AboutUs />
                </Suspense>
              } 
            />
            <Route 
              path="/hotels" 
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Hotels />
                </Suspense>
              } 
            />
            <Route 
              path="/cars" 
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Cars />
                </Suspense>
              } 
            />
            <Route 
              path="/support" 
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Support />
                </Suspense>
              } 
            />
            <Route 
              path="/login" 
              element={
                <Suspense fallback={<FormPageSkeleton />}>
                  <Login />
                </Suspense>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route 
              path="*" 
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <NotFound />
                </Suspense>
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
