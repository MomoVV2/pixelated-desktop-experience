
import React, { useState } from "react";
import { Clock } from "lucide-react";
import StartMenu from "./StartMenu";

interface TaskbarProps {
  openWindows: { id: string; title: string }[];
  activeWindow: string | null;
  onWindowSelect: (id: string) => void;
  onWindowOpen: (id: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  activeWindow,
  onWindowSelect,
  onWindowOpen,
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
      <div className="text-white/80 text-xs flex items-center">
        <Clock size={14} className="mr-1" />
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
};

export default Taskbar;
