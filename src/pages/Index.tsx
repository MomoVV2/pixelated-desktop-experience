
import React, { useState, useEffect } from "react";
import {
  FolderOpen,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Music,
  Image,
  Code,
  User,
  Cat,
  Coffee,
  Info,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedDesktopIcon from "@/components/AnimatedDesktopIcon";
import Window from "@/components/Window";
import Taskbar from "@/components/Taskbar";
import Projects from "@/components/Projects";
import AboutMe from "@/components/AboutMe";
import PixelCat from "@/components/PixelCat";
import AboutSite from "@/components/AboutSite";
import { motion } from "framer-motion";

// Define our window types
type WindowType = {
  id: string;
  title: string;
  content: React.ReactNode;
  initialPosition: { x: number; y: number };
};

// Define icon position type
type IconPosition = {
  [key: string]: { x: number; y: number };
};

const Index = () => {
  const isMobile = useIsMobile();
  
  // State for tracking open windows and active window
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  
  // State for icon positions
  const [iconPositions, setIconPositions] = useState<IconPosition>({
    projects: { x: 40, y: 40 },
    aboutMe: { x: 40, y: 150 },
    travel: { x: 40, y: 260 },
    music: { x: 40, y: 370 },
    cats: { x: 40, y: 480 },
    coffee: { x: 40, y: 590 },
  });

  // Define all possible windows
  const allWindows: Record<string, WindowType> = {
    projects: {
      id: "projects",
      title: "Projects",
      content: <Projects />,
      initialPosition: { x: 100, y: 100 },
    },
    aboutMe: {
      id: "aboutMe",
      title: "About Me",
      content: <AboutMe />,
      initialPosition: { x: 150, y: 120 },
    },
    travel: {
      id: "travel",
      title: "Travel",
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">My Travels</h2>
          <p className="text-white/70">Seoul is my favorite city. Images coming soon!</p>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item} 
                className="aspect-video bg-desktop-window rounded-md flex items-center justify-center"
              >
                <p className="text-white/50 text-sm">Seoul Image {item}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      initialPosition: { x: 200, y: 140 },
    },
    music: {
      id: "music",
      title: "Music",
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">My Music</h2>
          <p className="text-white/70">My favorite artists include:</p>
          <ul className="list-disc list-inside text-white/70 space-y-2">
            <li>Jazz classics</li>
            <li>K-pop hits</li>
            <li>Fuji Kaze</li>
            <li>Tabber</li>
            <li>Iwamizu</li>
          </ul>
        </div>
      ),
      initialPosition: { x: 250, y: 160 },
    },
    cats: {
      id: "cats",
      title: "Cats",
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Cat Corner</h2>
          <p className="text-white/70">A space dedicated to my feline friends!</p>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item} 
                className="aspect-square bg-desktop-window rounded-md flex items-center justify-center"
              >
                <p className="text-white/50 text-sm">Cat Photo {item}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      initialPosition: { x: 300, y: 180 },
    },
    coffee: {
      id: "coffee",
      title: "Coffee",
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Coffee Passion</h2>
          <p className="text-white/70">My favorite coffee spots and brewing methods.</p>
          <div className="space-y-2">
            <h3 className="font-medium text-desktop-accent">Top Brews</h3>
            <ul className="list-disc list-inside text-white/70 space-y-1">
              <li>Pourover V60</li>
              <li>Aeropress</li>
              <li>Cold Brew</li>
            </ul>
          </div>
        </div>
      ),
      initialPosition: { x: 350, y: 200 },
    },
    about: {
      id: "about",
      title: "About This Site",
      content: <AboutSite />,
      initialPosition: { x: 200, y: 150 },
    },
  };

  // Function to open a window
  const openWindow = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id]);
    }
    setActiveWindow(id);
  };

  // Function to close a window
  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter((windowId) => windowId !== id));
    if (activeWindow === id) {
      setActiveWindow(openWindows.length > 1 ? openWindows[0] : null);
    }
  };
  
  // Function to update icon position
  const updateIconPosition = (id: string, position: { x: number; y: number }) => {
    setIconPositions({
      ...iconPositions,
      [id]: position,
    });
  };
  
  // Mobile version
  if (isMobile) {
    return (
      <div className="min-h-screen bg-desktop-dark text-white p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-pixel mb-6 text-desktop-accent">My Personal Portfolio</h1>
          
          <div className="space-y-4">
            {Object.entries(allWindows).map(([id, window]) => (
              <motion.div 
                key={id}
                className="p-4 bg-desktop-window rounded-md border border-desktop-border"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openWindow(id)}
              >
                <h2 className="font-medium text-desktop-accent flex items-center">
                  {id === "projects" && <Code size={16} className="mr-2" />}
                  {id === "aboutMe" && <User size={16} className="mr-2" />}
                  {id === "travel" && <Image size={16} className="mr-2" />}
                  {id === "music" && <Music size={16} className="mr-2" />}
                  {id === "cats" && <Cat size={16} className="mr-2" />}
                  {id === "coffee" && <Coffee size={16} className="mr-2" />}
                  {id === "about" && <Info size={16} className="mr-2" />}
                  {window.title}
                </h2>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 grid grid-cols-4 gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
              <Github size={24} className="text-desktop-icon mb-1" />
              <span className="text-xs">Github</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
              <Linkedin size={24} className="text-desktop-icon mb-1" />
              <span className="text-xs">LinkedIn</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
              <Twitter size={24} className="text-desktop-icon mb-1" />
              <span className="text-xs">Twitter</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
              <Instagram size={24} className="text-desktop-icon mb-1" />
              <span className="text-xs">Instagram</span>
            </a>
          </div>
          
          {openWindows.length > 0 && (
            <div className="mt-8 fixed inset-0 bg-black/90 z-50 overflow-auto">
              <div className="p-4">
                <button 
                  className="mb-4 px-3 py-1 bg-desktop-accent text-white rounded text-sm"
                  onClick={() => setOpenWindows([])}
                >
                  Back
                </button>
                <div className="bg-desktop-window border border-desktop-border rounded-md p-4">
                  {allWindows[openWindows[0]].content}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <div 
      className="h-screen w-full relative overflow-hidden" 
      style={{ 
        backgroundImage: 'url("/seoul-pixelated.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        imageRendering: 'pixelated'
      }}
      onClick={() => setActiveWindow(null)}
    >
      {/* Desktop Icons */}
      <div onClick={(e) => e.stopPropagation()}>
        <AnimatedDesktopIcon
          name="Projects"
          icon={<Code size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("projects")}
          isActive={activeWindow === "projects"}
          position={iconPositions.projects}
          onPositionChange={(pos) => updateIconPosition("projects", pos)}
        />
        <AnimatedDesktopIcon
          name="About Me"
          icon={<User size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("aboutMe")}
          isActive={activeWindow === "aboutMe"}
          position={iconPositions.aboutMe}
          onPositionChange={(pos) => updateIconPosition("aboutMe", pos)}
        />
        <AnimatedDesktopIcon
          name="Travel"
          icon={<Image size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("travel")}
          isActive={activeWindow === "travel"}
          position={iconPositions.travel}
          onPositionChange={(pos) => updateIconPosition("travel", pos)}
        />
        <AnimatedDesktopIcon
          name="Music"
          icon={<Music size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("music")}
          isActive={activeWindow === "music"}
          position={iconPositions.music}
          onPositionChange={(pos) => updateIconPosition("music", pos)}
        />
        <AnimatedDesktopIcon
          name="Cats"
          icon={<Cat size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("cats")}
          isActive={activeWindow === "cats"}
          position={iconPositions.cats}
          onPositionChange={(pos) => updateIconPosition("cats", pos)}
        />
        <AnimatedDesktopIcon
          name="Coffee"
          icon={<Coffee size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("coffee")}
          isActive={activeWindow === "coffee"}
          position={iconPositions.coffee}
          onPositionChange={(pos) => updateIconPosition("coffee", pos)}
        />
      </div>

      {/* Social Media Icons */}
      <div className="absolute top-6 right-6 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
        <motion.a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="desktop-icon">
            <Github size={32} className="text-desktop-icon" />
            <div className="desktop-icon-text">Github</div>
          </div>
        </motion.a>
        <motion.a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="desktop-icon">
            <Linkedin size={32} className="text-desktop-icon" />
            <div className="desktop-icon-text">LinkedIn</div>
          </div>
        </motion.a>
        <motion.a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="desktop-icon">
            <Twitter size={32} className="text-desktop-icon" />
            <div className="desktop-icon-text">Twitter</div>
          </div>
        </motion.a>
        <motion.a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="desktop-icon">
            <Instagram size={32} className="text-desktop-icon" />
            <div className="desktop-icon-text">Instagram</div>
          </div>
        </motion.a>
      </div>

      {/* Roaming Pixel Cat */}
      <PixelCat />

      {/* Windows */}
      <div onClick={(e) => e.stopPropagation()}>
        {openWindows.map((windowId) => {
          const window = allWindows[windowId];
          return (
            <Window
              key={window.id}
              title={window.title}
              isOpen={true}
              onClose={() => closeWindow(window.id)}
              initialPosition={window.initialPosition}
              className={activeWindow === window.id ? "z-20" : "z-10"}
              onClick={() => setActiveWindow(window.id)}
            >
              {window.content}
            </Window>
          );
        })}
      </div>

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows.map(id => ({ id, title: allWindows[id].title }))}
        activeWindow={activeWindow}
        onWindowSelect={setActiveWindow}
        onWindowOpen={openWindow}
      />
    </div>
  );
};

export default Index;
