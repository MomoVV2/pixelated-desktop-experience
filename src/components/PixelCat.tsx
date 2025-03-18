
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
  const [position, setPosition] = useState<Position>({ x: 100, y: 300 });
  const [targetPosition, setTargetPosition] = useState<Position>({ x: 100, y: 300 });
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [isOnTaskbar, setIsOnTaskbar] = useState(false);
  const [catColor, setCatColor] = useState("desktop-accent");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate movement speed based on animation speed
  const getMovementSpeed = () => {
    switch(animationSpeed) {
      case "slow": return 1;
      case "fast": return 4;
      default: return 2;
    }
  };
  
  // Set new random target position every 5 seconds
  useEffect(() => {
    if (isBeingDragged) return;
    
    const interval = setInterval(() => {
      if (containerRef.current) {
        const container = containerRef.current.parentElement;
        if (container) {
          const maxX = container.clientWidth - 50;
          // Don't go too low to avoid the taskbar
          const maxY = container.clientHeight - 150;
          
          const newX = Math.max(50, Math.floor(Math.random() * maxX));
          const newY = Math.max(100, Math.floor(Math.random() * maxY));
          
          setTargetPosition({ x: newX, y: newY });
          setFlipped(newX < position.x);
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [position, isBeingDragged]);
  
  // Move toward target position if not being dragged
  useEffect(() => {
    if (isBeingDragged) return;
    
    const moveInterval = setInterval(() => {
      setPosition(current => {
        const dx = targetPosition.x - current.x;
        const dy = targetPosition.y - current.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < 2) {
          return targetPosition;
        }
        
        const moveX = dx / distance * getMovementSpeed();
        const moveY = dy / distance * getMovementSpeed();
        
        return {
          x: current.x + moveX,
          y: current.y + moveY
        };
      });
    }, 50);
    
    return () => clearInterval(moveInterval);
  }, [targetPosition, isBeingDragged, animationSpeed]);
  
  // Check if cat is on taskbar
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current.parentElement;
      if (container) {
        const taskbarY = container.clientHeight - 48;
        if (position.y > taskbarY - 20 && !isOnTaskbar) {
          setIsOnTaskbar(true);
          showCatMessage("Ouch! That hurt!");
        } else if (position.y <= taskbarY - 20 && isOnTaskbar) {
          setIsOnTaskbar(false);
        }
      }
    }
  }, [position]);
  
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
    
    // Update position based on drag
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y
    });
    
    // Also update target position to match current
    setTargetPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y
    });
    
    // Check if dropped on taskbar
    if (containerRef.current) {
      const container = containerRef.current.parentElement;
      if (container) {
        const taskbarY = container.clientHeight - 48;
        if (position.y + info.offset.y > taskbarY - 20) {
          showCatMessage("I love sitting on the taskbar!");
        }
      }
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
