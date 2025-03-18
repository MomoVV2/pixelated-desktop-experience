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
  Palette,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedDesktopIcon from "@/components/AnimatedDesktopIcon";
import Window from "@/components/Window";
import Taskbar from "@/components/Taskbar";
import Projects from "@/components/Projects";
import AboutMe from "@/components/AboutMe";
import PixelCat from "@/components/PixelCat";
import PixelDog from "@/components/PixelDog";
import AboutSite from "@/components/AboutSite";
import CustomizeWindow, { CustomSettings } from "@/components/CustomizeWindow";
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
    customize: { x: 40, y: 700 },
  });
  
  // State for social media icon positions
  const [socialPositions, setSocialPositions] = useState<IconPosition>({
    github: { x: 0, y: 0 },
    linkedin: { x: 0, y: 0 },
    twitter: { x: 0, y: 0 },
    instagram: { x: 0, y: 0 },
  });
  
  // State for interface customization
  const [customSettings, setCustomSettings] = useState<CustomSettings>({
    scale: 150, // Default zoom at 150%
    colorScheme: "momo", // Default theme
    animationSpeed: "normal",
    layout: "default",
  });
  
  // State for controlling pets
  const [showPetDog, setShowPetDog] = useState(false);
  
  // Set initial social icon positions
  useEffect(() => {
    if (!isMobile) {
      const rightSideX = window.innerWidth - 120; // Ensure it's a bit away from the edge
      setSocialPositions({
        github: { x: rightSideX, y: 40 },
        linkedin: { x: rightSideX, y: 150 },
        twitter: { x: rightSideX, y: 260 },
        instagram: { x: rightSideX, y: 370 },
      });
    }
  }, [isMobile]);
  
  // Watch for scale changes to check if we need to switch to mobile view
  useEffect(() => {
    const checkViewport = () => {
      if (!isMobile) {
        const scaledWidth = window.innerWidth * (100 / customSettings.scale);
        const scaledHeight = window.innerHeight * (100 / customSettings.scale);
        
        // If the scaled viewport can't fit essential content, force mobile view
        if (scaledWidth < 600 || scaledHeight < 400) {
          // This approach requires integrating with the useIsMobile hook
          // For now, we'll just adjust the scale back to a reasonable value
          if (customSettings.scale > 180) {
            setCustomSettings({...customSettings, scale: 180});
          }
        }
      }
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, [customSettings.scale, isMobile]);
  
  // Handle applying custom settings
  const handleApplyCustomSettings = (settings: CustomSettings) => {
    // Apply all settings: scale, colorScheme, animationSpeed, and layout
    setCustomSettings(settings);
    
    // Apply specific theme-related changes based on color scheme
    document.documentElement.dataset.theme = settings.colorScheme;
    
    // Apply specific layout changes if needed
    if (settings.layout === "centered") {
      // Center the desktop icons
      const centeredPositions = { ...iconPositions };
      const centerX = (window.innerWidth * (100 / settings.scale)) / 2 - 60;
      
      Object.keys(centeredPositions).forEach((key, index) => {
        centeredPositions[key] = { x: centerX, y: 40 + index * 110 };
      });
      setIconPositions(centeredPositions);
      
      // Center social icons
      const socialCentered = { ...socialPositions };
      const rightX = (window.innerWidth * (100 / settings.scale)) - 120;
      Object.keys(socialCentered).forEach((key, index) => {
        socialCentered[key] = { x: rightX, y: 40 + index * 110 };
      });
      setSocialPositions(socialCentered);
    }
    else if (settings.layout === "minimal") {
      // Minimal layout - stack icons on left, socials on right
      const minimalPositions = { ...iconPositions };
      Object.keys(minimalPositions).forEach((key, index) => {
        minimalPositions[key] = { x: 40, y: 40 + index * 90 };
      });
      setIconPositions(minimalPositions);
      
      // Right align social icons with minimal spacing
      const socialMinimal = { ...socialPositions };
      const rightX = (window.innerWidth * (100 / settings.scale)) - 120;
      Object.keys(socialMinimal).forEach((key, index) => {
        socialMinimal[key] = { x: rightX, y: 40 + index * 90 };
      });
      setSocialPositions(socialMinimal);
    }
  };

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
    customize: {
      id: "customize",
      title: "Customize",
      content: (
        <CustomizeWindow 
          onApplyChanges={handleApplyCustomSettings} 
          currentSettings={customSettings}
        />
      ),
      initialPosition: { x: 250, y: 120 },
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
  
  // Function to update social icon position
  const updateSocialPosition = (id: string, position: { x: number; y: number }) => {
    setSocialPositions({
      ...socialPositions,
      [id]: position,
    });
  };
  
  // Toggle showing the dog pet
  const togglePetDog = () => {
    setShowPetDog(!showPetDog);
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
                  {id === "customize" && <Palette size={16} className="mr-2" />}
                  {window.title}
                </h2>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 grid grid-cols-4 gap-4">
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={24} className="text-desktop-icon mb-1" />
              <span className="text-xs">Github</span>
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={24} className="text-desktop-icon mb-1" />
              <span className="text-xs">LinkedIn</span>
            </motion.a>
            <motion.a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter size={24} className="text-desktop-icon mb-1" />
              <span className="text-xs">Twitter</span>
            </motion.a>
            <motion.a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram size={24} className="text-desktop-icon mb-1" />
              <span className="text-xs">Instagram</span>
            </motion.a>
          </div>
          
          {openWindows.length > 0 && (
            <motion.div 
              className="mt-8 fixed inset-0 bg-black/90 z-50 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="p-4">
                <motion.button 
                  className="mb-4 px-3 py-1 bg-desktop-accent text-white rounded text-sm"
                  onClick={() => setOpenWindows([])}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back
                </motion.button>
                <motion.div 
                  className="bg-desktop-window border border-desktop-border rounded-md p-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {allWindows[openWindows[0]].content}
                </motion.div>
              </div>
            </motion.div>
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
        imageRendering: 'pixelated',
        transform: `scale(${customSettings.scale / 100})`,
        transformOrigin: 'top left',
        height: `${100 * (100 / customSettings.scale)}vh`,
        width: `${100 * (100 / customSettings.scale)}vw`
      }}
      onClick={() => setActiveWindow(null)}
      data-theme={customSettings.colorScheme}
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
        <AnimatedDesktopIcon
          name="Customize"
          icon={<Palette size={32} className="text-desktop-icon" />}
          onClick={() => openWindow("customize")}
          isActive={activeWindow === "customize"}
          position={iconPositions.customize}
          onPositionChange={(pos) => updateIconPosition("customize", pos)}
        />
      </div>

      {/* Social Media Icons - Now Draggable */}
      <div onClick={(e) => e.stopPropagation()}>
        <AnimatedDesktopIcon
          name="Github"
          icon={<Github size={32} className="text-desktop-icon" />}
          onClick={() => window.open("https://github.com", "_blank")}
          position={socialPositions.github}
          onPositionChange={(pos) => updateSocialPosition("github", pos)}
        />
        <AnimatedDesktopIcon
          name="LinkedIn"
          icon={<Linkedin size={32} className="text-desktop-icon" />}
          onClick={() => window.open("https://linkedin.com", "_blank")}
          position={socialPositions.linkedin}
          onPositionChange={(pos) => updateSocialPosition("linkedin", pos)}
        />
        <AnimatedDesktopIcon
          name="Twitter"
          icon={<Twitter size={32} className="text-desktop-icon" />}
          onClick={() => window.open("https://twitter.com", "_blank")}
          position={socialPositions.twitter}
          onPositionChange={(pos) => updateSocialPosition("twitter", pos)}
        />
        <AnimatedDesktopIcon
          name="Instagram"
          icon={<Instagram size={32} className="text-desktop-icon" />}
          onClick={() => window.open("https://instagram.com", "_blank")}
          position={socialPositions.instagram}
          onPositionChange={(pos) => updateSocialPosition("instagram", pos)}
        />
      </div>

      {/* Pixel Pets */}
      <PixelCat 
        scale={customSettings.scale} 
        colorScheme={customSettings.colorScheme}
        animationSpeed={customSettings.animationSpeed}
      />
      
      {showPetDog && (
        <PixelDog 
          scale={customSettings.scale} 
          colorScheme={customSettings.colorScheme}
          animationSpeed={customSettings.animationSpeed}
        />
      )}

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
        scale={customSettings.scale}
        onScaleChange={(newScale) => setCustomSettings({...customSettings, scale: newScale})}
        onTogglePet={togglePetDog}
        showPetDog={showPetDog}
      />
    </div>
  );
};

export default Index;
