import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";

// Data interfaces
interface Personal {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  social: Record<string, string>;
}

interface Data {
  personal: Personal;
  skills: string[];
  projects: any[];
  experience: any[];
}

// Loading component
const LoadingScreen: React.FC = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 bg-neutral-900 flex items-center justify-center z-50"
  >
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary-500/20 border-t-primary-500 rounded-full mx-auto mb-4"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-white text-lg"
      >
        Loading...
      </motion.p>
    </div>
  </motion.div>
);

// Navigation component
const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navItems: { id: string; label: string }[] = [
    { id: "hero", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Update background appearance
      setScrolled(scrollY > viewportHeight * 0.01); // 1vh

      // Active section logic
      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);
      const scrollPosition = scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    handleScroll(); // Initial check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-neutral-900/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            Portfolio
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? "text-primary-400"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const loadData = async (): Promise<void> => {
      try {
        const response = await fetch("/src/data/data.json");
        const jsonData: Data = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error loading data:", error);
        setData({
          personal: {
            name: "Your Name",
            title: "Full Stack Developer",
            subtitle: "Creating digital experiences",
            bio: "Passionate developer with expertise in modern web technologies.",
            email: "your@email.com",
            phone: "+1 (555) 123-4567",
            location: "Your Location",
            social: {
              github: "https://github.com/yourusername",
              linkedin: "https://linkedin.com/in/yourusername",
              twitter: "https://twitter.com/yourusername",
            },
          },
          skills: ["React", "Node.js", "TypeScript"],
          projects: [],
          experience: [],
        });
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    loadData();

    return () => {
      lenis.destroy();
    };
  }, []);

  if (loading || !data) {
    return (
      <AnimatePresence>
        <LoadingScreen />
      </AnimatePresence>
    );
  }

  return (
    <div className="bg-neutral-900 text-white">
      {/* Custom scrollbar styles */}
      <style>{`
        /* WebKit browsers (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #262626;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
        }
        
        ::-webkit-scrollbar-thumb:active {
          background: linear-gradient(135deg, #1d4ed8, #1e3a8a);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
        }
        
        /* Firefox */
        html {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #131313;
        }
        
        /* For better glow effect */
        body::-webkit-scrollbar-thumb:hover
      `}</style>

      <Navigation />

      <main>
        <section id="hero">
          <Hero data={data} />
        </section>

        <section id="projects">
          <Projects data={data} />
        </section>

        <section id="about">
          <About data={data} />
        </section>

        <section id="contact">
          <Contact data={data} />
        </section>
      </main>

      <footer className="bg-black py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-neutral-400">
            © 2024 {data.personal.name}. Built with React, Tailwind CSS, and
            Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
