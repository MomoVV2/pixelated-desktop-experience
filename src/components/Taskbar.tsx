
import React, { useState } from "react";
import { Clock, ZoomIn, ZoomOut, PlusCircle } from "lucide-react";
import StartMenu from "./StartMenu";

interface TaskbarProps {
  openWindows: { id: string; title: string }[];
  activeWindow: string | null;
  onWindowSelect: (id: string) => void;
  onWindowOpen: (id: string) => void;
  scale: number;
  onScaleChange: (scale: number) => void;
  onTogglePet: () => void;
  showPetDog: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  activeWindow,
  onWindowSelect,
  onWindowOpen,
  scale,
  onScaleChange,
  onTogglePet,
  showPetDog,
}) => {
  const [time, setTime] = React.useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  const handleZoomIn = () => {
    if (scale < 200) {
      onScaleChange(scale + 10);
    }
  };

  const handleZoomOut = () => {
    if (scale > 100) {
      onScaleChange(scale - 10);
    }
  };

  return (
    <div className="taskbar">
      <button 
        className={`start-button ${startMenuOpen ? 'active' : ''}`}
        onClick={toggleStartMenu}
      >
        Start
      </button>

      <StartMenu 
        isOpen={startMenuOpen} 
        onClose={() => setStartMenuOpen(false)} 
        onOpenWindow={onWindowOpen}
      />

      <div className="flex-1 flex">
        {openWindows.map((window) => (
          <button
            key={window.id}
            className={`taskbar-item ${activeWindow === window.id ? "active" : ""}`}
            onClick={() => onWindowSelect(window.id)}
          >
            {window.title}
          </button>
        ))}
      </div>
      
      <div className="flex items-center mr-4">
        <button 
          className="p-1 hover:bg-white/10 rounded-sm mr-1" 
          onClick={handleZoomOut}
          title="Zoom Out"
        >
          <ZoomOut size={14} className="text-white/80" />
        </button>
        <span className="text-white/80 text-xs mx-1">{scale}%</span>
        <button 
          className="p-1 hover:bg-white/10 rounded-sm ml-1" 
          onClick={handleZoomIn}
          title="Zoom In"
        >
          <ZoomIn size={14} className="text-white/80" />
        </button>
      </div>
      
      <button 
        className="p-1 hover:bg-white/10 rounded-sm mr-3" 
        onClick={onTogglePet}
        title={showPetDog ? "Remove Dog" : "Add Dog"}
      >
        <PlusCircle size={14} className="text-white/80" />
      </button>
      
      <div className="text-white/80 text-xs flex items-center">
        <Clock size={14} className="mr-1" />
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
};

export default Taskbar;
