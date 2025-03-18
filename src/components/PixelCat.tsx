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
  const [taskbarHeight, setTaskbarHeight] = useState(48); // Default taskbar height
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
  // Calculate movement speed based on animation speed
  const getMovementSpeed = () => {
    switch(animationSpeed) {
      case "slow": return 1;
      case "fast": return 4;
      default: return 2;
    }
  };
  
  // Find the taskbar position and container size on component mount and window resize
  useEffect(() => {
    const updatePositions = () => {
      const taskbar = document.querySelector('.taskbar');
      const container = containerRef.current?.parentElement;
      
      if (taskbar && container) {
        const taskbarRect = taskbar.getBoundingClientRect();
        setTaskbarHeight(taskbarRect.height);
        
        // Update container size
        setContainerSize({
          width: container.clientWidth,
          height: container.clientHeight
        });
        
        // Calculate taskbar Y position (adjusted for scale)
        const taskbarY = container.clientHeight - taskbarRect.height;
        
        // Initialize the cat position on the taskbar if not set yet
        if (position.y === 0) {
          const initialX = Math.min(position.x, container.clientWidth - 60);
          setPosition({ x: initialX, y: taskbarY - 20 });
          setTargetPosition({ x: initialX, y: taskbarY - 20 });
        }
      }
    };
    
    updatePositions();
    
    // Add resize listener
    window.addEventListener('resize', updatePositions);
    
    // Cleanup
    return () => window.removeEventListener('resize', updatePositions);
  }, [scale]);
  
  // Set new random target position along the taskbar
  useEffect(() => {
    if (isBeingDragged || containerSize.width === 0) return;
    
    const interval = setInterval(() => {
      // Get taskbar Y position
      const taskbarY = containerSize.height - taskbarHeight;
      
      // Set new random X position along the taskbar
      const maxX = containerSize.width - 60;
      const newX = Math.max(20, Math.floor(Math.random() * maxX));
      
      // Update target position (stay on taskbar)
      setTargetPosition({ x: newX, y: taskbarY - 20 });
      setFlipped(newX < position.x);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [position, isBeingDragged, containerSize, taskbarHeight]);
  
  // Move toward target position or apply gravity when needed
  useEffect(() => {
    if (isBeingDragged || containerSize.height === 0) return;
    
    const moveInterval = setInterval(() => {
      setPosition(current => {
        // Get taskbar Y position
        const taskbarY = containerSize.height - taskbarHeight;
        
        // If above taskbar level, apply gravity
        if (current.y < taskbarY - 25) {
          // Gravity effect - smoother fall with acceleration
          const distanceFromTaskbar = taskbarY - 25 - current.y;
          const gravity = Math.min(8, 0.5 + distanceFromTaskbar * 0.1);
          
          return {
            x: current.x, // Keep X position unchanged during fall
            y: Math.min(taskbarY - 20, current.y + gravity)
          };
        }
        
        // If at taskbar level, move toward target X position
        if (Math.abs(current.y - (taskbarY - 20)) < 5) {
          const dx = targetPosition.x - current.x;
          const distance = Math.abs(dx);
          
          // If very close to target, snap to it
          if (distance < 2) {
            return { x: targetPosition.x, y: taskbarY - 20 };
          }
          
          // Otherwise, move toward target X at appropriate speed
          const moveX = dx / distance * getMovementSpeed();
          
          return {
            x: current.x + moveX,
            y: taskbarY - 20 // Stay at taskbar level
          };
        }
        
        // If somehow below taskbar, bring back up
        if (current.y > taskbarY - 20) {
          return { ...current, y: taskbarY - 20 };
        }
        
        return current;
      });
    }, 16); // ~60fps for smoother animation
    
    return () => clearInterval(moveInterval);
  }, [targetPosition, isBeingDragged, containerSize, taskbarHeight, animationSpeed]);
  
  // Show random messages periodically
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
    
    if (containerSize.width === 0) return;
    
    // Calculate taskbar Y position
    const taskbarY = containerSize.height - taskbarHeight;
    
    // Calculate new position with boundary constraints
    const newX = Math.max(0, Math.min(containerSize.width - 60, position.x + info.offset.x));
    const newY = Math.max(0, Math.min(containerSize.height - 60, position.y + info.offset.y));
    
    // Update position immediately
    setPosition({ x: newX, y: newY });
    
    // If dropped above taskbar, show falling message
    if (newY < taskbarY - 30) {
      showCatMessage("Whee! I'm falling!");
      // Target position is back on taskbar - gravity will pull cat down
      setTargetPosition({ x: newX, y: taskbarY - 20 });
    } else {
      // If dropped near taskbar, snap to taskbar position
      setPosition({ x: newX, y: taskbarY - 20 });
      setTargetPosition({ x: newX, y: taskbarY - 20 });
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
        scale: scale / 100
      }}
      drag
      dragMomentum={false}
      dragTransition={{ power: 0, timeConstant: 0 }} // Instant response to drag
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

