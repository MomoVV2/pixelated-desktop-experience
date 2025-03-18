
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Position {
  x: number;
  y: number;
}

interface PixelCatProps {
  className?: string;
  scale?: number;
  colorScheme?: string;
  animationSpeed?: "slow" | "normal" | "fast";
}

const messages = [
  "Meow! Need coffee?",
  "Coding time!",
  "Seoul is beautiful!",
  "I love jazz too!",
  "K-pop is life!",
  "Click on some folders!",
  "안녕하세요!",
  "こんにちは!",
  "مرحبا!",
  "Pet me!",
  "Drag me around!",
  "Ouch! That hurt!",
  "I love the taskbar!",
  "Feed me pixels!",
  "Customize me!",
];

const PixelCat: React.FC<PixelCatProps> = ({ 
  className, 
  scale = 100,
  colorScheme = "momo",
  animationSpeed = "normal"
}) => {
  // Use taskbar position as the baseline
  const [position, setPosition] = useState<Position>({ x: 100, y: 0 });
  const [targetPosition, setTargetPosition] = useState<Position>({ x: 100, y: 0 });
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [isOnTaskbar, setIsOnTaskbar] = useState(true); // Always on taskbar
  const [catColor, setCatColor] = useState("desktop-accent");
  const containerRef = useRef<HTMLDivElement>(null);
  const [taskbarHeight, setTaskbarHeight] = useState(0);
  const [taskbarY, setTaskbarY] = useState(0);
  
  // Calculate movement speed based on animation speed
  const getMovementSpeed = () => {
    switch(animationSpeed) {
      case "slow": return 1;
      case "fast": return 4;
      default: return 2;
    }
  };
  
  // Find the taskbar position on component mount and window resize
  useEffect(() => {
    const updateTaskbarPosition = () => {
      const taskbar = document.querySelector('.taskbar');
      if (taskbar) {
        const taskbarRect = taskbar.getBoundingClientRect();
        setTaskbarHeight(taskbarRect.height);
        const scaledTaskbarY = window.innerHeight * (100 / (scale || 100)) - taskbarRect.height;
        setTaskbarY(scaledTaskbarY);
        
        // Initialize the cat position on the taskbar
        if (position.y === 0) {
          setPosition({ x: position.x, y: scaledTaskbarY - 20 });
          setTargetPosition({ x: position.x, y: scaledTaskbarY - 20 });
        }
      }
    };
    
    updateTaskbarPosition();
    window.addEventListener('resize', updateTaskbarPosition);
    return () => window.removeEventListener('resize', updateTaskbarPosition);
  }, [scale]);
  
  // Set new random target position along the taskbar
  useEffect(() => {
    if (isBeingDragged) return;
    
    const interval = setInterval(() => {
      if (containerRef.current && taskbarY > 0) {
        const container = containerRef.current.parentElement;
        if (container) {
          const maxX = container.clientWidth - 50;
          // Stay on the taskbar
          const newX = Math.max(50, Math.floor(Math.random() * maxX));
          const newY = taskbarY - 20; // Position just above the taskbar
          
          setTargetPosition({ x: newX, y: newY });
          setFlipped(newX < position.x);
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [position, isBeingDragged, taskbarY]);
  
  // Move toward target position if not being dragged, but stay on taskbar
  useEffect(() => {
    if (isBeingDragged || taskbarY === 0) return;
    
    const moveInterval = setInterval(() => {
      setPosition(current => {
        // Gravity effect - always fall back to taskbar if above it
        if (current.y < taskbarY - 30) {
          // Apply gravity - fall faster the higher up
          const fallSpeed = Math.max(2, (taskbarY - current.y) / 10);
          return {
            x: current.x,
            y: Math.min(taskbarY - 20, current.y + fallSpeed)
          };
        }
        
        // Normal movement along the taskbar
        const dx = targetPosition.x - current.x;
        const distance = Math.abs(dx);
        
        if (distance < 2) {
          return { x: targetPosition.x, y: taskbarY - 20 };
        }
        
        const moveX = dx / distance * getMovementSpeed();
        
        return {
          x: current.x + moveX,
          y: taskbarY - 20 // Always stay at taskbar level
        };
      });
    }, 50);
    
    return () => clearInterval(moveInterval);
  }, [targetPosition, isBeingDragged, taskbarY, animationSpeed]);
  
  // Show random messages periodically if not being dragged
  useEffect(() => {
    if (isBeingDragged) return;
    
    const messageInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        showCatMessage(randomMessage);
      }
    }, 8000);
    
    return () => clearInterval(messageInterval);
  }, [isBeingDragged]);
  
  const showCatMessage = (msg: string) => {
    setMessage(msg);
    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };
  
  const handleCatClick = () => {
    if (!isBeingDragged) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      showCatMessage(randomMessage);
    }
  };
  
  const handleDragStart = () => {
    setIsBeingDragged(true);
  };
  
  const handleDragEnd = (event: any, info: any) => {
    setIsBeingDragged(false);
    
    // Calculate new position - ensure the cat stays on or above the taskbar
    const newX = Math.max(0, Math.min(window.innerWidth * (100/scale) - 50, position.x + info.offset.x));
    let newY = position.y + info.offset.y;
    
    // Apply the position update
    setPosition({ x: newX, y: newY });
    
    // If dropped above taskbar, show falling message
    if (newY < taskbarY - 30) {
      showCatMessage("Ouch! That hurt!");
      // Target position is back on taskbar - gravity will pull cat down
      setTargetPosition({ x: newX, y: taskbarY - 20 });
    } else {
      // If dropped near taskbar, snap to taskbar position
      setTargetPosition({ x: newX, y: taskbarY - 20 });
      setPosition({ x: newX, y: taskbarY - 20 });
    }
  };
  
  const handleColorChange = () => {
    const colors = ["desktop-accent", "green-400", "blue-400", "red-400", "yellow-400", "pink-400"];
    const currentIndex = colors.indexOf(catColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setCatColor(colors[nextIndex]);
    showCatMessage("I changed my color!");
  };
  
  // Get cat face based on color scheme
  const getCatFace = () => {
    if (colorScheme === "neon") {
      return "^•‿•^";
    } else if (colorScheme === "pastel") {
      return "^ﻌ^";
    } else if (colorScheme === "monochrome") {
      return "^•_•^";
    } else {
      return "^•ﻌ•^";
    }
  };
  
  return (
    <motion.div 
      ref={containerRef}
      className={cn("absolute z-30 cursor-pointer-pixelated", className)}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transition: "transform 0.3s ease-out",
        scale: scale / 100
      }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleCatClick}
    >
      <div 
        className="w-12 h-12 relative image-pixelate"
        style={{ transform: flipped ? 'scaleX(-1)' : 'none' }}
      >
        {/* Pixel Cat Image */}
        <div 
          className={`w-12 h-12 bg-desktop-dark rounded-sm overflow-hidden border-2 flex items-center justify-center ${
            isOnTaskbar ? "border-green-400" : `border-${catColor}`
          }`}
          onDoubleClick={handleColorChange}
        >
          <div className={`text-${catColor} font-pixel text-xs`}>{getCatFace()}</div>
        </div>
        
        {/* Message Bubble */}
        {showMessage && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-max max-w-32 p-2 bg-desktop-window border border-desktop-border rounded-md text-xs text-white animate-fade-in whitespace-nowrap">
            {message}
            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-desktop-window"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PixelCat;
