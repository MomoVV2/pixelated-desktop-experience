
import React, { useState } from "react";
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
} from "lucide-react";
import DesktopIcon from "@/components/DesktopIcon";
import Window from "@/components/Window";
import Taskbar from "@/components/Taskbar";
import Projects from "@/components/Projects";
import AboutMe from "@/components/AboutMe";

// Define our window types
type WindowType = {
  id: string;
  title: string;
  content: React.ReactNode;
  initialPosition: { x: number; y: number };
};

const Index = () => {
  // State for tracking open windows and active window
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

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
      <div className="grid grid-cols-1 gap-4 p-6" onClick={(e) => e.stopPropagation()}>
        <DesktopIcon
          name="Projects"
          icon={<Code size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("projects")}
          isActive={activeWindow === "projects"}
        />
        <DesktopIcon
          name="About Me"
          icon={<User size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("aboutMe")}
          isActive={activeWindow === "aboutMe"}
        />
        <DesktopIcon
          name="Travel"
          icon={<Image size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("travel")}
          isActive={activeWindow === "travel"}
        />
        <DesktopIcon
          name="Music"
          icon={<Music size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("music")}
          isActive={activeWindow === "music"}
        />
        <DesktopIcon
          name="Cats"
          icon={<Cat size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("cats")}
          isActive={activeWindow === "cats"}
        />
        <DesktopIcon
          name="Coffee"
          icon={<Coffee size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("coffee")}
          isActive={activeWindow === "coffee"}
        />
      </div>

      {/* Social Media Icons */}
      <div className="absolute top-6 right-6 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <div className="desktop-icon">
            <Github size={32} className="text-desktop-icon" />
            <div className="desktop-icon-text">Github</div>
          </div>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <div className="desktop-icon">
            <Linkedin size={32} className="text-desktop-icon" />
            <div className="desktop-icon-text">LinkedIn</div>
          </div>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <div className="desktop-icon">
            <Twitter size={32} className="text-desktop-icon" />
            <div className="desktop-icon-text">Twitter</div>
          </div>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <div className="desktop-icon">
            <Instagram size={32} className="text-desktop-icon" />
            <div className="desktop-icon-text">Instagram</div>
          </div>
        </a>
      </div>

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
        onWindowSelect={openWindow}
      />
    </div>
  );
};

export default Index;
