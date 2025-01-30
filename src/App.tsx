import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Index from "./pages/Index";
import ArtGallery from "./pages/ArtGallery"; // Importing ArtGallery
import About from "./pages/About";
import Resources from "./pages/Resources";
import Projects from "./pages/Projects";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import VideoTraining from "./pages/VideoTraining";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <Index />
              </motion.div>
            } />
            <Route path="/about" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <About />
              </motion.div>
            } />
            <Route path="/resources" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <Resources />
              </motion.div>
            } />
            <Route path="/post/:id" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <Post />
              </motion.div>
            } />
            <Route path="/art-gallery" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <ArtGallery />
              </motion.div>
            } />
            <Route path="/video-training" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <VideoTraining />
              </motion.div>
            } />
            <Route path="/projects" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <Projects />
              </motion.div>
            } />
            <Route path="*" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <NotFound />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
