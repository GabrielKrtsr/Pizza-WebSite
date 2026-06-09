import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Reservation from "@/pages/Reservation";
import Button from "@/components/ui/Button";

function NotFound() {
  return (
    <PageTransition>
      <main className="container-px mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center text-center">
        <span className="font-serif text-7xl text-gold-300">404</span>
        <h1 className="mt-4 font-serif text-3xl text-cream">Page introuvable</h1>
        <p className="mt-3 text-cream/60">
          Cette page a glissé hors du four. Retournons à l'essentiel.
        </p>
        <div className="mt-8 flex gap-4">
          <Button to="/">Accueil</Button>
          <Button to="/menu" variant="outline">
            La carte
          </Button>
        </div>
      </main>
    </PageTransition>
  );
}

export default function App() {
  const location = useLocation();

  // Scroll to top on route change.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grain opacity-60" />
      <Navbar />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
